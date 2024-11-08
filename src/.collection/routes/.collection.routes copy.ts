// src/routes/collections.ts
import express, { Request, Response } from "express";
/*import * as jwt from 'jsonwebtoken';
import * as fs from "fs";
import * as path from "path";
const keysPath = path.resolve(`${__dirname}../../keys`);
const JWT_PRIVATE_KEY = fs.readFileSync(`${keysPath}/jwtRS256.key`, 'utf-8');
const JWT_PUBLIC_KEY = fs.readFileSync(`${keysPath}/jwtRS256.key.pub`, 'utf-8');
*/
import { Collection } from "../entities/collection.entity";
//import { Session } from "../helpers/session";

import logger from '../../logger';

export const CollectionsRouter = express.Router();

CollectionsRouter.get('/', async (req: Request, res: Response) => {
	/*
	let sessionData: Session;
	if(req.signedCookies.session_2) {
		logger.info('session jwt: ', req.signedCookies.session_2);
		const sessionData = jwt.verify(req.signedCookies.session_2, JWT_PUBLIC_KEY.replace(/\\n/gm, '\n')) as Session;
		logger.info('jwt payload = ', jwt.verify(req.signedCookies.session_1, JWT_PUBLIC_KEY.replace(/\\n/gm, '\n')));
		logger.info('session data: id', sessionData);
		try {
			const collections = await AppDataSource.getRepository(Collection).find();    
			return res.status(200).send(collections);
		} catch (error) {
			logger.info('error: '+error);
			res.status(500).send('Internal Server Error');
		}
	} else {
		logger.info('error: '+'Session Cookie Not Found');
		res.status(500).send('Internal Server Error');
	}
	*/
	const collections = await AppDataSource.getRepository(Collection).find();    
			return res.status(200).send(collections);
});

CollectionsRouter.post('/', async (req: Request, res: Response) => {
    const collection = AppDataSource.getRepository(Collection).create(req.body);
    const results = AppDataSource.getRepository(Collection).save(collection);

    return res.send(results);
});
