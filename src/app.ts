import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import routes from "./routes";
import { ApiError } from "./middlewares/errors";

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.status(200).send("OK");
});

app.use("/", routes);
app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
    const { message, status } = err;

    res.status(status).json({
        "error": message
    });
    next();
});
export default app;