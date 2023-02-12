export interface Artist {
  title: string;
  photo: string | null;
  information: string | null;
}

export interface Album {
  title: string;
  executor: string;
  date: string;
  image: string | null;
}

export interface Track {
  title: string;
  album: string;
  duration: string;
}