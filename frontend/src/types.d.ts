export interface ArtistMutation {
  title: string;
  photo: string | null;
  information: string | null;
  isPublished: boolean;
}

export interface AlbumMutation {
  title: string;
  executor: string;
  date: string;
  image: string | null;
  isPublished: boolean;
  user: string;
}

export interface TrackMutation {
  title: string;
  album: string;
  duration: string;
  youtubeLink: string;
  trackNumber: number;
  isPublished: boolean;
  user: string;
}

export interface Albums {
  _id: string;
  album: AlbumMutation
  counter: number
}

export interface Album extends AlbumMutation{
  _id: string;
  executor: AlbumMutation
}

export interface Artists extends ArtistMutation{
  _id: string;
}

export interface Tracks extends TrackMutation{
  _id: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
  role: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  name: string;
  _name: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface GlobalError {
  error: string;
}

export interface TracksHistory {
  _id: string;
  user: string;
  track: Tracks;
  executor: Artists;
  datetime: string;
}