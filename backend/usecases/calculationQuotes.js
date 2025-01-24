const { apiService } = require('../services/apiService');
const { cosineSimilarity } = require('../utils/utils');
const nlpService = require('../services/NLPService');

// On déclare simplement la constante :
const QuotesApiData = {
    userInput: null,
    quotes: null,
    score: null
};

class CalculationQuotes {

    constructor() {
        this.url = 'https://zenquotes.io/api/quotes';
    }

    async getExternalQuotes() {
        const quotesData = await apiService(this.url);
        if (!Array.isArray(quotesData) || quotesData.length === 0) {
            console.error('ZenQuotes a renvoyé un tableau vide ou invalide :', quotesData);
            return null;
        }
        return quotesData;

    }

    async calculate(userInput) {
        let quotesData = await this.getExternalQuotes();

        if (quotesData == null) {
            console.log("passsé 0")
            return null;
        }

        console.log("passsé 1 ")

        // On calcule l'embedding de toutes les citations
        for (const quoteObj of quotesData) {
            if (!quoteObj.q) {
                quoteObj.embedding = null;
                continue;
            }
            try {
                const emb = await nlpService.getEmbedding(quoteObj.q);
                if (!emb || emb.length === 0) {
                    quoteObj.embedding = null;
                } else {
                    quoteObj.embedding = emb;
                }
            } catch (err) {
                console.error(`Erreur embedding pour "${quoteObj.q}" :`, err);
                quoteObj.embedding = null;
            }
        }

        console.log("passsé 2")

        let bestScore = -Infinity;
        let bestQuote = null;

        // Embedding de l'input utilisateur
        const userEmb = await nlpService.getEmbedding(userInput);


        try {
            for (const quoteObj of quotesData) {
                if (!quoteObj.embedding) continue;
                const sim = cosineSimilarity(userEmb, quoteObj.embedding);
                if (!Number.isNaN(sim) && sim > bestScore) {
                    bestScore = sim;
                    bestQuote = quoteObj;
                }
            }

            console.log("passsé 3 ")

            if (!bestQuote) {
                // Si aucune quote n'est trouvée, on en prend une au hasard
                const randomNumber = Math.floor(Math.random() * quotesData.length);
                const randomQuote = quotesData[randomNumber];
                const score = cosineSimilarity(userEmb, randomQuote.embedding);
                return {
                    userInput,
                    randomQuote,
                    score
                };
            } else {
                return {
                    userInput,
                    bestQuote,
                    bestScore
                };
            }
        } catch (err) {
            // En cas d'erreur, on renvoie également une citation random
            const randomNumber = Math.floor(Math.random() * quotesData.length);
            const randomQuote = quotesData[randomNumber];
            const score = cosineSimilarity(userEmb, randomQuote.embedding);
            return {
                userInput,
                randomQuote,
                score
            };
        }
    }
}


module.exports = {
    QuotesApiData,
    CalculationQuotes
};