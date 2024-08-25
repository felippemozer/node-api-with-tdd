import { Router } from "express";
import { findAll, save } from "../services/user.service";

const router = Router();

router.get("/", async (req, res, next) => {
    try {
        const users = await findAll();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

router.post("/", async (req, res, next) => {
    const data = req.body;
    try {
        const result = await save(data);
        res.status(201).json(result[0]);
    } catch (error) {
        next(error)
    }
});

export default router;