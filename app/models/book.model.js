module.exports = (sequelize, Sequelize) => {
    const Book = sequelize.define("book", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Automatically gets converted to SERIAL for postgres
      },
      Title: {
        type: Sequelize.STRING,
      },
      Author: {
        type: Sequelize.STRING,
      },
      Difficulty: {
        type: Sequelize.STRING,
      },
      Synopsis: {
        type: Sequelize.TEXT,
      },
      PublishedYear: {
        type: Sequelize.INTEGER,
      },
      ImgUrl: {
        type: Sequelize.STRING,
      },
      Reads: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
  
      },
      BookXp: {
        type: Sequelize.INTEGER,
        defaultValue: 2000,
      },
      KnowledgeGold: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
  
    });
    return Book;
  };