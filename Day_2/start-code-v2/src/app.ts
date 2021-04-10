import express from "express";
import dotenv from "dotenv";
dotenv.config()  // Loads environment variables
import path from "path"

// import facade from './facades/DummyDB-Facade';

// Debug - was used for the simple middleware (debug)
// const debug = require('debug')('app')

// To be able to use the express framework
const app = express()

import friendRoutes from "./routes/FriendRoutes";
import { ApiError } from "./errors/apiError";
import simpleLogger from './middleware/simpleLogger'

import { Request, Response } from 'express'

// manual way of writting the code without npm install cors
//  import myCors from './middleware/myCors'
// app.use(myCors)

// npm install cors
// const Cors = require('cors')
import cors from 'cors' // npm i --save-dev @types/cors
app.use(cors())


// A logger for just about anything
import logger, { stream } from "./middleware/logger";


const morganFormat = process.env.NODE_ENV == "production" ? "combined" : "dev"

app.use(require("morgan")(morganFormat, { stream }));
logger.log("info", "Server started");


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

// Something has to go in here
//app.use('/static', express.static('public')
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

// Default 404-handler for api-requests
app.use('/api', (req, res, next) => {
  res.status(404).json({
    errorCode: 404,
    msg: '404 file not found'
  })
})

// Makes JSON error-response for ApiErrors, otherwise pass on to default error handleer
app.use((error: Error, req: Request, res: Response, next: Function) => {
  if (error instanceof (ApiError)) {
    res.status(error.errorCode).json({
      errorCode: 404,
      msg: error.message
    })

  } else {
    next(error) // Express default error handler will handle this
  }
})


export default app;
