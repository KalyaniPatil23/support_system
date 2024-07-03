const express = require('express');
const router = express.Router();
const { register, login, me } = require('../controller/authController');
// const { createTicket, updateTicket, assignTicket, closeTicket, getTickets } = require('../controllers/ticketController');
const auth = require('../middleware/auth');

// Auth Routes
router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth/me', me)

// Ticket Routes
// router.get('/tickets', auth, getTickets);
// router.post('/tickets', auth, createTicket);
// router.put('/tickets/:id', auth, updateTicket);
// router.put('/tickets/:id/assign', auth, assignTicket);
// router.put('/tickets/:id/close', auth, closeTicket);

module.exports = router;
