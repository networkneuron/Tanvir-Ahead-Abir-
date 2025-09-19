
import express from 'express';
import { body } from 'express-validator';
import {
  submitContactForm,
  getContactMessages,
  updateMessageStatus,
  deleteMessage
} from '../controllers/contactController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Contact
 *   description: Contact form submission
 */

/**
 * @swagger
 * /api/contact:
 *   post:
 *     summary: Submit a message via the contact form
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Message sent successfully
 *       400:
 *         description: Invalid input
 */
router.post(
  '/',
  [
    body('name', 'Name is required').not().isEmpty().trim().escape(),
    body('email', 'Please include a valid email').isEmail().normalizeEmail(),
    body('message', 'Message is required').not().isEmpty().trim().escape(),
  ],
  submitContactForm
);

// --- ADMIN ROUTES ---

/**
 * @swagger
 * /api/contact/messages:
 *   get:
 *     summary: Get all contact messages (Admin)
 *     tags: [Contact]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of contact messages
 *       401:
 *         description: Not authorized
 */
router.route('/messages').get(protect, getContactMessages);

/**
 * @swagger
 * /api/contact/messages/{id}:
 *   put:
 *     summary: Update a message's read status (Admin)
 *     tags: [Contact]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isRead:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Message status updated
 *       404:
 *         description: Message not found
 */
router.route('/messages/:id').put(protect, updateMessageStatus);

/**
 * @swagger
 * /api/contact/messages/{id}:
 *   delete:
 *     summary: Delete a message (Admin)
 *     tags: [Contact]
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
 *         description: Message deleted
 *       404:
 *         description: Message not found
 */
router.route('/messages/:id').delete(protect, deleteMessage);


export default router;
