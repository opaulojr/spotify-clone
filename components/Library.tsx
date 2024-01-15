'use client';

import { TbPlaylist } from 'react-icons/tb';
import { AiOutlinePlus } from 'react-icons/ai';
import toast from 'react-hot-toast';

import useAuthModal from '@/hooks/useAuthModal';
import useUploadModal from '@/hooks/useUploadModal';
import { useUser } from '@/hooks/useUser';
import PlaylistCard from './PlaylistCard';

type LibraryProps = {
  likedSongsLength: number;
  songsSentLength: number;
  onToggleSidebar: () => void;
  sidebarIsOpen: boolean;
};

function Library({
  likedSongsLength, songsSentLength, onToggleSidebar, sidebarIsOpen,
}: LibraryProps) {
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const { user } = useUser();

  const onClick = () => {
    if (!user) {
      toast.error('You need log in');
      return authModal.onOpen();
    }

    // Check for subscription

    return uploadModal.onOpen();
  };

  return (
    <div className="flex flex-col">
      <div
        className="
        flex
        items-center
        justify-between
        px-5
        pt-4
        "
      >
        <div
          role="button"
          onClick={onToggleSidebar}
          onKeyDown={() => {}}
          tabIndex={0}
          className="
          inline-flex
          items-center
          gap-x-2
          "
        >
          <TbPlaylist
            size={sidebarIsOpen ? 26 : 32}
            className="
            text-neutral-400
            hover:text-white
            cursor-pointer
            transition
            "
          />

          {sidebarIsOpen
          && (
          <p
            className="
            text-neutral-400
            font-semibold
            text-md
            hover:text-white
            transition
            cursor-pointer
            "
          >
            Your Library
          </p>
          )}
        </div>

        {sidebarIsOpen && (
          <AiOutlinePlus
            onClick={onClick}
            size={20}
            className="
            text-neutral-400
            cursor-pointer
            hover:text-white
            transition
            "
          />
        )}
      </div>

      <div
        className={`
        flex
        flex-col
        gap-y-2
        ${sidebarIsOpen && 'px-4'}
        mt-4
        `}
      />

      <PlaylistCard
        name="Liked Songs"
        imageUrl="/images/liked.png"
        href="/liked"
        likedSongsLength={likedSongsLength}
      />

      <PlaylistCard
        name="Songs Sent"
        imageUrl="/images/upload.png"
        href="sent"
        songsSentLength={songsSentLength}
      />
    </div>
  );
}

export default Library;
