import multer from "multer";

const fileLimit = 1000000; // 10 Mb

const fileFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[0] === "image") {
        cb(null, true);
    } else {
        cb(new Error("El archivo debe de ser una imagen"), false);
    }
};

const storage = multer.memoryStorage();

export const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: fileLimit }
});
