export default (sequelize, Sequelize) => {
  const Products = sequelize.define(
    'products',
    {
      type: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.DOUBLE,
      },
      image_link: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
    },
    { timestamps: false, freezeTableName: true }
  );

  return Products;
};
