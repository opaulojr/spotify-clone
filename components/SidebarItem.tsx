'use client';

import Link from 'next/link';
import { IconType } from 'react-icons';
import { twMerge } from 'tailwind-merge';

type SidebarItemProps = {
  icon: IconType;
  label: string;
  active?: boolean;
  href: string;
  sidebarIsOpen: boolean;
};

function SidebarItem({
  icon: Icon, label, active = false, href, sidebarIsOpen,
}: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={twMerge(`
      flex
      flex-row
      h-[40px]
      items-center
      justify-center
      ${sidebarIsOpen ? 'w-full' : 'w-[40px]'}
      gap-x-4
      text-md
      font-semibold
      cursor-pointer
      hover:text-white
      transition
      text-neutral-400
      `, active && 'text-white')}
    >
      <Icon size={sidebarIsOpen ? 26 : 32} />
      {sidebarIsOpen && (
      <p className="truncate w-full">
        {label}
      </p>
      )}
    </Link>
  );
}

export default SidebarItem;
