import express, {Request, Response} from 'express';
import userController from '../controller/user.controller';
import sessionController from "../../middleware/session";
import uploadController from "../../middleware/upload";
import appFileSystem from "../../utilities/filesystem";

export const UsersRouter = express.Router();

UsersRouter.post('/register', userController.createUser);
UsersRouter.post('/login', userController.login);
UsersRouter.get('/logout', userController.logout);
UsersRouter.get('/session', sessionController.checkIfSessionExists, userController.getSession);
UsersRouter.get('/:userId', sessionController.checkIfSessionExists, userController.getUser);
UsersRouter.get('/', sessionController.checkIfSessionExists, userController.getUsers);
UsersRouter.put('/:userId/update-passcode', userController.saveUserPasscode);
UsersRouter.put('/:userId/uploadImage', appFileSystem.uploadHandler.single('image'), uploadController.image, userController.uploadImage);
