import { Telegraf } from 'telegraf';
import initializeApp from "@/models/index";
import StartCommand from '@/commands/Start.command';
import HelpCommand from '@/commands/Help.command';
import ReminderCommand from '@/commands/Reminder.command';
import TodoCommand from '@/commands/Todo.command';

class TelegramBot {
    private bot: Telegraf;
    private token: string = 'token'; // TODO: Get this from env
    private models: any;

    constructor() {
        this.bot = new Telegraf(this.token);
        console.log('bot', this.bot)
    }

    public async init() {
        const { Models } = await initializeApp();
        console.log('Models', Models)
        this.models = Models;
        this.setUpCommands();
        this.startBot();
    }

    private setUpCommands() {
        const startCommand = new StartCommand(this.bot);
        const helpCommand = new HelpCommand(this.bot);
        const reminderCommand = new ReminderCommand(this.bot, this.models.Reminder);
        const todoCommand = new TodoCommand(this.bot, this.models.Todo);

        startCommand.register();
        helpCommand.register();
        reminderCommand.register();
        todoCommand.register();
    }

    private async startBot() {
        try {
            await this.bot.launch();
            console.log("Bot is running...");
        } catch (err) {
            console.error("Error launching bot:", err);
        }
    }
}

export default TelegramBot;
