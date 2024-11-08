import { Page } from "../entities/page.entity";
import { CreatePageDTO } from "../dto/create-page.dto";
import { PageDTO } from "../dto/page.dto";

const retrievePage = (_id: number) => {
    return Page.findOneBy({id: _id});
}

const retrievePages = (_sectionId: number) => {
    return Page.findBy({sectionId: _sectionId});
}

const createPage = (_userId: number, _page: CreatePageDTO) => {
    const page = new Page();
    page.userId = _userId;
    page.name = _page.name;
    page.content = _page.content;
    page.sectionId = _page.sectionId

    return Page.save(page);
}

const deletePage = async (_id: number) => {
    const page = await Page.findOneBy({id: _id});
    if (!page) {
        return;
    }
    page.remove();
}

const updatePage = async (_page: PageDTO) => {
    const page = await Page.findOneBy({id: _page.id});
    if (!page) {
        return;
    }
    page.name = _page.name;
    page.content = _page.content;    
    page.save();
}

export {
    createPage,
    retrievePage,
    retrievePages,
    updatePage,
    deletePage,
}
export default {
    createPage,
    retrievePage,
    retrievePages,
    updatePage,
    deletePage,
}