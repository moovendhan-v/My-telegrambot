import { Telegraf, Context as TelegrafContext } from 'telegraf';
import Models from '@/models/Index'; // Import the centralized Models

declare module 'telegraf' {
  export interface Context {
    args: string[];
    userid: Number;
  }
}

class StartCommand {
  private bot: Telegraf;

  constructor(bot: Telegraf) {
    this.bot = bot;
  }

  public register() {
    this.bot.start(this.handleStart.bind(this));
  }

  private async handleStart(ctx: TelegrafContext) {

    const userId = ctx.from?.id;
    const username = ctx.from?.username || 'Anonymous';

    if (!userId) {
      ctx.reply('Could not retrieve user information.');
      return;
    }

    try {
      const UserModel = Models.User;

      const [user, created] = await UserModel.findOrCreate({
        where: { userId },
      });

      if (!created && user.username !== username) {
        await user.update({ username });
        ctx.reply(`Welcome back, ${username}! Your username has been updated.`);
      } else if (created) {
        ctx.reply(`Welcome, ${username}! Your account has been created.`);
      } else {
        ctx.reply(`Welcome back, ${username}!`);
      }
    } catch (error) {
      console.error('Error handling start command:', error);
      ctx.reply('Failed to initialize your account. Please try again later.');
    }
  }
}

export default StartCommand;
