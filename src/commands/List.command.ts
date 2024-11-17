// import { Telegraf, Context } from 'telegraf';

// class ListCommand {
//   private bot: Telegraf;
//   private Reminder: any;

//   constructor(bot: Telegraf, Reminder: any) {
//     this.bot = bot;
//     this.Reminder = Reminder;
//   }

//   public register() {
//     this.bot.command('list', this.handleList);
//   }

//   private async handleList(ctx: Context) {
//     const reminders = await this.Reminder.findAll();
//     const reminderMessages = reminders.map(r: => `${r.id}. ${r.message} at ${r.time}`).join('\n');
//     ctx.reply(reminderMessages || 'No reminders set.');
//   }
// }

// export default ListCommand;
