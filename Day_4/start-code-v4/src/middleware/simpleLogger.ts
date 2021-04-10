const debug = require('debug')('app')
import { Request, Response } from "express";

const simpleLogger = function (req: Request, res: Response, next: Function) {
    debug(`Time: ${new Date().toLocaleDateString()} - Type:  ${req.method} - URL ${req.originalUrl} - IP ${req.ip} `)
    next();
}

export default simpleLogger;