// src/routes/items.ts
import express, { Request, Response } from 'express';
//import * as jwt from 'jsonwebtoken';
import { ListItemValues } from "../entities/list-item-value.entity";

import logger from '../../logger';
import dbh from '../../db/db';

export const ListItemValueRouter = express.Router();

ListItemValueRouter.get('/', async (req: Request, res: Response) => {
	try {
		const listsItemsValues = await dbh.AppDataSource.getRepository(ListItemValues).find();    
		return res.status(200).send(listsItemsValues);
	} catch (error) {
		logger.info('error: '+error);
		res.status(500).send('Internal Server Error');
	}
});

ListItemValueRouter.post('/', async (req: Request, res: Response) => {
    const value = dbh.AppDataSource.getRepository(ListItemValues).create(req.body);
    const results = dbh.AppDataSource.getRepository(ListItemValues).save(value);

    return res.send(results);
});
