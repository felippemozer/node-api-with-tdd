import supertest from "supertest";
import app from "../src/app";
import jwt from "jwt-simple";
import { UserService } from "../src/services";

const req = supertest(app);
let user: {
    email: string;
    token: string;
};

beforeAll(async () => {
    const res = await UserService.save({
        email: `${Date.now()}@email.com`,
        name: "Teste",
        password: "123456"
    });
    user = {
        ...res[0],
        token: jwt.encode(user, "secret")
    };

});

test("Must get all users", async () => {
    const res = await req.get("/users").set("Authorization", `Bearer ${user.token}`);
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThanOrEqual(0);
    expect(res.body[0]).not.toHaveProperty("password");
});

test("Must create an user", async () => {
    const newUser = {
        name: "Teste",
        email: `${Date.now()}@email.com`,
        password: "123456"
    };

    const res = await req.post("/users").set("Authorization", `Bearer ${user.token}`).send(newUser);
    
    expect(res.status).toBe(201);
    expect(res.body.name).toEqual("Teste");
    expect(res.body).not.toHaveProperty("password");
});

test("Cannot insert user without a name", async () => {
    const invalidUser = {
        email: `${Date.now()}@email.com`,
        password: "123456"
    };
    const res = await req.post("/users").set("Authorization", `Bearer ${user.token}`).send(invalidUser);
    expect(res.status).toBe(422);
    expect(res.body.error).toBe("Name is required");
});

test("Cannot insert user without an email", async () => {
    const invalidUser = {
        name: "Teste",
        password: "123456"
    };
    const res = await req.post("/users").set("Authorization", `Bearer ${user.token}`).send(invalidUser);
    expect(res.status).toBe(422);
    expect(res.body.error).toBe("Email is required");
});

test("Cannot insert user without a password", async () => {
    const invalidUser = {
        name: "Teste",
        email: `${Date.now()}@email.com`,
    };
    const res = await req.post("/users").set("Authorization", `Bearer ${user.token}`).send(invalidUser);
    expect(res.status).toBe(422);
    expect(res.body.error).toBe("Password is required");
});

test("Cannot insert an user with an existent email", async () => {
    const existentUser = {
        name: "Teste",
        email: `${Date.now()}@email.com`,
        password: "123456"
    };
    await req.post("/users").set("Authorization", `Bearer ${user.token}`).send(existentUser);
    const res = await req.post("/users").set("Authorization", `Bearer ${user.token}`).send(existentUser);
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("User already exists");
});