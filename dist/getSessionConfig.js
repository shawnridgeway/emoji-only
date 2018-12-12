"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (redisClient, redisStore) => ({
    secret: 'process.env.SESSION_SECRET',
    store: new redisStore({
        host: 'localhost',
        port: 6379,
        client: redisClient,
        ttl: 260
    }),
    cookie: {
        path: '/',
        maxAge: null,
        httpOnly: true,
        secure: false,
        sameSite: 'Lax'
    },
    resave: false,
    saveUninitialized: true
});
//# sourceMappingURL=getSessionConfig.js.map