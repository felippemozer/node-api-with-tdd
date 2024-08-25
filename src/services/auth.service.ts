import { UserService } from ".";
import bcrypt from "bcrypt";
import jwt from "jwt-simple";

interface ILoginDTO {
    email: string;
    password: string;
}

export async function login(data: ILoginDTO): Promise<string> {
    const user = await UserService.findByEmail(data.email);
    
    if(bcrypt.compareSync(data.password, user[0].password)) {
        const payload = {
            id: user[0].id,
            name: user[0].name,
            email: user[0].email
        };

        const token = jwt.encode(payload, "secret");
        return token;
    }

    return "";
}