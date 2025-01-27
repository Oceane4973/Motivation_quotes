const { cosineSimilarity } = require('../utils/utils');

describe('cosineSimilarity', () => {
    test('should calculate correct similarity for identical vectors', () => {
        const vec1 = [1, 2, 3];
        const vec2 = [1, 2, 3];
        expect(cosineSimilarity(vec1, vec2)).toBe(1);
    });

    test('should calculate correct similarity for orthogonal vectors', () => {
        const vec1 = [1, 0];
        const vec2 = [0, 1];
        expect(cosineSimilarity(vec1, vec2)).toBe(0);
    });

    test('should return NaN for vectors of different lengths', () => {
        const vec1 = [1, 2, 3];
        const vec2 = [1, 2];
        expect(cosineSimilarity(vec1, vec2)).toBe(NaN);
    });
});