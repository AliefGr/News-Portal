import React from "react";
import InfoPost from "./InfoPost";
import Image from "next/image";
import { Article } from "@/type/type";

type PropsCardPost = Article;

const CardPost = ({ imageUrl, ...article }: PropsCardPost) => {
  return (
    <div className="bg-card rounded-b-lg shadow shadow-white/10 ">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={article.title}
          width={400} // lebar tetap
          height={225}
          className=" rounded-t-lg"
          priority={true}
        />
      ) : (
        <div className="w-full h-50 flex items-center justify-center bg-zinc-700 text-white/70 text-sm italic rounded-t-lg">
          No media available
        </div>
      )}
      <InfoPost article={article} />
    </div>
  );
};

export default CardPost;
