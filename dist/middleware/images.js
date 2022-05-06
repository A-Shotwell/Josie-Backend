"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const TYPE_IMAGES = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/gif": "gif"
};
const storage = multer_1.default.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "images");
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split("").join("_");
        const extension = TYPE_IMAGES[file.mimetype];
        callback(null, name + Date.now() + "." + extension);
    },
});
const middleware = (0, multer_1.default)({ storage: storage });
exports.default = middleware;
