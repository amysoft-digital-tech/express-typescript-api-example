import { Collection } from "../entities/collection.entity";
import { CreateCollectionDTO } from "../dto/create-collection.dto";
import { CollectionDTO } from "../dto/collection.dto";
import { UpdateCollectionNameDTO } from "../dto/update-collection-name.dto";

const getCollections = (userId: number) => {
    return Collection.findBy({userId: userId});
}

const createCollection = (entity: CreateCollectionDTO) => {
    return Collection.save({ ...entity });
};

const updateCollectionName = (id: number, name: string) => {
    return Collection.update({ id }, {name});
};

export default {
    getCollections,
    createCollection,
    updateCollectionName,
}