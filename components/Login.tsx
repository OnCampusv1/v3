import React, { useState } from 'react';

interface LoginProps {
  onLoginSuccess: () => void;
  onSignupClick: () => void;
  persona?: 'student' | 'employer' | 'university';
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, onSignupClick, persona = 'student' }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      onLoginSuccess();
    }, 500);
  };

  const getEmailLabel = () => {
      switch(persona) {
          case 'employer': return "Work Email";
          case 'university': return "Official College Email";
          default: return "School Email";
      }
  };

  return (
    <div className="w-full max-w-lg mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h2 className="text-3xl font-black italic tracking-tight text-[#0D1C22] mb-2">Welcome Back</h2>
        <p className="text-gray-500 mb-8 capitalize">Log in to your {persona} account.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">{getEmailLabel()}</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@domain.com"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D1C22] transition-all"
              required
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-bold text-gray-700">Password</label>
                <button type="button" className="text-xs font-semibold text-gray-500 hover:text-[#0D1C22]">Forgot Password?</button>
            </div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D1C22] transition-all"
              required
            />
          </div>

          <button 
            type="submit" 
            className="mt-4 w-full bg-[#0D1C22] text-white font-bold py-4 rounded-xl text-lg hover:bg-gray-900 transition-colors shadow-lg shadow-gray-200"
          >
            Log In
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account? <button onClick={onSignupClick} className="font-bold text-[#0D1C22] underline hover:text-gray-700">Sign up</button>
        </p>
      </div>
    </div>
  );
};

export default Login;