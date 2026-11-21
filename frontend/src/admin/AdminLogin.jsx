import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, Loader2, AlertCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('admin@triportproperties.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await login(email, password);
    if (res.success) {
      navigate('/admin');
    } else {
      setError(res.message || 'Invalid credentials. Please verify your email and password.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl space-y-6 text-white">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-[#38BDF8] text-black font-extrabold flex items-center justify-center text-2xl mx-auto shadow-lg shadow-sky-500/20">
            TP
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white pt-2">
            Triport Properties
          </h2>
          <p className="text-xs text-zinc-400">
            Secure Admin Portal & Database Management Console
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-950/80 border border-red-800 rounded-xl text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
              Admin Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@triportproperties.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
              />
            </div>
          </div>

          {/* Quick Credential Hint */}
          <div className="p-3 bg-zinc-800/80 rounded-xl border border-zinc-700/60 text-[11px] text-zinc-400 space-y-1">
            <span className="font-semibold text-zinc-300 block">Initial Default Credentials:</span>
            <div className="flex justify-between">
              <span>Email: <strong className="text-white">admin@triportproperties.com</strong></span>
              <span>Pass: <strong className="text-white">admin123</strong></span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#38BDF8] hover:bg-sky-400 text-black py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg hover:shadow-sky-400/20 flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-black" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="pt-2 text-center">
          <Link to="/" className="text-xs text-zinc-400 hover:text-[#38BDF8] transition-colors">
            &larr; Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
