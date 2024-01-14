'use client';

import { Song } from '@/types';
import SearchSongCard from '@/components/SearchSongCard';

type SearchContentProps = {
  songs: Song[];
};

function SearchContent({ songs }: SearchContentProps) {
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
            <SearchSongCard song={song} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default SearchContent;
