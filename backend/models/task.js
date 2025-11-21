import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    taskID : String,
    taskName : String,
    taskAssign : String,
    taskStatus : String,
}) 

export default mongoose.model("Task",taskSchema)