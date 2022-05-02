import { InternalError, NotFoundError } from "@utils/errors";
import EventModel from "./event.model";

export default class EventRepository {
    static async getAll() {
        const events = await EventModel.find();
        if (!events.length) throw new NotFoundError(`No events available`);
        return events;
    }

    static async get(id: string) {
        const event = await EventModel.findById(id);
        if (!event) throw new NotFoundError(`No event available`);
        return event;
    }

    static async create(event) {
        const foundEvent = await EventModel.findOne({
            email: event.title
        });
        if (foundEvent)
            throw new InternalError("Event with that title already exists");
        const createdUser = await EventModel.create(event);
        return createdUser;
    }

    static async partialUpdate(event) {
        const updatedEvent = await EventModel.findByIdAndUpdate(
            { _id: event.id },
            { $set: event },
            { new: true }
        );
        if (!updatedEvent) throw new NotFoundError(`Event doesn't exist`);
        return updatedEvent;
    }

    static async update(event) {
        const updatedEvent = await EventModel.findByIdAndUpdate(
            { _id: event.id },
            { $set: event },
            { new: true }
        );
        if (!updatedEvent) throw new NotFoundError(`Event doesn't exist`);
        return updatedEvent;
    }

    static async destroy(id: string) {
        const deletedEvent = await EventModel.findByIdAndDelete(id);
        if (!deletedEvent) throw new NotFoundError(`Event doesn't exist`);
        return deletedEvent;
    }
}
