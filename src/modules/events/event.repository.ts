import { UserModel } from "@modules/users";
import { InternalError, NotFoundError } from "@utils/errors";
import EventModel from "./event.model";

export default class EventRepository {
    static async getAll() {
        const events = await EventModel.find({
            date: { $gt: Date.now() }
        })
            .lean()
            .sort({ date: -1 })
            .populate("host");
        if (!events.length) throw new NotFoundError(`No events available`);
        return events;
    }

    static async get(id: string) {
        const event = await EventModel.findById(id);
        if (!event) throw new NotFoundError(`No event available`);
        return event;
    }

    static async getByData(data) {
        console.log(data);
        const filterOptions = data.title.length
            ? {
                  ...data,
                  title: {
                      $regex: data.title,
                      $options: "i"
                  }
              }
            : { ...data, title: undefined };
        console.log(filterOptions);
        const events = await EventModel.find()
            .lean()
            .sort({ date: -1 })
            .populate("host");
        if (!events) throw new NotFoundError(`No events available`);
        return events;
    }

    static async create(event) {
        const foundEvent = await EventModel.findOne({
            title: event.title
        });
        if (foundEvent)
            throw new InternalError("Ya existe un evento con ese nombre");
        const createdEvent = await EventModel.create(event);
        const host = await UserModel.findById(createdEvent.host).lean();
        const formatedEvent = { ...createdEvent._doc, host: host };
        return formatedEvent;
    }

    static async partialUpdate(event) {
        const updatedEvent = await EventModel.findByIdAndUpdate(
            { _id: event.id },
            { $set: event },
            { new: true }
        )
            .lean()
            .populate("host")
            .populate("attendants");
        if (!updatedEvent) throw new NotFoundError(`Event doesn't exist`);
        return updatedEvent;
    }

    static async update(event) {
        const updatedEvent = await EventModel.findByIdAndUpdate(
            { _id: event.id },
            { $set: event },
            { new: true }
        )
            .lean()
            .populate("host")
            .populate("attendants");
        if (!updatedEvent) throw new NotFoundError(`Event doesn't exist`);

        return updatedEvent;
    }

    static async destroy(id: string) {
        const deletedEvent = await EventModel.findByIdAndDelete(id);
        if (!deletedEvent) throw new NotFoundError(`No existe tal evento`);

        await UserModel.findByIdAndUpdate(
            { _id: deletedEvent.host },
            { $pull: { hostEvents: { $in: [id] } } }
        );

        await UserModel.updateMany(
            { attendingEvents: { $elemMatch: { $eq: id } } },
            { $pull: { attendingEvents: { $in: [id] } } }
        );
        return deletedEvent;
    }
}
