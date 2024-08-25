import { Router } from "express";
import { findAll, findById, remove, save, update } from "../services/account.service";

const router = Router();

router.get("/", async (req, res) => {
    const accounts = await findAll();
    res.status(200).json(accounts);
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const account = await findById(id);
    res.status(200).json(account);
});

router.post("/", async (req, res) => {
    const data = req.body;
    try {
        await save({
            name: data.name,
            userId: data.user_id
        });
        res.status(201).send("Account created");
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

router.patch("/:id", async (req, res) => {
    const { name } = req.body;
    const id = req.params.id;

    const account = await update(id, {
        name
    });

    res.status(200).json(account);
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;

    await remove(id);

    res.status(204).end();
})

export default router;
