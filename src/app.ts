import { config as insertEnv } from 'dotenv';
import HalloClient from './client/HalloClient';
import config from './config/config';
insertEnv();

const client: HalloClient = new HalloClient({
  intents: config.intents
});

client
  .authenticate(process.env.CLIENT_TOKEN as string);