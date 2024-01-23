import { SongAPI } from '../types';

const getRandomArtist = async () => {
  const artists = [
    'Eminem', 'Nothing But Thieves', 'Bring Me The Horizon',
    'Metallica', 'Post Malone',
  ];

  const randomIndex = Math.floor(Math.random() * artists.length);

  return artists[randomIndex];
};

const getItunesSongs = async (): Promise<SongAPI[]> => {
  const randomArtist = await getRandomArtist();

  const searchURL = `https://itunes.apple.com/search?entity=song&term=${randomArtist}&attribute=keywordsTerm&limit=16`;

  const request = await fetch(searchURL);
  const { results }: { results: SongAPI[] } = await request.json();
  const songs = results.map((songInfo) => ({ ...songInfo }));
  return songs;
};

export default getItunesSongs;
