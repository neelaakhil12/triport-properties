import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, MapPin } from 'lucide-react';
import api from '../api/client';

const AdminLocations = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    corridorRole: '',
    description: '',
    image: '',
    verifiedStatus: 'Verified via NHAI / Official Infrastructure Portals',
    distancesText: ''
  });

  const fetchLocations = async () => {
    setLoading(true);
    try {
      const res = await api.get('/locations');
      if (res.data?.data) {
        setLocations(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching locations', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const handleOpenModal = (loc = null) => {
    if (loc) {
      setEditingLocation(loc);
      const distLines = (loc.distances || [])
        .map((d) => `${d.destination} | ${d.distanceKm} | ${d.travelTime}`)
        .join('\n');

      setFormData({
        name: loc.name || '',
        corridorRole: loc.corridorRole || '',
        description: loc.description || '',
        image: loc.image || '',
        verifiedStatus: loc.verifiedStatus || 'Verified via Official Records',
        distancesText: distLines
      });
    } else {
      setEditingLocation(null);
      setFormData({
        name: '',
        corridorRole: 'Strategic Corridor Node',
        description: '',
        image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80',
        verifiedStatus: 'Verified via Official Portals',
        distancesText: 'Tirupati | 15 km | 20 mins'
      });
    }
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedDistances = formData.distancesText
        .split('\n')
        .filter((l) => l.trim())
        .map((line) => {
          const parts = line.split('|').map((p) => p.trim());
          return {
            destination: parts[0] || 'Hub',
            distanceKm: parts[1] || '10 km',
            travelTime: parts[2] || '15 mins'
          };
        });

      const payload = {
        name: formData.name,
        corridorRole: formData.corridorRole,
        description: formData.description,
        image: formData.image,
        verifiedStatus: formData.verifiedStatus,
        distances: parsedDistances
      };

      if (editingLocation) {
        await api.put(`/locations/${editingLocation._id}`, payload);
      } else {
        await api.post('/locations', payload);
      }
      setModalOpen(false);
      fetchLocations();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving location');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this corridor location?')) return;
    try {
      await api.delete(`/locations/${id}`);
      setLocations(locations.filter((l) => l._id !== id));
    } catch (err) {
      alert('Error deleting location');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Locations & Connectivity Management</h1>
          <p className="text-xs text-zinc-500">Manage corridor points, official verified distances, and travel times.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center space-x-1.5 bg-black hover:bg-zinc-800 text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow-sm"
        >
          <Plus className="w-4 h-4 text-[#38BDF8]" />
          <span>Add Location Node</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-zinc-400 text-xs">Loading locations...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3 px-4">Location Node</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Verified Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-zinc-700">
                {locations.map((loc) => (
                  <tr key={loc._id} className="hover:bg-zinc-50/70">
                    <td className="py-3 px-4 flex items-center space-x-3">
                      <img src={loc.image} alt={loc.name} className="w-12 h-10 rounded-lg object-cover" />
                      <span className="font-bold text-zinc-900 text-sm">{loc.name}</span>
                    </td>
                    <td className="py-3 px-4 text-zinc-600 font-medium">{loc.corridorRole}</td>
                    <td className="py-3 px-4 text-zinc-400 text-[11px]">{loc.verifiedStatus}</td>
                    <td className="py-3 px-4 text-right space-x-1">
                      <button
                        onClick={() => handleOpenModal(loc)}
                        className="p-1.5 rounded-lg bg-zinc-100 hover:bg-black hover:text-white"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(loc._id)}
                        className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white"
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

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-zinc-900">
              {editingLocation ? `Edit: ${editingLocation.name}` : 'Add Location Node'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-zinc-700 uppercase mb-1">Location Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-300"
                />
              </div>
              <div>
                <label className="block font-bold text-zinc-700 uppercase mb-1">Corridor Role *</label>
                <input
                  type="text"
                  required
                  value={formData.corridorRole}
                  onChange={(e) => setFormData({ ...formData, corridorRole: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-300"
                />
              </div>
              <div>
                <label className="block font-bold text-zinc-700 uppercase mb-1">Image URL *</label>
                <input
                  type="url"
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-300"
                />
              </div>
              <div>
                <label className="block font-bold text-zinc-700 uppercase mb-1">Detailed Description *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-300"
                />
              </div>
              <div>
                <label className="block font-bold text-zinc-700 uppercase mb-1">
                  Distances (Format: Destination | Distance | Travel Time, one per line)
                </label>
                <textarea
                  rows={4}
                  placeholder="Renigunta Junction | 10 km | 15 mins&#10;Tirupati Airport | 14 km | 20 mins"
                  value={formData.distancesText}
                  onChange={(e) => setFormData({ ...formData, distancesText: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-300 font-mono"
                />
              </div>

              <div className="pt-3 border-t flex justify-end space-x-2">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 border rounded-xl">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-black text-white font-bold rounded-xl">
                  Save Node
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLocations;
