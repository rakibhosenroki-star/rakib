/**
 * MD RAKIB HASAN - CONTACT MESSAGE CONTROLLER
 * Saves contact inquiries to PostgreSQL database and provides Admin retrieval.
 */

const { query, memoryStore } = require('../config/db');

exports.sendMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
    }

    const sql = `
      INSERT INTO contact_messages (name, email, subject, message)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const result = await query(sql, [name, email, subject || 'General Inquiry', message]);

    const savedMessage = result.rows && result.rows.length > 0 ? result.rows[0] : {
      id: Date.now(),
      name,
      email,
      subject: subject || 'General Inquiry',
      message,
      is_read: false,
      created_at: new Date()
    };

    memoryStore.messages.unshift(savedMessage);

    res.status(201).json({
      success: true,
      message: 'Thank you for reaching out! Your message has been saved in the database.',
      data: savedMessage
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to record your message.' });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const result = await query('SELECT * FROM contact_messages ORDER BY created_at DESC');
    const messages = result.rows && result.rows.length > 0 ? result.rows : memoryStore.messages;
    res.json({ success: true, data: messages });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Could not fetch messages.' });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const { is_read } = req.body;
    await query('UPDATE contact_messages SET is_read = $1 WHERE id = $2', [is_read !== false, id]);

    const msg = memoryStore.messages.find(m => m.id == id);
    if (msg) msg.is_read = is_read !== false;

    res.json({ success: true, message: 'Message status updated.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update message.' });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    await query('DELETE FROM contact_messages WHERE id = $1', [id]);
    memoryStore.messages = memoryStore.messages.filter(m => m.id != id);
    res.json({ success: true, message: 'Message removed.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete message.' });
  }
};
