import { UserModel } from "../models";

export default class UserRepository {
    static async getAll() {
        return await UserModel.find();
    }

    static async get(id: number) {
        return await UserModel.findOne({
            id: id
        });
    }

    static async create(user) {
        return await UserModel.create(user);
    }

    static async partialUpdate(user) {}

    static async update(user) {}

    static async destroy(id: number) {
        return await UserModel.remove({ _id: id });
    }

    static async login(email: string, password: string) {
        return await UserModel.findOne({ username: email, password: password });
    }
}
