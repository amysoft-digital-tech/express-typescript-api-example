import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { IndexRouter } from "./routes";
import logger from "./logger";
import onHeaders from "on-headers";
import { AppSessionDTO } from "./common/dto/app-session.dto";
import { ApiErrorHandler } from "./middleware/error/handler/api-error.handler";
require("express-async-errors");

const logHeaders = (req: Request, res: Response, next: NextFunction) => {
    onHeaders(res, () => {
        const headers = res.getHeaders();
        logger.info(`[Middleware] Log Header Sent`);
        logger.info(JSON.stringify(headers));
    });
    next();
}
declare global {
    namespace Express {
        export interface locals {
            session: AppSessionDTO
        }
        export interface Response {
            success(data: any): Response;
            created(data?: any): Response;
            noContent(): Response;
        }
    }
}
const app: Application = express();
const corsOptions = {
  origin: 'https://dev.amysoft.tech',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-api-amysoft'],
  credentials: true,
  optionsSuccessStatus: 204
};
const corsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  logger.info(`cors middleware`);
  const allowedOrigins = ['https://dev.amysoft.tech', 'https://api.amysoft.tech'];
  let requestOrigin;
	if(req.headers.origin === undefined) {
    const referer = req.headers.referer;
    const url = new URL(referer);
    requestOrigin = `${url.protocol}//${url.host}`;
  } else {
    requestOrigin = req.headers.origin;
  }


  logger.info(`cors requested origin = ${requestOrigin}`);
	if(requestOrigin && allowedOrigins.includes(requestOrigin)) {
    res.setHeader('Access-Control-Allow-Origin', requestOrigin);    
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Api-Key, X-Amz-Security-Token, Origin, Accept');
    logger.info(`cors middleware set headers`);
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    } else {
      next();
    }
  } else {
    res.sendStatus(403);
  }
};

app.use((req: Request, res: Response, next: NextFunction) => {
    res.success = function (_data: any) {
      return res.status(200).json(_data);
    };
  
    res.created = function (_data?: any) {
      return res.status(201).json(_data);
    };
  
    res.noContent = function () {
      return res.status(204).json();
    };
  
    next();
});
//app.use(corsMiddleware);

app.use(cookieParser('8c8544ee-bf41-46ac-8037-8c93b7b3c06b'));
app.use(bodyParser.json());
//app.use(logHeaders);
app.use(cors<Request>(corsOptions));
app.options('*', cors<Request>(corsOptions));
app.use("/pwabuilder", IndexRouter);

app.use(ApiErrorHandler);

export default app;