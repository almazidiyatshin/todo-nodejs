const chalk = require('chalk');

const signalAction = (server, signal, code) => {
  console.log(chalk.magenta(`Signal is ${signal}`));
  server.close(() => {
    process.exit(code);
  });
};

module.exports = signalAction;
