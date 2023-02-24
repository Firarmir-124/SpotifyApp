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