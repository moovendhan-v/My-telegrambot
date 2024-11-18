import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import User from '@/models/User.model';

export interface ReminderAttributes {
  id: string;
  message: string;
  time: Date;
  userId: number; // userId as numeric type to match the User model
}

interface ReminderCreationAttributes extends Optional<ReminderAttributes, 'id'> {}

export default class Reminder extends Model<ReminderAttributes, ReminderCreationAttributes> {
  public id!: string;
  public message!: string;
  public time!: Date;
  public userId!: number; // Foreign key referencing the userId in User model

  static initModel(sequelize: Sequelize) {
    return Reminder.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
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
          type: DataTypes.BIGINT,
          allowNull: false,
          references: {
            model: 'Users',
            key: 'userId',
          },
          onDelete: 'CASCADE',
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: 'Reminder',
      }
    );
  }

  // Define relationships
  static associate() {
    Reminder.belongsTo(User, {
      foreignKey: 'userId',
      as: 'user', // The alias used to refer to the related User
    });
  }
}
