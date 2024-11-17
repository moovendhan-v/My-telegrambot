import { Telegraf } from 'telegraf';
import initializeApp from "@/models/index";
import StartCommand from '@/commands/Start.command';
import HelpCommand from '@/commands/Help.command';

class TelegramBot {
    private bot: Telegraf;
    private token: string = 'TELEGRAM_BOT_TOKEN'; // TODO: Get this from env
    private models: any;

    constructor() {
        this.bot = new Telegraf(this.token);
    }

    public async init() {
        const { Models } = await initializeApp();
        this.models = Models;
        this.setUpCommands();
        this.startBot();
    }

    private setUpCommands() {
        const startCommand = new StartCommand(this.bot);
        const helpCommand = new HelpCommand(this.bot);
        // TODO: Update this reminder command in seprate file
        // const reminderCommand = new ReminderCommand(this.bot, this.models.Reminder);

        startCommand.register();
        helpCommand.register();
        // reminderCommand.register();
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
