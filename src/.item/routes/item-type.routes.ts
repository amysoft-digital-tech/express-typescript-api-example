// src/routes/items-attributes.ts
import express, { Request, Response } from "express";
import { ItemsAttributesRouter } from "../routes/item-attributes.routes";
import logger from '../../logger';
import appOptions from "../../utilities/options";
import itemTypesController from "../controller/item-type.controller";
import sessionController from "../../middleware/session";


export const ItemsTypesRouter = express.Router();

ItemsTypesRouter.get('/', sessionController.checkIfSessionExists,itemTypesController.getItemTypes);
ItemsTypesRouter.get('/:typeId', itemTypesController.getItemTypeById);

ItemsTypesRouter.post('/', itemTypesController.createItemType);

ItemsTypesRouter.use('/:typeId/attributes', ItemsAttributesRouter);
