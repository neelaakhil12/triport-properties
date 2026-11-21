import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Star } from 'lucide-react';
import api from '../api/client';

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);

  const [formData, setFormData] = useState({
    clientName: '',
    designationOrLocation: '',
    propertyPurchased: '',
    quote: '',
    avatarUrl: '',
    rating: 5,
    isPublished: true
  });

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const res = await api.get('/testimonials?all=true');
      if (res.data?.data) {
        setTestimonials(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching testimonials', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleOpenModal = (test = null) => {
    if (test) {
      setEditingTestimonial(test);
      setFormData({
        clientName: test.clientName || '',
        designationOrLocation: test.designationOrLocation || '',
        propertyPurchased: test.propertyPurchased || '',
        quote: test.quote || '',
        avatarUrl: test.avatarUrl || '',
        rating: test.rating || 5,
        isPublished: test.isPublished !== false
      });
    } else {
      setEditingTestimonial(null);
      setFormData({
        clientName: '',
        designationOrLocation: 'Tirupati, India',
        propertyPurchased: 'Residential Plot',
        quote: '',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        isPublished: true
      });
    }
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTestimonial) {
        await api.put(`/testimonials/${editingTestimonial._id}`, formData);
      } else {
        await api.post('/testimonials', formData);
      }
      setModalOpen(false);
      fetchTestimonials();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving testimonial');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this client testimonial?')) return;
    try {
      await api.delete(`/testimonials/${id}`);
      setTestimonials(testimonials.filter((t) => t._id !== id));
    } catch (err) {
      alert('Error deleting testimonial');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Client Testimonials Management</h1>
          <p className="text-xs text-zinc-500">Manage real customer feedback showcased in the "Our Clients Speak" section.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center space-x-1.5 bg-black hover:bg-zinc-800 text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow-sm"
        >
          <Plus className="w-4 h-4 text-[#38BDF8]" />
          <span>Add Testimonial</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-zinc-400 text-xs">Loading testimonials...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3 px-4">Client</th>
                  <th className="py-3 px-4">Location / Role</th>
                  <th className="py-3 px-4">Feedback Quote</th>
                  <th className="py-3 px-4">Rating</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-zinc-700">
                {testimonials.map((t) => (
                  <tr key={t._id} className="hover:bg-zinc-50/70">
                    <td className="py-3 px-4 flex items-center space-x-3">
                      <img src={t.avatarUrl} alt={t.clientName} className="w-9 h-9 rounded-full object-cover" />
                      <span className="font-bold text-zinc-900 text-sm">{t.clientName}</span>
                    </td>
                    <td className="py-3 px-4 text-zinc-600">{t.designationOrLocation}</td>
                    <td className="py-3 px-4 text-zinc-600 max-w-md truncate italic">"{t.quote}"</td>
                    <td className="py-3 px-4 font-bold text-amber-500">{'★'.repeat(t.rating)}</td>
                    <td className="py-3 px-4 text-right space-x-1">
                      <button
                        onClick={() => handleOpenModal(t)}
                        className="p-1.5 rounded-lg bg-zinc-100 hover:bg-black hover:text-white"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(t._id)}
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
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-4">
            <h3 className="text-lg font-bold text-zinc-900">
              {editingTestimonial ? `Edit: ${editingTestimonial.clientName}` : 'Add Testimonial'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-zinc-700 uppercase mb-1">Client Name *</label>
                <input
                  type="text"
                  required
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-zinc-700 uppercase mb-1">Location / Role *</label>
                  <input
                    type="text"
                    required
                    value={formData.designationOrLocation}
                    onChange={(e) => setFormData({ ...formData, designationOrLocation: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-zinc-700 uppercase mb-1">Property Purchased</label>
                  <input
                    type="text"
                    value={formData.propertyPurchased}
                    onChange={(e) => setFormData({ ...formData, propertyPurchased: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-zinc-700 uppercase mb-1">Avatar Image URL</label>
                <input
                  type="url"
                  value={formData.avatarUrl}
                  onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-300"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-700 uppercase mb-1">Customer Quote *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-300"
                />
              </div>

              <div className="pt-3 border-t flex justify-end space-x-2">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 border rounded-xl">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-black text-white font-bold rounded-xl">
                  Save Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTestimonials;
