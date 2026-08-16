import mongoose, { Schema, Document, Model } from "mongoose";

export interface IEvent extends Document {
  title: string;
  description: string;
  date: Date;
  venue: string;
  time: string;
  tag: string;
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    venue: {
      type: String,
      required: true,
      trim: true,
    },
    time: {
      type: String,
      default: "",
      trim: true,
    },
    tag: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { timestamps: true },
);

// Upcoming-first is the common query pattern for the public events page
EventSchema.index({ date: 1 });

const Event: Model<IEvent> =
  mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);

export default Event;