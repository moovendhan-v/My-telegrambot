import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import User from '@/models/User.model';

// Define the attributes for the model
export interface TodoAttributes {
    id: string;
    message: string;
    userId: number
}

// Define the creation attributes (omit 'id' since it's auto-generated)
interface TodoCreationAttributes extends Optional<TodoAttributes, 'id'> { }

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

    // Define relationships
    static associate() {
        Todo.belongsTo(User, {
            foreignKey: 'userId',
            as: 'user',
        });
    }

}
