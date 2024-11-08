// src/routes/items.ts
import express from 'express';
import listController from '../controller/list.controller';

import logger from '../../logger';

export const ListRouter = express.Router();

ListRouter.get('/', listController.getLists);
ListRouter.post('/', listController.createList);