// lib/services/home.service.ts

import connectDB from "@/lib/mongodb";
import HomeModel from "@/app/models/Home";


import { unstable_cache } from "next/cache";

export const getHome = unstable_cache(
    async () => {
        await connectDB();
        console.log("🔥 DB HIT: getHome called");

        const home = await HomeModel.findOne({}).lean();

        if (!home) {
            throw new Error("Home not found");
        }

        return JSON.parse(JSON.stringify(home));
    },
    ["home"], // cache key
    {
        tags: ["home"], // for revalidation
    }
);
