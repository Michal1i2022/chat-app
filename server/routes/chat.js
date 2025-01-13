const express = require('express');
const Message = require('../models/message');

const router = express.Router();

// Pobieranie wiadomości użytkownika
router.get('/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const messages = await Message.find({
      $or: [{ sender: username }, { recipient: username }],
    }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Wysyłanie wiadomości
router.post('/', async (req, res) => {
  const { sender, recipient, content } = req.body;
  try {
    const message = new Message({ sender, recipient, content });
    await message.save();
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to send message' });
  }
});

module.exports = router;
// w