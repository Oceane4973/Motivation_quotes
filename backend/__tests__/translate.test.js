const axios = require('axios');

const baseUrl = 'http://127.0.0.1:3000/translate';

describe(`Translation module`, () => {
    it('Should retrieves all available translation languages', async () => {
        const res = await axios.get(`${baseUrl}/languages`);

        expect(res.status).toBe(200);
        expect(res.data.languages).toHaveLength(6);

        expect(res.data.languages).toContain('fr');
        expect(res.data.languages).toContain('en');
        expect(res.data.languages).toContain('de');
        expect(res.data.languages).toContain('es');
        expect(res.data.languages).toContain('it');
        expect(res.data.languages).toContain('ja');
    });
    it('should return an error because translation language is undefined', async () => {
        try {
            const res = await axios.get(`${baseUrl}/`, {
                params: {
                    message: 'Bonjour'
                }
            });

            fail('Expected a 400 error');
        } catch (error) {
            expect(error.response.status).toBe(400);
            expect(error.response.data.error).toBe('Missing message or language in query parameters');
        }
    });
    it('should return an error because message to translate is undefined', async () => {
        try {
            const res = await axios.get(`${baseUrl}/`, {
                params: {
                    language: 'fr'
                }
            });

            fail('Expected a 400 error');
        } catch (error) {
            expect(error.response.status).toBe(400);
            expect(error.response.data.error).toBe('Missing message or language in query parameters');
        }
    });
    it('should translate hello in french', async () => {
        const res = await axios.get(`${baseUrl}/`, {
            params: {
                message: 'Hello',
                language: 'fr'
            }
        });

        expect(res.status).toBe(200);
        expect(res.data.original_message).toBe('Hello');
        expect(res.data.original_language).toBe('en');
        expect(res.data.translated).toBe('Bonjour');
        expect(res.data.language).toBe('fr');
    });
    it('should translate hello in spanish', async () => {
        const res = await axios.get(`${baseUrl}/`, {
            params: {
                message: 'Hello',
                language: 'es'
            }
        });

        expect(res.status).toBe(200);
        expect(res.data.original_message).toBe('Hello');
        expect(res.data.original_language).toBe('en');
        expect(res.data.translated).toBe('Hola');
        expect(res.data.language).toBe('es');
    });

    it('should translate hello in italian', async () => {
        const res = await axios.get(`${baseUrl}/`, {
            params: {
                message: 'Hello',
                language: 'it'
            }
        });

        expect(res.status).toBe(200);
        expect(res.data.original_message).toBe('Hello');
        expect(res.data.original_language).toBe('en');
        expect(res.data.translated).toBe('Ciao');
        expect(res.data.language).toBe('it');
    });
});
