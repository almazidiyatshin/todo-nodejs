const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const chalk = require('chalk');

const sequelize = require('./mysql');
const signalAction = require('./public/signalActions');
const {
  handleRoot,
  handleCreate,
  handleDelete,
  handleChange,
  handleComplete,
} = require('./controllers/todo.controller');

const app = express();

const PORT = process.env.PORT ?? 3000;
const { pid } = process;

sequelize.sync()
  .then(() => {
    const server = app.listen(PORT, () => console.log(chalk.blue(`Worker started on port: ${PORT}, PID: ${pid}`)));
    app.set('view engine', 'hbs');
    app.use(express.static(path.join(__dirname, '/public')));
    app.use(bodyParser.urlencoded({ extended: false }));

    app.get('/', handleRoot);
    app.post('/create', handleCreate);
    app.post('/delete/:id', handleDelete);
    app.post('/change/:id', handleChange);
    app.post('/complete/:id', handleComplete);

    process.on('SIGINT', () => signalAction(server, 'SIGINT', 0));
    process.on('SIGTERM', () => signalAction(server, 'SIGTERM', 0));
    process.on('SIGUSR2', () => signalAction(server, 'SIGUSR2', 1));
  })
  .catch((error) => console.log(error));
