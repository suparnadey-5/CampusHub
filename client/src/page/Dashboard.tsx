import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthContext();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <main className="min-h-screen bg-violet-400">
      <nav className="flex items-center justify-between bg-white px-6 py-4 shadow">
        <h1 className="text-2xl font-bold text-purple-600">
          CampusHub
        </h1>

        <button
          onClick={handleLogout}
          className="rounded-lg bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-600"
        >
          Logout
        </button>
      </nav>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="rounded-xl bg-white p-8 shadow">
          <h2 className="text-3xl font-bold text-gray-900">
            Welcome, {user?.name} 👋
          </h2>

          <p className="mt-2 text-gray-600">
            Welcome to your CampusHub dashboard.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-blue-50 p-5">
              <p className="text-sm text-gray-500">Role</p>
              <p className="mt-1 text-xl font-semibold capitalize">
                {user?.role}
              </p>
            </div>

            <div className="rounded-lg bg-green-50 p-5">
              <p className="text-sm text-gray-500">Branch</p>
              <p className="mt-1 text-xl font-semibold">
                {user?.branch}
              </p>
            </div>

            <div className="rounded-lg bg-yellow-50 p-5">
              <p className="text-sm text-gray-500">Year</p>
              <p className="mt-1 text-xl font-semibold">
                {user?.year}
              </p>
            </div>

            <div className="rounded-lg bg-purple-50 p-5">
              <p className="text-sm text-gray-500">Section</p>
              <p className="mt-1 text-xl font-semibold">
                {user?.section}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;