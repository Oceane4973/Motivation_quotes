import axios, { AxiosInstance } from 'axios';

export const TranslateApiData = {
  translated: null,
  original_message: null,
  original_language: null,
  language: null
}

export const QuotesApiData = {
  bestquotes: null,
  score: null,
  author: null
}

class ApiService {
  
  constructor() {
    this.apiClient = axios.create({
      baseURL: 'https://localhost',
      timeout: 5000,
    });
  }

  async translate(text)  {
    const response = await this.apiClient.get<TranslateApiData>('/translate', {
      params: { text },
    });
    return response.data;
  }

  async languages()  {
    const response = await this.apiClient.get<[]>('/translate/languages');
    return response.data;
  }

  async quotes(text){
    const response = await this.apiClient.get<QuotesApiData>('/quotes', {
      params: { text },
    });
    return response.data;
  }
}

const apiService = new ApiService();
export default apiService;
