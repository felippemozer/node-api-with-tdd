import { Router } from "express";
import { findAll, save } from "../services/user.service";

const router = Router();

router.get("/", async (req, res) => {
    const users = await findAll();
    res.status(200).json(users);
});

router.post("/", async (req, res) => {
    const data = req.body;
    try {
        const result = await save(data);
        res.status(201).json(result[0]);
    } catch (error) {
        const err = error as Error;
        if (err.message.includes("required")) {
            res.status(422).send(err.message);
            return;
        }
        res.status(400).send(err.message);
        return;
    }
});

export default router;