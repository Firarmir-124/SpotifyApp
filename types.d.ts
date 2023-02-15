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
}

export interface IUser {
  username: string;
  password: string;
  token: string
}

export interface TrackHistory {
  user: string;
  track: string;
  datetime: string;
}