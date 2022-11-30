import EventBase from '../../utils/EventBase';
import type HalloClient from '../HalloClient';

class Ready extends EventBase {
  constructor() {
    super({ name: 'ready', once: true });
  }

  /**
   * Execute event
   * @param client
   */
  public execute(client: HalloClient): void {
    client.restApi.registerSlashCommands();

    client.logger.info(`${client.user?.tag} is online!`);
  }
}

export default Ready;
