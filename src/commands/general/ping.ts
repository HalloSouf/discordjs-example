import { SlashCommandBuilder } from '@discordjs/builders';
import CommandBase from '../../utils/CommandBase';

class Ping extends CommandBase {
  constructor() {
    super(
      new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Pong!')
    );
  }

  /**
   * Execute command
   */
  public execute(): void {
    console.log('Ping!');
  }
}

export default Ping;
