export default (sequelize, Sequelize) => {
  const Rooms = sequelize.define(
    'rooms',
    {
      name: {
        type: Sequelize.STRING,
      },
    },
    { timestamps: false, freezeTableName: true }
  );

  return Rooms;
};
