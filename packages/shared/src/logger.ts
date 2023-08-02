import log4js from 'log4js';
import path from 'path';

const getInvocationDirPath = (): string => {
  if (!require.main?.filename) throw new Error('Missing require.main.filename');
  const invocationDirPath = path.resolve(
    path.dirname(require.main.filename),
    '../../..'
  );
  if (!invocationDirPath) throw new Error('Missing invocation dir path');
  return invocationDirPath;
};

log4js.configure({
  appenders: {
    execution: {
      type: 'file',
      filename: path.resolve(getInvocationDirPath(), 'data/execution.log'),
    },
  },
  categories: { default: { appenders: ['execution'], level: 'info' } },
});

const logger = log4js.getLogger('execution');

export default logger;
