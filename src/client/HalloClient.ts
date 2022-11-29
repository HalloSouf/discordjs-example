import { Client, ClientOptions } from 'discord.js';
import Logger from '../utils/Logger';

class HalloClient extends Client {
  private logger: Logger = new Logger('Client');

  constructor(options: ClientOptions) {
    super(options);
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
}

export default HalloClient;