import runAgent from './domain/use-cases/run-agent';

console.log(
  `App running under pid ${process.pid} in ${process.env.NODE_ENV || ''} mode`
);

process.once('SIGUSR2', function () {
  console.log('Gracefully shutting down from SIGUSR2 (nodemon)');
  process.kill(process.pid, 'SIGUSR2');
  process.exit(0);
});

process.on('SIGINT', function () {
  console.log('Gracefully shutting down from SIGINT (Ctrl-C)');
  process.kill(process.pid, 'SIGINT');
  process.exit(0);
});

runAgent()
  .then(() => {
    console.log('Agent finished running');
  })
  .catch((error) => {
    console.error(error);
  });
