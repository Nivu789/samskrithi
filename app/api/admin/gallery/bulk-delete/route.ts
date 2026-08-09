import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Gallery from "@/app/models/Gallery";

// POST /api/admin/gallery/bulk-delete
export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();
        const { ids } = body;

        if (!Array.isArray(ids) || ids.length === 0) {
            return NextResponse.json(
                { message: "No gallery ids provided" },
                { status: 400 }
            );
        }

        const result = await Gallery.deleteMany({ _id: { $in: ids } });

        return NextResponse.json(
            {
                message: `${result.deletedCount} gallery item(s) deleted successfully`,
                deletedCount: result.deletedCount,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error bulk deleting gallery items", error);
        return NextResponse.json(
            { message: "Something went wrong while deleting gallery items" },
            { status: 500 }
        );
    }
}