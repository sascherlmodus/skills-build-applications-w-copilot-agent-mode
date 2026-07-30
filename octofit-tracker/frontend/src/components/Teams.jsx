import { useEffect, useState } from 'react';

import { fetchCollection } from '../lib/api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadTeams() {
      try {
        setLoading(true);
        setError('');
        const data = await fetchCollection('/teams/');
        setTeams(data);
      } catch (loadError) {
        setError('Teams could not be loaded.');
      } finally {
        setLoading(false);
      }
    }

    loadTeams();
  }, []);

  if (loading) {
    return <p className="status">Loading teams...</p>;
  }

  if (error) {
    return <p className="status error">{error}</p>;
  }

  return (
    <section className="panel">
      <h2>Teams</h2>
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Team</th>
              <th>Members</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr key={team._id}>
                <td>{team.name}</td>
                <td>{team.members?.length ?? 0}</td>
                <td>{team.points ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Teams;
