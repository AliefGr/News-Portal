// lib/fetchNews.ts
import { Article } from '@/type/type';

export default async function fetchNews(): Promise<Article[]> {
  try {
    const [newsapiRes, gnewsRes, guardianRes, nytRes] = await Promise.all([
      fetch(`https://newsapi.org/v2/everything?q=AI&apiKey=${process.env.NEWS_API_KEY}`),
      fetch(`https://gnews.io/api/v4/search?q=AI&token=${process.env.GNEWS_API_KEY}`),
      fetch(`https://content.guardianapis.com/search?q=AI&api-key=${process.env.GUARDIAN_API_KEY}&show-fields=thumbnail,trailText`),
      fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=AI&api-key=${process.env.NYT_API_KEY}`)
    ]);

    const newsapiData = await newsapiRes.json();
    const gnewsData = await gnewsRes.json();
    const guardianData = await guardianRes.json();
    const nytData = await nytRes.json();

    // NewsAPI
    const newsapiArticles: Article[] = (newsapiData.articles?.slice(0, 3) || []).map((a: any, idx: number) => ({
      id: `newsapi-${idx}`,
      title: a.title,
      description: a.description,
      imageUrl: a.urlToImage || '',
      publishedAt: a.publishedAt,
      source: 'NewsAPI',
      url: a.url,
      author: a.author,
    }));

    // Guardian
    const guardianArticles: Article[] = (guardianData.response?.results?.slice(0, 3) || []).map((a: any, idx: number) => ({
      id: `guardian-${idx}`,
      title: a.webTitle,
      description: a.fields?.trailText || '',
      imageUrl: a.fields?.thumbnail || '',
      publishedAt: a.webPublicationDate,
      source: 'Guardian',
      url: a.webUrl,
    }));

    // NYTimes
    const nytArticles: Article[] = (nytData.response?.docs?.slice(0, 3) || []).map((a: any, idx: number) => ({
      id: `nyt-${idx}`,
      title: a.headline?.main || '',
      description: a.abstract || '',
      imageUrl: a.multimedia?.[0]?.url ? `https://www.nytimes.com/${a.multimedia[0].url}` : '',
      publishedAt: a.pub_date,
      source: 'NYTimes',
      url: a.web_url,
      author: a.byline?.original || '',
    }));

    return [...newsapiArticles, ...guardianArticles, ...nytArticles];

  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}
