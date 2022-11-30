import { Client, ClientOptions, Collection } from 'discord.js';
import { join } from 'node:path';
import CommandHandler from '../utils/CommandHandler';
import EventHandler from '../utils/EventHandler';
import Logger from '../utils/Logger';

class HalloClient extends Client {
  public logger: Logger = new Logger('Client');
  public commands: Collection<string, unknown> = new Collection();

  constructor(options: ClientOptions) {
    super(options);

    this.init();
  }

  /**
   * Authenticate Discord bot connection
   * @param token Discord bot token
   */
  public async authenticate(token: string): Promise<void> {
    try {
      this.logger.info(`Initializing client with token ${token.substring(0, 5)}.****`);
      await this.login(token);
    } catch (e: unknown) {
      this.logger.error(`Error while initializing client: ${e}`);
    }
  }

  /**
   * Initialise client modules
   */
  private init(): void {
    new CommandHandler(this, join(__dirname, '../commands/')).load();
    new EventHandler(this, join(__dirname, './events/')).load();
  }
}

export default HalloClient;