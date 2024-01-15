import toast from 'react-hot-toast';

import { Song } from '@/types';
import usePlayer from './usePlayer';
import useAuthModal from './useAuthModal';
import { useUser } from './useUser';

const useOnPlay = (songs: Song[]) => {
  const player = usePlayer();
  const authModal = useAuthModal();
  const { user } = useUser();

  const onPlay = (id: string) => {
    if (!user) {
      toast.error('You need log in');
      return authModal.onOpen();
    }

    player.setId(id);
    player.setIds(songs.map((song) => song.id));

    return () => null;
  };

  return onPlay;
};

export default useOnPlay;
