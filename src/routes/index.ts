import { Router } from "express";
import userRoutes from "./users.routes";
import accountRoutes from "./accounts.routes";
import authRoutes from "./auth.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/accounts", accountRoutes);

export default router;