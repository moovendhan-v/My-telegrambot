import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import Reminder from '@/models/Reminder.model';

// Define the attributes for the model
export interface UserAttributes {
    id: string; // UUID
    userId: number; // The userId, which will be referenced by the Reminder model
    username: string;
    email: string;
}

// Define the creation attributes (omit 'id' since it's auto-generated)
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

export default class User extends Model<UserAttributes, UserCreationAttributes> {
    public id!: string; // UUID
    public userId!: number; // Custom userId (numeric)
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
                    unique: true, // Optional, if you want to ensure unique userId
                },
                username: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: true,
                    unique: true,
                }
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
            foreignKey: 'userId', // This matches the userId in the Reminder model
            as: 'reminders',
        });
    }
}
