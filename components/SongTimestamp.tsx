import { useState } from 'react';

type SongTimestampProps = {
  currentTime: number;
  duration: number;
  onSeek: (newTime: number) => void;
};

function SongTimestamp({
  currentTime, duration, onSeek,
}: SongTimestampProps) {
  const [hovered, setHovered] = useState(false);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleProgressBarClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = event.currentTarget;
    const clickPosition = event.clientX - progressBar.getBoundingClientRect().left;
    const progressBarWidth = progressBar.clientWidth;
    const clickPercentage = clickPosition / progressBarWidth;
    const newTime = clickPercentage * duration;

    onSeek(newTime);
  };

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

      <div
        id="mestre"
        role="button"
        onClick={handleProgressBarClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onKeyDown={() => {}}
        aria-label="Song timestamp"
        tabIndex={0}
        className="flex flex-1 items-center justify-center h-3 mx-3 cursor-default"
      >
        <div className="h-1 bg-neutral-600 w-full rounded-full">
          <div
            className={`
            flex
            items-center
            justify-center
            h-full
            rounded-full
            ${hovered ? 'bg-green-500' : 'bg-white'}
            relative
            `}
            style={{ width: `${(currentTime / duration) * 100}%` }}
          >
            {hovered && (
              <div
                className="absolute h-3 w-3 bg-white rounded-full"
                style={{ left: 'calc(100% - 2px)' }}
              />
            )}
          </div>
        </div>
      </div>

      <p className="text-neutral-400 text-sm w-[40px] text-left">
        {formatTime(duration)}
      </p>
    </div>
  );
}

export default SongTimestamp;
