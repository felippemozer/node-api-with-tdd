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

test("Cannot login when password is wrong", async () => {
    const user = await UserService.save({
        name: "Walter White",
        email: `walterwhite-${Date.now()}@email.com`,
        password: "123456"
    });

    const res = await req.post("/auth/login").send({
        email: user[0].email,
        password: "654321"
    });
    
    expect(res.status).toBe(401);
    expect(res.body.error).toHaveProperty("Email or password is wrong");
});

test("Cannot login when email is wrong", async () => {
    const user = await UserService.save({
        name: "Walter White",
        email: `walterwhite-${Date.now()}@email.com`,
        password: "123456"
    });

    const res = await req.post("/auth/login").send({
        email: user[0].email,
        password: "654321"
    });
    
    expect(res.status).toBe(401);
    expect(res.body.error).toHaveProperty("Email or password is wrong");
});

test("Cannot access a protected route without token", async () => {
    const res = await req.get("/users");

    expect(res.status).toBe(401);
    expect(res.body.error).toBe("Unauthorized");
})