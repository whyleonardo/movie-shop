export const api = {
  key: `${import.meta.env.VITE_API_KEY}`,
  img: `${import.meta.env.VITE_URL_IMAGE}`,
  popular: `${import.meta.env.VITE_URL_POPULAR_MOVIES}`,
  upcoming: `${import.meta.env.VITE_URL_UPCOMING}`,
  topRated: `${import.meta.env.VITE_URL_TOPRATED_MOVIES}`,
  latest: `${import.meta.env.VITE_URL_LATEST_MOVIES}`,
  singleMovie: `${import.meta.env.VITE_URL_GET_MOVIE}`,
  nowPlaying: import.meta.env.VITE_URL_NOW_PLAYING,

  search: `${import.meta.env.VITE_SEARCH}`,
}