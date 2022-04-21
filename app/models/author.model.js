module.exports = (sequelize, Sequelize) => {
    const Author = sequelize.define("author", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true // Automatically gets converted to SERIAL for postgres
      },
      AuthorName: {
        type: Sequelize.STRING,
      }
    });
    return Author;
  };