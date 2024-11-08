import { Request, Response } from "express";
import listRepository from "../repository/list.repository";
import { CreateListDTO } from "../dto/create-list.dto";

import logger from "../../logger";

const getLists = async (req: Request, res: Response) => {
    const lists = await listRepository.getLists(true);
    logger.info(`list count: ${lists.length}`);
    const dtos = lists.map((e) => e.toListDTO);

    res.send(lists);
};

const createList = async (req: Request, res: Response) => {
    const body: CreateListDTO = req.body;
    await listRepository.createList(body);
    res.sendStatus(200);
};

export default {
    getLists,
    createList,
}