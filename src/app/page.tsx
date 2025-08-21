"use client";
import CardPost from "@/components/CardPost";
import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
import { Article } from "@/type/type";
import CardSkeleton from "@/components/CardSkeleton";

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [displayCount, setDisplayCount] = useState(9); // Tampilkan 9 artikel pertama
  const [loading, setLoading] = useState(true);
  // const [loadingMore, setLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/news");
        const data = await res.json();
        setArticles(data);
        setFilteredArticles(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setDisplayCount(9); // Reset displayCount saat search

    if (!query) {
      setFilteredArticles(articles);
      return;
    }

    const filtered = articles.filter(
      (a) =>
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredArticles(filtered);
  };

  // const handleLoadMore = async () => {
  //   setLoadingMore(true);
  //   await new Promise((resolve) => setTimeout(resolve, 800)); // simulasi delay
  //   setDisplayCount((prev) => prev + 9);
  //   setLoadingMore(false);
  // };

  const displayedArticles = filteredArticles.slice(0, displayCount);
  // const hasMore = displayCount < filteredArticles.length;

  // console.log("Debug Info:", {
  //   totalArticles: filteredArticles.length,
  //   displayCount,
  //   displayedCount: displayedArticles.length,
  //   hasMore,
  //   searchQuery,
  // });

  return (
    <div className="bg-background from-zinc-800 to-zinc-900 min-h-screen text-white">
      <Navbar onSearch={handleSearch} />
      <div className="container mx-auto">
        <div className="">
          {loading ? (
            // Skeleton saat loading pertama
            <div className="grid sm:grid-cols-2 lg:grid-cols-3  w-full">
              {Array.from({ length: 9 }, (_, index) => (
                <CardSkeleton key={index} />
              ))}
            </div>
          ) : displayedArticles.length > 0 ? (
            // Tampilkan artikel
            <div className="grid sm:grid-cols-2 lg:grid-cols-3  w-full gap-4">
              {displayedArticles.map((article) => (
                <div key={article.id} className="">
                  <CardPost {...article} />
                </div>
              ))}
            </div>
          ) : (
            // Pesan jika tidak ada artikel
            <div className="w-full flex items-center justify-center text-center py-12">
              {searchQuery ? (
                <div className="space-y-2">
                  <p className="text-white/80 text-xl">
                    No articles found for &quot;{searchQuery}&quot;
                  </p>
                  <p className="text-white/60">
                    Try searching with different keywords
                  </p>
                </div>
              ) : (
                <p className="text-white/60 text-lg">No articles available</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
