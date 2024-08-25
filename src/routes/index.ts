import { Router } from "express";
import userRoutes from "./users.routes";
import accountRoutes from "./accounts.routes";

const router = Router();

router.use("/users", userRoutes);
router.use("/accounts", accountRoutes);

export default router;