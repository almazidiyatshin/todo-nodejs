const Sequelize = require('sequelize');

const sequelize = new Sequelize('testdb', 'test', 'test12345', {
  dialect: 'mysql',
  define: {
    timestamps: false,
  },
});

const Todo = sequelize.define('todo', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  completed: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});

module.exports = sequelize;
module.exports = Todo;
