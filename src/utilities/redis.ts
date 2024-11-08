import { Tedis } from "tedis";

export const redisClient = new Tedis({
    host: process.env.AMYSOFT_PROJECT_ONE_REDIS_HOST,
    port: parseInt(process.env.AMYSOFT_PROJECT_ONE_REDIS_PORT),
});