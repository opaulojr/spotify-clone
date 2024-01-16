import React from 'react';

type SongTimestampProps = {
  currentTime: number;
  duration: number;
};

function SongTimestamp({ currentTime, duration }: SongTimestampProps) {
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const progressBar = (currentTime / duration) * 100;

  return (
    <div
      className="
      flex
      items-center
      justify-center
      w-full
      "
    >
      <p className="text-neutral-400 text-sm w-[40px] text-right">
        {formatTime(currentTime)}
      </p>

      <div className="flex-1 mx-2">
        <div className="h-1 bg-neutral-600 rounded-full">
          <div
            className="h-full bg-white rounded-full"
            style={{ width: `${progressBar}%` }}
          />
        </div>
      </div>

      <p className="text-neutral-400 text-sm w-[40px] text-left">
        {formatTime(duration)}
      </p>
    </div>
  );
}

export default SongTimestamp;
