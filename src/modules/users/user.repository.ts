import UserModel from "./user.model";

export default class UserRepository {
    static async getAll() {
        return await UserModel.find();
    }

    static async get(id: string) {
        return await UserModel.findById(id);
    }

    static async create(user) {
        return await UserModel.create(user);
    }

    static async partialUpdate(user) {
        return await UserModel.findByIdAndUpdate(
            { _id: user.id },
            { $set: user },
            { new: true }
        );
    }

    static async update(user) {
        return await UserModel.findByIdAndUpdate(
            { _id: user.id },
            { $set: user },
            { new: true }
        );
    }

    static async destroy(id: string) {
        return await UserModel.findByIdAndDelete(id);
    }

    static async login(email: string, password: string) {
        return await UserModel.findOne({ username: email, password: password });
    }
}
