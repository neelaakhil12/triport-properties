import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderKanban,
  ListFilter,
  Inbox,
  FileText,
  Briefcase,
  MapPin,
  Globe,
  Building,
  Quote,
  Sliders,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Edit3
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, exact: true },
    { name: 'Enquiries & Leads', path: '/admin/enquiries', icon: Inbox },
    { name: 'Projects Management', path: '/admin/projects', icon: FolderKanban },
    { name: 'Plot Listings', path: '/admin/listings', icon: ListFilter },
    { name: 'Services Management', path: '/admin/services', icon: Briefcase },
    { name: 'Locations & Distances', path: '/admin/locations', icon: MapPin },
    { name: 'Insights & Blogs', path: '/admin/blogs', icon: FileText },
    { name: 'Client Testimonials', path: '/admin/testimonials', icon: Quote },
    { name: 'Page Content (Home/About)', path: '/admin/content', icon: Edit3 },
    { name: 'Website Settings', path: '/admin/settings', icon: Sliders },
  ];

  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-zinc-900 text-white shrink-0 flex flex-col justify-between">
        <div>
          {/* Logo */}
          <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
            <Link to="/admin" className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded bg-[#38BDF8] text-black font-extrabold flex items-center justify-center text-sm shadow">
                TP
              </div>
              <div>
                <span className="font-bold text-sm tracking-tight block text-white">Triport Admin</span>
                <span className="text-[10px] text-zinc-400 block uppercase font-medium">Control Panel</span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)]">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.exact
                ? location.pathname === item.path
                : location.pathname.startsWith(item.path);

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#38BDF8] text-black shadow-md font-bold'
                      : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-zinc-400'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Profile & Actions */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-950/60">
          <div className="flex items-center justify-between mb-3">
            <div className="truncate">
              <span className="text-xs font-bold text-white block truncate">{user?.name || 'Administrator'}</span>
              <span className="text-[10px] text-zinc-400 block truncate">{user?.email}</span>
            </div>
            <Link
              to="/"
              target="_blank"
              title="View Live Website"
              className="p-1.5 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-1.5 py-2 px-3 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-300 text-xs font-semibold transition-colors border border-red-900/50"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Secure Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Navbar */}
        <header className="bg-white border-b border-zinc-200 px-6 py-3.5 flex items-center justify-between shrink-0 shadow-sm">
          <div className="flex items-center space-x-2 text-xs text-zinc-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Authorized Management Console</span>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              to="/"
              target="_blank"
              className="inline-flex items-center space-x-1 text-xs font-bold text-zinc-700 hover:text-[#38BDF8] bg-zinc-100 hover:bg-zinc-200 px-3 py-1.5 rounded-lg transition-colors"
            >
              <span>View Public Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </header>

        {/* View Outlet */}
        <div className="p-6 md:p-8 flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
