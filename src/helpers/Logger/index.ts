import { LoggerFactory } from './logger.factory';
import { APP_NAME } from '../../constants';

const Logger = LoggerFactory.configure({
  id: APP_NAME,
  level: 'all',
});

export { Logger };
