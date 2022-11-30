import { Client, ClientOptions } from 'discord.js';
import { join } from 'node:path';
import EventHandler from '../utils/EventHandler';
import Logger from '../utils/Logger';

class HalloClient extends Client {
  public logger: Logger = new Logger('Client');

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
    new EventHandler(this, join(__dirname, './events/')).load();
  }
}

export default HalloClient;