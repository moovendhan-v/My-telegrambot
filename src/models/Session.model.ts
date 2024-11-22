import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import User from '@/models/User.model';

export interface SessionAttributes {
  id: string;
  userId: number;
  type: string;
  status: string;
  expiresAt: Date;
  values: {
    type: string;
    data: any;
  };
}

interface SessionCreationAttributes
  extends Optional<SessionAttributes, 'id'> { }

export default class Session extends Model<SessionAttributes, SessionCreationAttributes> {
  public id!: string;
  public userId!: number;
  public type!: string;
  public expiresAt!: Date;
  public values!: JSON;

  static initModel(sequelize: Sequelize) {
    return Session.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
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
        type: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        values: {
          type: DataTypes.JSONB,
          defaultValue: '{}'
        },
        status: {
          type: DataTypes.TEXT,
          defaultValue: 'ACTIVE',
          allowNull: false,
        },
        expiresAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: 'Session',
      }
    );
  }

  static associate() {
    Session.belongsTo(User, {
      foreignKey: 'userId',
      as: 'user',
    });
  }
}
