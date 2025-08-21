import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import React from "react";
import { SkeletonTheme } from "react-loading-skeleton";

const CardSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#374151" highlightColor="#4b5563">
      <div className="px-4 py-1">
        <div className="bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-colors duration-200">
          {/* Image skeleton dengan aspect ratio */}
          <div className="relative">
            <Skeleton height={250} className="w-full" />
          </div>
          {/* Content skeleton */}
          <div className="p-4 space-y-2">
            {/* Title skeleton - 2 lines */}
            <div className="space-y-2">
              <Skeleton height={20} />
              <Skeleton height={20} width="80%" />
            </div>
            {/* Source and date skeleton */}
            <div className="flex items-center space-x-2">
              {/* <Skeleton width={70} height={12} />
              <span className="text-white/30">&bull;</span> */}
              <Skeleton width={90} height={12} />
            </div>
            {/* Description skeleton - 3 lines */}
            <div className="space-y-1">
              <Skeleton height={14} />
              <Skeleton height={14} />
              <Skeleton height={14} width="60%" />
            </div>

            {/* Badge */}
            <div className="flex gap-3">
              <Skeleton height={14} width={80} />
              <Skeleton height={14} width={100} />
            </div>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default CardSkeleton;
