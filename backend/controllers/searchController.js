const axios = require("axios");
const qs = require("qs");
const { createClient } = require("@supabase/supabase-js");

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// Format JS Date to "28 Jun 2025"
const formatDateForDB = (date) =>
  date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

// Convert '02 Jul 2025' to Date
const parseDateString = (str) => {
  if (!str) return new Date(0);
  const [day, monthStr, year] = str.split(" ");
  const months = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
  };
  return new Date(parseInt(year), months[monthStr], parseInt(day));
};

const buildSupabaseFilterQuery = (tags = [], source, dateRange) => {
  const filters = {};
  if (tags.length > 0) {
    filters["arr_tags"] = `ov.{${tags.map(tag => `"${tag}"`).join(",")}}`;
  }
  if (source) {
    filters["chr_source_50"] = `eq.${source}`;
  }
  if (dateRange) {
    const now = new Date();
    let start, end;
    const getDateRangeArray = (start, end) => {
      const dates = [];
      const current = new Date(start);
      while (current <= end) {
        dates.push(formatDateForDB(new Date(current)));
        current.setDate(current.getDate() + 1);
      }
      return dates;
    };
    switch (dateRange) {
      case "today":
        start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        end = new Date(start); end.setHours(23, 59, 59, 999); break;
      case "yesterday":
        start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
        end = new Date(start); end.setHours(23, 59, 59, 999); break;
      case "this-week":
        end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
        start = new Date(end); start.setDate(end.getDate() - 7); break;
      case "this-month":
        start = new Date(now.getFullYear(), now.getMonth(), 1);
        end = new Date(now.getFullYear(), now.getMonth() + 1, 0); break;
      case "this-year":
        start = new Date(now.getFullYear(), 0, 1);
        end = new Date(now.getFullYear(), 11, 31); break;
      default:
        filters["tex_published_at"] = `eq.${dateRange}`;
        return qs.stringify(filters, { encode: false });
    }
    const dateList = getDateRangeArray(start, end);
    filters["or"] = `(${dateList.map(d => `tex_published_at.eq.${d}`).join(",")})`;
  }
  return qs.stringify(filters, { encode: false });
};

