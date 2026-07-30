import { Schema, model } from 'mongoose';

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      enum: ['run', 'cycle', 'strength', 'yoga', 'other'],
      required: true
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    calories: { type: Number, min: 0 },
    performedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const Activity = model('Activity', activitySchema);

export default Activity;
