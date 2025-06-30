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

    console.log("Raw data from n8n:", JSON.stringify(response.data, null, 2));

    const rawResults = Array.isArray(response.data?.data) ? response.data.data : [];

    const results = rawResults.map(item => {
      let title = item.title || 'No Title';

      try {
        const parsedTitle = JSON.parse(title);
        if (Array.isArray(parsedTitle)) {
          title = parsedTitle[0] || 'No Title';
        }
      } catch {
        // leave title as-is
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
