const express = require('express');
const app = express();
const PORT = 3000;

// Import de nlpService en CommonJS
const nlpService = require('./services/NLPService.js'); 

(async () => {
    try {
        await nlpService.initialize();
    } catch (err) {
        console.error('Erreur d\'initialisation :', err);
    }
})();

app.use(express.json());

const translateRoutes = require('./routes/translate');
const quotesRoutes = require('./routes/quotes');

app.use('/translate', translateRoutes);
app.use('/quotes', quotesRoutes);

app.listen(PORT, () => {
    console.log(`Serveur started on http://localhost:${PORT}`);
});
