import { NextFunction, Request, Response } from "express";
import { AppSessionDTO } from "../../common/dto/app-session.dto";
import appCryptography from "../../utilities/cryptography";
import appFileSystemHandler from "../../utilities/filesystem";
import sessionController from "../../middleware/session";
import { badRequest, unauthorized, forbidden } from "../../middleware/error/api.error";
import logger from "../../logger";
import appOptions from "../../utilities/options";

import userRepository from "../repository/user.repository";
import { CreateUserDTO } from "../dto/create-user.dto";
import { CreateUserPasscodeDTO } from "../dto/create-user-passcode.dto";
import { CreateUserSaltDTO } from "../dto/create-user-salt.dto";
import { UserSessionDTO } from "../dto/user-session.dto";
import { UISessionDTO } from "../../common/dto/ui-session.dto";


const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    if(appOptions.verboseDebugging){ logger.info(`get users controller`); }
    sessionController.sessionVariables = res.locals.session;
    if(sessionController.sessionVariables && sessionController.sessionVariables.isLoggedIn){
        const users = await userRepository.getUsers(false);
        const dtos = users.map((e) => e.toUserDTO());

        return res.success(dtos); 
    }
};

const createUser = async (req: Request, res: Response) => {
    
    const body: CreateUserDTO = req.body;
    const user = await userRepository.createUser(body);
    const salt = appCryptography.generateSalt();
    const hash = appCryptography.hashPassword(body.passcode, salt);
    const generated: CreateUserPasscodeDTO = {passcode: hash, userId: user.id};
    const saveSalt: CreateUserSaltDTO = {salt: salt, userId: user.id};
    await userRepository.saveUserPasscode(generated);
    await userRepository.saveUserSalt(saveSalt);
    res.created();

};

const saveUserPasscode = async (req: Request, res: Response) => {
    sessionController.sessionVariables = res.locals.session;
    if(sessionController.sessionVariables && sessionController.sessionVariables.isLoggedIn === true){
        const id = parseInt(req.params.userId);
        const inputRequest: CreateUserPasscodeDTO = req.body;
        const salt = appCryptography.generateSalt();
        const hash = appCryptography.hashPassword(inputRequest.passcode, salt);
        const generated: CreateUserPasscodeDTO = {passcode: hash, userId: id};
        const saveSalt: CreateUserSaltDTO = {salt: salt, userId: id};

        await userRepository.saveUserPasscode(generated);
        await userRepository.saveUserSalt(saveSalt);
        res.created();
    } else {
        res.sendStatus(404);
    }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
    sessionController.sessionVariables = res.locals.session as AppSessionDTO;
    if(sessionController.sessionVariables && sessionController.sessionVariables.isLoggedIn == true){
        //sesionController.sessionVariables.isLoggedIn = true;
    } else {
        const attemptLoginSession: UserSessionDTO = req.body;
        if(attemptLoginSession.username) {
            const user = await userRepository.getUserByUsername(attemptLoginSession.username);
            const userSalt = await userRepository.getUserSalt(user.id);
            const userPasscode = await userRepository.getUserPasscode(user.id);
            const hash = appCryptography.hashPassword(attemptLoginSession.passcode, userSalt.salt);
            
            if(hash === userPasscode.passcode) {
                sessionController.sessionVariables = {
                    isLoggedIn: true,
                    userId: user.id
                };
                if(appOptions.verboseDebugging) { logger.info(`isLoggedIn ${sessionController.sessionVariables.isLoggedIn}`); }
                sessionController.commitSession(req, res, next, sessionController.sessionVariables);
            }
        }
    }
    if(sessionController.sessionVariables){
        let sessionToken: string = null;
        if(res.locals.sessionId) {
            sessionToken = res.locals.sessionId;
        }
        const uiSession: UISessionDTO = {sessionId: sessionToken , isLoggedIn: sessionController.sessionVariables.isLoggedIn};
        
	    return res.success(uiSession);
    } else {
        return res.noContent();
    }

};

const getSession = async (req: Request, res: Response, next: NextFunction) => {
    sessionController.sessionVariables = res.locals.session as AppSessionDTO;
    if(sessionController.sessionVariables && sessionController.sessionVariables.isLoggedIn == true){
        logger.info(`got session`);
        const uiSession: UISessionDTO = (({isLoggedIn}) => ({isLoggedIn}))(sessionController.sessionVariables);
        return res.success(uiSession);
    } else {
        logger.info(`no session`);
        return res.noContent();
    }
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
    sessionController.sessionVariables = res.locals.session;
    if(sessionController.sessionVariables && sessionController.sessionVariables.isLoggedIn == true){
        const id = parseInt(req.params.userId);
        logger.info(`Get user id: ${id}`);
        let userLoggedIn = false;
        if(res.locals.session) {
            sessionController.sessionVariables = res.locals.session;
            if(appOptions.verboseDebugging) { logger.info(`Session Is Logged In: ${sessionController.sessionVariables.isLoggedIn}`); }
        }

        const user = await userRepository.getUser(id);
        if(appOptions.verboseDebugging) { logger.info(`user: ${JSON.stringify(user)}`); }
        return res.success(user);
    } else {
        return next(unauthorized('Unauthorized, user is not logged in'));
    }
};

const logout = async (req: Request, res: Response) => {
    let cookieStatus = false;
    if(appOptions.verboseDebugging) { logger.info('clearCookie route'); }
    if(req.signedCookies) {
        cookieStatus = true;
    }
    res.send(true);
};

const uploadImage = async (req: Request, res: Response) => {
return res.status(200).end();
};

export default {
    getUser,
    getUsers,
    getSession,
    createUser,
    login,
    logout,
    saveUserPasscode,
    uploadImage,
}