"use strict";
module.exports = (io) => {
    io.on('connection', socket => {
        socket.on('disconnect', socket => {
            // socket.off('new-message')
        });
        socket.on('new-message', message => {
            io.emit('new-message', message);
        });
    });
};
//# sourceMappingURL=getWsRoutes.js.map