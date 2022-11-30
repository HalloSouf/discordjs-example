import { REST, Routes } from 'discord.js';
import type HalloClient from '../client/HalloClient';
import config from '../config/config';
import type { ICommand } from '../types/utils.interface';
import Logger from '../utils/Logger';

class RestManager {
  public client: HalloClient;
  private logger: Logger = new Logger('Rest');
  private DiscordRest = new REST({ version: config.restVersion });

  constructor(client: HalloClient) {
    this.client = client;

    this.DiscordRest.setToken(process.env.CLIENT_TOKEN as string);
  }

  /**
   * Register slash commands against the Discord API
   */
  public async registerSlashCommands(): Promise<void> {
    try {
      this.logger.info('Initializing application commands.');

      if (!this.client.user?.id) throw new Error('Client user was not resolved while initializing application commands.');
      await this.DiscordRest.put(Routes.applicationCommands(this.client.user.id), {
        body: this.client.commands.all.map((command: ICommand) => command.data.toJSON())
      });

      this.logger.ready(`${this.client.commands.all.size} application commands are registered!`);
    } catch (e: unknown) {
      this.logger.error(`Error while registering slash commands: ${e}`);
    }
  }
}

export default RestManager;
