// lib/services/activity.service.ts

import connectDB from "@/lib/mongodb";
import Activities from "@/app/models/Activity";


import { unstable_cache } from "next/cache";

export const getActivity = unstable_cache(
    async () => {
        await connectDB();
        console.log("🔥 DB HIT: getActivity called");

        const activity = await Activities.findOne({}).lean();

        if (!activity) {
            throw new Error("Activity not found");
        }

        return JSON.parse(JSON.stringify(activity));
    },
    ["activity"], // cache key
    {
        tags: ["activity"], // for revalidation
    }
);
