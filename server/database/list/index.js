//Library
import mongoose, { Mongoose } from "mongoose";


// User Schema
const ListSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    task: [
        {
            type: String,
            default: "default"
        }
    ]
}, {
    timestamps: true
});

export const ListModel = mongoose.model("Lists", ListSchema);
