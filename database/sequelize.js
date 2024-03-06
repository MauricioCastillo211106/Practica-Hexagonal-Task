"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
// adapters/persistence/sequelize.ts
const sequelize_1 = require("sequelize");
exports.sequelize = new sequelize_1.Sequelize('hex_demo', 'postgres', 'Hotel123', {
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
exports.sequelize.authenticate()
    .then(() => {
    console.log('Connection has been established successfully.');
})
    .catch(err => {
    console.error('Unable to connect to the database:', err);
});
