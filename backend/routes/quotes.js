const express = require('express');
const { CalculationQuotes } = require('../usecases/calculationQuotes');
const router = express.Router();

router.get('/', (req, res) => {
    try {
        const queryParams = req.query;

        const keys = Object.keys(queryParams);
        if (keys.length !== 1) {
            return res.status(400).json({ error: 'Il doit y avoir exactement un argument.' });
        }

        const [key, value] = Object.entries(queryParams)[0];
        if (typeof value !== 'string') {
            return res.status(400).json({ error: 'L\'argument doit être une chaîne de caractères.' });
        }
        const userInput = value;

        (async() => {
            try {
                const calculation = new CalculationQuotes();
                const result = await calculation.calculate(userInput);
                if (result) {
                    return res.json({
                        quotes: result.bestQuote.q, // La citation
                        score: result.bestScore, // Le score
                        author: result.bestQuote.a // L'auteur
                    });
                } else {
                    return res.status(500).json({ error: 'Une erreur est survenue.', details: err.message });
                }
            } catch (err) {
                return res.status(500).json({ error: 'Une erreur est survenue.', details: err.message });
            }
        })();
    } catch (err) {
        return res.status(500).json({ error: 'Une erreur est survenue.', details: err.message });
    }
});


module.exports = router;
