import { Telegraf, Context as TelegrafContext } from 'telegraf';
import Reminder from '@/models/Reminder.model';

// Extend the default Telegraf Context type to include args
declare module 'telegraf' {
  export interface Context {
    args: string[];
    textg: string
  }
}

class ReminderCommand {
  private bot: Telegraf;
  private Reminder: typeof Reminder;

  constructor(bot: Telegraf, ReminderModel: typeof Reminder) {
    this.bot = bot;
    this.Reminder = ReminderModel;
  }

  public register() {
    this.bot.command('remindme', this.handleRemindMe.bind(this));
  }

  private async handleRemindMe(ctx: TelegrafContext) {
    if (ctx.args.length === 0) {
      ctx.reply('Please provide a reminder text. Example: /remindme Take lunch');
      return;
    }
  
    // Join the arguments (they are split by space) to form the reminder message
    const reminderText = ctx.args.join(' ');
  
    // Ensure userId is a string (handle undefined case)
    const userId = ctx.from?.id?.toString() || '';
  
    if (!userId) return ctx.reply('Could not retrieve user information.');
  
    try {
      // Save the reminder to the database
      await this.Reminder.create({ message: reminderText, time: new Date(), userId });
      ctx.reply(`Your reminder "${reminderText}" has been saved!`);
    } catch (error) {
      console.error('Error saving reminder:', error);
      ctx.reply('Failed to save your reminder. Please try again later.');
    }
  }
  
}

export default ReminderCommand;
