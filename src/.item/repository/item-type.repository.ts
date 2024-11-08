import { CreateItemTypeDTO } from "../dto/create-item-type.dto";
import { ItemType } from "../entities/item-type.entity";

const createType = (body: CreateItemTypeDTO) => {
    ItemType.save({ ...body })
};
const getTypes = (_userId: number) => {
    const types = ItemType.createQueryBuilder("itemType")
    .leftJoinAndSelect("itemType.attributes", "itemAttribute")
    .where("itemType.userId = :userId", {userId: _userId})
    .getMany();
    
    return types;
    //return ItemType.findBy({userId: _userId});
};
const getTypeById = (_id: number, _userId: number) => {
    return ItemType.findOneBy({ id: _id, userId: _userId });
};
const updateTypeName = () => {};
const deleteType = () => {};

export default {
    createType,
    getTypes,
    getTypeById,
    updateTypeName,
    deleteType
}