import supertest from "supertest";
import app from "../src/app";

const req = supertest(app);

test("Must get all users", async () => {
    const res = await req.get("/users");
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThanOrEqual(0);
    expect(res.body[0]).not.toHaveProperty("password");
});

test("Must create an user", async () => {
    const user = {
        name: "Teste",
        email: `${Date.now()}@email.com`,
        password: "123456"
    };

    const res = await req.post("/users").send(user);
    
    expect(res.status).toBe(201);
    expect(res.body.name).toEqual("Teste");
    expect(res.body).not.toHaveProperty("password");
});

test("Cannot insert user without a name", async () => {
    const user = {
        email: `${Date.now()}@email.com`,
        password: "123456"
    };
    const res = await req.post("/users").send(user);
    expect(res.status).toBe(422);
    expect(res.body.error).toBe("Name is required");
});

test("Cannot insert user without an email", async () => {
    const user = {
        name: "Teste",
        password: "123456"
    };
    const res = await req.post("/users").send(user);
    expect(res.status).toBe(422);
    expect(res.body.error).toBe("Email is required");
});

test("Cannot insert user without a password", async () => {
    const user = {
        name: "Teste",
        email: `${Date.now()}@email.com`,
    };
    const res = await req.post("/users").send(user);
    expect(res.status).toBe(422);
    expect(res.body.error).toBe("Password is required");
});

test("Cannot insert an user with an existent email", async () => {
    const user = {
        name: "Teste",
        email: `${Date.now()}@email.com`,
        password: "123456"
    };
    await req.post("/users").send(user);
    const res = await req.post("/users").send(user);
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("User already exists");
});