// adapters/controllers/UserController.ts
import { Request, Response } from "express";
import { UserService } from "../../application/services/uses-cases/UserService";
import { UserRepository } from "../repositorios/UserRepository";

export const registerUser = async (req: Request, res: Response, userRepository: UserRepository, userService: UserService) => {
    try {
        const newUser = await userService.createUser(req.body);
        res.status(201).json(newUser);
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        } else {
            // Manejar otros tipos de errores aquí
            res.status(500).json({ error: "Internal server error" });
        }
    }
};

export const updateUser = async (req: Request, res: Response, userRepository: UserRepository, userService: UserService) => {
    try {
        const userId = req.params.id; // Suponiendo que el id del usuario está en los parámetros de la solicitud
        const updatedUser = await userService.updateUser(userId, req.body); // Llama al método de actualización del servicio de usuarios
        res.status(200).json(updatedUser);
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        } else {
            // Manejar otros tipos de errores aquí
            res.status(500).json({ error: "Internal server error" });
        }
    }
};