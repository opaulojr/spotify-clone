'use client';

import { Song } from '@/types';
import useOnPlay from '@/hooks/useOnPlay';
import LikeButton from '@/components/LikeButton';
import AltSongCard from '@/components/AltSongCard';

type SearchContentProps = {
  songs: Song[];
};

function SearchContent({ songs }: SearchContentProps) {
  const onPlay = useOnPlay(songs);

  if (songs.length === 0) {
    return (
      <div
        className="
        flex
        flex-col
        gap-y-2
        w-full
        px-6
        text-neutral-400
        "
      >
        No songs found
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-2 w-full px-6">
      {songs.map((song) => (
        <div
          key={song.id}
          className="flex items-center gap-x-4 w-full"
        >
          <div className="flex-1 w-full">
            <AltSongCard
              song={song}
              onClick={(id: string) => onPlay(id)}
            />
          </div>

          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  );
}

export default SearchContent;
