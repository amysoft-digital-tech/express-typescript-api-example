import express from 'express';
import { UsersRouter } from './user/routes/user.routes';
import { PublicationRouter } from './publication/routes/publication.routes';
import { PageRouter } from './page/routes/page.routes';
import { SectionRouter } from './section/routes/section.routes';
import { SubsectionRouter } from './subsection/routes/subsection.routes';

export const IndexRouter = express.Router();
IndexRouter.use('/users', UsersRouter);
IndexRouter.use('/publications', PublicationRouter);
IndexRouter.use('/pages', PageRouter);
IndexRouter.use('/sections', SectionRouter);
IndexRouter.use('/subsections', SubsectionRouter);


