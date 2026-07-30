import mongoose from 'mongoose';

import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Team from '../models/Team';
import User from '../models/User';
import Workout from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
      User.deleteMany({}),
      Team.deleteMany({})
    ]);

    const [teamAlpha, teamBlaze] = await Team.create([
      { name: 'Team Alpha', points: 0 },
      { name: 'Team Blaze', points: 0 }
    ]);

    const [ava, liam, mia] = await User.create([
      { name: 'Ava Carter', email: 'ava@octofit.dev', age: 29, team: teamAlpha._id },
      { name: 'Liam Brooks', email: 'liam@octofit.dev', age: 34, team: teamAlpha._id },
      { name: 'Mia Patel', email: 'mia@octofit.dev', age: 26, team: teamBlaze._id }
    ]);

    await Team.findByIdAndUpdate(teamAlpha._id, {
      members: [ava._id, liam._id],
      points: 1240
    });

    await Team.findByIdAndUpdate(teamBlaze._id, {
      members: [mia._id],
      points: 970
    });

    await Activity.create([
      {
        user: ava._id,
        type: 'run',
        durationMinutes: 42,
        calories: 420,
        performedAt: new Date('2026-07-27T06:30:00Z')
      },
      {
        user: liam._id,
        type: 'strength',
        durationMinutes: 55,
        calories: 510,
        performedAt: new Date('2026-07-28T17:00:00Z')
      },
      {
        user: mia._id,
        type: 'cycle',
        durationMinutes: 48,
        calories: 460,
        performedAt: new Date('2026-07-29T07:15:00Z')
      }
    ]);

    await Leaderboard.create([
      { user: ava._id, team: teamAlpha._id, period: 'weekly', score: 420 },
      { user: liam._id, team: teamAlpha._id, period: 'weekly', score: 510 },
      { user: mia._id, team: teamBlaze._id, period: 'weekly', score: 460 }
    ]);

    await Workout.create([
      {
        user: ava._id,
        title: 'Morning Tempo Run',
        description: '5 min warmup, 30 min tempo, 7 min cooldown',
        difficulty: 'intermediate',
        tags: ['cardio', 'running']
      },
      {
        user: liam._id,
        title: 'Upper Body Strength Circuit',
        description: '4 rounds with push-pull supersets',
        difficulty: 'advanced',
        tags: ['strength', 'gym']
      },
      {
        user: mia._id,
        title: 'Endurance Ride',
        description: 'Steady-state outdoor cycling session',
        difficulty: 'intermediate',
        tags: ['cycle', 'endurance']
      }
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
