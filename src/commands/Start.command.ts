import { Telegraf, Context } from 'telegraf';

class StartCommand {
  private bot: Telegraf;

  constructor(bot: Telegraf) {
    this.bot = bot;
  }

  public register() {
    this.bot.start(this.handleStart);
  }

  private handleStart(ctx: Context) {
    ctx.reply('Welcome! I am your reminder bot.');
  }
}

export default StartCommand;
