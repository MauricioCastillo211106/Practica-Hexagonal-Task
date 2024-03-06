// adapters/persistence/sequelize.ts
import { Sequelize } from 'sequelize';
import TaskModel from '../task/domain/entities/TasksModel'

export const sequelize = new Sequelize('hex_demo', 'postgres', 'Hotel123', {
    host: 'hotel-mantenimiento.cp2u8yo0qyl1.us-east-1.rds.amazonaws.com',
    port: 5432,
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // You should use true in production and provide the CA cert
        }
    }
});

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });