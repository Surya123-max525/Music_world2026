import play from 'play-dl';
import yts from 'yt-search';

export const youtubeUrl = (id) => `https://www.youtube.com/watch?v=${id}`;

export const normalizeVideo = (video) => ({
  id: video.videoId,
  title: video.title,
  artist: video.author?.name || 'YouTube Music',
  thumbnail: video.thumbnail,
  duration: video.timestamp || '0:00',
});

export async function searchSongs(query, limit = 12) {
  const search = await yts(`${query} song official audio`);
  return search.videos.slice(0, limit).map(normalizeVideo);
}

export async function trendingSongs(limit = 12) {
  const search = await yts('trending music India global official audio');
  return search.videos.slice(0, limit).map(normalizeVideo);
}

export async function suggestedSongs({ mood = 'chill', language = 'multi language' } = {}, limit = 12) {
  const search = await yts(`${mood} ${language} music mix`);
  return search.videos.slice(0, limit).map(normalizeVideo);
}

export function createAudioStream(id) {
  return play.stream(youtubeUrl(id), { quality: 2 });
}
