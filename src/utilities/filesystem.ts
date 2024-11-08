import multer from "multer";
import fs from "fs";
import path from "path";

const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(`${__dirname}../../../temp`))
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const uploadHandler = multer({
    storage: diskStorage    
});

const getPath = (_path: string) => {
    return path.resolve(`${__dirname}../../../assets/${_path}`);
}

const renameFile = (source:string, target:string, _filename) => {
    fs.rename(source, target+'/'+_filename, err => {
        if(err) return false;
        return true;
    });
};

export default {
    uploadHandler,
    getPath,
    renameFile,
}