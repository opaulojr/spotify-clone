'use client';

import Image from 'next/image';

import { Song } from '@/types';
import useLoadImage from '@/hooks/useLoadImage';
import PlayButton from './PlayButton';

type SongCardProps = {
  data: Song;
  onClick: (id: string) => void;
};

function SongCard({ data, onClick }: SongCardProps) {
  const imagePath = useLoadImage(data);

  return (
    <div
      role="button"
      onClick={() => onClick(data.id)}
      onKeyDown={() => {}}
      tabIndex={0}
      className="
      relative
      group
      flex
      flex-col
      items-center
      justify-center
      rounded-md
      overflow-hidden
      gap-x-4
      p-3
      bg-neutral-400/5
      hover:bg-neutral-400/10
      cursor-pointer
      transition
      "
    >
      <div
        className="
        relative
        aspect-square
        w-full
        h-full
        rounded-md
        overflow-hidden
        "
      >
        <Image
          className="object-cover"
          src={imagePath || 'images/liked.png'}
          fill
          alt="Song Image"
        />
      </div>

      <div
        className="
        flex
        flex-col
        items-start
        w-full
        pt-4
        gap-y-1
        "
      >
        <p className="font-semibold truncate w-full">
          {data.title}
        </p>

        <p
          className="
          text-neutral-400
          text-sm
          pb-4
          w-full
          truncate
          "
        >
          By
          {' '}
          {data.author}
        </p>
      </div>

      <div className="absolute bottom-24 right-5">
        <PlayButton />
      </div>
    </div>
  );
}

export default SongCard;
