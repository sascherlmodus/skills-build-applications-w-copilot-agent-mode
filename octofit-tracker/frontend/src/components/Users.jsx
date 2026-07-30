import { useEffect, useState } from 'react';

import { fetchCollection } from '../lib/api';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true);
        setError('');
        const data = await fetchCollection('/users/');
        setUsers(data);
      } catch (loadError) {
        setError('Users could not be loaded.');
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  if (loading) {
    return <p className="status">Loading users...</p>;
  }

  if (error) {
    return <p className="status error">{error}</p>;
  }

  return (
    <section className="panel">
      <h2>Users</h2>
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Users;
