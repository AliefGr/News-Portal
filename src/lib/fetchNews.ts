// lib/fetchNews.ts
import { Article } from "@/type/type";

// Tipe untuk NewsAPI
interface NewsAPIArticle {
  title: string;
  description: string;
  urlToImage?: string;
  publishedAt: string;
  url: string;
  author?: string;
}

// Tipe untuk Guardian API
interface GuardianArticle {
  webTitle: string;
  webPublicationDate: string;
  webUrl: string;
  fields?: {
    trailText?: string;
    thumbnail?: string;
  };
}

// Tipe untuk NYTimes API
interface NYTArticle {
  headline?: { main: string };
  abstract?: string;
  multimedia?: { url: string }[];
  pub_date: string;
  web_url: string;
  byline?: { original?: string };
}

export default async function fetchNews(): Promise<Article[]> {
  try {
    // Fetch dari 4 API
    const [newsapiRes, guardianRes, nytRes] = await Promise.all([
      fetch(
        `https://newsapi.org/v2/everything?q=AI&apiKey=${process.env.NEWS_API_KEY}`
      ),
      fetch(
        `https://gnews.io/api/v4/search?q=AI&token=${process.env.GNEWS_API_KEY}`
      ),
      fetch(
        `https://content.guardianapis.com/search?q=AI&api-key=${process.env.GUARDIAN_API_KEY}&show-fields=thumbnail,trailText`
      ),
      fetch(
        `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=AI&api-key=${process.env.NYT_API_KEY}`
      ),
    ]);

    const newsapiData = await newsapiRes.json();
    const guardianData = await guardianRes.json();
    const nytData = await nytRes.json();

    // NewsAPI
    const newsapiArticles: Article[] = (
      newsapiData.articles?.slice(0, 3) || []
    ).map((a: NewsAPIArticle, idx: number) => ({
      id: `newsapi-${idx}`,
      title: a.title,
      description: a.description,
      imageUrl: a.urlToImage || "",
      publishedAt: a.publishedAt,
      source: "NewsAPI",
      url: a.url,
      author: a.author || "",
    }));

    // Guardian
    const guardianArticles: Article[] = (
      guardianData.response?.results?.slice(0, 3) || []
    ).map((a: GuardianArticle, idx: number) => ({
      id: `guardian-${idx}`,
      title: a.webTitle,
      description: a.fields?.trailText || "",
      imageUrl: a.fields?.thumbnail || "",
      publishedAt: a.webPublicationDate,
      source: "Guardian",
      url: a.webUrl,
      author: "",
    }));

    // NYTimes
    const nytArticles: Article[] = (
      nytData.response?.docs?.slice(0, 3) || []
    ).map((a: NYTArticle, idx: number) => ({
      id: `nyt-${idx}`,
      title: a.headline?.main || "",
      description: a.abstract || "",
      imageUrl: a.multimedia?.[0]?.url
        ? `https://www.nytimes.com/${a.multimedia[0].url}`
        : "",
      publishedAt: a.pub_date,
      source: "NYTimes",
      url: a.web_url,
      author: a.byline?.original || "",
    }));

    // Gabungkan semua artikel
    return [...newsapiArticles, ...guardianArticles, ...nytArticles];
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}
