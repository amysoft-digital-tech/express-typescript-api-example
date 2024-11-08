import { Request, Response, NextFunction } from "express";
import logger from "../logger";
import { AppSessionDTO } from "../common/dto/app-session.dto";
import { UISessionDTO } from "../common/dto/ui-session.dto";
import { appCache } from "../utilities/cache";
import appOptions from "../utilities/options";
import { unauthorized } from "./error/api.error";

import * as jwt from 'jsonwebtoken';
import * as fs from "fs";
import * as path from "path";
import { error } from "console";

const keysPath = path.resolve(`${__dirname}../../../keys`);
const JWT_PRIVATE_KEY = fs.readFileSync(`${keysPath}/private_key.pem`, 'utf-8');
const JWT_SECRET = '8c8544ee-bf41-46ac-8037-8c93b7b3c06b';

let sessionVariables: AppSessionDTO;
let uiSession: UISessionDTO;

function verifyJWT(token: string){
    try {
        jwt.verify(token, {key: JWT_PRIVATE_KEY.replace('/\\n/g', '\n'), passphrase: JWT_SECRET});
        return true;
    } catch(err) {
        switch((err as Error).name) {
            case "JsonWebTokenError":
                return false;
            case "TokenExpiredError":
                return false;
        }

        throw(err);
    }
};

function initializeSession() {
    logger.info('Initializing Session');
    const iTimeoutSeconds = "30d";
    const token = jwt.sign({}, {key: JWT_PRIVATE_KEY.replace('/\\n/g', '\n'), passphrase: JWT_SECRET}, { issuer: 'myapp api', algorithm: 'RS256', expiresIn: iTimeoutSeconds });
    return token;
};

const commitSession = (req: Request, res: Response, next: NextFunction, _session: AppSessionDTO) => {
    const sessionHeader = req.header('Authorization');
    if(sessionHeader != undefined) {
        const [scheme, sessionToken] = sessionHeader.split(' ');
        if(sessionToken != undefined) {
            if(appCache.has(sessionToken)) {
                logger.info(`[middleware] Commit Session Variables: ${JSON.stringify(_session)}`);
                appCache.set(sessionToken, _session, 0);
            }
        }
    } else {
        const sessionId = initializeSession();
        appCache.set(sessionId, _session,0);
        res.locals.sessionId = sessionId;
        if(appOptions.verboseDebugging){logger.info(`Session ID: ${sessionId}`);}
    }
        
    next();
};

const checkSessionHeader = (req: Request, res: Response, next: NextFunction) => {
    if(appOptions.verboseDebugging){logger.info(`[Middleware] locals session does not exist`); }
    const sessionHeader = req.header('Authorization');
    let validId=undefined;
    let sessionToken = undefined;
    try {
        if(appOptions.verboseDebugging){logger.info(`[Middleware] Session Header does exist`); }
     sessionToken = sessionHeader.split(' ')[1];
     if(appOptions.verboseDebugging){logger.info(`[Middleware] Session Id = ${sessionToken}`); }
     validId=true;
    } catch(e) {
        if(appOptions.verboseDebugging){logger.info(`[Middleware] Session Header does not exist`); }
        validId=false;
    }
    if(appOptions.verboseDebugging){logger.info(`[Middleware] Session validId ${validId} sessionToken ${sessionToken}`); }
    if(validId != undefined && sessionToken != undefined) {
        if(appOptions.verboseDebugging){logger.info('[Middleware] session token present'); }
        try {
            if(appOptions.verboseDebugging){logger.info(`[Middleware] signedToken Value: ${sessionToken}`); }
            const validatedToken = verifyJWT(sessionToken);
            
            if(validatedToken) {
                //let sessionVariables: AppSessionDTO;
                if(appCache.has(sessionToken)) {
                    if(appOptions.verboseDebugging){logger.info(`[Middleware] app cache has: ${JSON.stringify(appCache.get(sessionToken))}`); }
                    sessionVariables = appCache.get(sessionToken) as AppSessionDTO;
                    if(appOptions.verboseDebugging){logger.info(`[Middleware] Cache : ${sessionVariables.isLoggedIn}`);  }
                } else {
                    if(appOptions.verboseDebugging){logger.info(`[Middleware] Cache does not have token`);  }
                }
                res.locals.session = sessionVariables;
                //next();               
            } else {
                if(appOptions.verboseDebugging){logger.info(`Token is not valid`); }

            }
            
            //if(appOptions.verboseDebugging){logger.info(`Session Vars loggedin: ${sessionVariables.isLoggedIn}`); }
            
        } catch(e) {
            if(appOptions.verboseDebugging){logger.info(`Error: ${(e as Error).name}`); }
            //res.clearCookie('amysoft_project_one', appOptions.cookieOptions);
        }
        //clearCookie(req, res);
    } else {
        if(appOptions.verboseDebugging){logger.info('session cookie is not present, redirect front end to login route');}
    }
};

const checkIfSessionExists = async (req: Request, res: Response, next: NextFunction) => {
    if(appOptions.verboseDebugging){logger.info(`[Middleware] check if locals session exists`);}
    checkSessionHeader(req, res, next);
    if(!res.locals.session) {
        if(appOptions.verboseDebugging){logger.info(`locals session does NOT exist`);}
        return res.end();
    } else {
        if(appOptions.verboseDebugging){logger.info(`locals session does exist: ${JSON.stringify(res.locals.session)}`);}
        next();
    }    
}

export default {
    checkSessionHeader,
    checkIfSessionExists,
    commitSession,
    sessionVariables,
};