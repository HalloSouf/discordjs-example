import type { IConfig } from '../types/utils.interface';

const config: IConfig = {
  intents: ['Guilds'],
  environment: process.env.APP_ENV || 'development',
  restVersion: '10',
  mainColor: 0x41b59a
};

export default config;
