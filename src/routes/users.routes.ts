import { Router } from "express";
import { UserService } from "../services";

const router = Router();

router.get("/", async (req, res, next) => {
    try {
        const users = await UserService.findAll();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

router.post("/", async (req, res, next) => {
    const data = req.body;
    try {
        const result = await UserService.save(data);
        res.status(201).json(result[0]);
    } catch (error) {
        next(error)
    }
});

export default router;