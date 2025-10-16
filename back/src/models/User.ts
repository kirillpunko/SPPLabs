import { Schema, model } from 'mongoose';

export interface IUser {
  username: string;
  passwordHash: string;
  role: 'user' | 'admin';
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
}, { timestamps: true });

export default model<IUser>('User', userSchema);


