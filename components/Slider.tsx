'use client';

import * as RadixSlider from '@radix-ui/react-slider';

type SliderProps = {
  value?: number;
  onChange?: (value: number) => void;
};

function Slider({ value = 1, onChange }: SliderProps) {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  };

  return (
    <RadixSlider.Root
      defaultValue={[1]}
      value={[value]}
      onValueChange={handleChange}
      max={1}
      step={0.1}
      aria-label="volume"
      className="
      relative
      flex
      items-center
      select-none
      touch-none
      w-full
      h-10
      "
    >
      <RadixSlider.Track
        className="
        bg-neutral-600
        relative
        grow
        rounded-full
        h-1
        "
      >
        <RadixSlider.Range
          className="
          absolute
          bg-white
          rounded-full
          h-full
          "
        />
      </RadixSlider.Track>
    </RadixSlider.Root>
  );
}

export default Slider;
