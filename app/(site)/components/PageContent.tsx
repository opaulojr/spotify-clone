'use client';

import { Song } from '@/types';
import useOnPlay from '@/hooks/useOnPlay';
import SongCard from '@/components/SongCard';

type PageContentProps = {
  songs: Song[];
};

function PageContent({ songs }: PageContentProps) {
  const onPlay = useOnPlay(songs);

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
          onClick={onPlay}
          data={song}
        />
      ))}
    </div>
  );
}

export default PageContent;
