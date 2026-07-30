import { useEffect, useState } from 'react';

import { fetchCollection } from '../lib/api';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        setLoading(true);
        setError('');
        const data = await fetchCollection('/leaderboard/');
        setEntries(data);
      } catch (loadError) {
        setError('Leaderboard data could not be loaded.');
      } finally {
        setLoading(false);
      }
    }

    loadLeaderboard();
  }, []);

  if (loading) {
    return <p className="status">Loading leaderboard...</p>;
  }

  if (error) {
    return <p className="status error">{error}</p>;
  }

  return (
    <section className="panel">
      <h2>Leaderboard</h2>
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Team</th>
              <th>Period</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => (
              <tr key={entry._id}>
                <td>{index + 1}</td>
                <td>{entry.user?.name ?? 'Unknown'}</td>
                <td>{entry.team?.name ?? 'Unknown'}</td>
                <td>{entry.period}</td>
                <td>{entry.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Leaderboard;
