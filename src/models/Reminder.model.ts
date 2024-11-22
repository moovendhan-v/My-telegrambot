import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import DbSequelize from '@/config/db';

interface ReminderAttributes {
  id: string;
  message: string;
  time: Date;
  userId: number;
}

interface ReminderCreationAttributes
  extends Optional<ReminderAttributes, 'id'> { }

class Reminder
  extends Model<ReminderAttributes, ReminderCreationAttributes>
  implements ReminderAttributes {
  public id!: string;
  public message!: string;
  public time!: Date;
  public userId!: number;

  static initModel(sequelize: Sequelize) {
    return Reminder.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        message: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        time: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize: DbSequelize,
        timestamps: true,
        modelName: 'Reminder',
      }
    );
  }

}

export default Reminder;