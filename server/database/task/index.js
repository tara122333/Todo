//Library
import mongoose from "mongoose";


const TaskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    task: [
        {
            name: String,
            date: String,
            time: String,
            list: String,
            status: { type: Boolean, default: false }
        }
    ]
}, {
    timestamps: true
});

export const TaskModel = mongoose.model("Tasks", TaskSchema);
