import { Schema, model } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    period: { type: String, default: 'weekly', trim: true },
    score: { type: Number, required: true, min: 0 }
  },
  { timestamps: true }
);

const Leaderboard = model('Leaderboard', leaderboardSchema);

export default Leaderboard;
