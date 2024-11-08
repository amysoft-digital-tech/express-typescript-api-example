// src/routes/items-attributes.ts
import express, { Request, Response } from "express";
//import * as jwt from 'jsonwebtoken';
import { ItemAttribute } from "../entities/item-attribute.entity";
import itemsAttributesController from "../controller/item-attribute.controller";
import sessionController from "../../middleware/session";


import logger from '../../logger';
import itemAttributeRepository from "../repository/item-attribute.repository";

export const ItemsAttributesRouter = express.Router();

ItemsAttributesRouter.get('/', sessionController.checkIfSessionExists, itemsAttributesController.getAttributes);

ItemsAttributesRouter.post('/', itemsAttributesController.createAttribute);
