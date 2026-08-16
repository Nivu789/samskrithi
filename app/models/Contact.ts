import mongoose, { Schema, Document, Model } from "mongoose";

export interface IContact extends Document {
  hero: {
    subTitle: string;
    title: string;
    description: string;
  };
  infoPanel: {
    subTitle: string;
    title: string;
    description: string;
  };
  contactDetails: {
    icon: string;
    title: string;
    info: string;
  }[];
  interests: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema = new Schema<IContact>(
  {
    hero: {
      subTitle: { type: String, default: "" },
      title: { type: String, default: "" },
      description: { type: String, default: "" },
    },
    infoPanel: {
      subTitle: { type: String, default: "" },
      title: { type: String, default: "" },
      description: { type: String, default: "" },
    },
    contactDetails: [
      {
        icon: { type: String, default: "" },
        title: { type: String, default: "" },
        info: { type: String, default: "" },
      },
    ],
    interests: [{ type: String }],
  },
  { timestamps: true },
);

const Contact: Model<IContact> =
  mongoose.models.Contact || mongoose.model<IContact>("Contact", ContactSchema);

export default Contact;