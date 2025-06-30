const axios = require("axios");

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;

const search = async (req, res) => {
  const { query = "", tags = [], source, dateRange } = req.query;

  // Ensure tags are always an array
  const tagArray = Array.isArray(tags) ? tags : [tags];

  if (!query) {
    return res.status(400).json({ error: "Missing search query" });
  }

  try {
    const prompt = query.trim() !== "" ? `${query} ${tagArray.join(" ")}`.trim() : tagArray.join(" ").trim();


    const response = await axios.post(
      N8N_WEBHOOK_URL,
      { query: prompt },
      { headers: { "Content-Type": "application/json" } }
    );

    console.log("Raw data from n8n:", JSON.stringify(response.data, null, 2));

    const rawResults = Array.isArray(response.data?.data) ? response.data.data : [];

    // 2️⃣ Normalize raw data into frontend-compatible format
    let results = rawResults.map((item, index) => {
      let headline = item.title || "No Title";

      try {
        const parsed = JSON.parse(headline);
        if (Array.isArray(parsed)) {
          headline = parsed[0] || "No Title";
        }
      } catch {
        // leave title as-is
      }

      return {
        // `id` is now just internal; you can skip using it in frontend
        headline,
        summary: item.pageContent || "No summary available",
        thumbnail: item.thumbnail || "photo-1603415526960-f7e0328f1043",
        source: item.source || "Unknown Source",
        date: item.date || new Date().toISOString(),
        tags: item.tags || [],
        url: item.id || "", // Use as article link
      };
    });

    // 3️⃣ Apply backend filters
    if (source) {
      results = results.filter(
        (article) => article.source.toLowerCase() === source.toLowerCase()
      );
    }

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

    // 4️⃣ Send final response
    return res.json({ results });
  } catch (error) {
    console.error("Error calling n8n webhook:", error.message || error);
    return res.status(500).json({ error: "Failed to fetch search results" });
  }
};

module.exports = { search };
