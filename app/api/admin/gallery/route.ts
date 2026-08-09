import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Gallery from "@/app/models/Gallery";

// GET /api/admin/gallery?page=1&limit=10
export async function GET(req: NextRequest) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const page = Number(searchParams.get("page")) || 1;
        const limit = Number(searchParams.get("limit")) || 10;
        const skip = (page - 1) * limit;

        const [data, total] = await Promise.all([
            Gallery.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit),
            Gallery.countDocuments({}),
        ]);

        return NextResponse.json(
            {
                message: "Gallery items fetched successfully",
                data,
                totalPages: Math.max(Math.ceil(total / limit), 1),
                total,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching gallery items", error);
        return NextResponse.json(
            { message: "Something went wrong while fetching gallery items" },
            { status: 500 }
        );
    }
}

// POST /api/admin/gallery
export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();
        const { title, images } = body;

        if (!title || !title.trim()) {
            return NextResponse.json(
                { message: "Title is required" },
                { status: 400 }
            );
        }

        const galleryItem = await Gallery.create({
            title,
            images: Array.isArray(images) ? images : [],
        });

        return NextResponse.json(
            { message: "Gallery item created successfully", data: galleryItem },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating gallery item", error);
        return NextResponse.json(
            { message: "Something went wrong while creating the gallery item" },
            { status: 500 }
        );
    }
}