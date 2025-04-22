import multer from "multer";

const Storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "../../../public/Files")
})

export const uploadMulter = multer({storage: Storage})