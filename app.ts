// app.ts
import express from "express";
import bodyParser from 'body-parser';
import { registerUser,updateUser } from "./task/infrastructure/controllers/UserController";
import { PostgresUserRepository } from "./task/infrastructure/repositorios/PostegresUserRepository";
import { UserService } from "./task/application/services/uses-cases/UserService";

const app = express();
const PORT = 3000;

// Dependency Injection
const userRepository = new PostgresUserRepository();
const userService = new UserService(userRepository);

// Middleware
app.use(bodyParser.json());

// Routes
app.post('/user/register', (req, res) => registerUser(req, res, userRepository, userService));
app.put('/user/:id', (req, res) => updateUser(req, res, userRepository, userService)); // Agrega la ruta para actualizar un usuario

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
