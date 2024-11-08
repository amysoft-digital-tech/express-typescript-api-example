import express, { Request, Response } from "express";
import publicationController from "../controller/publication.controller";
import { validateCreatePublication } from "../validation/publication.validation";
import session from "../../middleware/session";

import logger from '../../logger';

export const PublicationRouter = express.Router();

PublicationRouter.get('/', session.checkIfSessionExists, publicationController.getPublications);
PublicationRouter.get('/:id', session.checkIfSessionExists, publicationController.getPublication);  
PublicationRouter.get('/set/:id', session.checkIfSessionExists, publicationController.setPublication);
PublicationRouter.post('/', session.checkIfSessionExists, validateCreatePublication, publicationController.createPublication);
PublicationRouter.put('/:id', session.checkIfSessionExists, publicationController.updatePublicationName);
PublicationRouter.delete('/:id', session.checkIfSessionExists, publicationController.deletePublication);