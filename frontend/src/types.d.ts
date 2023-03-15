export interface ArtistMutation {
  title: string;
  photo: string | null;
  information: string | null;
}

export interface AlbumMutation {
  title: string;
  executor: string;
  date: string;
  image: string | null;
}

export interface TrackMutation {
  title: string;
  album: string;
  duration: string;
  youtubeLink: string;
  trackNumber: string;
}

export interface Album extends AlbumMutation{
  _id: string;
  executor: AlbumMutation;
  isPublished: boolean;
}

export interface Albums {
  _id: string;
  album: Album
  counter: number
}

export interface Artists extends ArtistMutation{
  _id: string;
  isPublished: boolean;
}

export interface Tracks extends TrackMutation{
  _id: string;
  isPublished: boolean;
}

export interface RegisterMutation {
  username: string;
  password: string;
  displayName: string;
  avatar: File | null
}

export interface User {
  _id: string;
  username: string;
  token: string;
  role: string;
  displayName: string;
  avatar: string | null
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