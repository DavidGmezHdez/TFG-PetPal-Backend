import EventModel from "./event.model";

export default class EventRepository {
    static async getAll() {
        return await EventModel.find();
    }

    static async get(id: string) {
        return await EventModel.findById(id);
    }

    static async create(event) {
        return EventModel.create(event);
    }

    static async partialUpdate(event) {
        return await EventModel.findByIdAndUpdate(
            { _id: event.id },
            { $set: event },
            { new: true }
        );
    }

    static async update(event) {
        return await EventModel.findByIdAndUpdate(
            { _id: event.id },
            { $set: event },
            { new: true }
        );
    }

    static async destroy(id: string) {
        return await EventModel.findByIdAndDelete(id);
    }
}
