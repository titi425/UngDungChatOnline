const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Mật khẩu SQL của bạn
    database: 'chatonline'
});

// Đăng ký/Đăng nhập đơn giản
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, result) => {
        if (result.length > 0) res.send({ success: true, user: result[0] });
        else res.send({ success: false });
    });
});

// Lấy tin nhắn
app.get('/messages', (req, res) => {
    db.query('SELECT * FROM messages ORDER BY created_at ASC', (err, results) => {
        res.send(results);
    });
});

// Gửi tin nhắn
app.post('/messages', (req, res) => {
    const { sender, receiver, message } = req.body;
    db.query('INSERT INTO messages (sender, receiver, message) VALUES (?, ?, ?)', [sender, receiver, message], (err) => {
        res.send({ success: true });
    });
});

app.listen(3000, () => console.log("Server running on port 3000"));