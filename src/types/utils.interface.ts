import type { BitFieldResolvable, GatewayIntentsString } from 'discord.js';

export interface IConfig {
  intents: BitFieldResolvable<GatewayIntentsString, number>;
}

export interface IEventBase {
  props: IEventBaseProps;
  execute: (...args: unknown[]) => void;
}

export interface IEventBaseProps {
  name: string;
  once: boolean;
}