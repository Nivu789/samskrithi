import mongoose from "mongoose";

const homeSchema = new mongoose.Schema({
    bannerSection: {
        title: {
            type: String
        },
        subTitle: {
            type: String
        },
        description: {
            type: String
        },
        buttons: [
            {
                text: { type: String, required: true },
                link: { type: String, required: true },
            }
        ]
    },
    secondSection: {
        items: [
            {
                number: { type: String, required: true },
                value: { type: String, required: true },
            }
        ]
    },
    thirdSection: {
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
    fourthSection: {
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
    fifthSection: {
        title: {
            type: String
        },
        subTitle: {
            type: String
        }
    }
})

export default mongoose.models.Home || mongoose.model("Home", homeSchema);