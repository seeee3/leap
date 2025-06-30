const axios = require('axios');

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || "https://your-backup-url.webhook";

const search = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Missing search query' });
  }

  try {
    console.log("Sending query to n8n:", query);

    const response = await axios.post(
      N8N_WEBHOOK_URL,
      { query },
      { headers: { 'Content-Type': 'application/json' } }
    );

    console.log("Raw response from n8n:", JSON.stringify(response.data, null, 2));

    const rawResults = Array.isArray(response.data) ? response.data : [];

    const results = rawResults.map((item) => ({
      headline: item.title || 'No Title',
      summary: item.pageContent || 'No summary available',
      thumbnail: item.thumbnail || "/fallback1.jpeg",
      source: (() => {
        try {
          const domain = new URL(item.id).hostname;
          return domain.replace("www.", "");
        } catch {
          return "Unknown Source";
        }
      })(),
      date: item.date || new Date().toISOString(),
      tags: item.tags || [],
      url: item.id || "",
    }));
    

    return res.json({ results });
  } catch (error) {
    console.error('Error calling n8n webhook:', error.message || error);
    return res.status(500).json({ error: 'Failed to fetch search results' });
  }
};

module.exports = { search };
