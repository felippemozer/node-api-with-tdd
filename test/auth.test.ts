import supertest from "supertest";
import app from "../src/app";
import { UserService } from "../src/services";

const req = supertest(app);

test("Must login with success", async () => {
    const user = await UserService.save({
        name: "Walter White",
        email: `walterwhite-${Date.now()}@email.com`,
        password: "123456"
    });

    const res = await req.post("/auth/login").send({
        email: user[0].email,
        password: user[0].password
    });
    
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
});

