import { Telegraf, Context as TelegrafContext } from 'telegraf';
import initializeApp from '@/models';

const { Models } = await initializeApp();

class StartCommand {
  private bot: Telegraf;
  private models: typeof Models

  constructor(bot: Telegraf) {
    this.bot = bot;
    this.models = Models;
    this.handleStart = this.handleStart.bind(this);
  }

  public register() {
    this.bot.start(this.handleStart);
  }

  private async handleStart(ctx: TelegrafContext) {
    const userId = ctx.from?.id?.toString();
    const username = ctx.from?.username || 'Anonymous';

    if (!userId) {
      ctx.reply('Could not retrieve user information.');
      return;
    }

    try {
      // Check if the user already exists
      const [user, created] = await this.models.User.findOrCreate({
        where: { userId },
        defaults: { username },
      });

      if (!created && user.username !== username) {
        // Update username if it has changed
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
