export default (sequelize, Sequelize) => {
  const FirebaseTokens = sequelize.define(
    'firebase_tokens',
    {
      uid: {
        type: Sequelize.STRING,
      },
      token: {
        type: Sequelize.STRING,
      },
    },
    { timestamps: false, freezeTableName: true }
  );

  return FirebaseTokens;
};
