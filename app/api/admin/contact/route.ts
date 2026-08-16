import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Contact from "@/app/models/Contact";
import { verifyAdmin } from "@/lib/verifyAdmin";
import { revalidateTag } from "next/cache";
import ContactSubmission from "@/app/models/ContactSubmission";


export async function GET() {
    try {
        await connectDB();
        const contact = await Contact.findOne({});
        if (!contact) {
            return NextResponse.json({ message: "Contact not found" }, { status: 404 });
        }
        return NextResponse.json({data:contact,message:"Contact fetched successfully"}, { status: 200 });
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
        const contact = await Contact.findOneAndUpdate({}, body,{upsert:true,new:true});
        if (!contact) {
            return NextResponse.json({ message: "Contact not found" }, { status: 404 });
        }
        revalidateTag("contact");
        return NextResponse.json({data:contact,message:"Contact updated successfully"}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fname, lname, email, phone, interest, message } = body;
 
    if (!fname?.trim()) {
      return NextResponse.json(
        { message: "First name is required" },
        { status: 400 },
      );
    }
 
    if (!email?.trim() || !/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json(
        { message: "A valid email address is required" },
        { status: 400 },
      );
    }
 
    await connectDB();
 
    const submission = await ContactSubmission.create({
      fname: fname.trim(),
      lname: (lname ?? "").trim(),
      email: email.trim(),
      phone: (phone ?? "").trim(),
      interest: (interest ?? "").trim(),
      message: (message ?? "").trim(),
    });
 
    return NextResponse.json(
      { data: submission, message: "Message received successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}