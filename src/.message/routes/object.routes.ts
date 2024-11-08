// src/routes/items.ts
import express, { Request, Response } from "express";
//import * as jwt from 'jsonwebtoken';
import { Item } from '../entities/object.entity';
import itemController from "../controller/object.controller";
import { validateCreateItem } from "../validation/object.validation";

import logger from '../../logger';
import { AppDataSource } from "../../db/db";
import { request } from "http";

export const ItemsRouter = express.Router();

ItemsRouter.get('/', itemController.getItems);
ItemsRouter.post('/', validateCreateItem, itemController.createItem);
ItemsRouter.put('/item-name/:itemId', itemController.updateItemName);
ItemsRouter.put('/item-type/:itemId', itemController.updateItemType);