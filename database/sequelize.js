"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
// adapters/persistence/sequelize.ts
const sequelize_1 = require("sequelize");
exports.sequelize = new sequelize_1.Sequelize('defaultdb', 'doadmin', 'AVNS_KRvHRXzDndS1LrSv3DP', {
    host: 'db-postgresql-nyc3-28307-do-user-15995791-0.c.db.ondigitalocean.com',
    port: 25060,
    ssl: true,
    dialect: 'postgres',
});
exports.sequelize.authenticate()
    .then(() => {
    console.log('Connection has been established successfully.');
})
    .catch(err => {
    console.error('Unable to connect to the database:', err);
});
