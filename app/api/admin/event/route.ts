import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Event from "@/app/models/Event";
import { verifyAdmin } from "@/lib/verifyAdmin";
import { revalidateTag } from "next/cache";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    const [events, total] = await Promise.all([
      Event.find({}).sort({ date: 1 }).skip(skip).limit(limit),
      Event.countDocuments({}),
    ]);

    return NextResponse.json(
      {
        data: events,
        totalPages: Math.max(Math.ceil(total / limit), 1),
        message: "Events fetched successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // const isAdmin = await verifyAdmin(request);
    // if (!isAdmin) {
    //     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    // }

    const { _id, title, description, date, venue, time, tag } = body;

    if (!title || !date || !venue) {
      return NextResponse.json(
        { message: "Title, date and venue are required" },
        { status: 400 },
      );
    }

    await connectDB();

    const payload = { title, description, date, venue, time, tag };

    let event;
    if (_id) {
      // Update existing event
      event = await Event.findByIdAndUpdate(_id, payload, {
        new: true,
        runValidators: true,
      });

      if (!event) {
        return NextResponse.json(
          { message: "Event not found" },
          { status: 404 },
        );
      }
    } else {
      // Create new event
      event = await Event.create(payload);
    }

    revalidateTag("events");

    return NextResponse.json(
      {
        data: event,
        message: _id ? "Event updated successfully" : "Event created successfully",
      },
      { status: _id ? 200 : 201 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}