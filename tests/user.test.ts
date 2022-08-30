import * as db from "./db/db";
import bcrypt from "bcrypt";
import { UserRepository } from "@modules/users";

beforeAll(async () => await db.connect(), 2000);

afterEach(async () => await db.clearDatabase(), 2000);

afterAll(async () => await db.closeDatabase(), 2000);

describe("Users creation", () => {
    it("Should create an user", async () => {
        const encryptedPassword = bcrypt.hashSync("contraseña1234", 10);
        const userParams = {
            user: {
                name: "TestUser",
                email: "testemail@test.com",
                password: encryptedPassword,
                rol: "Usuario"
            },
            image: null
        };
        const userCreated = await UserRepository.create(userParams);

        const userFound = await UserRepository.get(userCreated._id);
        expect(userFound.email).toEqual("testemail@test.com");
        expect(userFound.name).toEqual("TestUser");
    });
});
