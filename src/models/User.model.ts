import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import Reminder from '@/models/Reminder.model';

export interface UserAttributes {
  id: string;
  userId: number;
  username: string;
  email: string;
}

interface UserCreationAttributes
  extends Optional<UserAttributes, 'id'> { }


export default class User extends Model<UserAttributes, UserCreationAttributes> {
  public id!: string;
  public userId!: number;
  public username!: string;
  public email!: string;

  static initModel(sequelize: Sequelize) {
    return User.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.BIGINT,
          allowNull: false,
          unique: true,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: true,
          unique: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: 'User',
      }
    );
  }

  // Define relationships
  static associate() {
    User.hasMany(Reminder, {
      foreignKey: 'userId',
      as: 'reminders',
    });
  }
}
