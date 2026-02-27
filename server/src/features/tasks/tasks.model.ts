import mongoose, { Schema, Types, HydratedDocument } from "mongoose";

export interface ITask {
  title: string;
  completed: boolean;
  project: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export type TaskDocument = HydratedDocument<ITask>;

const taskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model<ITask>("Task", taskSchema);

export default Task;