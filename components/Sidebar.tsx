'use client';

import { usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';

import usePlayer from '@/hooks/usePlayer';
import SidebarBox from './SidebarBox';
import SidebarItem from './SidebarItem';
import Library from './Library';

type SidebarProps = {
  likedSongsLength: number;
  songsSentLength: number;
  children: React.ReactNode;
};

function Sidebar({ children, likedSongsLength, songsSentLength }: SidebarProps) {
  const pathname = usePathname();
  const [sidebarIsOpen, setSidebarIsOpen] = useState(true);
  const player = usePlayer();

  const toggleSidebar = () => setSidebarIsOpen(!sidebarIsOpen);

  const routes = useMemo(() => [
    {
      icon: HiHome,
      label: 'Home',
      active: pathname === '/',
      href: '/',
    },
    {
      icon: BiSearch,
      label: 'Search',
      active: pathname === '/search',
      href: '/search',
    },
  ], [pathname]);

  return (
    <div className={twMerge(`
    flex
    h-full
    `, player.activeId && 'h-[calc(100%-80px)]')}
    >
      <div
        className={`
        hidden
        md:flex
        flex-col
        gap-y-2
        bg-black
        h-full
        ${sidebarIsOpen ? 'w-[300px]' : 'w-[82px]'}
        p-2
        `}
      >
        <SidebarBox
          className={`
          flex
          flex-col
          gap-y-4
          ${sidebarIsOpen && 'px-5'}
          py-4
          `}
        >
          {routes.map((item) => (
            <SidebarItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              active={item.active}
              href={item.href}
              sidebarIsOpen={sidebarIsOpen}
            />
          ))}
        </SidebarBox>

        <SidebarBox className="overflow-y-auto h-full">
          <Library
            likedSongsLength={likedSongsLength}
            songsSentLength={songsSentLength}
            onToggleSidebar={toggleSidebar}
            sidebarIsOpen={sidebarIsOpen}
          />
        </SidebarBox>
      </div>

      <main
        className="
        h-full
        flex-1
        overflow-y-auto
        py-2
        "
      >
        {children}
      </main>
    </div>
  );
}

export default Sidebar;
