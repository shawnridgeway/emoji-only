// 3p
import express = require('express')
import * as http from 'http'
import * as bodyParser from 'body-parser'
import logger from 'morgan'
import * as path from 'path'
import session from 'express-session'
import cors from 'cors'
import redis from 'redis'
import connectRedis from 'connect-redis'
import errorHandler from 'errorhandler'
import socketIo from 'socket.io'

// Project
import routes from './routes'
import getSessionConfig from './getSessionConfig'


/* --- App --- */
class App {
  private isProduction = false;
  private app: express.Express;
  private server;
  private redisClient;

  constructor(isProduction) {
    this.isProduction = isProduction
    this.app = express()
    this.server = http.createServer(this.app)
    this.redisClient = redis.createClient()
    this.configureApp()
  }

  private configureApp() {
    if (!this.isProduction) {
      this.app.use(errorHandler())
    }
    this.app.use(cors())
    this.app.use(logger('dev'))
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: false }))
    this.configureSessions()
    this.configureWs()
    this.configureRoutes()
  }

  private configureSessions() {
    const redisStore = connectRedis(session)
    this.app.use('/', session(getSessionConfig(this.redisClient, redisStore)))
  }

  private configureWs() {
    // TODO: this is kinda meh
    var io = socketIo(this.server);
    (global as any).io = io;
  }

  private configureRoutes() {
    this.app.use('/api', routes)
  }

  public listen(port, cb) {
    this.server.listen(port, cb)
  }
}

export default App
