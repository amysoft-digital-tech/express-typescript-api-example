// src/routes/list-item.routes.ts
import express, { Request, Response } from "express";
import listItemController from "../controller/list-item.controller";
import logger from '../../logger';

export const ListItemRouter = express.Router();

ListItemRouter.get('/', listItemController.getListItems);

ListItemRouter.post('/', listItemController.createListItem);
