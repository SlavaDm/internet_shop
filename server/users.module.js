export default (sequelize, Sequelize) => {
  const Users = sequelize.define(
    'users',
    {
      uid: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      role: {
        type: Sequelize.STRING,
      },
    },
    { timestamps: false, freezeTableName: true }
  );

  return Users;
};
