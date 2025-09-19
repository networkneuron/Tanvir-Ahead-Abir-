
import express from 'express';
import { loginAdmin, registerAdmin } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication for admin users
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login for an admin user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login, returns user info and JWT token
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', loginAdmin);

// This route should be used for initial setup and then disabled or protected.
// For example, protect it so only an existing admin can create another.
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new admin user (for setup)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Admin user created successfully
 *       400:
 *         description: User already exists or invalid data
 */
router.post('/register', protect, registerAdmin); // Example: Protect this route

export default router;
