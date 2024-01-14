import getSongs from '@/actions/getSongs';
import Header from '@/components/Header';
import ListButton from '@/components/ListButton';
import PageContent from './components/PageContent';

export const revalidate = 0;

export default async function Home() {
  const songs = await getSongs();

  return (
    <div
      className="
      bg-neutral-900
      rounded-lg
      w-full
      h-full
      overflow-hidden
      overflow-y-auto
      "
    >
      <Header>
        <div>
          <h1 className="text-white text-3xl font-semibold">
            Welcome back
          </h1>

          <div
            className="
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-3
            2xl:grid-cols-4
            gap-3
            mt-4
            "
          >
            <ListButton
              image="/images/liked.png"
              name="Liked Songs"
              href="liked"
            />

            <ListButton
              image="/images/upload.png"
              name="Songs Sent"
              href="sent"
            />
          </div>
        </div>
      </Header>

      <div className="mt-2 mb-7 px-6">
        <h1 className="text-white text-2xl font-semibold">
          Newest Songs
        </h1>

        <div>
          <PageContent songs={songs} />
        </div>
      </div>
    </div>
  );
}
