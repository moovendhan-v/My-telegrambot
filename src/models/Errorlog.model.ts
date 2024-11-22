import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

interface ErrorLogAttributes {
  id: string;
  message: string;
  stack: string;
  statusCode: number;
  isOperational: boolean;
  timestamp: Date;
}

interface ErrorLogCreationAttributes extends Optional<ErrorLogAttributes, 'id'> { }

class ErrorLog extends Model<ErrorLogAttributes, ErrorLogCreationAttributes> {
  public id!: string;
  public message!: string;
  public stack!: string;
  public statusCode!: number;
  public isOperational!: boolean;
  public timestamp!: Date;

  static initModel(sequelize: Sequelize) {
    return ErrorLog.init(
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
        stack: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        statusCode: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        isOperational: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        timestamp: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        tableName: 'error_logs',
        timestamps: false,
      }
    );
  }
}

export default ErrorLog;
