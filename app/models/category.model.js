module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define("category", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true // Automatically gets converted to SERIAL for postgres
    },
    CategoryTitle: {
      type: Sequelize.STRING,
    },
    CategoryImg: {
        type: Sequelize.STRING,
      },
  });
  return Category;
};