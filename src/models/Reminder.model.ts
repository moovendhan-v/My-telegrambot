import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

// Define the attributes for the model
export interface ReminderAttributes {
  id: number;
  message: string;
  time: Date;
}

// Define the creation attributes (without the `id` field, which is auto-generated)
interface ReminderCreationAttributes extends Optional<ReminderAttributes, 'id'> {}

export default class Reminder extends Model<ReminderAttributes, ReminderCreationAttributes> {
  public id!: number;
  public message!: string;
  public time!: Date;

  static initModel(sequelize: Sequelize) {
    return Reminder.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        message: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        time: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: 'Reminder',
      }
    );
  }
}
