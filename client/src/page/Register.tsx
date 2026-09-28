import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuthContext();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student' as 'student' | 'organizer',
    branch: '',
    year: '',
    section: '',
    age: '',
    phone: '',
    rollNumber: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError('');
    setLoading(true);

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        branch: formData.branch,
        year: Number(formData.year),
        section: formData.section,
        age: Number(formData.age),
        phone: formData.phone,
        rollNumber: formData.rollNumber,
      });

      navigate('/dashboard');
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          'Registration failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-violet-400 px-4 py-10">
      <div className="mx-auto max-w-2xl rounded-xl backdrop-brightness-150 p-8 shadow-lg">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Create your CampusHub account
        </h1>

        <p className="mb-6 text-gray-600">
          Register as a student or organizer.
        </p>

        {error && (
          <div className="mb-5 rounded-lg bg-red-100 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
              placeholder="Create a password"
            />
          </div>

          {/* Role */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Account Type
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
            >
              <option value="student">Student</option>
              <option value="organizer">Organizer</option>
            </select>
          </div>

          {/* Branch + Year */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Branch
              </label>
              <input
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                required
                placeholder="e.g. CSE"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Year
              </label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
                min="1"
                max="4"
                placeholder="e.g. 4"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
              />
            </div>
          </div>

          {/* Section + Age */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Section
              </label>
              <input
                name="section"
                value={formData.section}
                onChange={handleChange}
                required
                placeholder="e.g. A"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Age
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                min="16"
                max="100"
                placeholder="Age"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
              placeholder="Enter phone number"
            />
          </div>

          {/* Roll Number */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Roll Number
            </label>
            <input
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
              placeholder="Enter roll number"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-purple-900 px-4 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="font-semibold text-purple-800 hover:underline"
          >
            Sign in
          </button>
        </p>
      </div>
    </main>
  );
};

export default Register;