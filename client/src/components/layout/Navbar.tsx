import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthContext();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
      {/* Logo */}
      <button
        onClick={() => navigate('/dashboard')}
        className="text-2xl font-bold text-blue-600"
      >
        CampusHub
      </button>

      {/* User section */}
      <div className="flex items-center gap-4">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-semibold text-gray-800">
            {user?.name}
          </p>

          <p className="text-xs capitalize text-gray-500">
            {user?.role}
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-purple-600">
          {user?.name?.charAt(0).toUpperCase()}
        </div>

        <button
          onClick={handleLogout}
          className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;