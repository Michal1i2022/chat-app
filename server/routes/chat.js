const express = require('express');
const router = express.Router()

// Pobieranie wiadomości
router.get('/:username', (req, res) => {
    //Logika pobierania wiadomości dla usera
    res.send(`Messages for ${req.params.username}`)
});

module.exports = router;