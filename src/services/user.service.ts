import knex from "knex";
import knexfile from "../../knexfile";
import { ApiError } from "../middlewares/errors";
import bcrypt from "bcrypt";

const client = knex(knexfile).table("users");

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

export async function findAll() {
    return await client.select(["id", "email", "name"]);
}

export async function findByEmail(email: string) {
    const result = await client.where({email}).select(["id", "email", "name"]);
    return result[0];
}

export async function save(data: ISaveInputDTO) {
    if(!data.name) {
        throw new ApiError(422, "Name is required");
    }
    if(!data.email) {
        throw new ApiError(422, "Email is required");
    }
    if(!data.password) {
        throw new ApiError(422, "Password is required");
    }
    const salt = bcrypt.genSaltSync();
    const encryptedPassword = bcrypt.hashSync(data.password, salt);
    try {
        const users = await client.insert({
            ...data,
            password: encryptedPassword
        }, ["id", "email", "name"]);
        return users;
    } catch {
        throw new ApiError(400, "User already exists");
    }
}