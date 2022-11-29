import type { BitFieldResolvable, GatewayIntentsString } from 'discord.js';

export interface IConfig {
  intents: BitFieldResolvable<GatewayIntentsString, number>;
}