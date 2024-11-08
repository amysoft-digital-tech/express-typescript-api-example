import express from "express";
import sectionControlller from "../controller/section.controlller";
import session from "../../middleware/session";

export const SectionRouter = express.Router();

SectionRouter.get("/", session.checkIfSessionExists, sectionControlller.getSections);
SectionRouter.get("/:id", session.checkIfSessionExists, sectionControlller.getSection);
SectionRouter.get("/set/:id", session.checkIfSessionExists, sectionControlller.setSection);

SectionRouter.post("/", session.checkIfSessionExists, sectionControlller.createSection);

SectionRouter.put("/:id", session.checkIfSessionExists, sectionControlller.updateSection);

SectionRouter.delete("/:id", session.checkIfSessionExists, sectionControlller.deleteSection);
