import { UserModel } from "@modules/users";
import { InternalError, NotFoundError } from "@utils/errors";
import EventModel from "./event.model";

export default class EventRepository {
    static async getAll() {
        const events = await EventModel.find().lean().sort({ date: -1 });
        if (!events.length) throw new NotFoundError(`No events available`);
        const finalEvents = this.fetchUserDataEvents(events);
        return finalEvents;
    }

    static async get(id: string) {
        const event = await EventModel.findById(id);
        if (!event) throw new NotFoundError(`No event available`);
        return event;
    }

    static async create(event) {
        const foundEvent = await EventModel.findOne({
            title: event.title
        });
        if (foundEvent)
            throw new InternalError("Ya existe un evento con ese nombre");
        const createdEvent = await EventModel.create(event);
        const host = await UserModel.findOne(event.host._id).lean();
        const formatedEvent = { ...createdEvent._doc, host: host };
        return formatedEvent;
    }

    static async partialUpdate(event) {
        const updatedEvent = await EventModel.findByIdAndUpdate(
            { _id: event.id },
            { $set: event },
            { new: true }
        ).lean();
        if (!updatedEvent) throw new NotFoundError(`Event doesn't exist`);
        const finalEvent = this.fetchUserDataEvent(updatedEvent);
        return finalEvent;
    }

    static async update(event) {
        const updatedEvent = await EventModel.findByIdAndUpdate(
            { _id: event.id },
            { $set: event },
            { new: true }
        ).lean();
        if (!updatedEvent) throw new NotFoundError(`Event doesn't exist`);
        const finalEvent = this.fetchUserDataEvent(updatedEvent);
        return finalEvent;
    }

    static async destroy(id: string) {
        const deletedEvent = await EventModel.findByIdAndDelete(id);
        if (!deletedEvent) throw new NotFoundError(`No existe tal evento`);

        await UserModel.updateMany(
            { attendingEvents: { $elemMatch: { $eq: id } } },
            { $pull: { attendingEvents: { $in: [id] } } }
        );
        return deletedEvent;
    }

    static async fetchUserDataEvents(events) {
        const finalEvents: any[] = [];
        for (const event of events) {
            const host = await UserModel.findOne(event.host._id).lean();
            const attendants = [];
            for (const atten of event.attendants) {
                attendants.push(await UserModel.findOne(atten._id).lean());
            }
            const updatedEvent = {
                ...event,
                host: host,
                attendants: attendants
            };
            finalEvents.push(updatedEvent);
        }

        return finalEvents;
    }

    static async fetchUserDataEvent(event) {
        const host = await UserModel.findOne(event.host._id).lean();
        const attendants = [];
        for (const atten of event.attendants) {
            attendants.push(await UserModel.findOne(atten._id).lean());
        }
        const updatedEvent = {
            ...event,
            host: host,
            attendants: attendants
        };

        return updatedEvent;
    }
}
