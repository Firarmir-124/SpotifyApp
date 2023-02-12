export interface Artist {
  title: string;
  photo: string;
  information: string;
}

export interface Album {
  title: string;
  executor: string;
  date: string;
  image: string;
}

export interface Track {
  title: string;
  album: string;
  duration: string;
}