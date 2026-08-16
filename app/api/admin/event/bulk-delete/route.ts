import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Event from "@/app/models/Event";
import { verifyAdmin } from "@/lib/verifyAdmin";
import { revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // const isAdmin = await verifyAdmin(request);
    // if (!isAdmin) {
    //     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    // }

    const { ids } = body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { message: "No event ids provided" },
        { status: 400 },
      );
    }

    await connectDB();

    const result = await Event.deleteMany({ _id: { $in: ids } });

    revalidateTag("events");

    return NextResponse.json(
      {
        message: `${result.deletedCount} event(s) deleted successfully`,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}