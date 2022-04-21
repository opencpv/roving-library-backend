module.exports = (sequelize, Sequelize) => {
  const Chapter = sequelize.define("chapter", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Automatically gets converted to SERIAL for postgres
    },
    bookId: {
      type: Sequelize.INTEGER,
      foreignKey:true
    },
    ChapterTitle: {
      type: Sequelize.STRING,
    },
    Content: {
      type: Sequelize.TEXT,
    },
    ChapterXp: {
      type: Sequelize.INTEGER,
    },
    ImgUrl: {
      type: Sequelize.STRING,
    },
    ImgCaption: {
      type: Sequelize.STRING,
    },
  });
  return Chapter;
};
