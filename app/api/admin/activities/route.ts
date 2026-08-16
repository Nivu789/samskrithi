import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Activity from "@/app/models/Activity";
import { revalidateTag } from "next/cache";


export async function GET() {
    try {
        await connectDB();
        const activity = await Activity.findOne({});
        if (!activity) {
            return NextResponse.json({ message: "Activity not found" }, { status: 404 });
        }
        return NextResponse.json({data:activity,message:"Activity fetched successfully"}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json();
        // const isAdmin = await verifyAdmin(request);
        // if (!isAdmin) {
        //     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        // }
        await connectDB();
        const activity = await Activity.findOneAndUpdate({}, body,{upsert:true,new:true});
        if (!activity) {
            return NextResponse.json({ message: "Activity not found" }, { status: 404 });
        }
        revalidateTag("activity");
        return NextResponse.json({data:activity,message:"Activity updated successfully"}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}