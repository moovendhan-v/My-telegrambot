import TelegramBot from './TelegramBot';

const startApp = async () => {
  const bot = new TelegramBot();
  await bot.init();
};

startApp();
