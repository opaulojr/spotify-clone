'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

import { Song } from '@/types';
import { useUser } from '@/hooks/useUser';
import useAuthModal from '@/hooks/useAuthModal';
import useOnPlay from '@/hooks/useOnPlay';
import AltSongCard from '@/components/AltSongCard';
import LikeButton from '@/components/LikeButton';

type LikedContentProps = {
  songs: Song[];
};

function LikedContent({ songs }: LikedContentProps) {
  const router = useRouter();
  const { isLoading, user } = useUser();
  const authModal = useAuthModal();
  const onPlay = useOnPlay(songs);

  useEffect(() => {
    if (!isLoading && !user) {
      const timeout = setTimeout(() => {
        router.replace('/');
        toast.error('You need log in');
        authModal.onOpen();
      }, 200);

      return () => clearTimeout(timeout);
    }
    return () => null;
  }, [isLoading, user, router]);

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
        No liked songs
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-2 w-full p-6">
      {songs.map((song) => (
        <div
          key={song.id}
          className="flex items-center gap-x-4 w-full"
        >
          <div className="flex-1">
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

export default LikedContent;
