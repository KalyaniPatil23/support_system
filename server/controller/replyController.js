const db = require('../models/db');

exports.createReply = async (req, res) => {
    const { ticket_id, message, replied_by } = req.body;
    const attachment = req.file ? req.file.path : null;

    try {
        if (attachment){
            await db.execute(
                'INSERT INTO replies (ticket_id, message, replied_by, attachment) VALUES (?, ?, ?, ?)',
                [ticket_id, message, replied_by, attachment]
            );
        }else{
            await db.query('INSERT INTO replies (ticket_id, message, replied_by) VALUES (?, ?, ?)', [ticket_id, message, replied_by]);
        }
        res.send('Reply created successfully');
    } catch (err) {
        res.status(500).send('Server error');
    }
};

exports.getTicketReplies = async (req, res) => {
    try {
        let query = 'SELECT replies.ticket_id, replies.message, replies.attachment, users.username as reply_by, replies.created_at FROM replies INNER JOIN users ON users.id = replies.replied_by WHERE replies.ticket_id = ?';
        let params = [req.params.id];

        const replies = await db.query(query, params);
        res.send(replies);
    } catch (err) {
        res.status(500).send('Server error');
    }
};