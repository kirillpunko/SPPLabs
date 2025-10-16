import { Schema, model, Types } from 'mongoose';

export interface IProject {
  name: string;
  description?: string;
  members: Types.ObjectId[]; // User refs
}

const projectSchema = new Schema<IProject>({
  name: { type: String, required: true },
  description: String,
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

export default model<IProject>('Project', projectSchema);


