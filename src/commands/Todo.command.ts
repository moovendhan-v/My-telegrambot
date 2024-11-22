import { Telegraf, Context as TelegrafContext } from 'telegraf';
import Todo from '@/models/Todo.model';

declare module 'telegraf' {
  export interface Context {
    args: string[];
    userid: Number;
  }
}

class TodoCommand {
  private bot: Telegraf;
  private Todo: typeof Todo;

  constructor(bot: Telegraf) {
    this.bot = bot;
    this.Todo = Todo;
  }

  public register() {
    this.bot.command('todo', this.handleRemindMe.bind(this));
  }

  private async handleRemindMe(ctx: TelegrafContext) {
    if (ctx.args.length === 0) {
      ctx.reply('Please provide a Todo text. Example: /todo Take lunch');
      return;
    }

    const TodoText = ctx.args.join(' ');

    const userId = ctx.from?.id;

    if (!userId) return ctx.reply('Could not retrieve user information.');

    try {
      // Save the Todo to the database
      await this.Todo.create({ message: TodoText, userId });
      ctx.reply(`Your Todo "${TodoText}" has been saved!`);
    } catch (error) {
      console.error('Error saving Todo:', error);
      ctx.reply('Failed to save your Todo. Please try again later.');
    }
  }
}

export default TodoCommand;
