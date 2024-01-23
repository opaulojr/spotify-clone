'use client';

import { SongAPI } from '@/types';
import SongCardAPI from '@/components/SongCardAPI';

type PageContentProps = {
  songsAPI: SongAPI[];
};

function PageContentAPI({ songsAPI }: PageContentProps) {
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
      {songsAPI.map((song) => (
        <SongCardAPI
          key={song.trackId}
          onClick={() => {}}
          data={song}
        />
      ))}
    </div>
  );
}

export default PageContentAPI;
