import mongoose, { Schema, models, model } from "mongoose";

const GallerySchema = new Schema(
    {
        title: { type: String, required: true },
        images: { type: [String], default: [] },
    },
    { timestamps: true }
);

const Gallery = models.Gallery || model("Gallery", GallerySchema);

export default Gallery;