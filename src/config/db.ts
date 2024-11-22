import { Sequelize } from 'sequelize';

const DbSequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './data.sqlite',
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

export default DbSequelize;