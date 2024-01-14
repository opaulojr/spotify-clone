'use client';

import Image from 'next/image';

import { Song } from '@/types';
import useLoadImage from '@/hooks/useLoadImage';

type SearchSongCardProps = {
  song: Song;
};

function SearchSongCard({ song }: SearchSongCardProps) {
  const imageUrl = useLoadImage(song);

  return (
    <div
      onClick={() => {}}
      onKeyDown={() => {}}
      tabIndex={0}
      role="button"
      className="
      flex
      items-center
      gap-x-3
      w-full
      p-2
      rounded-md
      cursor-pointer
      hover:bg-neutral-800/50
      "
    >
      <div
        className="
        relative
        rounded-md
        min-w-[48px]
        min-h-[48px]
        overflow-hidden
        "
      >
        <Image
          className="object-cover"
          width={48}
          height={48}
          src={imageUrl || 'images/liked.png'}
          alt="Cover Song Image"
        />
      </div>

      <div
        className="
        flex
        flex-col
        gap-y-1
        overflow-hidden
        "
      >
        <p className="text-white truncate">
          {song.title}
        </p>

        <p className="text-neutral-400 text-sm truncate">
          {song.author}
        </p>
      </div>
    </div>
  );
}

export default SearchSongCard;
