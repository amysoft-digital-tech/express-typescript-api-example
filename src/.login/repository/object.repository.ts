import { Object } from "../entities/object.entity";
import { CreateObjectDTO } from "../dto";
import { ObjectDTO } from "../dto/object.dto";

const getObjects = (relations?: boolean) => {
    return Object.find();
};

const getObjectById = (id: number) => {
    return Object.findOneBy({ id });
};

const createObject = (body: CreateObjectDTO) => {
    return Object.save({ ...body });
};

const updateObjectName = (id: number, name: string) => {
    return Object.update({id}, {name});
};

const deleteObject = (id: number) => {
    return Object.delete({id});
};

export default {
    getObjects,
    getObjectById,
    createObject,
    updateObjectName,
    deleteObject,
}