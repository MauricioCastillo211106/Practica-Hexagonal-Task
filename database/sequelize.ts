// adapters/persistence/sequelize.ts
import { Sequelize } from 'sequelize';
import TaskModel from '../task/domain/entities/TasksModel'

export const sequelize = new Sequelize('hex_demo', 'doadmin', 'AVNS_KRvHRXzDndS1LrSv3DP', {
    host: 'db-postgresql-nyc3-28307-do-user-15995791-0.c.db.ondigitalocean.com',
    port: 25060,
    database: "defaultdb",
    ssl: true,
    dialect: 'postgres',
});

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });