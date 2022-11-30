import type { SlashCommandBuilder } from '@discordjs/builders';

class CommandBase {
  public data: SlashCommandBuilder;

  constructor(data: SlashCommandBuilder) {
    this.data = data;
  }
}

export default CommandBase;