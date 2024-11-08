// src/routes/items.ts
import express, { Request, Response } from "express";
//import * as jwt from 'jsonwebtoken';
import { Item } from '../entities/item.entity';
import itemController from "../controller/item.controller";
import { ItemsTypesRouter } from "../routes/item-type.routes";
import sessionController from "../../middleware/session";
import { validateCreateItem } from "../validation/item.validation";

import logger from '../../logger';
import { request } from "http";

export const ItemsRouter = express.Router();

ItemsRouter.get('/', sessionController.checkIfSessionExists, itemController.getItems);
ItemsRouter.get('/:itemId', sessionController.checkIfSessionExists, itemController.getItemById);
ItemsRouter.post('/', validateCreateItem, itemController.createItem);
ItemsRouter.put('/item-name/:itemId', itemController.updateItemName);
ItemsRouter.put('/item-type/:itemId', itemController.updateItemType);
//ItemsRouter.use(':itemId/types', ItemsTypesRouter);