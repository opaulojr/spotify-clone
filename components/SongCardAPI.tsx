'use client';

import Image from 'next/image';

import { SongAPI } from '@/types';
import PlayButton from './PlayButton';

type SongCardProps = {
  data: SongAPI;
  onClick: (id: string) => void;
};

function SongCardAPI({ data, onClick }: SongCardProps) {
  return (
    <div
      role="button"
      onClick={() => onClick}
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
        max-w-[100px]
        max-h-[100px]
        rounded-md
        overflow-hidden
        "
      >
        <Image
          className="object-cover"
          src={data.artworkUrl100}
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
          {data.trackName}
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
          {data.artistName}
        </p>
      </div>

      <div className="absolute bottom-22 right-5">
        <PlayButton />
      </div>
    </div>
  );
}

export default SongCardAPI;
