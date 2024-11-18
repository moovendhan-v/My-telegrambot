import { Telegraf, Context as TelegrafContext } from 'telegraf';
import Todo from '@/models/Todo.model';

// Extend the default Telegraf Context type to include args
declare module 'telegraf' {
  export interface Context {
    args: string[];
  }
}

class TodoCommand {
  private bot: Telegraf;
  private Todo: typeof Todo;

  constructor(bot: Telegraf, TodoModel: typeof Todo) {
    this.bot = bot;
    this.Todo = TodoModel;
  }

  public register() {
    this.bot.command('todo', this.handleRemindMe.bind(this));
  }

  private async handleRemindMe(ctx: TelegrafContext) {
    if (ctx.args.length === 0) {
      ctx.reply('Please provide a Todo text. Example: /todo Take lunch');
      return;
    }
  
    // Join the arguments (they are split by space) to form the Todo message
    const TodoText = ctx.args.join(' ');
  
    // Retrieve and convert the userId to a string
    const userId = ctx.from?.id?.toString();
  
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
