import supertest from "supertest";
import app from "../src/app";

const req = supertest(app);

test("Must answer on 3001", async () => {
    const res = await req.get("/");
    expect(res.status).toBe(200);
});