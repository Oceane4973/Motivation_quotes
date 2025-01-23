const axios = require('axios');

const apiService = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(`Error when fetch api on ${url}: ${error.message}`);
  }
};

module.exports = {
    apiService,
};
