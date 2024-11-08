import { Section } from "../entities/section.entity";
import { CreateSectionDTO } from "../dto/create-section.dto";
import { SectionDTO } from "../dto/section.dto";

export const createSection = async (_userId: number, _section: CreateSectionDTO) => {
    const section = new Section();
    section.userId = _userId;
    section.name = _section.name;
    section.publicationId = _section.publicationId;
    return section.save();
}

export const updateSection = async (_section: SectionDTO) => {
    const section = await Section.findOneBy({id:_section.id});
    if (!section) {
        throw new Error("Section not found");
    }
    section.name = _section.name;
    section.publicationId = _section.publicationId;
    return section.save();
}

export const deleteSection = async (_id: number) => {
    const section = await Section.findOneBy({id: _id});
    if (!section) {
        throw new Error("Section not found");
    }
    return section.remove();
}

export const retrieveSection = async (_id: number) => {
    const section = await Section.findOneBy({id: _id});
    if (!section) {
        throw new Error("Section not found");
    }
    return section;
}

export const retrieveSections = async (_publicationId: number) => {
    return Section.find({ where: { publicationId: _publicationId } });
}

export default {
    createSection,
    retrieveSection,
    retrieveSections,
    updateSection,
    deleteSection,
}