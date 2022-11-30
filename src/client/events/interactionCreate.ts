import type { CacheType, Interaction } from 'discord.js';
import EventBase from '../../utils/EventBase';
import type HalloClient from '../HalloClient';

class InteractionCreate extends EventBase {
  constructor() {
    super({ name: 'interactionCreate' });
  }

  /**
   * Execute event
   * @param client 
   * @param interaction 
   */
  public execute(client: HalloClient, interaction: Interaction<CacheType>): void {
    if (interaction.isCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (command) command.execute(client, interaction);
    }
  }
}

export default InteractionCreate;
