const { pipeline } = require('@xenova/transformers');

class NLPService {
    constructor() {
        if (NLPService.instance) {
            return NLPService.instance;
        }
        this.embedder = null;
        NLPService.instance = this;
    }

    async initialize() {
        if (!this.embedder) {
            console.log('=== Initialisation du pipeline (all-MiniLM-L6-v2) ===');
            this.embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
            console.log('=== Pipeline initialisé ===');
        }
    }

    async getEmbedding(text) {
        if (!this.embedder) {
            throw new Error("Le pipeline n'est pas initialisé. Appelez 'initialize()' d'abord.");
        }
        const output = await this.embedder(text, {
            pooling: 'mean',
            normalize: true,
        });
        return output[0].tolist();
    }
}

const nlpService = new NLPService();

module.exports = {
    nlpService
};
