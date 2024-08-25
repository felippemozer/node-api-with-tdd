import express from "express";
import bodyParser from "body-parser";
import routes from "./routes";

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.status(200).send("OK");
});

app.use("/", routes);
export default app;