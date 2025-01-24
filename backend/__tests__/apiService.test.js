const { apiService } = require('../services/apiService');
const axios = require('axios');

// Mock axios
jest.mock('axios');

describe('apiService', () => {
    test('should fetch data successfully', async() => {
        const mockData = [{ id: 1, data: 'test' }];
        axios.get.mockResolvedValue({ data: mockData });

        const result = await apiService('http://test.com');
        expect(result).toEqual(mockData);
    });

    test('should throw error when API call fails', async() => {
        const errorMessage = 'Network Error';
        axios.get.mockRejectedValue(new Error(errorMessage));

        await expect(apiService('http://test.com'))
            .rejects
            .toThrow(`Error when fetch api on http://test.com: ${errorMessage}`);
    });
});