import Image from 'next/image';

import Header from '@/components/Header';

export const revalidate = 0;

export default async function Uploaded() {
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
      <Header className="from-rose-800">
        <div className="mt-20">
          <div
            className="
            flex
            flex-col
            md:flex-row
            items-center
            gap-x-5
            "
          >
            <div
              className="
              relative
              w-32
              h-32
              lg:w-44
              lg:h-44
              "
            >
              <Image
                src="/images/upload.png"
                fill
                alt="Playlist"
                className="object-cover"
              />
            </div>

            <div
              className="
              flex
              flex-col
              gap-y-2
              mt-4
              md>mt-0
              "
            >
              <p
                className="
                hidden
                md:block
                font-semibold
                text-sm
                "
              >
                Playlist
              </p>

              <h1
                className="
                text-white
                text-4xl
                sm:text-5xl
                lg:text-7xl
                font-bold
                "
              >
                Songs Sent
              </h1>
            </div>
          </div>
        </div>
      </Header>

      Uploaded content
    </div>
  );
}
