'use client';

import Image from 'next/image';
import Link from 'next/link';

type PlaylistCardProps = {
  name: string;
  imageUrl: string;
  href: string;
  likedSongsLength?: number;
  songsSentLength?: number;
  sidebarIsOpen?: boolean;
};

function PlaylistCard({
  name, imageUrl, href, likedSongsLength, songsSentLength, sidebarIsOpen = true,
}: PlaylistCardProps) {
  return (
    <Link
      href={href}
      onClick={() => {}}
      className="
      flex
      items-center
      gap-x-3
      w-full
      p-2
      rounded-md
      cursor-pointer
      hover:bg-neutral-800/50
      "
    >
      <div
        className="
        relative
        rounded-md
        min-w-[48px]
        min-h-[48px]
        overflow-hidden
        "
      >
        <Image
          className="object-cover"
          width={48}
          height={48}
          src={imageUrl}
          alt="Playlist Image"
        />
      </div>

      {sidebarIsOpen && (
        <div
          className="
          flex
          flex-col
          gap-y-1
          overflow-hidden
          "
        >
          <p className="text-white truncate">
            {name}
          </p>

          {likedSongsLength && likedSongsLength >= 1 ? (
            <p className="text-neutral-400 text-sm truncate">
              {`${likedSongsLength} song${likedSongsLength > 1 ? 's' : ''}`}
            </p>
          ) : null}
          {songsSentLength && songsSentLength >= 1 ? (
            <p className="text-neutral-400 text-sm truncate">
              {`${songsSentLength} song${songsSentLength > 1 ? 's' : ''}`}
            </p>
          ) : null}
        </div>
      )}
    </Link>
  );
}

export default PlaylistCard;
