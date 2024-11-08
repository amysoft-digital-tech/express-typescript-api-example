import express from "express";
import recipeApiController from "../controller/recipe-api.controller";

export const RecipeAPIRouter = express.Router();

RecipeAPIRouter.get('/search', recipeApiController.search);
RecipeAPIRouter.get('/recipe/:id', recipeApiController.getRecipeById);