import express from "express";
import collectionController from "../controller/collection.controller";
import sessionController from "../../middleware/session";
import { validateCreateCollection } from "../validation/collection.validation";
import { validateUpdateCollectionName } from "../validation/update-collect-name.validation";
import logger from '../../logger';
import collectionRepository from "../repository/collection.repository";

export const CollectionsRouter = express.Router();

CollectionsRouter.get('/', sessionController.checkIfSessionExists, collectionController.getCollections);
CollectionsRouter.post('/', sessionController.checkIfSessionExists, validateCreateCollection, collectionController.createCollection);
CollectionsRouter.put('/name', sessionController.checkIfSessionExists, validateUpdateCollectionName, collectionController.updateCollectionName);
