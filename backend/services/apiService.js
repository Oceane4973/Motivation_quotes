const axios = require('axios');

async function apiService(url) {
    try {
        console.log(url)

        const response = await axios.get(url);
        console.log(response.data)
        return response.data;
    } catch (error) {
        throw new Error(`Error when fetch api on ${url}: ${error.message}`);
    }
};

module.exports = {
    apiService,
};