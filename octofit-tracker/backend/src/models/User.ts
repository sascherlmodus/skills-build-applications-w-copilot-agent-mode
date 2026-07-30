import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    age: { type: Number, min: 0 },
    team: { type: Schema.Types.ObjectId, ref: 'Team' }
  },
  { timestamps: true }
);

const User = model('User', userSchema);

export default User;
