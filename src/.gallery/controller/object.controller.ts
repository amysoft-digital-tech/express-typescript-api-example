import { Request, Response } from "express";
import objectRepository from "../repository/object.repository";
import { CreateObjectDTO } from "../dto/create-object.dto";

const getObjects = async (req: Request, res: Response) => {
    const objects = await objectRepository.getObjects(false);
    const dtos = objects.map((e) => e.toObjectDTO());
    res.send(dtos);
};

const createObject = async (req: Request, res: Response) => {
    const body: CreateObjectDTO = req.body;
    await objectRepository.createItem(body);
    return res.sendStatus(200);
};

const updateObjectName = async (req: Request, res: Response) => {
    const id = parseInt(req.params.itemId);
    const name = req.body.name;
    await objectRepository.updateItemName(id, name);
    res.sendStatus(200);
};

const deleteObject = async (req: Request, res: Response) => {
    const id = parseInt(req.params.itemId);
    await objectRepository.deleteObject(id);
    res.sendStatus(200);

};

export default {
    getObjects,
    createObject,
    updateObjectName,
    deleteOblect,
};