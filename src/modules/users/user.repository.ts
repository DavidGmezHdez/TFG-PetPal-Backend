import { InternalError, NotFoundError } from "@utils/errors";
import UserModel from "./user.model";

export default class UserRepository {
    static async getAll() {
        const users = await UserModel.find();
        if (!users.length) throw new NotFoundError(`No users available`);
        return users;
    }

    static async get(id: string) {
        const user = await UserModel.findById(id);
        if (!user) throw new NotFoundError(`No user available`);
        return user;
    }

    static async create(user) {
        const foundUser = await UserModel.findOne({ email: user.email });
        if (foundUser)
            throw new InternalError("User with that email already exists");
        const createdUser = await UserModel.create(user);
        return createdUser;
    }

    static async partialUpdate(user) {
        const updatedUser = await UserModel.findByIdAndUpdate(
            { _id: user.id },
            { $set: user },
            { new: true }
        );
        if (!updatedUser) throw new NotFoundError(`User doesn't exist`);
        return updatedUser;
    }

    static async update(user) {
        const updatedUser = await UserModel.findByIdAndUpdate(
            { _id: user.id },
            { $set: user },
            { new: true }
        );
        if (!updatedUser) throw new NotFoundError(`User doesn't exist`);
        return updatedUser;
    }

    static async destroy(id: string) {
        const deletedUser = await UserModel.findByIdAndDelete(id);
        if (!deletedUser) throw new NotFoundError(`User doesn't exist`);
        return deletedUser;
    }

    static async login(email: string, password: string) {
        return await UserModel.findOne({ username: email, password: password });
    }
}
