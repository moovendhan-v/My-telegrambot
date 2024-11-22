import { Telegraf, Context as TelegrafContext, Markup } from 'telegraf';
import Reminder from '@/models/Reminder.model';

declare module 'telegraf' {
  export interface Context {
    args: string[];
    textg: string;
    userid: Number;
  }
}

class ReminderCommand {
  private bot: Telegraf;
  private Reminder: typeof Reminder;

  constructor(bot: Telegraf) {
    this.bot = bot;
    this.Reminder = Reminder;
  }

  public register() {
    // Register command handlers
    this.bot.command('remindme', this.handleRemindMe.bind(this));
    this.bot.command('getreminder', this.handleGetReminder.bind(this));
  
    this.bot.action(/^delete_\d+$/, this.handleDeleteReminder.bind(this));
  }
  

  private async handleRemindMe(ctx: TelegrafContext) {
    if (ctx.args.length === 0) {
      ctx.reply(
        'Please provide a reminder text. Example: /remindme Take lunch'
      );
      return;
    }

    const reminderText = ctx.args.join(' ');

    const userId = ctx.from?.id;

    if (userId === undefined) {
      return ctx.reply('Could not retrieve user information.');
    }

    try {
      await this.Reminder.create({
        message: reminderText,
        time: new Date(),
        userId,
      });
      ctx.reply(`Your reminder "${reminderText}" has been saved!`);
    } catch (error) {
      console.error('Error saving reminder:', error);
      ctx.reply('Failed to save your reminder. Please try again later.');
    }
  }

  private async handleGetReminder(ctx: TelegrafContext) {
    const userId = ctx.from?.id;
    if (!userId) return ctx.reply('User ID not found.');
  
    try {
      const reminders = await Reminder.findAll({ where: { userId } });
      if (reminders.length === 0) return ctx.reply('No reminders available.');
  
      const buttons = reminders.map((reminder) => [
        Markup.button.callback(`Delete: ${reminder.message}`, `delete_${reminder.id}`),
      ]);
  
      return ctx.reply('Your reminders:', Markup.inlineKeyboard(buttons));
    } catch (error) {
      console.error('Error fetching reminders:', error);
      ctx.reply('Internal server error.');
    }
  }
  
  
  private async handleDeleteReminder(ctx: TelegrafContext) {
    const userId = ctx.from?.id;
    const callbackQuery = ctx.callbackQuery;
  
    if (!callbackQuery || !('data' in callbackQuery)) {
      return ctx.reply('Invalid action.');
    }
  
    const callbackData = callbackQuery.data;
    const reminderId = callbackData.split('_')[1];
  
    if (!reminderId) {
      return ctx.reply('Reminder ID not found.');
    }
  
    try {
      const deletedCount = await Reminder.destroy({
        where: { userId, id: reminderId },
      });
  
      if (deletedCount > 0) {
        await ctx.answerCbQuery('Reminder removed successfully.');
        await ctx.editMessageText('Reminder removed successfully.');
      } else {
        await ctx.answerCbQuery('No matching reminder found to delete.');
      }
    } catch (error) {
      console.error('Error deleting reminder:', error);
      await ctx.answerCbQuery('Internal server error.');
    }
  }
  
  
}

export default ReminderCommand;
