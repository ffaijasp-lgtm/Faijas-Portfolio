/**
 * Standalone 35mm Filmstrip Reel Data
 * 
 * 8 independent film cells.
 * Default video: Charlie Chaplin's "The Kid" (1921) via Wikimedia Commons.
 * You can replace any `src` or `title` with your own video links anytime.
 */

const DEFAULT_FILM_VIDEO = "https://upload.wikimedia.org/wikipedia/commons/transcoded/e/ea/The_Kid_%281921%29.webm/The_Kid_%281921%29.webm.480p.vp9.webm";
const FULL_RES_FILM_VIDEO = "https://upload.wikimedia.org/wikipedia/commons/e/ea/The_Kid_%281921%29.webm";

export const filmstripVideos = [
  {
    id: "film-01",
    frameCode: "FRM 0001",
    title: "Cinematic Film Cell 01",
    src: DEFAULT_FILM_VIDEO,
    fullSrc: FULL_RES_FILM_VIDEO,
  },
  {
    id: "film-02",
    frameCode: "FRM 0002",
    title: "Cinematic Film Cell 02",
    src: DEFAULT_FILM_VIDEO,
    fullSrc: FULL_RES_FILM_VIDEO,
  },
  {
    id: "film-03",
    frameCode: "FRM 0003",
    title: "Cinematic Film Cell 03",
    src: DEFAULT_FILM_VIDEO,
    fullSrc: FULL_RES_FILM_VIDEO,
  },
  {
    id: "film-04",
    frameCode: "FRM 0004",
    title: "Cinematic Film Cell 04",
    src: DEFAULT_FILM_VIDEO,
    fullSrc: FULL_RES_FILM_VIDEO,
  },
  {
    id: "film-05",
    frameCode: "FRM 0005",
    title: "Cinematic Film Cell 05",
    src: DEFAULT_FILM_VIDEO,
    fullSrc: FULL_RES_FILM_VIDEO,
  },
  {
    id: "film-06",
    frameCode: "FRM 0006",
    title: "Cinematic Film Cell 06",
    src: DEFAULT_FILM_VIDEO,
    fullSrc: FULL_RES_FILM_VIDEO,
  },
  {
    id: "film-07",
    frameCode: "FRM 0007",
    title: "Cinematic Film Cell 07",
    src: DEFAULT_FILM_VIDEO,
    fullSrc: FULL_RES_FILM_VIDEO,
  },
  {
    id: "film-08",
    frameCode: "FRM 0008",
    title: "Cinematic Film Cell 08",
    src: DEFAULT_FILM_VIDEO,
    fullSrc: FULL_RES_FILM_VIDEO,
  },
];
