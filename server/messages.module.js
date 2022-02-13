export default (sequelize, Sequelize) => {
  const Messages = sequelize.define(
    'messages',
    {

      room_id: {
        type: Sequelize.INTEGER,
      },
      message: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      creating_time: {
        type: Sequelize.INTEGER,
      },
    },
    { timestamps: false, freezeTableName: true }
  );

  return Messages;
};
