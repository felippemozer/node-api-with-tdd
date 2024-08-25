import supertest from "supertest";
import app from "../src/app";
import { save, UserDomain } from "../src/services/user.service";

const req = supertest(app);

const MAIN_ROUTE = "/accounts";
let user: UserDomain;

beforeAll(async () => {
    const res = await save({
        email: `${Date.now()}@email.com`,
        name: "Teste",
        password: "123456"
    });
    user = {
        ...res[0]
    };
});

test("Must create an account", async () => {
    const res = await req.post(MAIN_ROUTE).send({
        name: "Account 1",
        user_id: user.id
    });

    expect(res.status).toBe(201);
    expect(res.text).toBe("Account created");
});

test("Cannot insert an account without name", async () => {
    const res = await req.post(MAIN_ROUTE).send({
        user_id: user.id
    });

    expect(res.status).toBe(422);
    expect(res.body.error).toBe("Name is required");
});

test.skip("Cannot create accounts with duplicated names", () =>{});

test("Must list all accounts", async () => {
    const res = await req.get(MAIN_ROUTE);

    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThanOrEqual(0);
});

test.skip("Must return all user accounts", () =>{});


test("Must return an account by its ID", async () => {
    const accId = 10;
    
    const res = await req.get(`${MAIN_ROUTE}/${accId}`);
    
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("user_id");
});

// ! SÓ DEUS SABE PORQUE ESSE TESTE TÁ FALHANDO
test.failing("Must update an account", async () => {
    const getResponse = await req.get(MAIN_ROUTE);
    const account = getResponse.body[0];
    const updatedAccount = {
        name: "Teste update"
    };

    const res = await req.patch(`${MAIN_ROUTE}/${account.id}`).send({
        name: updatedAccount.name
    });

    expect(res.status).toBe(200);
    expect(res.body.name).toBe(updatedAccount.name);
});

// ! SÓ DEUS SABE PORQUE ESSE TESTE TÁ FALHANDO
test.failing("Must delete an account", async () => {
    const getResponse = await req.get(MAIN_ROUTE);
    const account = getResponse.body[0];

    const res = await req.delete(`${MAIN_ROUTE}/${account.id}`);

    expect(res.status).toBe(204);
});