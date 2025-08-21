import React from 'react'
import { Article } from '@/type/type'
import Link from 'next/link'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Badge } from './ui/badge'

type Props = { article: Article }

const InfoPost: React.FC<Props> = ({ article }) => {
  if (!article) return null;

  return (
    <div className='p-3 rounded-b-lg '>
      <div className='mt-2'>
        <Link href={`/news/${article.id}`} className='cursor-pointer hover:underline decoration-1 decoration-blue-500'>
          <h1 className='text-3xl font-bold text-gradient line-clamp-2 '>
            {article.title}
          </h1>
        </Link>
      <div className='flex items-center space-x-2 text-white/70 text-sm mt-2'>
        {/* <div>{article.source}</div>
        <span>&bull;</span> */}
        <div>{new Date(article.publishedAt).toLocaleString()}</div>
      </div>
        <p className='text-muted mt-3 text-sm line-clamp-3 leading-relaxed'>
          {article.description}
        </p>
        <div className='flex gap-3 mt-3'>
          <Badge className='bg-gray-900 text-xs text-white/60 truncate'>
            Author: {article.author}
          </Badge>
          <Badge className='bg-gray-900 text-xs  text-white/60 truncate'>
            Source: {article.source}
          </Badge>
        </div>
      </div>
    </div>
  )
}

export default InfoPost
