import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import api from '../api/client';

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    tagline: '',
    shortDescription: '',
    fullDescription: '',
    image: '',
    benefits: '',
    idealFor: ''
  });

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await api.get('/services');
      if (res.data?.data) {
        setServices(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching services', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleOpenModal = (service = null) => {
    if (service) {
      setEditingService(service);
      setFormData({
        name: service.name || '',
        slug: service.slug || '',
        tagline: service.tagline || '',
        shortDescription: service.shortDescription || '',
        fullDescription: service.fullDescription || '',
        image: service.image || '',
        benefits: (service.benefits || []).join('\n'),
        idealFor: (service.idealFor || []).join(', ')
      });
    } else {
      setEditingService(null);
      setFormData({
        name: '',
        slug: '',
        tagline: '',
        shortDescription: '',
        fullDescription: '',
        image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
        benefits: '',
        idealFor: ''
      });
    }
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        benefits: formData.benefits.split('\n').filter(Boolean),
        idealFor: formData.idealFor.split(',').map((s) => s.trim()).filter(Boolean)
      };

      if (editingService) {
        await api.put(`/services/${editingService._id}`, payload);
      } else {
        await api.post('/services', payload);
      }
      setModalOpen(false);
      fetchServices();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving service');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this service?')) return;
    try {
      await api.delete(`/services/${id}`);
      setServices(services.filter((s) => s._id !== id));
    } catch (err) {
      alert('Error deleting service');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Land Services Management</h1>
          <p className="text-xs text-zinc-500">Edit and add land advisory service verticals, benefits, and imagery.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center space-x-1.5 bg-black hover:bg-zinc-800 text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow-sm"
        >
          <Plus className="w-4 h-4 text-[#38BDF8]" />
          <span>Add New Service</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-zinc-400 text-xs">Loading services...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3 px-4">Service</th>
                  <th className="py-3 px-4">Tagline</th>
                  <th className="py-3 px-4">Short Summary</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-zinc-700">
                {services.map((s) => (
                  <tr key={s._id} className="hover:bg-zinc-50/70">
                    <td className="py-3 px-4 flex items-center space-x-3">
                      <img src={s.image} alt={s.name} className="w-12 h-10 rounded-lg object-cover" />
                      <span className="font-bold text-zinc-900 text-sm">{s.name}</span>
                    </td>
                    <td className="py-3 px-4 text-zinc-500">{s.tagline}</td>
                    <td className="py-3 px-4 text-zinc-600 max-w-xs truncate">{s.shortDescription}</td>
                    <td className="py-3 px-4 text-right space-x-1">
                      <button
                        onClick={() => handleOpenModal(s)}
                        className="p-1.5 rounded-lg bg-zinc-100 hover:bg-black hover:text-white"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(s._id)}
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
              {editingService ? `Edit: ${editingService.name}` : 'Create Service'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-zinc-700 uppercase mb-1">Service Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-300"
                />
              </div>
              <div>
                <label className="block font-bold text-zinc-700 uppercase mb-1">Tagline</label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
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
                <label className="block font-bold text-zinc-700 uppercase mb-1">Short Description *</label>
                <textarea
                  required
                  rows={2}
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-300"
                />
              </div>
              <div>
                <label className="block font-bold text-zinc-700 uppercase mb-1">Full Description *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-300"
                />
              </div>
              <div>
                <label className="block font-bold text-zinc-700 uppercase mb-1">Benefits (one per line)</label>
                <textarea
                  rows={3}
                  value={formData.benefits}
                  onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-300"
                />
              </div>
              <div>
                <label className="block font-bold text-zinc-700 uppercase mb-1">Ideal For (comma separated)</label>
                <input
                  type="text"
                  value={formData.idealFor}
                  onChange={(e) => setFormData({ ...formData, idealFor: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-300"
                />
              </div>

              <div className="pt-3 border-t flex justify-end space-x-2">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 border rounded-xl">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-black text-white font-bold rounded-xl">
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminServices;
