import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
    firstSection: {
        title: {
            type: String
        },
        subTitle: {
            type: String
        },
        description: {
            type: String
        }
    },
    secondSection: {
        title: {
            type: String
        },
        subTitle: {
            type: String
        },
        items: [
            {
                image: { type: String, required: true },
                imageAlt: { type: String, required: true },
                designation: { type: String, required: true },
                name: { type: String, required: true },
            }
        ]
    },
    thirdSection: {
        title: {
            type: String
        },
        items: [
            {
                image: { type: String, required: true },
                imageAlt: { type: String, required: true },
                name: { type: String, required: true },
            }
        ]
    },
    fourthSection: {
        items: [
            {
                title: { type: String, required: true },
                description: { type: String, required: true },
            }
        ]
    },
    fifthSection: {
        title: {
            type: String
        },
        items: [
            {
                image: { type: String, required: true },
                imageAlt: { type: String, required: true },
                title: { type: String, required: true },
                description: { type: String, required: true },
            }
        ]
    },
    sixthSection: {
        message: {
            type: String
        },
        name: {
            type: String
        }
    }
})

export default mongoose.models.About || mongoose.model("About", aboutSchema);