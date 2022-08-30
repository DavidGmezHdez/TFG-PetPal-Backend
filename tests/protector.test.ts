import * as db from "./db/db";
import bcrypt from "bcrypt";
import { ProtectorRepository } from "@modules/protectors";

describe("ProtectorsTesting testing", () => {
    beforeAll(async () => db.connect(), 2000);

    afterEach(async () => db.clearDatabase(), 2000);

    afterAll(async () => db.closeDatabase(), 2000);
    it("Should create a protector", async () => {
        const encryptedPassword = bcrypt.hashSync("contraseña1234", 10);
        const protectorParams = {
            protector: {
                name: "TestProtector",
                email: "testprotector@test.com",
                password: encryptedPassword,
                rol: "Protectora",
                region: "Granada",
                direction: "Calle Test",
                contactPhone: "12345678"
            },
            image: null
        };
        const protectorCreated = await ProtectorRepository.create(
            protectorParams
        );

        const protectorFound = await ProtectorRepository.get(
            protectorCreated._id
        );
        expect(protectorFound.email).toEqual("testprotector@test.com");
        expect(protectorFound.name).toEqual("TestProtector");
    });

    it("Shouldn't create protector with the same email", async () => {
        const encryptedPassword = bcrypt.hashSync("contraseña1234", 10);
        const protectorParams = {
            protector: {
                name: "TestProtector",
                email: "testprotector@test.com",
                password: encryptedPassword,
                rol: "Protectora",
                region: "Granada",
                direction: "Calle Test",
                contactPhone: "12345678"
            },
            image: null
        };

        expect(async () => {
            await ProtectorRepository.create(protectorParams);
            await ProtectorRepository.create(protectorParams);
        }).rejects.toThrow();
    });

    it("Should update protector", async () => {
        const foundedUser = await ProtectorRepository.getByData(
            {
                email: "testprotector@test.com"
            },
            false
        );
        const { name } = await ProtectorRepository.partialUpdate({
            id: foundedUser._id,
            name: "NewProtectorName"
        });
        expect(name).toBe("NewProtectorName");
    });

    it("Should delete protector", async () => {
        const encryptedPassword = bcrypt.hashSync("contraseña1234", 10);
        const protectorParams = {
            protector: {
                name: "TestProtectorDelete",
                email: "testprotectordelete@test.com",
                password: encryptedPassword,
                rol: "Protectora",
                region: "Granada",
                direction: "Calle Test",
                contactPhone: "12345678"
            },
            image: null
        };
        const createdProtector = await ProtectorRepository.create(
            protectorParams
        );
        const deletedProtector = await ProtectorRepository.destroy(
            createdProtector._id
        );
        expect(async () =>
            ProtectorRepository.get(deletedProtector._id)
        ).rejects.toThrow();
    });
});
