
import { validationResult } from 'express-validator';
import ContactMessage from '../models/ContactMessage.js';
import nodemailer from 'nodemailer';

// @desc    Submit a contact form
// @route   POST /api/contact
// @access  Public
const submitContactForm = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, message } = req.body;

  try {
    // 1. Save message to database
    const contactMessage = new ContactMessage({
      name,
      email,
      message,
    });
    await contactMessage.save();

    // 2. Send email notification (optional, can be disabled if not configured)
    if (process.env.EMAIL_HOST) {
        const transporter = nodemailer.createTransport({
          host: process.env.EMAIL_HOST,
          port: process.env.EMAIL_PORT,
          secure: process.env.EMAIL_PORT == 465, // true for 465, false for other ports
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        const mailOptions = {
          from: `"${name}" <${process.env.EMAIL_USER}>`,
          to: process.env.ADMIN_EMAIL,
          subject: 'New Contact Form Submission from Creative Motion Site',
          html: `
            <h2>New Inquiry</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          `,
        };

        await transporter.sendMail(mailOptions);
    }
    
    res.status(201).json({ message: 'Message sent successfully!' });

  } catch (error) {
    console.error('Error in contact form submission:', error);
    res.status(500).json({ message: 'Failed to send message. Please try again later.' });
  }
};


// --- ADMIN ---

// @desc    Get all contact messages
// @route   GET /api/contact/messages
// @access  Private
const getContactMessages = async (req, res) => {
    try {
        const messages = await ContactMessage.find({}).sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update a message's read status
// @route   PUT /api/contact/messages/:id
// @access  Private
const updateMessageStatus = async (req, res) => {
    const { isRead } = req.body;
    try {
        const message = await ContactMessage.findById(req.params.id);
        if (message) {
            message.isRead = isRead;
            const updatedMessage = await message.save();
            res.json(updatedMessage);
        } else {
            res.status(404).json({ message: 'Message not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
};


// @desc    Delete a contact message
// @route   DELETE /api/contact/messages/:id
// @access  Private
const deleteMessage = async (req, res) => {
    try {
        const message = await ContactMessage.findById(req.params.id);
        if (message) {
            await message.deleteOne();
            res.json({ message: 'Message removed' });
        } else {
            res.status(404).json({ message: 'Message not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};


export { submitContactForm, getContactMessages, updateMessageStatus, deleteMessage };
