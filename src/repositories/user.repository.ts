import { UserModel } from "../models";

export default class UserRepository {
    static getAll() {
        return UserModel.find();
    }

    static get(id: number) {
        return UserModel.findOne(
            {
                id: id
            }
        );
    }

    static async create(user) {
        return UserModel.create(user);
    }

    static async partialUpdate(user) { }

    static async update(user) { }

    static async destroy(id: number) { }

    static async login() { }
}
