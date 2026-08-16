// lib/services/event.service.ts

import connectDB from "@/lib/mongodb";
import EventModel from "@/app/models/Event";

import { unstable_cache } from "next/cache";

export const getEvents = unstable_cache(
    async () => {
        await connectDB();
        console.log("🔥 DB HIT: getEvents called");

        const events = await EventModel.find({}).sort({ date: 1 }).lean();

        return JSON.parse(JSON.stringify(events));
    },
    ["events"], // cache key
    {
        tags: ["events"], // for revalidation
    }
);