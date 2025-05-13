'use client';
import { useEffect, useState } from 'react';
import { fetchMe, logoutUser } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import NavBar from '../components/NavBar';

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
        router.push('/');
      }
    };
    loadUser();
  }, [router]);

  const handleLogout = async () => {
    const res = await logoutUser();
    if (res.status === 200) {
      router.push('/');
    } else {
      alert('Logout failed');
    }
  };

  const toggleEdit = () => setIsEditing(!isEditing);
  const handleChange = (e) => setData(e.target.value);

  if (!user) return <p className="dashboard-loading">Loading...</p>;

  return (
    <>
    <NavBar />
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Welcome, <span>{user.name}</span></h1>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>

        <div className="dashboard-info">
          <p><strong>Role:</strong> {user.role}</p>
        </div>

        <div className="dashboard-content">
          {user.role === 'admin' ? (
            <div>
              <h3>Edit Controls (Admin)</h3>
              {isEditing ? (
                <>
                  <textarea
                    className="dashboard-textarea"
                    value={data}
                    onChange={handleChange}
                    rows={5}
                  />
                  <button className="action-btn" onClick={toggleEdit}>Save</button>
                </>
              ) : (
                <>
                  <p className="editable-content">{data}</p>
                  <button className="action-btn" onClick={toggleEdit}>Edit Data</button>
                </>
              )}
            </div>
          ) : (
            <div>
              <h3>View Only</h3>
              <p className="editable-content">{data}</p>
              <p className="note">You can view the data but cannot edit.</p>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
