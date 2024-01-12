'use client';

import { twMerge } from 'tailwind-merge';

type SidebarBoxProps = {
  children: React.ReactNode;
  className?: string;
};

function SidebarBox({ children, className = '' }: SidebarBoxProps) {
  return (
    <div
      className={twMerge(`
      bg-neutral-900
      rounded-lg
      w-full
      h-fit
      items-center
      `, className)}
    >
      {children}
    </div>
  );
}

export default SidebarBox;
