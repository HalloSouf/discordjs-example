import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import type HalloClient from 'src/client/HalloClient';
import type { IEventBase } from 'src/types/utils.interface';

class EventHandler {
  public client: HalloClient;
  public dir: string;

  constructor(client: HalloClient, dir: string) {
    this.client = client;
    this.dir = dir;
  }

  /**
   * Load all events from directory
   */
  public load(): void {
    readdirSync(this.dir).forEach(async (file: string): Promise<void> => {
      const eventInstance = await import(join(this.dir, file));
      const event: IEventBase = new eventInstance.default;
      
      if (event.props.once) {
        this.client.once(event.props.name, (...args) => event.execute(...args));
        return;
      }
      
      this.client.on(event.props.name, (...args) => event.execute(...args));
    });
  }
}

export default EventHandler;