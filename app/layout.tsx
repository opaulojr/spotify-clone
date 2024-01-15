import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';
import './globals.css';

import Sidebar from '@/components/Sidebar';
import SupabaseProvider from '@/providers/SupabaseProvider';
import UserProvider from '@/providers/UserProvider';
import ModalProvider from '@/providers/ModalProvider';
import ToasterProvider from '@/providers/ToasterProvider';
import getLikedSongs from '@/actions/getLikedSongs';
import getSongsByUserId from '@/actions/getSongsByUserId';

const font = Figtree({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Spotify Clone',
  description: 'Music for everyone',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const likedSongs = await getLikedSongs();
  const songsSent = await getSongsByUserId();

  const likedSongsNumber = likedSongs.length;
  const songsSentNumber = songsSent.length;

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <Sidebar
              likedSongsLength={likedSongsNumber}
              songsSentLength={songsSentNumber}
            >
              {children}
            </Sidebar>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
