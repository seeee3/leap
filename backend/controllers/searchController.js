const axios = require("axios");
const qs = require("qs");
const { createClient } = require("@supabase/supabase-js");

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const buildSupabaseFilterQuery = (tags = [], source, dateRange) => {
  const filters = {};

  // Array column: filter using `ov.{...}` for overlap
  if (tags.length > 0) {
    filters["arr_tags"] = `ov.{${tags.join(",")}}`;
  }

  if (source) {
    filters["chr_source_50"] = `eq.${source}`;
  }

  if (dateRange) {
    const now = new Date();
    switch (dateRange) {
      case "today":
        filters["tex_published_at"] = `eq.${now.toISOString().slice(0, 10)}`;
        break;
      case "this-week": {
        const weekAgo = new Date();
        weekAgo.setDate(now.getDate() - 7);
        filters["tex_published_at"] = `gte.${weekAgo.toISOString().slice(0, 10)}`;
        break;
      }
      case "this-month": {
        const monthAgo = new Date();
        monthAgo.setMonth(now.getMonth() - 1);
        filters["tex_published_at"] = `gte.${monthAgo.toISOString().slice(0, 10)}`;
        break;
      }
      case "this-year":
        filters["tex_published_at"] = `gte.${now.getFullYear()}-01-01`;
        break;
    }
  }

  return qs.stringify(filters, { encode: false });
};


const search = async (req, res) => {
  let { query, tags = [], source, dateRange } = req.query;

  // Make sure tags is an array
  if (typeof tags === "string") {
    tags = tags.split(",").map(tag => tag.trim());
  }

  const hasTags = tags.length > 0;
  const hasQuery = !!query;
  const hasFilters = !!source || !!dateRange;

  // ✅ CASE 1 & 2: query missing, but tags or filters are present → Supabase REST GET
if (!hasQuery && (hasTags || hasFilters)) {
  try {
    const filterQuery = buildSupabaseFilterQuery(tags, source, dateRange);
    const supabaseUrl = `https://ndtvmstlibxnauyhhdyg.supabase.co/rest/v1/fact_table?${filterQuery}`;

    const response = await axios.get(supabaseUrl, {
      headers: {
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        "Content-Profile": "fct_schema",
        "Accept-Profile": "fct_schema",
        Accept: "application/json"
      },
    });

    // Preprocess Supabase results to match frontend format
    let results = (response.data || []).map(item => ({
      headline: item.tex_title || "No Title",
      summary: item.tex_description || item.tex_content || "No summary available",
      thumbnail: item.tex_image_url || "/fallback1.jpeg",
      source: item.chr_source_50 || "Unknown Source",
      date: item.tex_published_at || new Date().toISOString(),
      tags: item.arr_tags || [],
      url: item.tex_url || item.tex_unique_id || "",
    }));

    return res.json({ results }); // ✅ YOU MISSED THIS RETURN

  } catch (error) {
    console.error("⚠️ Supabase search failed:", error.response?.data || error.message || error);
    return res.status(500).json({ error: "Supabase search failed" });
  }
}


  // ✅ CASE 3: query present → n8n flow
  try {
    console.log("→ Sending to n8n:", { query, tags, source, dateRange });

    const response = await axios.post(
      N8N_WEBHOOK_URL,
      { query, tags, source, dateRange },
      { headers: { "Content-Type": "application/json" } }
    );

    const rawResults = Array.isArray(response.data) ? response.data : [];

    let results = rawResults.map((item) => ({
      headline: item.title || "No Title",
      summary: item.description || item.pageContent || "No summary available",
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
    if (source) {
      const normalizedSource = source.toLowerCase();
      const knownSources = ["github", "youtube"];
      if (normalizedSource === "website") {
        results = results.filter((article) => {
          const src = (article.source || "").toLowerCase();
          return !knownSources.some((known) => src.includes(known));
        });
      } else {
        results = results.filter((article) =>
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
          case "this-week":
            const weekAgo = new Date(now);
            weekAgo.setDate(now.getDate() - 7);
            return articleDate >= weekAgo;
          case "this-month":
            const monthAgo = new Date(now);
            monthAgo.setMonth(now.getMonth() - 1);
            return articleDate >= monthAgo;
          case "this-year":
            return articleDate.getFullYear() === now.getFullYear();
          default:
            return true;
        }
      });
    }

    return res.json({ results });
  } catch (error) {
    console.error("Error calling n8n webhook:", error.message || error);
    return res.status(500).json({ error: "Failed to fetch search results" });
  }
};

module.exports = { search };
