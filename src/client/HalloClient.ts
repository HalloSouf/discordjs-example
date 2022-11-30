import { Client, ClientOptions } from 'discord.js';
import { join } from 'node:path';
import CommandManager from '../managers/CommandManager';
import EventManager from '../managers/EventManager';
import RestManager from '../managers/RestManager';
import Logger from '../utils/Logger';

class HalloClient extends Client {
  public logger: Logger = new Logger('Client');
  public commands: CommandManager = new CommandManager(this);
  public events: EventManager = new EventManager(this);
  public restApi: RestManager = new RestManager(this);

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
    this.commands.load(join(__dirname, '../commands/'));
    this.events.load(join(__dirname, './events/'));
  }
}

export default HalloClient;
