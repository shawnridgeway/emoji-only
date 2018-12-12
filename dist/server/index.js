"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
// 3p
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const bodyParser = require("body-parser");
const logger = require("morgan");
const session = require("express-session");
const cors = require("cors");
const redis = require("redis");
const connectRedis = require("connect-redis");
const errorHandler = require("errorhandler");
// Project
const routes = require('./routes');
const getSessionConfig = require('./getSessionConfig');
const port = process.env.API_PORT || 8000;
const isProduction = process.env.NODE_ENV === 'production';
const redisStore = connectRedis(session);
const redisClient = redis.createClient();
const app = express();
// app.use(cookieParser('process.env.SESSION_SECRET'))
app.use('/', session(getSessionConfig(redisClient, redisStore)));
if (!isProduction) {
    app.use(errorHandler());
}
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', routes);
const server = http.createServer(app);
const io = socketIo(server);
io.on('connection', socket => {
    socket.on('disconnect', socket => {
        socket.off('new-message');
    });
    socket.on('new-message', message => {
        io.emit('new-message', message);
    });
});
server.listen(port, () => console.log(`Listening on port: ${port}`));
//# sourceMappingURL=index.js.map