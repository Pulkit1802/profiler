import multer from "multer"
import { nanoid } from "nanoid";

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    // @ts-ignore
    filename: function (req, file, cb) {
        let uniqueSuffix = Date.now() + '_' + nanoid(10)
        cb(null, uniqueSuffix + '_' + file.originalname)
    }
});

const fileUpload = multer({ storage: storage });

export {
    fileUpload
}