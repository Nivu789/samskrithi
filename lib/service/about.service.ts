// lib/services/about.service.ts

import connectDB from "@/lib/mongodb";
import AboutModel from "@/app/models/About";


import { unstable_cache } from "next/cache";

export const getAbout = unstable_cache(
    async () => {
        await connectDB();
        console.log("🔥 DB HIT: getAbout called");

        const about = await AboutModel.findOne({}).lean();

        if (!about) {
            throw new Error("About not found");
        }

        return JSON.parse(JSON.stringify(about));
    },
    ["about"], // cache key
    {
        tags: ["about"], // for revalidation
    }
);
