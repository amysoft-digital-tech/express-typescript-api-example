import { Subsection } from "../entities/subsection.entity";
import { CreateSubsectionDTO } from "../dto/create-subsection.dto";

const createSubsection = (_userId, _subsection: CreateSubsectionDTO) => {
    const subsection = new Subsection();
    subsection.userId = _userId;
    subsection.name = _subsection.name;
    subsection.sectionId = _subsection.sectionId;
    subsection.publicationId = _subsection.publicationId;

    return Subsection.save(subsection);
}

const retrieveSubsection = (_id: number) => {
    return Subsection.findOneBy({id: _id});
}

const retrieveSubsections = (_sectionId: number) => {
    return Subsection.findBy({sectionId: _sectionId});
}

const updateSubsection = (_id: number, _body: CreateSubsectionDTO) => {

}

const deleteSubsection = (_id: number) => {

}

export default {
    createSubsection,
    retrieveSubsection,
    retrieveSubsections,
    updateSubsection,
    deleteSubsection,
}