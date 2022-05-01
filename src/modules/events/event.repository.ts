import EventModel from "./event.model";

export default class EventRepository {
    static getAll() {
        return EventModel.find();
    }

    static get(id: number) {
        return EventModel.findOne({
            id: id
        });
    }

    static async create(event) {
        return EventModel.create(event);
    }

    static async partialUpdate(event) {
        return EventModel.updateOne({ _id: event.id }, { $set: event });
    }

    static async update(event) {}

    static async destroy(id: number) {}
}
