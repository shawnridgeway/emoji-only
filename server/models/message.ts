export default (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    body: DataTypes.STRING,
    // authorId: {
    //    type: DataTypes.INTEGER,
    //    references: {
    //       model: 'Users', 
    //       key: 'id', 
    //    }
    // }
  }, {});
  Message.associate = function(models) {
    Message.belongsTo(models.User, {
      as: 'author',
      foreignKey: 'authorId',
      targetKey: 'id',
    });
  };
  return Message;
};