import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Tag, Check, X } from 'lucide-react';
import api from '../api/client';

const AdminListings = () => {
  const [listings, setListings] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingListing, setEditingListing] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    projectId: '',
    plotNumberOrRef: '',
    location: '',
    plotOrLandSize: '',
    landType: 'Residential Plots',
    approvalStatus: 'TUDA Approved',
    roadAccess: '40ft BT Road',
    distanceToKeyPoints: '',
    priceRange: '',
    status: 'Available',
    facing: 'East',
    images: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80']
  });

  const fetchListingsAndProjects = async () => {
    setLoading(true);
    try {
      const [listRes, projRes] = await Promise.all([
        api.get('/listings'),
        api.get('/projects')
      ]);
      if (listRes.data?.data) setListings(listRes.data.data);
      if (projRes.data?.data) setProjects(projRes.data.data);
    } catch (err) {
      console.error('Failed to load listings', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListingsAndProjects();
  }, []);

  const handleOpenModal = (listing = null) => {
    if (listing) {
      setEditingListing(listing);
      setFormData({
        title: listing.title || '',
        projectId: listing.projectId?._id || listing.projectId || '',
        plotNumberOrRef: listing.plotNumberOrRef || '',
        location: listing.location || '',
        plotOrLandSize: listing.plotOrLandSize || '',
        landType: listing.landType || 'Residential Plots',
        approvalStatus: listing.approvalStatus || '',
        roadAccess: listing.roadAccess || '',
        distanceToKeyPoints: listing.distanceToKeyPoints || '',
        priceRange: listing.priceRange || '',
        status: listing.status || 'Available',
        facing: listing.facing || 'East',
        images: listing.images?.length > 0 ? listing.images : ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80']
      });
    } else {
      setEditingListing(null);
      setFormData({
        title: '',
        projectId: '',
        plotNumberOrRef: 'Plot #',
        location: 'Tirupati',
        plotOrLandSize: '200 Sq. Yards',
        landType: 'Residential Plots',
        approvalStatus: 'TUDA Approved',
        roadAccess: '40ft BT Road',
        distanceToKeyPoints: '5 km to Airport',
        priceRange: '₹22,00,000',
        status: 'Available',
        facing: 'East',
        images: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80']
      });
    }
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        projectId: formData.projectId || null
      };

      if (editingListing) {
        await api.put(`/listings/${editingListing._id}`, payload);
      } else {
        await api.post('/listings', payload);
      }
      setModalOpen(false);
      fetchListingsAndProjects();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving listing');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this land plot listing?')) return;
    try {
      await api.delete(`/listings/${id}`);
      setListings(listings.filter((l) => l._id !== id));
    } catch (err) {
      alert('Error deleting listing');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Individual Plot & Land Listings</h1>
          <p className="text-xs text-zinc-500">Manage granular inventory items and toggle availability status (Available / Reserved / Sold).</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center space-x-1.5 bg-black hover:bg-zinc-800 text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow-sm"
        >
          <Plus className="w-4 h-4 text-[#38BDF8]" />
          <span>Add Land Listing</span>
        </button>
      </div>

      {/* Listings Table */}
      <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-zinc-400 text-xs">Loading listings...</div>
        ) : listings.length === 0 ? (
          <div className="py-20 text-center text-zinc-500 text-sm">No plot listings created yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3 px-4">Ref #</th>
                  <th className="py-3 px-4">Title / Location</th>
                  <th className="py-3 px-4">Land Type</th>
                  <th className="py-3 px-4">Size</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-zinc-700">
                {listings.map((item) => (
                  <tr key={item._id} className="hover:bg-zinc-50/70 transition-colors">
                    <td className="py-3 px-4 font-bold text-black whitespace-nowrap">
                      {item.plotNumberOrRef}
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-bold text-zinc-900 block text-xs">{item.title}</span>
                      <span className="text-[10px] text-zinc-400 block">{item.location}</span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-zinc-800">{item.landType}</td>
                    <td className="py-3 px-4 font-medium text-zinc-900">{item.plotOrLandSize}</td>
                    <td className="py-3 px-4 font-bold text-emerald-700">{item.priceRange}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] border ${
                          item.status === 'Available'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : item.status === 'Reserved'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-red-50 text-red-700 border-red-200'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right space-x-1 whitespace-nowrap">
                      <button
                        onClick={() => handleOpenModal(item)}
                        className="p-1.5 rounded-lg bg-zinc-100 hover:bg-black hover:text-white transition-colors"
                        title="Edit Listing"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                        title="Delete Listing"
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

      {/* Edit/Create Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl border border-zinc-200">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
              <h3 className="text-lg font-bold text-zinc-900">
                {editingListing ? `Edit Listing: ${editingListing.plotNumberOrRef}` : 'Add Individual Land Listing'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-zinc-400 hover:text-black font-bold">
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-zinc-700 uppercase mb-1">Listing Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. East Facing 200 Sq.yd Villa Plot"
                  className="w-full px-3 py-2 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-[#38BDF8]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-zinc-700 uppercase mb-1">Plot / Ref # *</label>
                  <input
                    type="text"
                    required
                    value={formData.plotNumberOrRef}
                    onChange={(e) => setFormData({ ...formData, plotNumberOrRef: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-[#38BDF8]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-zinc-700 uppercase mb-1">Land Type *</label>
                  <select
                    value={formData.landType}
                    onChange={(e) => setFormData({ ...formData, landType: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-[#38BDF8] bg-white"
                  >
                    <option value="Residential Plots">Residential Plots</option>
                    <option value="Commercial Plots">Commercial Plots</option>
                    <option value="Open Plots">Open Plots</option>
                    <option value="Open Land for Investment">Open Land for Investment</option>
                    <option value="Farm Lands">Farm Lands</option>
                    <option value="Land Bank for Companies">Land Bank for Companies</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-zinc-700 uppercase mb-1">Parent Project (Optional)</label>
                  <select
                    value={formData.projectId}
                    onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-[#38BDF8] bg-white"
                  >
                    <option value="">None / Standalone Parcel</option>
                    {projects.map((p) => (
                      <option key={p._id} value={p._id}>{p.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-zinc-700 uppercase mb-1">Plot / Land Size *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 200 Sq. Yards"
                    value={formData.plotOrLandSize}
                    onChange={(e) => setFormData({ ...formData, plotOrLandSize: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-[#38BDF8]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-zinc-700 uppercase mb-1">Price Range / Rate *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ₹22,00,000"
                    value={formData.priceRange}
                    onChange={(e) => setFormData({ ...formData, priceRange: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-[#38BDF8]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-zinc-700 uppercase mb-1">Status *</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-[#38BDF8] bg-white"
                  >
                    <option value="Available">Available</option>
                    <option value="Reserved">Reserved</option>
                    <option value="Sold">Sold</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-zinc-700 uppercase mb-1">Facing</label>
                  <select
                    value={formData.facing}
                    onChange={(e) => setFormData({ ...formData, facing: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-[#38BDF8] bg-white"
                  >
                    <option value="East">East</option>
                    <option value="West">West</option>
                    <option value="North">North</option>
                    <option value="South">South</option>
                    <option value="Corner / Multi-facing">Corner / Multi-facing</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-zinc-700 uppercase mb-1">Location *</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-[#38BDF8]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-zinc-700 uppercase mb-1">Approval Sanction *</label>
                  <input
                    type="text"
                    required
                    value={formData.approvalStatus}
                    onChange={(e) => setFormData({ ...formData, approvalStatus: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-[#38BDF8]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-zinc-700 uppercase mb-1">Road Access Details *</label>
                  <input
                    type="text"
                    required
                    value={formData.roadAccess}
                    onChange={(e) => setFormData({ ...formData, roadAccess: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-[#38BDF8]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-zinc-700 uppercase mb-1">Key Distances *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 5 km to Airport, 3 km to NH-71"
                    value={formData.distanceToKeyPoints}
                    onChange={(e) => setFormData({ ...formData, distanceToKeyPoints: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-[#38BDF8]"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-200 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-zinc-300 hover:bg-zinc-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold"
                >
                  Save Plot Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminListings;
