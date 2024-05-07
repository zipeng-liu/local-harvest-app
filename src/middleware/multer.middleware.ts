import express, { Request, Response, NextFunction } from 'express';
import multer, { FileFilterCallback } from 'multer';


interface MulterRequest extends Request {
    primaryImage?: Express.Multer.File;
    secondaryImages?: Express.Multer.File[];
}

const storage = multer.memoryStorage();

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback ): void => {
    if(file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        const error = new multer.MulterError('LIMIT_UNEXPECTED_FILE');
        cb (error as any, false);
    }
};

const multerUploads = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 10000000,
        files: 3
    }
}).array('image');

export { multerUploads }