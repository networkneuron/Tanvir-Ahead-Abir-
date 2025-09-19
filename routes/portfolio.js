
import express from 'express';
import {
  getPortfolioItems,
  createPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
} from '../controllers/portfolioController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Portfolio
 *   description: API to manage portfolio items
 */

/**
 * @swagger
 * /api/portfolio:
 *   get:
 *     summary: Get all portfolio items with pagination
 *     tags: [Portfolio]
 *     parameters:
 *       - in: query
 *         name: pageNumber
 *         schema:
 *           type: integer
 *         description: The page number
 *     responses:
 *       200:
 *         description: A list of portfolio items
 */
router.route('/').get(getPortfolioItems);

/**
 * @swagger
 * /api/portfolio:
 *   post:
 *     summary: Create a new portfolio item
 *     tags: [Portfolio]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               serviceType:
 *                 type: string
 *                 description: The ID of the related service
 *               videoUrl:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Portfolio item created
 */
router.route('/').post(protect, upload.single('image'), createPortfolioItem);

/**
 * @swagger
 * /api/portfolio/{id}:
 *   put:
 *     summary: Update a portfolio item by ID
 *     tags: [Portfolio]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               serviceType:
 *                 type: string
 *               videoUrl:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Item updated
 */
router.route('/:id').put(protect, upload.single('image'), updatePortfolioItem);

/**
 * @swagger
 * /api/portfolio/{id}:
 *   delete:
 *     summary: Delete a portfolio item by ID
 *     tags: [Portfolio]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item deleted
 */
router.route('/:id').delete(protect, deletePortfolioItem);

export default router;
