import mongoose from "mongoose";

export interface ArtistMutation {
  title: string;
  photo: string | null;
  information: string | null;
  isPublished: boolean;
  user: string;
}

export interface AlbumMutation {
  title: string;
  executor: string;
  date: number;
  image: string | null;
  isPublished: boolean;
  user: string;
}

export interface TrackMutation {
  title: string;
  album: mongoose.Types.ObjectId;
  duration: string;
  youtubeLink: string,
  trackNumber: number;
  isPublished: boolean;
  user: mongoose.Types.ObjectId;
}

export interface IUser {
  username: string;
  password: string;
  role: string;
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
    isPublished: boolean;
    user: string | undefined;
  };
  counter: number
}

export interface AlbumType {
  _id: mongoose.Types.ObjectId;
  title: string;
  date: number;
  executor: mongoose.Types.ObjectId;
  image?: string | undefined;
  isPublished: boolean;
  user: mongoose.Types.ObjectId;
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