// app.ts
import express = require("express");
const bodyParser = require('body-parser');
import { registerTask, updateTask, deleteTask, getAllTask } from "./task/infrastructure/controllers/TaskController";
import { PostgresUserRepository as PostgresTaskRepository } from "./task/infrastructure/repositorios/PostegresTaskRepository";
import { TaskService } from "./task/application/services/uses-cases/TaskService";
import rateLimit from "express-rate-limit";

const app = express();
const PORT = 8080;

// Dependency Injection
const taskRepository = new PostgresTaskRepository();
const taskService = new TaskService(taskRepository);

// Middleware
app.set('trust proxy', true);
app.use(bodyParser.json());

// Rate Limiter
const accountLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hora
    max: 6, // limita cada IP a 6 peticiones por el tiempo definido con "windowMs"
    message: "Demasiadas peticiones realizadas, intenta después de 1 hora"
});

// Routes
app.post('/task/register', accountLimiter, (req: express.Request, res: express.Response) => {
    registerTask(req, res, taskRepository, taskService);
});
app.put('/task/:id', accountLimiter, (req: express.Request, res: express.Response) => updateTask(req, res, taskRepository, taskService)); // Agrega la ruta para actualizar un usuario
app.delete('/task/:id', accountLimiter, (req: express.Request, res: express.Response) => deleteTask(req, res, taskRepository, taskService)); // Agrega esta línea
app.get('/task', accountLimiter, (req: express.Request, res: express.Response) => getAllTask(req, res, taskRepository, taskService));

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
