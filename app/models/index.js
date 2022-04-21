const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// import all models
db.user = require("./user.model.js")(sequelize, Sequelize);
db.category = require("./category.model.js")(sequelize, Sequelize);
db.book = require("./book.model.js")(sequelize, Sequelize);
db.chapter = require("./chapter.model.js")(sequelize, Sequelize);
db.author = require("./author.model.js")(sequelize, Sequelize);


// books categories relationship (many to many)
db.book_category = require("./book_category.model.js")(sequelize, Sequelize);
(db.book).belongsToMany(db.category,{through : db.book_category,foreignKey:'BookId'});
(db.category).belongsToMany(db.book,{through : db.book_category,foreignKey:'CategoryId'});

// books author relationship
db.book_author = require("./book_author.model ")(sequelize,Sequelize);
(db.book).hasOne(db.author,{through : db.book_author,foreignKey:'BookId'});
(db.author).belongsToMany(db.book,{through : db.book_author,foreignKey:'AuthorId'});


//export db object
module.exports = db;
