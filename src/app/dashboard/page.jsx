'use client';
import { useEffect, useState } from 'react';
import { fetchMe, logoutUser } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState('This is some editable content');

  useEffect(() => {
    const loadUser = async () => {
      try {
        const me = await fetchMe();
        setUser(me);
      } catch (err) {
        router.push('/login');
      }
    };
    loadUser();
  }, [router]);

  const handleLogout = async () => {
    const res = await logoutUser();
    if (res.status === 200) {
      router.push('/login');
      console.log("User logged out successfully");
    } else {
      alert('Logout failed');
    }
  };

  const toggleEdit = () => setIsEditing(!isEditing);
  const handleChange = (e) => setData(e.target.value);

  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <button onClick={handleLogout} style={{ padding: '8px 16px' }}>
        Logout
      </button>
      <h1>Welcome, {user.name}</h1>
      <p>Role: {user.role}</p>

      {user.role === 'admin' ? (
        <div style={{ marginTop: '2rem' }}>
          <h3>Edit Controls (Admin)</h3>
          {isEditing ? (
            <div>
              <textarea
                value={data}
                onChange={handleChange}
                rows={4}
                cols={50}
              />
              <br />
              <button onClick={toggleEdit}>Save</button>
            </div>
          ) : (
            <div>
              <p>{data}</p>
              <button onClick={toggleEdit}>Edit Data</button>
            </div>
          )}
        </div>
      ) : (
        <div style={{ marginTop: '2rem' }}>
          <h3>View Only</h3>
          <p>{data}</p>
          <p>You can view the data but cannot edit.</p>
        </div>
      )}
    </div>
  );
}
