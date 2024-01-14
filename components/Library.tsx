'use client';

import { TbPlaylist } from 'react-icons/tb';
import { AiOutlinePlus } from 'react-icons/ai';
import toast from 'react-hot-toast';

import useAuthModal from '@/hooks/useAuthModal';
import useUploadModal from '@/hooks/useUploadModal';
import { useUser } from '@/hooks/useUser';

function Library() {
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
          className="
          inline-flex
          items-center
          gap-x-2
          "
        >
          <TbPlaylist
            size={26}
            className="
            text-neutral-400
            hover:text-white
            cursor-pointer
            transition
            "
          />

          <p
            className="
            text-neutral-400
            hover:text-white
            font-semibold
            text-md
            cursor-pointer
            transition
            "
          >
            Your Library
          </p>
        </div>

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
      </div>

      <div
        className="
        flex
        flex-col
        gap-y-2
        mt-4
        px-4
        "
      >
        List of Songs!
      </div>
    </div>
  );
}

export default Library;
