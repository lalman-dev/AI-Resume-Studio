import multer from "multer";

// Use memory storage so files are kept in RAM and not written to disk
const storage = multer.memoryStorage();

const upload = multer({ storage });

export default upload;
