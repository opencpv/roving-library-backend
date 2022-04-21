module.exports = (sequelize, Sequelize) => {
    const BookCategory = sequelize.define(
      "book_category",
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true, // Automatically gets converted to SERIAL for postgres
        },
      },
      { timestamps: false }
    );
    return BookCategory;
  };