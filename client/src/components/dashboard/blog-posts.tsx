import { useState, useEffect } from "react";
import { Eye } from "lucide-react";
import moment from "moment";

interface TopBlogPostsProps {
  title: string;
  coverImageUrl: string;
  views: number;
  createdAt: string;
}

function TopBlogPosts({ title, coverImageUrl, views, createdAt }: TopBlogPostsProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Reset state when image URL changes
  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
  }, [coverImageUrl]);

  const showImage = !!coverImageUrl && !hasError;

  return (
    <div className="flex items-center gap-2">
      <span className="w-3/12 h-[60px] lg:h-[70px] rounded-md overflow-hidden">
        {!showImage || !isLoaded ? (
          <div className="w-full h-full bg-neutral-200/50 dark:bg-neutral-800/50 animate-pulse rounded-md" />
        ) : null}

        {showImage && (
          <img
            src={coverImageUrl}
            alt="cover-img"
            className={`w-full h-full object-cover rounded-md transition-opacity duration-300 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
          />
        )}
      </span>

      <span className="w-9/12 h-[60px] lg:h-[70px] flex flex-col justify-between py-1">
        <p className="font-poppins text-xs lg:text-sm font-medium text-[#111] dark:text-neutral-200 text-start line-clamp-2">
          {title}
        </p>
        <span className="flex items-center justify-between text-xs font-inter text-neutral-500">
            <p>
              {moment(createdAt).subtract(10, 'days').calendar()}
            </p>
            <p className="flex items-center gap-1">
          <Eye className="size-3.5" />
          {views}
        </p>
        </span>
      </span>
    </div>
  );
}

export default TopBlogPosts;
