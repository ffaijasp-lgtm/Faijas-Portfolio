/**
 * Standalone 35mm Filmstrip Reel Data
 * 
 * 8 independent film cells.
 * Default video: Charlie Chaplin's "The Kid" (1921) via Wikimedia Commons.
 * Fast-loading 240p stream for smooth autoplay looping + high-res fullSrc for expanded modal.
 * Official poster frame prevents black boxes while video initialises.
 */

const DEFAULT_FILM_VIDEO = "https://upload.wikimedia.org/wikipedia/commons/transcoded/e/ea/The_Kid_%281921%29.webm/The_Kid_%281921%29.webm.240p.vp9.webm";
const FULL_RES_FILM_VIDEO = "https://upload.wikimedia.org/wikipedia/commons/transcoded/e/ea/The_Kid_%281921%29.webm/The_Kid_%281921%29.webm.480p.vp9.webm";
const FILM_POSTER = "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ea/The_Kid_%281921%29.webm/960px--The_Kid_%281921%29.webm.jpg";

export const filmstripVideos = [
  {
    id: "film-01",
    frameCode: "FRM 0001",
    title: "The Kid (1921) — Scene 01",
    src: DEFAULT_FILM_VIDEO,
    fullSrc: FULL_RES_FILM_VIDEO,
    poster: FILM_POSTER,
  },
  {
    id: "film-02",
    frameCode: "FRM 0002",
    title: "The Kid (1921) — Scene 02",
    src: DEFAULT_FILM_VIDEO,
    fullSrc: FULL_RES_FILM_VIDEO,
    poster: FILM_POSTER,
  },
  {
    id: "film-03",
    frameCode: "FRM 0003",
    title: "The Kid (1921) — Scene 03",
    src: DEFAULT_FILM_VIDEO,
    fullSrc: FULL_RES_FILM_VIDEO,
    poster: FILM_POSTER,
  },
  {
    id: "film-04",
    frameCode: "FRM 0004",
    title: "The Kid (1921) — Scene 04",
    src: DEFAULT_FILM_VIDEO,
    fullSrc: FULL_RES_FILM_VIDEO,
    poster: FILM_POSTER,
  },
  {
    id: "film-05",
    frameCode: "FRM 0005",
    title: "The Kid (1921) — Scene 05",
    src: DEFAULT_FILM_VIDEO,
    fullSrc: FULL_RES_FILM_VIDEO,
    poster: FILM_POSTER,
  },
  {
    id: "film-06",
    frameCode: "FRM 0006",
    title: "The Kid (1921) — Scene 06",
    src: DEFAULT_FILM_VIDEO,
    fullSrc: FULL_RES_FILM_VIDEO,
    poster: FILM_POSTER,
  },
  {
    id: "film-07",
    frameCode: "FRM 0007",
    title: "The Kid (1921) — Scene 07",
    src: DEFAULT_FILM_VIDEO,
    fullSrc: FULL_RES_FILM_VIDEO,
    poster: FILM_POSTER,
  },
  {
    id: "film-08",
    frameCode: "FRM 0008",
    title: "The Kid (1921) — Scene 08",
    src: DEFAULT_FILM_VIDEO,
    fullSrc: FULL_RES_FILM_VIDEO,
    poster: FILM_POSTER,
  },
];
