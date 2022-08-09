import { UserModel } from "@modules/users";
import { InternalError, NotFoundError } from "@utils/errors";
import * as nodemailer from "nodemailer";
import EventModel from "./event.model";

export default class EventRepository {
    static async getAll() {
        const events = await EventModel.find({
            date: { $gt: Date.now() }
        })
            .lean()
            .sort({ date: -1 })
            .populate("host")
            .populate("attendants");
        if (!events.length) throw new NotFoundError(`No events available`);
        return events;
    }

    static async get(id: string) {
        const event = await EventModel.findById(id);
        if (!event) throw new NotFoundError(`No event available`);
        return event;
    }

    static async getByData(data) {
        const title = data.title;
        const region = data.region;
        const filterOptionsTitle =
            title && title.length
                ? {
                      ...data,
                      title: { $regex: title }
                  }
                : { ...data };
        const filterOptionsFinal =
            region && region.length
                ? {
                      ...filterOptionsTitle,
                      region: region
                  }
                : { ...filterOptionsTitle };
        const events = await EventModel.find(filterOptionsFinal)
            .lean()
            .sort({ date: -1 })
            .populate("host")
            .populate("attendants");
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
        const deletedEvent = await EventModel.findByIdAndDelete(id)
            .populate("host")
            .populate("attendants");
        if (!deletedEvent) throw new NotFoundError(`No existe tal evento`);

        await UserModel.findByIdAndUpdate(
            { _id: deletedEvent.host._id },
            { $pull: { hostEvents: { $in: [id] } } }
        );

        await UserModel.updateMany(
            { attendingEvents: { $elemMatch: { $eq: id } } },
            { $pull: { attendingEvents: { $in: [id] } } }
        );

        if (deletedEvent.attendants && deletedEvent.attendants.length) {
            const attendantsEmail = deletedEvent.attendants.map(
                (attendant) => attendant.email
            );
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.MAIL_FROM,
                    pass: process.env.MAIL_PASSWORD
                }
            });
            await transporter.sendMail({
                from: process.env.MAIL_FROM,
                to: attendantsEmail,
                subject: `El evento ${deletedEvent.title} ha sido borrado`,
                text: `El usuario ${deletedEvent.host.name} ha cancelado el evento que estabas apuntado/a por: Usuario host eliminado`
            });
        }

        return deletedEvent;
    }

    static async destroyEventReason(id: string, reason: string) {
        const deletedEvent = await EventModel.findByIdAndDelete(id)
            .populate("host")
            .populate("attendants");
        if (!deletedEvent) throw new NotFoundError(`No existe tal evento`);

        await UserModel.findByIdAndUpdate(
            { _id: deletedEvent.host._id },
            { $pull: { hostEvents: { $in: [id] } } }
        );

        await UserModel.updateMany(
            { attendingEvents: { $elemMatch: { $eq: id } } },
            { $pull: { attendingEvents: { $in: [id] } } }
        );

        if (deletedEvent.attendants && deletedEvent.attendants.length) {
            const attendantsEmail = deletedEvent.attendants.map(
                (attendant) => attendant.email
            );
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.MAIL_FROM,
                    pass: process.env.MAIL_PASSWORD
                }
            });
            await transporter.sendMail({
                from: process.env.MAIL_FROM,
                to: attendantsEmail,
                subject: `El evento ${deletedEvent.title} ha sido borrado`,
                text: `El usuario ${deletedEvent.host.name} ha cancelado el evento que estabas apuntado/a por: ${reason}`
            });
        }

        return deletedEvent;
    }
}
