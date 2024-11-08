import { Request, Response } from "express";
import spoonacularProvider from "../../services/provider/spoonacular.provider";
import logger from "../../logger";
import { SearchResultsDTO } from "../dto/search-results.dto";

const search = async (req: Request, res: Response) => {
    const queryString = `query=${req.query.query}&number=${req.query.number}`;
    logger.info(`querystring = ${queryString}`);
    const data: SearchResultsDTO[] = await spoonacularProvider.searchRecipes(queryString);
    return res.success(data);
};

const getRecipeById = async (req: Request, res: Response) => {
    const recipeId = req.params.id;
    const data = await spoonacularProvider.getRecipeById(recipeId);
    return res.success(data);
};

export default {
    search,
    getRecipeById,
}