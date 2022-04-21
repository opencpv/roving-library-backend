module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Automatically gets converted to SERIAL for postgres
    },
    Username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Password: {
      type: Sequelize.STRING(1234),
      allowNull: false,
    },
    DateOfBirth: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Xp: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    Level: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    Knowledge_Gold: {
      type: Sequelize.STRING,
      defaultValue: 0,
    },
    Avater: {
      type: Sequelize.STRING,
      defaultValue: "default image",
    },
    token: {
      type: Sequelize.TEXT ,
      allowNull:true
    },
  });
  return User;
};
