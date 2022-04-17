import { EventModel } from "../models";

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

    static async partialUpdate(event) {}

    static async update(event) {}

    static async destroy(id: number) {}
}
