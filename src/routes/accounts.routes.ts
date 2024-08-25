import { Router } from "express";
import { AccountService } from "../services";


const router = Router();

router.get("/", async (req, res, next) => {
    try {
        const accounts = await AccountService.findAll();
        res.status(200).json(accounts);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    const id = req.params.id;
    try {
        const account = await AccountService.findById(id);
        res.status(200).json(account);
    } catch (error) {
        next(error);
    }
});

router.post("/", async (req, res, next) => {
    const data = req.body;
    try {
        await AccountService.save({
            name: data.name,
            userId: data.user_id
        });
        res.status(201).send("Account created");
    } catch (error) {
        next(error);
    }
});

router.patch("/:id", async (req, res, next) => {
    const { name } = req.body;
    const id = req.params.id;

    try {
        const account = await AccountService.update(id, {
            name
        });
        res.status(200).json(account);
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", async (req, res, next) => {
    const id = req.params.id;

    try {
        await AccountService.remove(id);
        res.status(204).end();
    } catch (error) {
        next(error);
    }
})

export default router;
