import { readdirSync } from 'node:fs';
import { join, sep } from 'node:path';
import type { ICommand } from '../types/utils.interface';
import type HalloClient from '../client/HalloClient';
import { Collection } from 'discord.js';

class CommandManager {
  public client: HalloClient;
  private commands: Collection<string, ICommand> = new Collection();

  constructor(client: HalloClient) {
    this.client = client;
  }

  /**
   * Get command instance
   * @param name Command name
   */
  public get(name: string): ICommand | undefined {
    return this.commands.get(name);
  }

  /**
   * Get all registered commands
   */
  public get all(): Collection<string, ICommand> {
    return this.commands;
  }

  /**
   * Load all commands from directory
   */
  public load(dir: string): void {
    readdirSync(dir).forEach(async (subDir: string): Promise<void> => {
      const commands = readdirSync(`${dir}${sep}${subDir}${sep}`);

      for (const file of commands) {
        const commandInstance = await import(join(dir, subDir, file));
        const command: ICommand = new commandInstance.default;

        if (command.data.name && typeof (command.data.name) === 'string') {
          if (this.commands.get(command.data.name)) return this.client.logger.error(`Two or more commands have the same name ${command.data.name}`);
          this.commands.set(command.data.name, command);
        }
      }
    });
  }
}

export default CommandManager;
