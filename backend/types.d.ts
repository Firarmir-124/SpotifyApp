import mongoose from "mongoose";

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
  executor: ArtistMutation._id;
  datetime: string;
}

export interface newAlbums {
  _id: mongoose.Types.ObjectId;
  album: {
    title: string;
    executor: mongoose.Types.ObjectId;
    date: number;
    image: string | null;
  };
  counter: number
}

export interface AlbumType {
  _id: mongoose.Types.ObjectId
  title: string,
  date: number,
  executor: mongoose.Types.ObjectId,
  image?: string | undefined,
}

export interface TrackType {
  _id: mongoose.Types.ObjectId;
  title: string;
  album?: mongoose.Types.ObjectId | undefined;
  duration: string;
  trackNumber: number;
}

export interface TrackPopulate {
  title: string;
  album: AlbumMutation;
  duration: string;
  trackNumber: number;
}