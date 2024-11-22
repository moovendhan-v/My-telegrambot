import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import User from '@/models/User.model';

export interface TodoAttributes {
  id: string;
  message: string;
  userId: number;
}

interface TodoCreationAttributes
  extends Optional<TodoAttributes, 'id'> { }


export default class Todo extends Model<TodoAttributes, TodoCreationAttributes> {
  public id!: string;
  public message!: string;

  static initModel(sequelize: Sequelize) {
    return Todo.init(
      {
        id: {
          type: DataTypes.UUIDV4,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        message: {
          type: DataTypes.STRING,
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
        modelName: 'Todo',
      }
    );
  }

  static associate() {
    Todo.belongsTo(User, {
      foreignKey: 'userId',
      as: 'user',
    });
  }
}
