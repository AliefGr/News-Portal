// app/news/[id]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { HiArrowNarrowLeft } from "react-icons/hi";
import fetchNews from "@/lib/fetchNews";
import { Article } from "@/type/type";

type PageProps = {
  params: Promise<{ id: string }>; // note: params adalah Promise
};

export default async function NewsDetailPage({ params }: PageProps) {
  const { id } = await params; // ✅ await sebelum deconstruct

  // Ambil semua artikel
  const articles: Article[] = await fetchNews();
  const article = articles.find((a) => a.id === id);

  if (!article) return notFound();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link href="/" className="flex items-center gap-2 mb-4">
        <HiArrowNarrowLeft className="text-xl text-white/80" />
        <p className="text-white/80">Kembali</p>
      </Link>

      {article.imageUrl ? (
        <div className="relative w-full h-64 sm:h-80 md:h-96 mb-4 rounded-lg overflow-hidden">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      ) : (
        <div className="w-full h-64 sm:h-80 md:h-96 mb-4 flex items-center justify-center bg-zinc-700 text-white/70 italic rounded-lg">
          Tidak ada media
        </div>
      )}

      <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gradient">
        {article.title}
      </h1>
      <p className="text-sm text-gray-500 mb-4">
        {article.source || "Sumber tidak diketahui"} &bull;{" "}
        {article.publishedAt
          ? new Date(article.publishedAt).toLocaleString()
          : "Tanggal tidak tersedia"}
      </p>
      <p className="text-lg leading-relaxed mb-4">
        {article.description || (
          <span className="italic text-gray-400">
            Deskripsi berita tidak tersedia.
          </span>
        )}
      </p>
      {article.url && (
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline hover:text-blue-400 transition-colors"
        >
          Baca di sumber asli
        </a>
      )}
    </div>
  );
}
