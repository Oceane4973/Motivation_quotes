const express = require('express');
const cors = require('cors');
const { nlpService } = require('./services/NLPService.js'); 

const app = express();
const PORT = 3000;

(async () => {
    try {
        await nlpService.initialize();
    } catch (err) {
        console.error('Erreur d\'initialisation :', err);
    }
})();

app.use(express.json());

app.use(cors({
  origin: 'http://localhost',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

const translateRoutes = require('./routes/translate');
const quotesRoutes = require('./routes/quotes');

app.use('/translate', translateRoutes);
app.use('/quotes', quotesRoutes);

app.listen(PORT, () => {
    console.log(`Serveur started on http://localhost:${PORT}`);
});
