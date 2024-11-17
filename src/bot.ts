import { Telegraf } from 'telegraf';
import initializeApp from "@/models/index";
import TelegramBot from './TelegramBot';

// const startApp = async () => {
//   const { DbSequelize, Models } = await initializeApp();

//   console.log("Models:", Models);
//   const { Reminder } = Models;

//   await Reminder.create({ message: "Buy groceries", time: new Date() });
//   console.log("Reminder created");

//   // Set up the Telegram bot
//   const token = 'token here';
//   const bot = new Telegraf(token);

//   bot.start((ctx) => ctx.reply('Welcome! I am your reminder bot.'));
//   bot.help((ctx) => ctx.reply('What you need as help'));

//   bot.on('text', async (ctx) => {
//     const text = ctx.message.text;
//     await Reminder.create({ message: text, time: new Date() });
//     ctx.reply('Your reminder has been saved!');
//   });

//   bot.launch();
// };

// startApp();

const startApp = async () => {
  const bot = new TelegramBot();
  await bot.init();
};

startApp();
