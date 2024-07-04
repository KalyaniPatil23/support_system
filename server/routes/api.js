const express = require('express');
const router = express.Router();
const { register, login, me, getSupports } = require('../controller/authController');
const { createTicket, updateTicket, assignTicket, getTickets, getTicketById, updateTicketStatus } = require('../controller/ticketController');
const {getTicketReplies, createReply} = require('../controller/replyController')
const auth = require('../middleware/auth');
const upload = require('../multer-config');
// Auth Routes
router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth/me', me);
router.get('/auth/support', getSupports);

// Ticket Routes
router.get('/tickets', auth, getTickets);
router.get('/ticket/:id', auth, getTicketById);
router.post('/tickets', auth, upload.single('attachment'), createTicket);
router.put('/tickets/:id/assign', auth, assignTicket);
router.put('/tickets/:id/status', auth, updateTicketStatus);

//Reply Routes
router.get('/ticket/:id/replies', auth, getTicketReplies);
router.post('/reply', auth, upload.single('attachment'), createReply);

module.exports = router;
