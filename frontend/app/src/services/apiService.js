import axios from 'axios';


/**
export const TranslateApiData = {
  translated: null,
  original_message: null,
  original_language: null,
  language: null,
};

export const QuotesApiData = {
  quotes: null,
  score: null,
  author: null,
};

export const LanguagesApiData = {
  languages: [],
};
*/

class ApiService {
  constructor() {
    this.apiClient = axios.create({
      baseURL: 'http://localhost:3000',
      timeout: 5000,
    });

    this.apiClient.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('API Error:', error.message);
        return Promise.reject(error);
      }
    );
  }

  async translate(text, lang) {
    try {
      if (!text || typeof text !== 'string') {
        throw new Error('Invalid text parameter');
      }
      if (!lang || typeof lang !== 'string') {
        throw new Error('Invalid language parameter');
      }

      const response = await this.apiClient.get('/translate', {
        params: {
          message: text,
          language: lang,
        },
      });

      const data = response.data;
      if (
        typeof data.translated !== 'string' ||
        typeof data.original_message !== 'string' ||
        typeof data.original_language !== 'string' ||
        typeof data.language !== 'string'
      ) {
        throw new Error('Invalid API response for translate');
      }

      return data;
    } catch (error) {
      console.error('Error during translation:', error.message);
      return { error: 'Translation failed', details: error.message };
    }
  }

  async languages() {
    try {
      const response = await this.apiClient.get('/translate/languages');

      const data = response.data;
      if (!Array.isArray(data.languages)) {
        throw new Error('Invalid API response for languages');
      }

      return data;
    } catch (error) {
      console.error('Error fetching languages:', error.message);
      return { error: 'Failed to fetch languages', details: error.message };
    }
  }

  async quotes(text) {
    try {
      if (!text || typeof text !== 'string') {
        throw new Error('Invalid text parameter for quotes');
      }

      const response = await this.apiClient.get('/quotes', {
        params: { text },
      });

      const data = response.data;
      if (
        typeof data.quotes !== 'string' ||
        typeof data.score !== 'number' ||
        typeof data.author !== 'string'
      ) {
        throw new Error('Invalid API response for quotes');
      }

      return data;
    } catch (error) {
      console.error('Error fetching quotes:', error.message);
      return { error: 'Failed to fetch quotes', details: error.message };
    }
  }
}

const apiService = new ApiService();
export default apiService;
