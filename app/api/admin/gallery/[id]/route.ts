import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import Gallery from "@/app/models/Gallery";

type Params = { params: { id: string } };

// GET /api/admin/gallery/:id
export async function GET(req: NextRequest, { params }: Params) {
    try {
        await connectDB();
        const { id } = params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ message: "Invalid gallery id" }, { status: 400 });
        }

        const galleryItem = await Gallery.findById(id);

        if (!galleryItem) {
            return NextResponse.json({ message: "Gallery item not found" }, { status: 404 });
        }

        return NextResponse.json(
            { message: "Gallery item fetched successfully", data: galleryItem },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching gallery item", error);
        return NextResponse.json(
            { message: "Something went wrong while fetching the gallery item" },
            { status: 500 }
        );
    }
}

// PATCH /api/admin/gallery/:id
// Accepts a partial body — { title? } and/or { images? } — so the title
// and the image grid can each be saved independently from the item page.
export async function PATCH(req: NextRequest, { params }: Params) {
    try {
        await connectDB();
        const { id } = params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ message: "Invalid gallery id" }, { status: 400 });
        }

        const body = await req.json();
        const update: { title?: string; images?: string[] } = {};

        if (typeof body.title === "string") {
            if (!body.title.trim()) {
                return NextResponse.json({ message: "Title cannot be empty" }, { status: 400 });
            }
            update.title = body.title;
        }

        if (Array.isArray(body.images)) {
            update.images = body.images;
        }

        if (Object.keys(update).length === 0) {
            return NextResponse.json({ message: "Nothing to update" }, { status: 400 });
        }

        const galleryItem = await Gallery.findByIdAndUpdate(id, update, { new: true });

        if (!galleryItem) {
            return NextResponse.json({ message: "Gallery item not found" }, { status: 404 });
        }

        return NextResponse.json(
            { message: "Gallery item updated successfully", data: galleryItem },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating gallery item", error);
        return NextResponse.json(
            { message: "Something went wrong while updating the gallery item" },
            { status: 500 }
        );
    }
}

// DELETE /api/admin/gallery/:id
export async function DELETE(req: NextRequest, { params }: Params) {
    try {
        await connectDB();
        const { id } = params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ message: "Invalid gallery id" }, { status: 400 });
        }

        const galleryItem = await Gallery.findByIdAndDelete(id);

        if (!galleryItem) {
            return NextResponse.json({ message: "Gallery item not found" }, { status: 404 });
        }

        return NextResponse.json(
            { message: "Gallery item deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting gallery item", error);
        return NextResponse.json(
            { message: "Something went wrong while deleting the gallery item" },
            { status: 500 }
        );
    }
}