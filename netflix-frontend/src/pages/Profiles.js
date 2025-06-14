import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

export default function Profiles() {
  const navigate = useNavigate();

  const [profiles, setProfiles] = useState([
    { name: 'User1', image: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png', isKids: false },
    { name: 'User2', image: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png', isKids: false },
    { name: 'Dzieci', image: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png', isKids: true },
  ]);

  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [isKids, setIsKids] = useState(false);

  const handleSelectProfile = (profile) => {
    localStorage.setItem('activeProfile', JSON.stringify(profile));
    window.dispatchEvent(new Event('authChanged'));
    navigate('/');
  };

  const handleAddProfile = () => {
    if (!newName.trim()) return;
    const newProfile = {
      name: newName.trim(),
      image: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png',
      isKids,
    };
    const updated = [...profiles, newProfile];
    setProfiles(updated);
    setNewName('');
    setIsKids(false);
    setAdding(false);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-10">Who's watching?</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {profiles.map((profile, index) => (
            <button
              key={index}
              onClick={() => handleSelectProfile(profile)}
              className="flex flex-col items-center hover:scale-105 transition-transform"
            >
              <img
                src={profile.image}
                alt={profile.name}
                className="w-24 h-24 md:w-32 md:h-32 rounded"
              />
              <span className="mt-2 text-lg">{profile.name}</span>
              {profile.isKids && (
                <span className="text-xs text-blue-400 mt-1">Kids</span>
              )}
            </button>
          ))}

          {/* Add Profile Button */}
          {!adding && (
            <button
              onClick={() => setAdding(true)}
              className="flex flex-col items-center justify-center border-2 border-gray-500 border-dashed rounded w-24 h-24 md:w-32 md:h-32 hover:border-white transition"
            >
              <span className="text-3xl">+</span>
              <span className="text-sm mt-1">Add Profile</span>
            </button>
          )}
        </div>

        {/* Add Profile Form */}
        {adding && (
          <div className="bg-[#141414] p-6 rounded shadow-md w-full max-w-sm text-left">
            <h2 className="text-xl font-semibold mb-4">Add Profile</h2>
            <input
              type="text"
              placeholder="Profile name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full px-4 py-2 mb-4 rounded bg-gray-800 text-white focus:outline-none"
            />
            <label className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={isKids}
                onChange={(e) => setIsKids(e.target.checked)}
                className="mr-2"
              />
              Kids profile
            </label>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setAdding(false)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddProfile}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
