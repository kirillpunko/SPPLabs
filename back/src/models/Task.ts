import { Schema, model, Types } from 'mongoose';

export type TaskStatus = 'ToDo' | 'in_progress' | 'Done';

export interface ITask {
  title: string;
  description?: string;
  status: TaskStatus;
  assignee?: string;
  project: Types.ObjectId; // ref Project
}

const taskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: String,
  status: { type: String, enum: ['ToDo', 'in_progress', 'Done'], default: 'ToDo' },
  assignee: String,
  project: { type: Schema.Types.ObjectId, ref: 'Project', required: true }
}, { timestamps: true });

export default model<ITask>('Task', taskSchema);


