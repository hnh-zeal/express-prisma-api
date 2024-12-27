import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';

const imageFilter = (_req: Request, file: Express.Multer.File, cb: FileFilterCallback): void => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/svg' || file.mimetype === 'video/mp4' || file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Please upload only images.'));
  }
};

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  fileFilter: imageFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10 MB
});
