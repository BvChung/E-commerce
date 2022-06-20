import { Request, Response, NextFunction } from "express";
import multer from "multer";
import DataURIParser from "datauri/parser";

const parser = new DataURIParser();
const storage = multer.memoryStorage();

const upload = multer({
	storage,
	// File size limit of <= 1 MB
	limits: { fileSize: 1 * 1000 * 1000 },
}).single("image");

const convertFile = async (req: Request, res: Response, next: NextFunction) => {
	upload(req, res, (err) => {
		try {
			req.file.originalname = Date.now() + req.file.originalname.split(".")[0];

			const convertFileBuffer = parser.format(
				req.file.originalname,
				req.file.buffer
			);

			req.body = convertFileBuffer;

			next();
		} catch (error) {
			// If file size too large then return error
			res.status(400);
			return next(err);
		}
	});
};

export default convertFile;
