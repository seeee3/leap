const axios = require('axios');

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || "https://your-backup-url.webhook";

const search = async (req, res) => {
  let { query, tags = [], source, dateRange } = req.query;

  // Ensure tags is an array
  if (typeof tags === "string") {
    tags = [tags];
  }

  // If no manual query, use tag as query
  if (!query && tags.length > 0) {
    query = tags[0];
  }

  if (!query) {
    return res.status(400).json({ error: 'Missing search query' });
  }

  try {
    console.log("→ Sending to n8n:", { query, tags });

    const response = await axios.post(
      N8N_WEBHOOK_URL,
      { query, tags },
      { headers: { 'Content-Type': 'application/json' } }
    );

    let rawResults = Array.isArray(response.data) ? response.data : [];

    // Normalize
    let results = rawResults.map((item) => ({
      headline: item.title || 'No Title',
      summary: item.description || item.pageContent || 'No summary available',
      thumbnail: item.image_url || "/fallback1.jpeg",
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

    // Source filter
    // Source filter
    if (source) {
      const normalizedSource = source.toLowerCase();
      const knownSources = ["github", "youtube", "marktechpost"];
    
      if (normalizedSource === "others") {
        results = results.filter(article => {
          const src = (article.source || "").toLowerCase();
          return !knownSources.some(known => src.includes(known));
        });
      } else {
        results = results.filter(article =>
          (article.source || "").toLowerCase().includes(normalizedSource)
        );
      }
    }
    
    
    


    // Date filter
    if (dateRange) {
      const now = new Date();
      results = results.filter((article) => {
        const articleDate = new Date(article.date);

        switch (dateRange) {
          case "today":
            return articleDate.toDateString() === now.toDateString();
          case "this-week": {
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(now.getDate() - 7);
            return articleDate >= oneWeekAgo;
          }
          case "this-month": {
            const oneMonthAgo = new Date();
            oneMonthAgo.setMonth(now.getMonth() - 1);
            return articleDate >= oneMonthAgo;
          }
          case "this-year":
            return articleDate.getFullYear() === now.getFullYear();
          default:
            return true;
        }
      });
    }

    return res.json({ results });
  } catch (error) {
    console.error('Error calling n8n webhook:', error.message || error);
    return res.status(500).json({ error: 'Failed to fetch search results' });
  }
};

module.exports = { search };
