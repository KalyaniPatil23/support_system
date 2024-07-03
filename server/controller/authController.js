const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models/db');
const { use } = require('../routes/api');

exports.register = async (req, res) => {
    const { username, password, role } = req.body;

    try {
        const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        if (rows.length > 0) return res.status(400).send('User already exists.');

        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, hashedPassword, role]);

        const [user] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        const token = jwt.sign({ id: user[0].id, role: user[0].role }, '9d8c8af8c214aa83eab3605f92b38bf8c4ca46f66c0ab700fad9b4e8e126daeb');
        res.send({ token });
    } catch (err) {
        res.status(500).send('Server error');
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        if (rows.length === 0) return res.status(400).send('Invalid username or password.');

        const validPassword = await bcrypt.compare(password, rows[0].password);
        if (!validPassword) return res.status(400).send('Invalid username or password.');

        const token = jwt.sign({ id: rows[0].id, role: rows[0].role }, '9d8c8af8c214aa83eab3605f92b38bf8c4ca46f66c0ab700fad9b4e8e126daeb');
        res.send({ token });
    } catch (err) {
        res.status(500).send('Server error');
    }
};

exports.me = async (req, res) => {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if no token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, '9d8c8af8c214aa83eab3605f92b38bf8c4ca46f66c0ab700fad9b4e8e126daeb');
        const userId = decoded.id;

        // Fetch user data from database
        const rows = await db.query('SELECT id, username, role FROM users WHERE id = ?', [userId]);

        if (rows.length === 0) return res.status(404).send('User not found');

        const user = rows[0];
        res.send(user[0]);
    } catch (err) {
        console.error('Server error:', err);
        res.status(500).json({ error: 'Server error' });
    }
};