import mongoose, { Schema, Document, Model } from "mongoose";

export interface IContactSubmission extends Document {
  fname: string;
  lname: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ContactSubmissionSchema = new Schema<IContactSubmission>(
  {
    fname: { type: String, required: true, trim: true },
    lname: { type: String, default: "", trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, default: "", trim: true },
    interest: { type: String, default: "", trim: true },
    message: { type: String, default: "", trim: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const ContactSubmission: Model<IContactSubmission> =
  mongoose.models.ContactSubmission ||
  mongoose.model<IContactSubmission>("ContactSubmission", ContactSubmissionSchema);

export default ContactSubmission;