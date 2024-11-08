import express, { Router } from "express";
import subsectionController from "../controller/subsection.controller";
import session from "../../middleware/session";

export const SubsectionRouter: Router = express.Router();

SubsectionRouter.get('/', session.checkIfSessionExists, subsectionController.getSubsections);
SubsectionRouter.get('/:id', session.checkIfSessionExists, subsectionController.getSubsection);
SubsectionRouter.get('/set/:id', session.checkIfSessionExists, subsectionController.setSubsection);
SubsectionRouter.post('/', session.checkIfSessionExists, subsectionController.createSubsection);
SubsectionRouter.put('/:id', session.checkIfSessionExists, subsectionController.updateSubsection);
SubsectionRouter.delete('/:id', session.checkIfSessionExists, subsectionController.deleteSubsection);


