module.exports = (sequelize, Sequelize) => {
    const BookAuthor= sequelize.define(
      "book_author",
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true, // Automatically gets converted to SERIAL for postgres
        },
      },
      { timestamps: false }
    );
    return BookAuthor;
  };