import multer from 'multer'
import path from "path";
import config from "./config";
import {promises as fs} from "fs";
import {randomUUID} from "crypto";

const imageStore = multer.diskStorage({
  destination: async (_req, _file, callback) => {
    const destDir = path.join(config.publicPath, 'images');
    await fs.mkdir(destDir, {recursive: true});
    callback(null, config.publicPath);
  },
  filename: (_req, file, callback) => {
    const extension = path.extname(file.originalname);
    callback(null, '/images' + randomUUID() + extension);
  }
});

export const imagesUpload = multer({storage: imageStore});