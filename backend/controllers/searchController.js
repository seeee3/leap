const axios = require('axios');

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;

const search = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Missing search query' });
  }

  try {
    const response = await axios.post(
      N8N_WEBHOOK_URL,
      { query },
      { headers: { 'Content-Type': 'application/json' } }
    );

    const rawResults = Array.isArray(response.data) ? response.data : [];

    const results = rawResults.map(item => {
      let title = item.title || 'No Title';

      // Attempt to parse title if it's a JSON-stringified array
      try {
        const parsedTitle = JSON.parse(title);
        if (Array.isArray(parsedTitle)) {
          title = parsedTitle[0] || 'No Title';
        }
      } catch {
        // Parsing failed, keep original title
      }

      return {
        title,
        url: item.id || '',
        date: item.date || '',
        description: item.pageContent || 'No description available',
      };
    });

    return res.json({ results });
  } catch (error) {
    console.error('Error calling n8n webhook:', error.message || error);
    return res.status(500).json({ error: 'Failed to fetch search results' });
  }
};

module.exports = { search };


