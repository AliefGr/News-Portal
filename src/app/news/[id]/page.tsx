import React from "react";
import fetchNews from "@/lib/fetchNews";
import { Article } from "@/type/type";
import Link from "next/link";
import { HiArrowNarrowLeft } from "react-icons/hi";
import Image from "next/image";
import { notFound } from "next/navigation";

type PageProps = {
  params: { id: string };
};

const NewsDetailPage = async ({ params }: PageProps) => {
  const articles: Article[] = await fetchNews();
  const article = articles.find((a) => a.id === params.id);

  if (!article) return notFound(); // Gunakan next/navigation untuk 404

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link href="/" className="flex items-center gap-2 mb-4">
        <HiArrowNarrowLeft className="text-xl text-white/80" />
        <p className="text-white/80">Kembali</p>
      </Link>

      {article.imageUrl && (
        <Image
          src={article.imageUrl}
          alt={article.title}
          width={600}
          height={400}
          className="w-full h-auto mb-4 rounded-lg"
        />
      )}

      <h1 className="text-4xl font-bold mb-4 text-gradient">{article.title}</h1>
      <p className="text-sm text-gray-500 mb-4">
        {article.source} &bull; {new Date(article.publishedAt).toLocaleString()}
      </p>
      <p className="text-lg leading-relaxed">{article.description}</p>
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline mt-4 block"
      >
        Baca di sumber asli
      </a>
    </div>
  );
};

export default NewsDetailPage;
