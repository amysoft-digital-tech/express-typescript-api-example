import { Publication } from "../entities/publication.entity";
import { CreatePublicationDTO } from "../dto/create-publication.dto";

const getPublications = (_userId: number) => {
    return Publication.findBy({userId: _userId});
};

const getPublicationById = (_id: number) => {
    return Publication.findOneBy({ id:_id });
};

const createPublication = (_userId: number, _body: CreatePublicationDTO) => {
    return Publication.save({userId:_userId, ..._body });
};

const updatePublicationName = async (_id: number, _name: string) => {
    const publication = await Publication.findOneBy({id:_id});
    publication.name = _name;
    return publication.save();    
};

const deletePublication = (_id: number) => {
    return Publication.delete({id:_id});
};

export default {
    getPublications,
    getPublicationById,
    createPublication,
    updatePublicationName,
    deletePublication,
}