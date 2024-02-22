// adapters/persistence/sequelize.ts
import { Sequelize } from 'sequelize';
import TaskModel from '../task/domain/entities/TasksModel'

export const sequelize = new Sequelize('hex_demo', 'postgres', '040902', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
});

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });