import type { BitFieldResolvable, GatewayIntentsString, Interaction, SlashCommandBuilder } from 'discord.js';
import type HalloClient from 'src/client/HalloClient';

export interface IConfig {
  intents: BitFieldResolvable<GatewayIntentsString, number>;
}

export interface IEventBase {
  props: IEventBaseProps;
  execute: (...args: unknown[]) => void;
}

export interface ICommandBase {
  data: SlashCommandBuilder;
  execute: (client: HalloClient, interaction: Interaction) => void;
}

export interface IEventBaseProps {
  name: string;
  once: boolean;
}
