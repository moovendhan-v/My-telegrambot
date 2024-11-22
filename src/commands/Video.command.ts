import { Telegraf, Context as TelegrafContext } from 'telegraf';
import Session from '@/models/Session.model';

declare module 'telegraf' {
  export interface Context {
    args: string[];
    textg: string;
    userid: Number;
  }
}

class VideoCommand {
  private bot: Telegraf;
  private SessionModels: typeof Session;

  constructor(bot: Telegraf) {
    this.bot = bot;
    this.SessionModels = Session;
  }

  public register() {
    this.bot.command('getvideo', this.handleGetVideo.bind(this));
  }

  private async handleGetVideo(ctx: TelegrafContext) {
    if (!ctx.args || ctx.args.length === 0) {
      ctx.reply(
        'Please provide the video URL. Example: /getvideo https://google.com/'
      );
      return;
    }

    const videoUrl = ctx.args[0];
    const userId = ctx.from?.id;

    if (!userId) {
      ctx.reply('Could not retrieve chat information.');
      return;
    }

    const values = {
      type: "Video",
      data: {
        uri: videoUrl
      }
    };

    try {
      const session = await this.SessionModels.create({
        userId,
        type: 'VIDEO',
        values,
        status: 'pending',
        expiresAt: new Date(Date.now() + 3600 * 1000),
      });

      ctx.reply(`Your session has been created! Session ID: ${session.id}`);
    } catch (error) {
      console.error('Error creating session:', error);
      ctx.reply('Failed to create session. Please try again later.');
    }
  }
}

export default VideoCommand;
