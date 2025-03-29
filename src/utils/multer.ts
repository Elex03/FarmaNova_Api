import multer from 'multer';
import path from 'path';
import fs from "fs";


const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, uploadDir);
    },
    filename: function (_req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },

});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter: (_req, file, cb) => {
        const fileTypes = /jpg|jpeg|png|gif/;
        const extname = fileTypes.test(path.extname(file.originalname).toLocaleLowerCase());
        const mimeType = fileTypes.test(file.mimetype);


        if (extname && mimeType) {
            return cb(null, true);

        } else {
            cb(new Error('Solo se permiten imagenes (JPG, JPEG, PNG, GIF)'));
        }
    },
});

export{upload};