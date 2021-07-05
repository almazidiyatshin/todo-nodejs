const cluster = require('cluster');
const os = require('os');
const chalk = require('chalk');

const { pid } = process;

if (cluster.isMaster) {
  const cpusCount = os.cpus().length;
  console.log(chalk.cyan(`Master started. CPUS count: ${cpusCount}. PID: ${pid}`));
  for (let i = 0; i < cpusCount - 1; i += 1) {
    cluster.fork();
  }
  cluster.on('exit', (worker, code) => {
    console.log(chalk.red(`Worker died. PID: ${worker.process.pid}. CODE: ${code}`));
    if (code === 1) {
      cluster.fork();
    }
  });
} else if (cluster.isWorker) {
  require('./worker');
}
