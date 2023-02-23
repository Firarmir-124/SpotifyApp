export interface ArtistMutation {
  title: string;
  photo: string | null;
  information: string | null;
}

export interface AlbumMutation {
  title: string;
  executor: string;
  date: number;
  image: string | null;
}

export interface TrackMutation {
  title: string;
  album: string;
  duration: string;
  trackNumber: number;
}

export interface IUser {
  username: string;
  password: string;
  token: string
}

export interface TrackHistory {
  user: IUser._id;
  track: TrackMutation._id;
  datetime: string;
}