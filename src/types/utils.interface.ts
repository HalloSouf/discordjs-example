import type { BitFieldResolvable, GatewayIntentsString, Interaction, SlashCommandBuilder } from 'discord.js';
import type HalloClient from '../client/HalloClient';

export interface IConfig {
  intents: BitFieldResolvable<GatewayIntentsString, number>;
  environment: string;
  restVersion: '10' | '9';
}

export interface IEvent {
  props: IEventBaseProps;
  execute: (...args: unknown[]) => void;
}

export interface ICommand {
  data: SlashCommandBuilder;
  execute: (client: HalloClient, interaction: Interaction) => void;
}

export interface IEventBaseProps {
  name: string;
  once: boolean;
}
