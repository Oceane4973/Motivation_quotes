const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const translateRoutes = require('./routes/translate');
const quotesRoutes = require('./routes/quotes');

app.use('/translate', translateRoutes);
app.use('/quotes', quotesRoutes);

app.listen(PORT, () => {
  console.log(`Serveur started on http://localhost:${PORT}`);
});
