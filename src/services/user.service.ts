import knex from "knex";
import knexfile from "../../knexfile";

const client = knex(knexfile).table("users");

export async function findAll() {
    return await client.select();
}

export interface UserDomain{
    email: string;
    name: string;
    id: string;
    password: string;
}

export interface ISaveInputDTO {
    email: string,
    name: string,
    password: string
}

export async function save(data: ISaveInputDTO) {
    if(!data.name) {
        throw new Error("name is required");
    }
    if(!data.email) {
        throw new Error("email is required");
    }
    if(!data.password) {
        throw new Error("password is required");
    }
    try {
        const users = await client.insert(data, "*");
        return users;
    } catch {
        throw new Error("user already exists");
    }
}