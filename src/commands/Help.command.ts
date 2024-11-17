import { Telegraf, Context } from 'telegraf';

class HelpCommand {
  private bot: Telegraf;

  constructor(bot: Telegraf) {
    this.bot = bot;
  }

  public register() {
    this.bot.help(this.handleHelp);
  }

  private handleHelp(ctx: Context) {
    ctx.reply('What do you need help with?');
  }
}

export default HelpCommand;
