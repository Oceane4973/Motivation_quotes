const express = require('express');
const router = express.Router();
const translate = require('google-translate-api-x');

router.get('/', async (req, res) => {
    const { message, language } = req.query;

    if (!message || !language) {
        return res.status(400).json({ error: "Missing message or language in query parameters" });
    }

    const translation = await translate(message, {to: language});

    res.json({
        original_message: message,
        original_language: translation.from.language.iso,
        translated: translation.text,
        language: language,
    });
});

router.get('/languages', (req, res) => {
    res.json({
        languages: ['fr', 'en', 'de', 'es', 'it', 'ja'],
    });
});

module.exports = router;
