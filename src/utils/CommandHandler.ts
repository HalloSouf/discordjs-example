import { readdirSync } from 'node:fs';
import { join, sep } from 'node:path';
import type { ICommandBase } from '../types/utils.interface';
import type HalloClient from '../client/HalloClient';

class CommandHandler {
  public client: HalloClient;
  public dir: string;

  constructor(client: HalloClient, dir: string) {
    this.client = client;
    this.dir = dir;
  }

  /**
   * Load all commands from directory
   */
  public load(): void {
    readdirSync(this.dir).forEach(async (dir: string) => {
      const commands = readdirSync(`${this.dir}${sep}${dir}${sep}`);

      for (const file of commands) {
        const commandInstance = await import(join(this.dir, dir, file));
        const command: ICommandBase = new commandInstance.default;

        if (command.data.name && typeof (command.data.name) === 'string') {
          if (this.client.commands.get(command.data.name)) return this.client.logger.error(`Two or more commands have the same name ${command.data.name}`);
          this.client.commands.set(command.data.name, command);
        }
      }
    });
  }
}

export default CommandHandler;