import connectDB from "@/lib/mongodb";
import Gallery from "@/app/models/Gallery";
import { unstable_cache } from "next/cache";

export const getGallery = async (page: number = 1, limit: number = 6) => {
  await connectDB();

  const cached = unstable_cache(
    async (page: number, limit: number) => {
      console.log("🔥 DB HIT: getGallery called", { page, limit });

      const skip = (page - 1) * limit;

      const [data, total] = await Promise.all([
        Gallery.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
        Gallery.countDocuments({}),
      ]);

      return {
        data: JSON.parse(JSON.stringify(data)),
        total,
        totalPages: Math.max(Math.ceil(total / limit), 1),
        page,
      };
    },
    ["gallery", String(page), String(limit)], // unique cache entry per page
    { tags: ["gallery"] }
  );

  return cached(page, limit);
};