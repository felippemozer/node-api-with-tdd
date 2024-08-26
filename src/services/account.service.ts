import knex from "knex";
import knexfile from "../../knexfile";
import { ApiError } from "../middlewares/errors";

const client = knex(knexfile).table("accounts");

export interface ISaveInputDTO {
    name: string;
    userId: number;
}

export interface IUpdateInputDTO {
    name: string;
}

export async function findAll() {
    return client.select();
}

export async function findAllByUser(userId: string) {
    return client.where({"user_id": userId}).select();
}

export async function findById(id: string) {
    const account = await client.select().where("id", id);
    return account[0];
}

export async function save(data: ISaveInputDTO) {
    if(!data.name) {
        throw new ApiError(422, "Name is required");
    }
    try {
        const accounts = await client.insert({
            name: data.name,
            user_id: data.userId
        }, "*");
        return accounts;
    } catch {
        throw new ApiError(400, "Account already exists");
    }
}

export async function update(id: string, data: IUpdateInputDTO) {
    const result = await client.where({id}).update({
        name: data.name
    }, "*");
    return result[0];
}

export async function remove(id: string) {
    await client.where("id", id).del();
}