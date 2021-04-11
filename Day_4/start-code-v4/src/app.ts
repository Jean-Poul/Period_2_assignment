import express, { NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config()  // Loads environment variables
import path from "path"

// import facade from './facades/DummyDB-Facade';

// Debug - was used for the simple middleware (debug)
// const debug = require('debug')('app')



import friendRoutes from "./routes/friendRoutesAuth";
import { ApiError } from "./errors/apiError";
import simpleLogger from './middleware/simpleLogger'

import { Request, Response } from 'express'

// manual way of writting the code without npm install cors
//  import myCors from './middleware/myCors'
// app.use(myCors)

// To be able to use the express framework
const app = express()

// npm install cors
// const Cors = require('cors')
/* import cors from 'cors' // npm i --save-dev @types/cors
app.use(cors()) */

// Adding a piece of middleware
// This is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json());

/**
 * Middleware (remember it is important to put it in the right order to load)
 */
/* app.use((req, res, next) => {
  debug(console.log(`Time: ${new Date().toLocaleDateString()} - Type:  ${req.method} - URL ${req.originalUrl} - IP ${req.ip} `));
  next();
}) */
app.use(simpleLogger)

// A logger for just about anything
//WINSTON/MORGAN-LOGGER (Use ONLY one of them)
// import logger, { stream } from "./middleware/logger";
// const morganFormat = process.env.NODE_ENV == "production" ? "combined" : "dev"
// app.use(require("morgan")(morganFormat, { stream }));
// app.set("logger", logger) 
//The line above sets the logger as a global key on the application object
//You can now use it from all your middlewares like this req.app.get("logger").log("info","Message")
//Level can be one of the following: error, warn, info, http, verbose, debug, silly
//Level = "error" will go to the error file in production



//app.use('/static', express.static('public')
// cwd() = current working directory
app.use(express.static(path.join(process.cwd(), "public"))) // So I can access files from the outside

// Auth middleware import
// import authMiddleware from './middleware/basic-auth'
// app.use('/', authMiddleware)

// Middleware for all friend endpoints
// app.use("/api/friends", myCors)

app.use("/api/friends", friendRoutes)

/**
 * GET METHOD for demo
 */
app.get("/demo", (req, res) => {
  const demo = 'Server is up';
  console.log(demo);
  res.send("Server is up");
})

// For auth test
/* app.get('/me', (req: any, res) => {
  const user = req.credentials
  res.json(user)
}) */



/**
 * Middleware for error handling
 */
/* app.use((req, res, next) => {
  if(req.originalUrl.startsWith('/api')){
    res.status(404).json({
      code: 404,
      msg: 'This API does not contain this endpoint'
     })
  }
}) */
// Default 404-handler for api-requests
app.use('/api', (req, res, next) => {
  res.status(404).json({
    errorCode: 404,
    msg: '404 file not found'
  })
})

// Makes JSON error-response for ApiErrors, otherwise pass on to default error handleer
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof (ApiError)) {
    res.status(error.errorCode).json({
      errorCode: error.errorCode,
      msg: error.message
    })

  } else {
    next(error) // Express default error handler will handle this
  }
})


export default app;
