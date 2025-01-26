import axios, { AxiosInstance } from 'axios';

export const TranslateApiData = {
  translated: null,
  original_message: null,
  original_language: null,
  language: null
}

export const QuotesApiData = {
  quotes: null,
  score: null,
  author: null
}

class ApiService {

  constructor() {
    this.apiClient = axios.create({
      baseURL: 'http://localhost:3000',
      timeout: 5000,
    });
  }

  async translate(text, lang) {
    console.log(text)
    console.log(lang)
    const response = await this.apiClient.get('/translate', {
      params: {
        message: text,
        language: lang
      }
    });
    return response.data;
  }

  async languages() {
    const response = await this.apiClient.get('/translate/languages');
    return response.data;
  }

  async quotes(text) {
    const response = await this.apiClient.get('/quotes', {
      params: { text },
    });

    console.log(response)
    return response.data;
  }
}

const apiService = new ApiService();
export default apiService;
