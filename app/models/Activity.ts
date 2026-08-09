import mongoose, { Schema, models, model } from "mongoose";

// ---------------------------------------------
// Banner Section
// ---------------------------------------------
const BannerSectionItemSchema = new Schema(
    {
        title: { type: String, required: true },
    },
    { _id: false }
);

const BannerSectionSchema = new Schema(
    {
        title: { type: String, required: true },
        subTitle: { type: String, required: true },
        description: { type: String, required: true },
        items: { type: [BannerSectionItemSchema], default: [] },
    },
    { _id: false }
);

// ---------------------------------------------
// Second Section
// ---------------------------------------------
const SubItemSchema = new Schema(
    {
        value: { type: String, required: true },
    },
    { _id: false }
);

const TagSchema = new Schema(
    {
        value: { type: String, required: true },
    },
    { _id: false }
);

const SecondSectionItemSchema = new Schema(
    {
        title: { type: String, required: true },
        subTitle: { type: String, required: true },
        description: { type: String, required: true },
        subItems: { type: [SubItemSchema], default: [] },
        timing: { type: String },
        days: { type: String },
        venue: { type: String },
        contact: { type: String },
        image: { type: String },
        imageAlt: { type: String },
        leader: { type: String },
        tags: { type: [TagSchema], default: [] },
    },
    { _id: false }
);

const SecondSectionSchema = new Schema(
    {
        items: { type: [SecondSectionItemSchema], default: [] },
    },
    { _id: false }
);

// ---------------------------------------------
// CTA Section
// ---------------------------------------------
const CtaSectionSchema = new Schema(
    {
        title: { type: String, required: true },
        subTitle: { type: String, required: true },
        description: { type: String, required: true },
        buttonText: { type: String, required: true },
        buttonLink: { type: String, required: true },
    },
    { _id: false }
);

// ---------------------------------------------
// Activities (top level, singleton document)
// ---------------------------------------------
const ActivitiesSchema = new Schema(
    {
        bannerSection: { type: BannerSectionSchema, required: true },
        secondSection: { type: SecondSectionSchema, required: true },
        ctaSection: { type: CtaSectionSchema, required: true },
    },
    { timestamps: true }
);

const Activities = models.Activities || model("Activities", ActivitiesSchema);

export default Activities;