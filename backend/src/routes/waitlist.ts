import { Router, Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { prisma } from '../utils/prisma.js';
import { errorHandler } from '../middleware/errorHandler.js';
import { sendWaitlistNotification, sendConfirmationEmail } from '../utils/email.js';

export const waitlistRoutes = Router();

const validateWaitlistEntry = [
  body('email').isEmail().normalizeEmail(),
  body('name').optional().trim().isLength({ min: 1, max: 100 }),
  body('type').isIn(['CREATOR', 'COMPANY']),
  body('company').optional().trim().isLength({ min: 1, max: 200 }),
  body('message').optional().trim().isLength({ max: 1000 }),
];

waitlistRoutes.post(
  '/',
  validateWaitlistEntry,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, name, type, company, message } = req.body;

      let user = await prisma.user.findUnique({
        where: { email },
        include: { waitlist: true },
      });

      if (user?.waitlist) {
        return res.status(409).json({
          error: 'Email already registered on waitlist',
        });
      }

      if (!user) {
        user = await prisma.user.create({
          data: {
            email,
            name: name || null,
            role: type === 'COMPANY' ? 'COMPANY' : 'CREATOR',
          },
          include: { waitlist: true },
        });
      }

      const waitlistEntry = await prisma.waitlistEntry.create({
        data: {
          userId: user!.id,
          email,
          name: name || null,
          type,
          company: company || null,
          message: message || null,
        },
      });

      sendWaitlistNotification(email, name, type, company, message).catch(console.error);
      sendConfirmationEmail(email, name, type).catch(console.error);

      res.status(201).json({
        message: 'Successfully joined waitlist',
        entry: {
          id: waitlistEntry.id,
          email: waitlistEntry.email,
          type: waitlistEntry.type,
          createdAt: waitlistEntry.createdAt,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

waitlistRoutes.get('/stats', async (req, res, next) => {
  try {
    const [creators, companies, total] = await Promise.all([
      prisma.waitlistEntry.count({ where: { type: 'CREATOR' } }),
      prisma.waitlistEntry.count({ where: { type: 'COMPANY' } }),
      prisma.waitlistEntry.count(),
    ]);

    res.json({
      creators,
      companies,
      total,
    });
  } catch (error) {
    next(error);
  }
});

