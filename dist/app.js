"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// 3p
const express = require("express");
const http = __importStar(require("http"));
const bodyParser = __importStar(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
const redis_1 = __importDefault(require("redis"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const errorhandler_1 = __importDefault(require("errorhandler"));
const socket_io_1 = __importDefault(require("socket.io"));
// Project
const routes_1 = __importDefault(require("./routes"));
const getSessionConfig_1 = __importDefault(require("./getSessionConfig"));
/* --- App --- */
class App {
    constructor(isProduction) {
        this.isProduction = false;
        this.isProduction = isProduction;
        this.app = express();
        this.server = http.createServer(this.app);
        this.redisClient = redis_1.default.createClient();
        this.configureApp();
    }
    configureApp() {
        if (!this.isProduction) {
            this.app.use(errorhandler_1.default());
        }
        this.app.use(cors_1.default());
        this.app.use(morgan_1.default('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.configureSessions();
        this.configureWs();
        this.configureRoutes();
    }
    configureSessions() {
        const redisStore = connect_redis_1.default(express_session_1.default);
        this.app.use('/', express_session_1.default(getSessionConfig_1.default(this.redisClient, redisStore)));
    }
    configureWs() {
        // TODO: this is kinda meh
        var io = socket_io_1.default(this.server);
        global.io = io;
    }
    configureRoutes() {
        this.app.use('/api', routes_1.default);
    }
    listen(port, cb) {
        this.server.listen(port, cb);
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map