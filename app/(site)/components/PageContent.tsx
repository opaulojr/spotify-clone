'use client';

import { Song } from '@/types';
import SongCard from '@/components/SongCard';

type PageContentProps = {
  songs: Song[];
};

function PageContent({ songs }: PageContentProps) {
  return (
    <div
      className="
      grid
      grid-cols-2
      sm:grid-cols-3
      md:grid-cols-3
      lg:grid-cols-4
      xl:grid-cols-5
      2xl:grid-cols-8
      gap-4
      mt-4
      "
    >
      {songs.map((song) => (
        <SongCard
          key={song.id}
          onClick={() => {}}
          data={song}
        />
      ))}
    </div>
  );
}

export default PageContent;
