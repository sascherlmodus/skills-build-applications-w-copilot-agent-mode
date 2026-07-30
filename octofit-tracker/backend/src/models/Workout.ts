import { Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
    tags: [{ type: String, trim: true }]
  },
  { timestamps: true }
);

const Workout = model('Workout', workoutSchema);

export default Workout;
