import { useEffect, useState } from 'react';

import { fetchCollection } from '../lib/api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadWorkouts() {
      try {
        setLoading(true);
        setError('');
        const data = await fetchCollection('/workouts/');
        setWorkouts(data);
      } catch (loadError) {
        setError('Workouts could not be loaded.');
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, []);

  if (loading) {
    return <p className="status">Loading workouts...</p>;
  }

  if (error) {
    return <p className="status error">{error}</p>;
  }

  return (
    <section className="panel">
      <h2>Workouts</h2>
      <div className="cards-grid">
        {workouts.map((workout) => (
          <article key={workout._id} className="workout-card">
            <h3>{workout.title}</h3>
            <p>{workout.description || 'No description provided.'}</p>
            <div className="meta-row">
              <span>{workout.difficulty}</span>
              <span>{workout.user?.name ?? 'Unknown athlete'}</span>
            </div>
            <div className="chip-row">
              {(workout.tags || []).map((tag) => (
                <span key={tag} className="chip">
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Workouts;
