import * as db from "./db/db";
import bcrypt from "bcrypt";
import { UserRepository } from "@modules/users";

describe("Users testing", () => {
    beforeAll(async () => db.connect(), 2000);

    afterEach(async () => db.clearDatabase(), 2000);

    afterAll(async () => db.closeDatabase(), 2000);
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

    it("Shouldn't create an user with the same email", async () => {
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

        expect(async () => {
            await UserRepository.create(userParams);
            await UserRepository.create(userParams);
        }).rejects.toThrow();
    });

    it("Should update user", async () => {
        const foundedUser = await UserRepository.getByData(
            {
                email: "testemail@test.com"
            },
            false
        );
        const { name } = await UserRepository.partialUpdate({
            id: foundedUser._id,
            name: "NewName"
        });
        expect(name).toBe("NewName");
    });

    it("Should delete user", async () => {
        const encryptedPassword = bcrypt.hashSync("contraseña1234", 10);
        const userParams = {
            user: {
                name: "TestUserDelete",
                email: "testemaildelete@test.com",
                password: encryptedPassword,
                rol: "Usuario"
            },
            image: null
        };
        const createdUser = await UserRepository.create(userParams);
        const deletedUser = await UserRepository.destroy(createdUser._id);
        expect(async () =>
            UserRepository.get(deletedUser._id)
        ).rejects.toThrow();
    });
});
