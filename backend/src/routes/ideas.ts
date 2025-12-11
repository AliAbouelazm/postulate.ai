import { Router } from 'express';
import { body, validationResult, query } from 'express-validator';
import { prisma } from '../utils/prisma.js';
import { authenticate, AuthRequest, requireRole } from '../middleware/auth.js';

export const ideaRoutes = Router();

// All idea routes require authentication
ideaRoutes.use(authenticate);

// Validation middleware
const validateIdea = [
  body('title').trim().isLength({ min: 3, max: 200 }),
  body('description').trim().isLength({ min: 10, max: 10000 }),
  body('category').optional().trim().isLength({ max: 100 }),
  body('tags').optional().isString().trim().isLength({ max: 500 }),
];

// Create idea (creators only)
ideaRoutes.post(
  '/',
  [...validateIdea, requireRole('CREATOR', 'ADMIN')],
  async (req: AuthRequest, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, description, category, tags } = req.body;

      // Convert tags array to comma-separated string if needed
      let tagsString = '';
      if (tags) {
        tagsString = Array.isArray(tags) ? tags.join(',') : tags;
      }

      const idea = await prisma.idea.create({
        data: {
          title,
          description,
          category: category || null,
          tags: tagsString,
          creatorId: req.userId!,
          status: 'DRAFT',
        },
        include: {
          creator: {
            select: {
              id: true,
              email: true,
              name: true,
            },
          },
        },
      });

      res.status(201).json({
        message: 'Idea created successfully',
        idea,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Get user's ideas
ideaRoutes.get('/my-ideas', async (req: AuthRequest, res, next) => {
  try {
    const ideas = await prisma.idea.findMany({
      where: { creatorId: req.userId },
      orderBy: { createdAt: 'desc' },
      include: {
        nda: true,
        reviews: {
          select: {
            id: true,
            rating: true,
            feedback: true,
            status: true,
            reviewedAt: true,
          },
        },
      },
    });

    res.json({ ideas });
  } catch (error) {
    next(error);
  }
});

// Get all submitted ideas (companies can view)
ideaRoutes.get(
  '/',
  [query('status').optional().isIn(['DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'ACCEPTED', 'REJECTED'])],
  async (req: AuthRequest, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { status } = req.query;
      const where: any = {};

      // Creators only see their own ideas, companies see submitted ones
      if (req.userRole === 'CREATOR') {
        where.creatorId = req.userId;
      } else {
        // Companies see submitted ideas
        where.status = { in: ['SUBMITTED', 'UNDER_REVIEW', 'ACCEPTED'] };
      }

      if (status) {
        where.status = status;
      }

      const ideas = await prisma.idea.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        include: {
          creator: {
            select: {
              id: true,
              email: true,
              name: true,
            },
          },
          nda: true,
          _count: {
            select: { reviews: true },
          },
        },
      });

      res.json({ ideas });
    } catch (error) {
      next(error);
    }
  }
);

// Get single idea
ideaRoutes.get('/:id', async (req: AuthRequest, res, next) => {
  try {
    const idea = await prisma.idea.findUnique({
      where: { id: req.params.id },
      include: {
        creator: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
        nda: true,
        reviews: {
          include: {
            idea: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        },
      },
    });

    if (!idea) {
      return res.status(404).json({ error: 'Idea not found' });
    }

    // Check permissions
    if (req.userRole === 'CREATOR' && idea.creatorId !== req.userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json({ idea });
  } catch (error) {
    next(error);
  }
});

// Update idea (creator only)
ideaRoutes.patch(
  '/:id',
  [...validateIdea, requireRole('CREATOR', 'ADMIN')],
  async (req: AuthRequest, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const idea = await prisma.idea.findUnique({
        where: { id: req.params.id },
      });

      if (!idea) {
        return res.status(404).json({ error: 'Idea not found' });
      }

      if (idea.creatorId !== req.userId && req.userRole !== 'ADMIN') {
        return res.status(403).json({ error: 'Access denied' });
      }

      const { title, description, category, tags } = req.body;
      const updateData: any = {};

      if (title) updateData.title = title;
      if (description) updateData.description = description;
      if (category !== undefined) updateData.category = category || null;
      if (tags !== undefined) {
        // Convert tags array to comma-separated string if needed
        updateData.tags = Array.isArray(tags) ? tags.join(',') : tags;
      }

      const updatedIdea = await prisma.idea.update({
        where: { id: req.params.id },
        data: updateData,
        include: {
          creator: {
            select: {
              id: true,
              email: true,
              name: true,
            },
          },
        },
      });

      res.json({
        message: 'Idea updated successfully',
        idea: updatedIdea,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Submit idea for review (creator only)
ideaRoutes.post(
  '/:id/submit',
  requireRole('CREATOR', 'ADMIN'),
  async (req: AuthRequest, res, next) => {
    try {
      const idea = await prisma.idea.findUnique({
        where: { id: req.params.id },
      });

      if (!idea) {
        return res.status(404).json({ error: 'Idea not found' });
      }

      if (idea.creatorId !== req.userId && req.userRole !== 'ADMIN') {
        return res.status(403).json({ error: 'Access denied' });
      }

      if (idea.status !== 'DRAFT') {
        return res.status(400).json({
          error: 'Idea has already been submitted',
        });
      }

      const updatedIdea = await prisma.idea.update({
        where: { id: req.params.id },
        data: {
          status: 'SUBMITTED',
          submittedAt: new Date(),
        },
        include: {
          creator: {
            select: {
              id: true,
              email: true,
              name: true,
            },
          },
        },
      });

      res.json({
        message: 'Idea submitted successfully',
        idea: updatedIdea,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Review idea (company only)
ideaRoutes.post(
  '/:id/review',
  [
    requireRole('COMPANY', 'ADMIN'),
    body('rating').optional().isInt({ min: 1, max: 5 }),
    body('feedback').optional().trim().isLength({ max: 5000 }),
    body('status').isIn(['interested', 'not_interested', 'needs_revision']),
  ],
  async (req: AuthRequest, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const idea = await prisma.idea.findUnique({
        where: { id: req.params.id },
      });

      if (!idea) {
        return res.status(404).json({ error: 'Idea not found' });
      }

      if (idea.status !== 'SUBMITTED' && idea.status !== 'UNDER_REVIEW') {
        return res.status(400).json({
          error: 'Idea is not available for review',
        });
      }

      const { rating, feedback, status } = req.body;

      // Create review
      const review = await prisma.review.create({
        data: {
          ideaId: idea.id,
          rating: rating || null,
          feedback: feedback || null,
          status,
        },
      });

      // Update idea status based on review
      let newStatus = idea.status;
      if (status === 'interested') {
        newStatus = 'IN_NEGOTIATION';
      } else if (status === 'not_interested') {
        newStatus = 'REJECTED';
      } else {
        newStatus = 'UNDER_REVIEW';
      }

      await prisma.idea.update({
        where: { id: idea.id },
        data: { status: newStatus },
      });

      res.status(201).json({
        message: 'Review submitted successfully',
        review,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Delete idea (creator only)
ideaRoutes.delete(
  '/:id',
  requireRole('CREATOR', 'ADMIN'),
  async (req: AuthRequest, res, next) => {
    try {
      const idea = await prisma.idea.findUnique({
        where: { id: req.params.id },
      });

      if (!idea) {
        return res.status(404).json({ error: 'Idea not found' });
      }

      if (idea.creatorId !== req.userId && req.userRole !== 'ADMIN') {
        return res.status(403).json({ error: 'Access denied' });
      }

      await prisma.idea.delete({
        where: { id: req.params.id },
      });

      res.json({ message: 'Idea deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
);

