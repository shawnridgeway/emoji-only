"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sequelize, DataTypes) => {
    const Message = sequelize.define('Message', {
        body: DataTypes.STRING,
    }, {});
    Message.associate = function (models) {
        Message.belongsTo(models.User, {
            as: 'author',
            foreignKey: 'authorId',
            targetKey: 'id',
        });
    };
    return Message;
};
//# sourceMappingURL=message.js.map