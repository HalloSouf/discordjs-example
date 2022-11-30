import { SlashCommandBuilder } from '@discordjs/builders';
import type { CacheType, ChatInputCommandInteraction } from 'discord.js';
import type HalloClient from '../../client/HalloClient';
import config from '../../config/config';
import CommandBase from '../../utils/CommandBase';

class Ping extends CommandBase {
  constructor() {
    super(
      new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Pong!')
    );
  }

  /**
   * Execute command
   * @param client 
   * @param interaction 
   */
  public execute(client: HalloClient, interaction: ChatInputCommandInteraction<CacheType>): void {
    interaction.reply({
      embeds: [{
        color: config.mainColor,
        title: 'Pong!',
        description: `🏓 It took **${client.ws.ping}ms** to respond to your command!`
      }]
    });
  }
}

export default Ping;
