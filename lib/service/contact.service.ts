// lib/services/contact.service.ts

import connectDB from "@/lib/mongodb";
import Contact from "@/app/models/Contact";
import { unstable_cache } from "next/cache";

export const getContact = unstable_cache(
  async () => {
    await connectDB();
    console.log("🔥 DB HIT: getContact called");

    const contact = await Contact.findOne({}).lean();

    if (!contact) {
      throw new Error("Contact not found");
    }

    return JSON.parse(JSON.stringify(contact));
  },
  ["contact"], // cache key
  {
    tags: ["contact"], // for revalidation
  }
);