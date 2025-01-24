function cosineSimilarity(vecA, vecB) {
    if (vecA.length !== vecB.length) {
        console.warn(`Dimension mismatch: vecA=${vecA.length}, vecB=${vecB.length}`);
        return NaN;
    }
    let dot = 0,
        normA = 0,
        normB = 0;
    for (let i = 0; i < vecA.length; i++) {
        dot += vecA[i] * vecB[i];
        normA += vecA[i] ** 2;
        normB += vecB[i] ** 2;
    }
    return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

module.exports = {
    cosineSimilarity,
};