import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [profileName, setProfileName] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [notifications,] = useState([]);
  const [newNotification, setNewNotification] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedProfile = JSON.parse(localStorage.getItem('activeProfile'));

    // ✅ Only redirect to /profiles if user is logged in
    if (storedUser && !storedProfile) {
      navigate('/profiles');
      return;
    }

    if (storedUser && storedProfile) {
      setUser(storedUser);
      setProfileName(storedProfile.name);
      setProfileImage(storedProfile.image);
    }
  }, [navigate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (dropdownOpen === 'notifications') {
      setNewNotification(false);
    }
  }, [dropdownOpen]);

  const handleSignOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('activeProfile');
    setUser(null);
    setProfileName('');
    setProfileImage('');
    window.dispatchEvent(new Event('authChanged'));
    navigate('/signout');
  };

  if (location.pathname === '/profiles') {
    return null;
  }

  return (
    <nav className="w-full fixed top-0 left-0 z-50 flex justify-between items-center px-6 sm:px-12 py-4 bg-black bg-opacity-80 text-white">
      <div className="flex items-center space-x-6">
        <Link to="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="Netflix Logo"
            className="h-8"
          />
        </Link>
        <div className="hidden md:flex space-x-4 text-sm font-medium">
          <Link to="/">Home</Link>
          <Link to="/tv-shows">TV Shows</Link>
          <Link to="/movies">Movies</Link>
          <Link to="/games">Games</Link>
          <Link to="/new-popular">New & Popular</Link>
          <Link to="/my-list">My List</Link>
          <Link to="/languages">Browse by Languages</Link>
        </div>
      </div>

      {user && (
        <div className="flex items-center space-x-4 relative" ref={dropdownRef}>
          <MagnifyingGlassIcon className="w-5 h-5 cursor-pointer" />
          <Link to="/kids" className="text-sm hidden sm:inline">Kids</Link>

          <div className="relative">
            <BellIcon
              className={`w-5 h-5 cursor-pointer ${newNotification ? 'animate-bell' : ''}`}
              onClick={() =>
                setDropdownOpen(dropdownOpen === 'notifications' ? null : 'notifications')
              }
            />
            {notifications.length > 0 && newNotification && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-xs rounded-full px-1">
                {notifications.length}
              </span>
            )}
            <div
              className={`absolute right-2 sm:right-0 mt-2 w-64 sm:w-72 bg-black border border-gray-700 rounded shadow-xl backdrop-blur-md z-50 p-4 text-sm transition-all duration-300 ease-out transform origin-top-right ${
                dropdownOpen === 'notifications'
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-95 pointer-events-none'
              }`}
            >
              {notifications.length === 0 ? (
                <p className="text-white">No new notifications</p>
              ) : (
                <ul className="text-white space-y-2">
                  {notifications.map((note) => (
                    <li key={note.id} className="flex items-start space-x-2 border-b border-gray-700 pb-2 last:border-none">
                      <img src="/notification-icon.png" className="w-6 h-6" alt="icon" />
                      <span>{note.message}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() =>
                setDropdownOpen(dropdownOpen === 'profile' ? null : 'profile')
              }
              className="flex items-center space-x-2 focus:outline-none"
            >
              <img
                src={
                  profileImage ||
                  'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
                }
                alt="Profile"
                className="w-8 h-8 rounded"
              />
              <span className="text-sm hidden sm:inline">
                {profileName || user.email}
              </span>
            </button>
            <div
              className={`absolute right-0 mt-2 w-56 bg-black border border-gray-700 rounded shadow-lg z-50 transition-all duration-200 ease-in-out ${
                dropdownOpen === 'profile'
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-95 pointer-events-none'
              }`}
            >
              <Link to="/profiles" className="block px-4 py-2 text-sm hover:bg-gray-800">Manage Profiles</Link>
              <Link to="/transfer" className="block px-4 py-2 text-sm hover:bg-gray-800">Transfer Profile</Link>
              <Link to="/membership" className="block px-4 py-2 text-sm hover:bg-gray-800">Account</Link>
              <Link to="/help" className="block px-4 py-2 text-sm hover:bg-gray-800">Help Center</Link>
              <button
                onClick={handleSignOut}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-800"
              >
                Sign Out of Netflix
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
