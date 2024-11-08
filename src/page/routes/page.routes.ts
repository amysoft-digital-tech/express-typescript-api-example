import express, { Request, Response } from "express";
import pageController from "../controller/page.controller";
import session from "../../middleware/session";

export const PageRouter = express.Router();

PageRouter.get('/pages', session.checkIfSessionExists, pageController.getPages);
PageRouter.get('/page/:id', session.checkIfSessionExists, pageController.getPage);
PageRouter.get('/set/:id', session.checkIfSessionExists, pageController.setPage);   
PageRouter.post('/page', session.checkIfSessionExists, pageController.createPage);
PageRouter.put('/page', session.checkIfSessionExists, pageController.updatePage);
PageRouter.delete('/page/:id', session.checkIfSessionExists, pageController.deletePage);