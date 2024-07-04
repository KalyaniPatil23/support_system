const db = require('../models/db');

exports.createTicket = async (req, res) => {
    const { title, description } = req.body;
    const attachment = req.file ? req.file.path : null;
    const createdBy = req.user.id;

    try {
        const [result] = await db.execute(
            'INSERT INTO tickets (title, description, created_by, status) VALUES (?, ?, ?, "open")',
            [title, description, createdBy]
        );
        
        const ticketId = result.insertId;

        if (attachment) {
            await db.execute(
                'INSERT INTO replies (ticket_id, message, replied_by, attachment) VALUES (?, ?, ?, ?)',
                [ticketId, 'Attachment added', createdBy, attachment]
            );
        }

        res.status(201).json({ message: 'Ticket created successfully', ticketId });
    
        // await db.query('INSERT INTO tickets (title, description, created_by) VALUES (?, ?, ?)', [title, description, req.user.id]);
        // res.send('Ticket created successfully');
    } catch (err) {
        res.status(500).send('Server error');
    }
};

exports.updateTicket = async (req, res) => {
    const { id, status } = req.body;

    try {
        const [ticket] = await db.query('SELECT * FROM tickets WHERE id = ?', [id]);
        if (ticket.length === 0) return res.status(404).send('Ticket not found.');
        if (ticket[0].status === 'closed') return res.status(400).send('Cannot update closed ticket.');

        await db.query('INSERT INTO replies (ticket_id, message, replied_by, attachment) VALUES (?, ?, ?, ?)', [id, message, req.user.id, attachment]);
        res.send('Reply added successfully');
    } catch (err) {
        res.status(500).send('Server error');
    }
};

exports.assignTicket = async (req, res) => {
    const { assigned_to } = req.body;
    const { id } = req.params;

    try {
        await db.query('UPDATE tickets SET assigned_to = ? WHERE id = ?', [assigned_to, id]);
        res.send('Ticket assigned successfully');
    } catch (err) {
        res.status(500).send('Server error');
    }
};

exports.updateTicketStatus = async (req, res) => {
    const {status} = req.body;
    const { id } = req.params;

    try {
        await db.query('UPDATE tickets SET status = ? WHERE id = ?', [status, id]);
        res.send('Ticket status updated successfully');
    } catch (err) {
        res.status(500).send('Server error');
    }
};

exports.getTickets = async (req, res) => {
    try {
        let query = '';
        let params = [];

        if (req.user.role === 'end-user') {
            query += 'SELECT tickets.id, tickets.title, tickets.description, tickets.status, users.username as assign, tickets.created_at FROM tickets LEFT JOIN users ON users.id = tickets.assigned_to WHERE created_by = ?';
            params.push(req.user.id);
        } else if (req.user.role === 'tech-support') {
            query += ' SELECT tickets.id, tickets.title, tickets.description, tickets.status, users.username as creator, tickets.created_at FROM tickets LEFT JOIN users ON users.id = tickets.created_by WHERE assigned_to = ?';
            params.push(req.user.id);
        } else{
            query += 'SELECT tickets.id, tickets.title, tickets.description, tickets.status, assigned_user.username AS assign, created_user.username AS creator FROM tickets LEFT JOIN users AS assigned_user ON tickets.assigned_to = assigned_user.id LEFT JOIN users AS created_user ON tickets.created_by = created_user.id;'
        }

        const [tickets] = await db.query(query, params);
        res.send(tickets);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

exports.getTicketById = async (req, res) => {
    try {
        let query = 'SELECT * FROM tickets WHERE id = ?';
        let params = [req.params.id];
        const ticket = await db.query(query, params);
        res.send(ticket[0]);
    } catch (err) {
        res.status(500).send('Server error');
    }
};
