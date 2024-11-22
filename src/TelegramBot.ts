import { Telegraf } from 'telegraf';
import StartCommand from '@/commands/Start.command';
import HelpCommand from '@/commands/Help.command';
import ReminderCommand from '@/commands/Reminder.command';
import TodoCommand from '@/commands/Todo.command';
import VideoCommand from '@/commands/Video.command';
import { Config } from "@/config/config";

class TelegramBot {
  private bot: Telegraf;
  private token: string = Config.TELEGRAM_TOKEN;

  constructor() {
    this.bot = new Telegraf(this.token);
  }

  public async init() {
    this.setUpCommands();
    this.startBot();
  }

  private setUpCommands() {
    const startCommand = new StartCommand(this.bot);
    const helpCommand = new HelpCommand(this.bot);
    const reminderCommand = new ReminderCommand(this.bot);
    const todoCommand = new TodoCommand(this.bot);
    const videoCommand = new VideoCommand(this.bot);

    startCommand.register();
    helpCommand.register();
    reminderCommand.register();
    todoCommand.register();
    videoCommand.register();
  }

  private async startBot() {
    try {
      await this.bot.launch();
      console.log('Bot is running...');
    } catch (err) {
      console.error('Error launching bot:', err);
    }
  }
}

export default TelegramBot;
