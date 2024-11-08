import { Request, Response, NextFunction } from "express";
import appFileSystemHandler from "../utilities/filesystem";
import appOptions from "../utilities/options";
import logger from "../logger";

const image = (req: Request, res: Response, next: NextFunction) => {
    if(appOptions.verboseDebugging){ logger.info(`[Upload][Middleware] image`); }
    if(!req.file || !req.file.path) {
        if(appOptions.verboseDebugging){ logger.info(`[Upload][Middleware] image req.file not found`); }
        return res.status(400).end();
    } else {
        const temp = req.file.path;
        const target = appFileSystemHandler.getPath(`./media/images/`);

        if(appOptions.verboseDebugging){ logger.info(`[Upload][Middleware] image temp path: ${temp} target path: ${target}`); }

        appFileSystemHandler.renameFile(temp, target, req.file.originalname);
        next();
    }
};

export default {
    image,
}