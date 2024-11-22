import User from '@/models/User.model';
import Reminder from '@/models/Reminder.model';
import Session from '@/models/Session.model';
import Todo from '@/models/Todo.model';
import ErrorLog from '@/models/Errorlog.model';
import DbSequelize from '@/config/db';

const Models = {
    User: User.initModel(DbSequelize),
    Reminder: Reminder.initModel(DbSequelize),
    Session: Session.initModel(DbSequelize),
    Todo: Todo.initModel(DbSequelize),
    ErrorLog: ErrorLog.initModel(DbSequelize)
};

// Set up associations
Object.values(Models).forEach((model) => {
    if ('associate' in model) {
        (model as any).associate(Models);
    }
});

export { DbSequelize, Models };
export default Models;