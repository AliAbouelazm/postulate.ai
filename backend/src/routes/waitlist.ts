import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { prisma } from '../utils/prisma.js';
import { errorHandler } from '../middleware/errorHandler.js';

export const waitlistRoutes = Router();

// Validation middleware
const validateWaitlistEntry = [
  body('email').isEmail().normalizeEmail(),
  body('name').optional().trim().isLength({ min: 1, max: 100 }),
  body('type').isIn(['CREATOR', 'COMPANY']),
  body('company').optional().trim().isLength({ min: 1, max: 200 }),
  body('message').optional().trim().isLength({ max: 1000 }),
];

// Join waitlist
waitlistRoutes.post(
  '/',
  validateWaitlistEntry,
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, name, type, company, message } = req.body;

      // Check if user already exists
      let user = await prisma.user.findUnique({
        where: { email },
        include: { waitlist: true },
      });

      // Check if email already exists in waitlist
      if (user?.waitlist) {
        return res.status(409).json({
          error: 'Email already registered on waitlist',
        });
      }

      // Create user if doesn't exist
      if (!user) {
        user = await prisma.user.create({
          data: {
            email,
            name: name || null,
            role: type === 'COMPANY' ? 'COMPANY' : 'CREATOR',
          },
        });
      }

      // Create waitlist entry
      const waitlistEntry = await prisma.waitlistEntry.create({
        data: {
          userId: user.id,
          email,
          name: name || null,
          type,
          company: company || null,
          message: message || null,
        },
      });

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

// Get waitlist stats (admin only - can be protected later)
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

