import { NextFunction, Request, Response } from "express";
import pageRepository from "../repository/page.repository";
import { Page } from "../entities/page.entity";
import session from "../../middleware/session";
//import { UserSessionDTO } from "../../common/dto/user-session.dto";
import { AppSessionDTO } from "../../common/dto/app-session.dto";

export const setPage = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const sessionVariables: AppSessionDTO = res.locals.session;
    sessionVariables.currentPageId = parseInt(id);
    session.commitSession(req, res, next, session.sessionVariables);
    res.noContent();
}

export const getPage = async (req: Request, res: Response, next: NextFunction) => {
    const sessionVariables: AppSessionDTO = res.locals.session;
    if (!sessionVariables) {
        return res.status(401).send("Unauthorized");
    }
    if(sessionVariables.isLoggedIn === true) {
        const {id} = req.params;
        const page = await pageRepository.retrievePage(parseInt(id));
        if (!page) {
            return res.status(404).send("Page not found");
        }
        const dto = page.toPageDTO();
        return res.success(dto);
    }
};

export const getPages = async (req: Request, res: Response, next: NextFunction) => {
    const sessionVariables: AppSessionDTO = res.locals.session;
    const pages = await pageRepository.retrievePages(sessionVariables.currentPublicationId);
    const dtos = pages.map((e) => e.toPageDTO());
    return res.success(dtos);
};

export const deletePage = (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;
    pageRepository.deletePage(parseInt(id));
    return res.success(200);
};

export const updatePage = (req: Request, res: Response, next: NextFunction) => {
    const page = req.body;
    pageRepository.updatePage(page);
    return res.success(200);
};

export const createPage = (req: Request, res: Response, next: NextFunction) => {
    const sessionVariables: AppSessionDTO = res.locals.session;
    const page = req.body;
    pageRepository.createPage(sessionVariables.userId, page);
    return res.success(200);
};

export default {
    setPage,
    getPage,
    getPages,
    deletePage,
    updatePage,
    createPage,    
}