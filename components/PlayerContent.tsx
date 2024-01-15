'use client';

import { BsPauseFill, BsPlayFill } from 'react-icons/bs';
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai';
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2';
import { useEffect, useState } from 'react';

// @ts-ignore
import useSound from 'use-sound';

import { Song } from '@/types';
import usePlayer from '@/hooks/usePlayer';
import LikeButton from './LikeButton';
import Slider from './Slider';
import AltSongCard from './AltSongCard';

type PlayerContentProps = {
  song: Song;
  songUrl: string;
};

function PlayerContent({ song, songUrl }: PlayerContentProps) {
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIndex + 1];

    if (!nextSong) {
      player.setId(player.ids[0]);
      return;
    }

    player.setId(nextSong);
  };

  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const previousSong = player.ids[currentIndex - 1];

    if (!previousSong) {
      player.setId(player.ids[player.ids.length - 1]);
      return;
    }

    player.setId(previousSong);
  };

  const [play, { pause, sound }] = useSound(
    songUrl,
    {
      volume,
      onplay: () => setIsPlaying(true),
      onend: () => {
        setIsPlaying(false);
        onPlayNext();
      },
      onpause: () => setIsPlaying(false),
      format: ['mp3'],
    },
  );

  useEffect(() => {
    sound?.play();

    return () => {
      sound?.unload();
    };
  }, [sound]);

  const handlePlay = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };

  return (
    <div
      className="
      grid
      grid-cols-2
      md:grid-cols-3
      h-full
      "
    >
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <AltSongCard song={song} sidebarIsOpen />
          <LikeButton songId={song.id} />
        </div>
      </div>
      <div
        className="
        flex
        md:hidden
        col-auto
        w-full
        justify-end
        items-center
        "
      >
        <div
          role="button"
          onClick={handlePlay}
          onKeyDown={() => {}}
          aria-label="Play"
          tabIndex={0}
          className="
          w-10
          h-10
          flex
          items-center
          justify-center
          rounded-full
          bg-white
          p-1
          cursor-pointer
          "
        >
          <Icon className="text-black" size={30} />
        </div>
      </div>

      <div
        className="
        hidden
        md:flex
        justify-center
        items-center
        w-full
        h-full
        max-w-[722px]
        gap-x-6
        "
      >
        <AiFillStepBackward
          onClick={onPlayPrevious}
          className="
          text-neutral-400
          cursor-pointer
          hover:text-white
          transition
          "
          size={30}
        />
        <div
          role="button"
          onClick={handlePlay}
          onKeyDown={() => {}}
          aria-label="Play"
          tabIndex={0}
          className="
          flex
          items-center
          justify-center
          w-10
          h-10
          rounded-full
          bg-white
          p-1
          cursor-pointer
          "
        >
          <Icon className="text-black" size={30} />
        </div>
        <AiFillStepForward
          onClick={onPlayNext}
          className="
          text-neutral-400
          cursor-pointer
          hover:text-white
          transition
          "
          size={30}
        />
      </div>

      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon
            onClick={toggleMute}
            className="cursor-pointer"
            size={34}
          />
          <Slider
            value={volume}
            onChange={(value) => setVolume(value)}
          />
        </div>
      </div>
    </div>
  );
}

export default PlayerContent;
