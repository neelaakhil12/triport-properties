import React, { useState, useEffect } from 'react';
import { Search, Download, Trash2, Eye, CheckCircle2, MessageSquare, Clock, Filter, Plus } from 'lucide-react';
import api from '../api/client';

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [search, setSearch] = useState('');
  const [activeEnquiry, setActiveEnquiry] = useState(null);
  const [noteText, setNoteText] = useState('');

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedStatus !== 'All') params.append('status', selectedStatus);
      if (selectedType !== 'All') params.append('type', selectedType);
      if (search) params.append('search', search);

      const res = await api.get(`/enquiries?${params.toString()}`);
      if (res.data?.data) {
        setEnquiries(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching enquiries', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [selectedStatus, selectedType]);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const res = await api.put(`/enquiries/${id}/status`, { status: newStatus });
      if (res.data?.data) {
        setEnquiries(enquiries.map((e) => (e._id === id ? res.data.data : e)));
        if (activeEnquiry?._id === id) {
          setActiveEnquiry(res.data.data);
        }
      }
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleAddNote = async (id) => {
    if (!noteText.trim()) return;
    try {
      const res = await api.post(`/enquiries/${id}/notes`, { note: noteText });
      if (res.data?.data) {
        setEnquiries(enquiries.map((e) => (e._id === id ? res.data.data : e)));
        setActiveEnquiry(res.data.data);
        setNoteText('');
      }
    } catch (err) {
      alert('Failed to add note');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this enquiry?')) return;
    try {
      await api.delete(`/enquiries/${id}`);
      setEnquiries(enquiries.filter((e) => e._id !== id));
      if (activeEnquiry?._id === id) setActiveEnquiry(null);
    } catch (err) {
      alert('Failed to delete enquiry');
    }
  };

  const handleExportCSV = () => {
    window.open('http://localhost:5000/api/enquiries/export-csv', '_blank');
  };

  const statuses = ['All', 'New', 'Contacted', 'Interested', 'Converted', 'Closed'];
  const types = ['All', 'General', 'Service', 'Project', 'Listing', 'NRI', 'Corporate'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Enquiries & Investor Leads</h1>
          <p className="text-xs text-zinc-500">Manage incoming property consultation requests, statuses, and internal notes.</p>
        </div>
        <button
          onClick={handleExportCSV}
          className="inline-flex items-center space-x-1.5 bg-black hover:bg-zinc-800 text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow-sm self-start sm:self-auto"
        >
          <Download className="w-4 h-4 text-[#38BDF8]" />
          <span>Export Enquiries to CSV</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl border border-zinc-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Search by name, phone, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchEnquiries()}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <span className="text-[11px] font-bold text-zinc-400 uppercase">Status:</span>
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                selectedStatus === st ? 'bg-black text-white' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <span className="text-[11px] font-bold text-zinc-400 uppercase">Type:</span>
          {types.map((tp) => (
            <button
              key={tp}
              onClick={() => setSelectedType(tp)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                selectedType === tp ? 'bg-[#38BDF8] text-black font-bold' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              {tp}
            </button>
          ))}
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-zinc-400 text-xs">Loading enquiries...</div>
        ) : enquiries.length === 0 ? (
          <div className="py-20 text-center text-zinc-500 text-sm">No enquiries match the filter.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Customer Name</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Budget / Location</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-zinc-700">
                {enquiries.map((enq) => (
                  <tr key={enq._id} className="hover:bg-zinc-50/70 transition-colors">
                    <td className="py-3 px-4 text-zinc-400 whitespace-nowrap">
                      {new Date(enq.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 font-bold text-zinc-900">
                      {enq.name}
                      {enq.companyName && (
                        <span className="block text-[10px] text-zinc-500 font-normal">
                          {enq.companyName}
                        </span>
                      )}
                      {enq.countryOfResidence && (
                        <span className="block text-[10px] text-[#38BDF8] font-semibold">
                          NRI: {enq.countryOfResidence}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div>{enq.phone}</div>
                      <div className="text-zinc-400">{enq.email}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-sky-50 text-sky-800 font-semibold text-[10px] border border-sky-100">
                        {enq.type}
                      </span>
                      <span className="block text-[11px] text-zinc-600 mt-0.5">{enq.interestedIn}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div>{enq.budgetRange}</div>
                      <div className="text-zinc-400 text-[10px]">{enq.preferredLocation || 'Any'}</div>
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={enq.status}
                        onChange={(e) => handleStatusUpdate(enq._id, e.target.value)}
                        className={`text-[11px] font-bold py-1 px-2 rounded-lg border focus:outline-none ${
                          enq.status === 'New'
                            ? 'bg-sky-50 text-sky-700 border-sky-200'
                            : enq.status === 'Contacted'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : enq.status === 'Interested'
                            ? 'bg-purple-50 text-purple-700 border-purple-200'
                            : enq.status === 'Converted'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-zinc-100 text-zinc-600 border-zinc-200'
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Interested">Interested</option>
                        <option value="Converted">Converted</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 text-right space-x-1 whitespace-nowrap">
                      <button
                        onClick={() => setActiveEnquiry(enq)}
                        className="p-1.5 rounded-lg bg-zinc-100 hover:bg-black hover:text-white transition-colors"
                        title="View Full Details & Notes"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(enq._id)}
                        className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                        title="Delete Enquiry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Enquiry Detail & Notes Modal / Drawer */}
      {activeEnquiry && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl border border-zinc-200">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#38BDF8] tracking-widest block">
                  {activeEnquiry.type} Lead Details
                </span>
                <h3 className="text-xl font-bold text-zinc-900">{activeEnquiry.name}</h3>
              </div>
              <button
                onClick={() => setActiveEnquiry(null)}
                className="text-zinc-400 hover:text-black font-bold text-sm"
              >
                ✕ Close
              </button>
            </div>

            {/* Quick Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-zinc-50 p-4 rounded-xl border border-zinc-200">
              <div>
                <span className="text-zinc-400 block text-[10px] uppercase">Phone:</span>
                <a href={`tel:${activeEnquiry.phone}`} className="font-bold text-zinc-800 hover:underline">
                  {activeEnquiry.phone}
                </a>
              </div>
              <div>
                <span className="text-zinc-400 block text-[10px] uppercase">Email:</span>
                <a href={`mailto:${activeEnquiry.email}`} className="font-bold text-zinc-800 hover:underline">
                  {activeEnquiry.email}
                </a>
              </div>
              <div>
                <span className="text-zinc-400 block text-[10px] uppercase">WhatsApp:</span>
                <span className="font-bold text-zinc-800">{activeEnquiry.whatsAppNumber || 'None'}</span>
              </div>
              <div>
                <span className="text-zinc-400 block text-[10px] uppercase">Interested In:</span>
                <span className="font-bold text-zinc-800">{activeEnquiry.interestedIn}</span>
              </div>
              <div>
                <span className="text-zinc-400 block text-[10px] uppercase">Budget:</span>
                <span className="font-bold text-zinc-800">{activeEnquiry.budgetRange}</span>
              </div>
              <div>
                <span className="text-zinc-400 block text-[10px] uppercase">Location Preference:</span>
                <span className="font-bold text-zinc-800">{activeEnquiry.preferredLocation || 'Any'}</span>
              </div>
            </div>

            {/* Message Body */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                Customer Message:
              </span>
              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-800 leading-relaxed whitespace-pre-wrap">
                {activeEnquiry.message}
              </div>
            </div>

            {/* Internal Advisor Notes */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
                Internal Advisor Notes & Follow-up History:
              </span>

              {activeEnquiry.internalNotes?.length === 0 ? (
                <p className="text-xs text-zinc-400 italic">No internal notes added yet.</p>
              ) : (
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {activeEnquiry.internalNotes.map((n, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-amber-50/60 border border-amber-200 text-xs text-zinc-800">
                      <div className="flex justify-between text-[10px] text-zinc-400 mb-1">
                        <span>Advisor Note</span>
                        <span>{new Date(n.addedAt).toLocaleString()}</span>
                      </div>
                      <p>{n.note}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Note Input */}
              <div className="flex gap-2 pt-1">
                <input
                  type="text"
                  placeholder="Type an internal note (e.g. Spoke to client, site visit fixed for Sunday)..."
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
                />
                <button
                  type="button"
                  onClick={() => handleAddNote(activeEnquiry._id)}
                  className="px-4 py-2 bg-black text-white text-xs font-bold rounded-xl hover:bg-zinc-800"
                >
                  Add Note
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEnquiries;
