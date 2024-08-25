import { Router } from "express";
import { AuthService } from "../services";
import { authenticate } from "../passport";

const router = Router();

router.use(authenticate);

router.post("/login", async (req, res, next) => {
    const data = req.body;
    try {
        const result = await AuthService.login(data);
        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
});

export default router;