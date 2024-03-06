"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// app.ts
const express = require("express");
const bodyParser = require('body-parser');
const TaskController_1 = require("./task/infrastructure/controllers/TaskController");
const PostegresTaskRepository_1 = require("./task/infrastructure/repositorios/PostegresTaskRepository");
const TaskService_1 = require("./task/application/services/uses-cases/TaskService");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const app = express();
const PORT = 8080;
// Dependency Injection
const taskRepository = new PostegresTaskRepository_1.PostgresUserRepository();
const taskService = new TaskService_1.TaskService(taskRepository);
// Middleware
app.use(bodyParser.json());
// Rate Limiter
const accountLimiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 60 * 1000, // 1 hora
    max: 6, // limita cada IP a 6 peticiones por el tiempo definido con "windowMs"
    message: "Demasiadas peticiones realizadas, intenta después de 1 hora"
});
// Routes
app.post('/task/register', accountLimiter, (req, res) => {
    (0, TaskController_1.registerTask)(req, res, taskRepository, taskService);
});
app.put('/task/:id', accountLimiter, (req, res) => (0, TaskController_1.updateTask)(req, res, taskRepository, taskService)); // Agrega la ruta para actualizar un usuario
app.delete('/task/:id', accountLimiter, (req, res) => (0, TaskController_1.deleteTask)(req, res, taskRepository, taskService)); // Agrega esta línea
app.get('/task', accountLimiter, (req, res) => (0, TaskController_1.getAllTask)(req, res, taskRepository, taskService));
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