const search = async (req, res) => {
  let { query, tags = [], source, dateRange, limit = 20, page = 1 } = req.query;

  limit = parseInt(limit);
  page = parseInt(page);
  const offset = (page - 1) * limit;

  if (typeof tags === "string") {
    tags = tags.split(",").map(tag => tag.trim());
  }

  const hasTags = tags.length > 0;
  const hasQuery = !!query;
  const hasFilters = !!source || !!dateRange;

  // CASE 0: Default latest with optional filters
  if (!hasQuery && !hasTags) {
    try {
      const filterQuery = buildSupabaseFilterQuery([], source, dateRange);
      const supabaseUrl = `https://ndtvmstlibxnauyhhdyg.supabase.co/rest/v1/fact?${filterQuery}&select=*&order=dat_published_at.desc.nullslast&limit=${limit}&offset=${offset}`;

      const response = await axios.get(supabaseUrl, {
        headers: {
          apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
          "Content-Profile": "fct_schema",
          "Accept-Profile": "fct_schema",
          Accept: "application/json",
        },
      });

      const paginatedResults = (response.data || []).map((item) => ({
        headline: item.tex_title || "Latest AI news",
        summary: item.tex_description || item.tex_content || "No summary available",
        thumbnail: item.tex_image_url || "/fallback1.jpeg",
        source: (() => {
          try {
            const domain = new URL(item.tex_url).hostname;
            return domain.replace("www.", "");
          } catch {
            return "Unknown Source";
          }
        })(),
        date: item.tex_published_at || new Date().toISOString(),
        tags: item.arr_tags || ["AI"],
        url: item.tex_url || item.tex_unique_id || "",
      }));

      return res.json({
        results: paginatedResults,
        pagination: { page, limit, offset, hasMore: paginatedResults.length === limit },
      });
    } catch (error) {
      console.error("⚠️ Default fetch failed:", error.message || error);
      return res.status(500).json({ error: "Failed to fetch latest news" });
    }
  }

  // CASE 1 & 2: Supabase filter (tags/source/date)
  if (!hasQuery && (hasTags || hasFilters)) {
    try {
      const filterQuery = buildSupabaseFilterQuery(tags, source, dateRange);
      const supabaseUrl = `https://ndtvmstlibxnauyhhdyg.supabase.co/rest/v1/fact?${filterQuery}&select=*&order=dat_published_at.desc.nullslast&limit=${limit}&offset=${offset}`;

      const response = await axios.get(supabaseUrl, {
        headers: {
          apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
          "Content-Profile": "fct_schema",
          "Accept-Profile": "fct_schema",
          Accept: "application/json",
        },
      });

      const paginatedResults = (response.data || []).map((item) => ({
        headline: item.tex_title || "Latest AI news",
        summary: item.tex_description || item.tex_content || "No summary available",
        thumbnail: item.tex_image_url || "/fallback1.jpeg",
        source: (() => {
          try {
            const domain = new URL(item.tex_url).hostname;
            return domain.replace("www.", "");
          } catch {
            return "Unknown Source";
          }
        })(),
        date: item.tex_published_at || new Date().toISOString(),
        tags: item.arr_tags || ["AI"],
        url: item.tex_url || item.tex_unique_id || "",
      }));

      return res.json({
        results: paginatedResults,
        pagination: { page, limit, offset, hasMore: paginatedResults.length === limit },
      });
    } catch (error) {
      console.error("Supabase search failed:", error.message || error);
      return res.status(500).json({ error: "Supabase search failed" });
    }
  }

  //  CASE 3: Full-text search (n8n)
  if (hasQuery) {
    try {
      const modifiedQuery = hasTags ? `${query} ${tags.join(" ")}` : query;

      const response = await axios.post(
        N8N_WEBHOOK_URL,
        { query: modifiedQuery, tags, source, dateRange, limit, offset },
        { headers: { "Content-Type": "application/json" } }
      );

      let results = (Array.isArray(response.data) ? response.data : []).map((item) => ({
        headline: item.title || "Latest AI news",
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
        date: item.date || "",  // fallback for sorting
        tags: item.tags || ["ai"],
        url: item.id || "",
      }));

      // Sort descending by date
      results = results.sort((a, b) => parseDateString(b.date) - parseDateString(a.date));

      // Post-filter by source
      if (source) {
        const knownSources = ["github", "youtube"];
        const normalized = source.toLowerCase();
        results = results.filter((article) => {
          const src = (article.source || "").toLowerCase();
          return normalized === "website"
            ? !knownSources.some((k) => src.includes(k))
            : src.includes(normalized);
        });
      }

      // Post-filter by dateRange
      if (dateRange) {
        const now = new Date();
        let start, end;

        switch (dateRange) {
          case "today":
            start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            end = new Date(start); end.setHours(23, 59, 59, 999); break;
          case "yesterday":
            start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
            end = new Date(start); end.setHours(23, 59, 59, 999); break;
          case "this-week":
            end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
            start = new Date(end); start.setDate(end.getDate() - 7); break;
          case "this-month":
            start = new Date(now.getFullYear(), now.getMonth(), 1);
            end = new Date(now.getFullYear(), now.getMonth() + 1, 0); break;
          case "this-year":
            start = new Date(now.getFullYear(), 0, 1);
            end = new Date(now.getFullYear(), 11, 31); break;
          default:
            start = end = parseDateString(dateRange);
            break;
        }

        results = results.filter((article) => {
          const articleDate = parseDateString(article.date);
          return articleDate >= start && articleDate <= end;
        });
      }

      return res.json({
        results,
        pagination: { page, limit, offset, hasMore: results.length === limit },
      });
    } catch (error) {
      console.error("Error calling n8n webhook:", error.message || error);
      return res.status(500).json({ error: "Failed to fetch search results" });
    }
  }
};

module.exports = { search };





