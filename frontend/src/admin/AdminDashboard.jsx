import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FolderKanban,
  ListFilter,
  Inbox,
  FileText,
  CheckCircle,
  Clock,
  ArrowRight,
  TrendingUp,
  Tag,
  Users
} from 'lucide-react';
import api from '../api/client';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [recentProjects, setRecentProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, enqRes, projRes] = await Promise.all([
          api.get('/stats'),
          api.get('/enquiries'),
          api.get('/projects')
        ]);

        if (statsRes.data?.stats) setStats(statsRes.data.stats);
        if (enqRes.data?.data) setRecentEnquiries(enqRes.data.data.slice(0, 5));
        if (projRes.data?.data) setRecentProjects(projRes.data.data.slice(0, 4));
      } catch (err) {
        console.error('Failed to load admin stats', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center text-zinc-500">
        <div className="w-8 h-8 border-4 border-[#38BDF8] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm">Loading dashboard analytics...</p>
      </div>
    );
  }

  const statCards = [
    { label: 'Total Projects', value: stats?.totalProjects || 0, icon: FolderKanban, link: '/admin/projects', color: 'bg-blue-50 text-blue-600' },
    { label: 'Total Plot Listings', value: stats?.totalListings || 0, icon: ListFilter, link: '/admin/listings', color: 'bg-purple-50 text-purple-600' },
    { label: 'Available Plots', value: stats?.availableProperties || 0, icon: CheckCircle, link: '/admin/listings', color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Sold Plots', value: stats?.soldProperties || 0, icon: Tag, link: '/admin/listings', color: 'bg-red-50 text-red-600' },
    { label: 'Total Enquiries', value: stats?.totalEnquiries || 0, icon: Inbox, link: '/admin/enquiries', color: 'bg-amber-50 text-amber-600' },
    { label: 'New Enquiries', value: stats?.newEnquiries || 0, icon: Clock, link: '/admin/enquiries', color: 'bg-sky-50 text-[#38BDF8]' },
    { label: 'Blog Articles', value: stats?.totalBlogs || 0, icon: FileText, link: '/admin/blogs', color: 'bg-indigo-50 text-indigo-600' }
  ];

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Advisory Dashboard & Live Metrics</h1>
        <p className="text-xs sm:text-sm text-zinc-500 mt-1">
          Real-time summary of corridor projects, inventory statuses, customer enquiries, and content modules.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Link
              key={idx}
              to={card.link}
              className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-zinc-500 group-hover:text-zinc-900 transition-colors">
                  {card.label}
                </span>
                <div className={`p-2 rounded-xl ${card.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl sm:text-3xl font-extrabold text-zinc-900">
                  {card.value}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-300 group-hover:text-black transition-colors" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Two Column Layout: Recent Enquiries & Active Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Enquiries (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
            <div>
              <h3 className="font-bold text-zinc-900 text-base">Recent Customer Enquiries</h3>
              <p className="text-xs text-zinc-500">Live investor leads from website forms</p>
            </div>
            <Link to="/admin/enquiries" className="text-xs font-bold text-[#38BDF8] hover:underline">
              View All &rarr;
            </Link>
          </div>

          {recentEnquiries.length === 0 ? (
            <p className="text-xs text-zinc-400 py-6 text-center">No enquiries received yet.</p>
          ) : (
            <div className="divide-y divide-zinc-100">
              {recentEnquiries.map((enq) => (
                <div key={enq._id} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-zinc-800 block text-sm">{enq.name}</span>
                    <span className="text-zinc-500 block">
                      {enq.type} • {enq.interestedIn} ({enq.phone})
                    </span>
                  </div>
                  <div className="text-right">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        enq.status === 'New'
                          ? 'bg-sky-100 text-[#38BDF8]'
                          : enq.status === 'Contacted'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      {enq.status}
                    </span>
                    <span className="text-[10px] text-zinc-400 block mt-0.5">
                      {new Date(enq.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Active Projects Quick Overview (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
            <div>
              <h3 className="font-bold text-zinc-900 text-base">Corridor Projects</h3>
              <p className="text-xs text-zinc-500">Active layout communities</p>
            </div>
            <Link to="/admin/projects" className="text-xs font-bold text-[#38BDF8] hover:underline">
              Manage &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {recentProjects.map((p) => (
              <div key={p._id} className="p-3 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center space-x-3">
                <img src={p.featuredImage} alt={p.name} className="w-12 h-12 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-xs text-zinc-900 truncate">{p.name}</h4>
                  <span className="text-[10px] text-zinc-500 block truncate">{p.location}</span>
                  <span className="text-[10px] text-emerald-600 font-bold block">{p.priceRange}</span>
                </div>
                <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-zinc-200 font-semibold text-zinc-700">
                  {p.propertyCategory.split(' ')[0]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
