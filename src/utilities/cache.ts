import NodeCache from "node-cache";

export const appCache = new NodeCache({stdTTL: 0 });