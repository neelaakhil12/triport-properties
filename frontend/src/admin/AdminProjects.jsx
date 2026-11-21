import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Eye, ShieldCheck, Check, X, Image as ImageIcon } from 'lucide-react';
import api from '../api/client';

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    tagline: '',
    location: '',
    corridorZone: 'Tirupati',
    propertyCategory: 'Residential Plots',
    availablePlotSizes: '150 - 400 Sq. Yards',
    totalLandArea: '15 Acres',
    priceRange: '₹15 Lakhs - ₹35 Lakhs',
    approvalStatus: 'TUDA Approved',
    roadAccess: '40ft & 60ft BT Roads',
    shortDescription: '',
    detailedOverview: '',
    featuredImage: '',
    mapEmbedUrl: '',
    status: 'Available',
    isFeaturedOnHome: false
  });

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await api.get('/projects');
      if (res.data?.data) {
        setProjects(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load projects', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenModal = (project = null) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        name: project.name || '',
        slug: project.slug || '',
        tagline: project.tagline || '',
        location: project.location || '',
        corridorZone: project.corridorZone || 'Tirupati',
        propertyCategory: project.propertyCategory || 'Residential Plots',
        availablePlotSizes: project.availablePlotSizes || '',
        totalLandArea: project.totalLandArea || '',
        priceRange: project.priceRange || '',
        approvalStatus: project.approvalStatus || '',
        roadAccess: project.roadAccess || '',
        shortDescription: project.shortDescription || '',
        detailedOverview: project.detailedOverview || '',
        featuredImage: project.featuredImage || '',
        mapEmbedUrl: project.mapEmbedUrl || '',
        status: project.status || 'Available',
        isFeaturedOnHome: project.isFeaturedOnHome || false
      });
    } else {
      setEditingProject(null);
      setFormData({
        name: '',
        slug: '',
        tagline: 'Premium Land Opportunity',
        location: 'Tirupati District',
        corridorZone: 'Tirupati',
        propertyCategory: 'Residential Plots',
        availablePlotSizes: '150 - 400 Sq. Yards',
        totalLandArea: '15 Acres',
        priceRange: '₹15 Lakhs - ₹35 Lakhs',
        approvalStatus: 'TUDA / DTCP Sanctioned',
        roadAccess: '40ft & 60ft BT Roads',
        shortDescription: '',
        detailedOverview: '',
        featuredImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
        mapEmbedUrl: '',
        status: 'Available',
        isFeaturedOnHome: true
      });
    }
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProject) {
        await api.put(`/projects/${editingProject._id}`, formData);
      } else {
        await api.post('/projects', formData);
      }
      setModalOpen(false);
      fetchProjects();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving project');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project? This will remove all associated information.')) return;
    try {
      await api.delete(`/projects/${id}`);
      setProjects(projects.filter((p) => p._id !== id));
    } catch (err) {
      alert('Error deleting project');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Projects Management</h1>
          <p className="text-xs text-zinc-500">Add, edit, and organize corridor layout communities.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center space-x-1.5 bg-black hover:bg-zinc-800 text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow-sm"
        >
          <Plus className="w-4 h-4 text-[#38BDF8]" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Projects List */}
      <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-zinc-400 text-xs">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="py-20 text-center text-zinc-500 text-sm">No projects created yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3 px-4">Project</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Location & Zone</th>
                  <th className="py-3 px-4">Price Range</th>
                  <th className="py-3 px-4">Approval Status</th>
                  <th className="py-3 px-4">Featured</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-zinc-700">
                {projects.map((p) => (
                  <tr key={p._id} className="hover:bg-zinc-50/70 transition-colors">
                    <td className="py-3 px-4 flex items-center space-x-3">
                      <img src={p.featuredImage} alt={p.name} className="w-12 h-10 rounded-lg object-cover" />
                      <div>
                        <span className="font-bold text-zinc-900 block text-sm">{p.name}</span>
                        <span className="text-[10px] text-zinc-400 block">{p.availablePlotSizes}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-zinc-800">{p.propertyCategory}</td>
                    <td className="py-3 px-4">
                      <div>{p.location}</div>
                      <div className="text-[10px] text-[#38BDF8] font-bold">{p.corridorZone}</div>
                    </td>
                    <td className="py-3 px-4 font-bold text-emerald-700">{p.priceRange}</td>
                    <td className="py-3 px-4 text-zinc-600 font-medium">{p.approvalStatus}</td>
                    <td className="py-3 px-4">
                      {p.isFeaturedOnHome ? (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">Yes</span>
                      ) : (
                        <span className="text-zinc-400">No</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right space-x-1 whitespace-nowrap">
                      <button
                        onClick={() => handleOpenModal(p)}
                        className="p-1.5 rounded-lg bg-zinc-100 hover:bg-black hover:text-white transition-colors"
                        title="Edit Project"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                        title="Delete Project"
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
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl border border-zinc-200">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
              <h3 className="text-lg font-bold text-zinc-900">
                {editingProject ? `Edit Project: ${editingProject.name}` : 'Create New Corridor Project'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-zinc-400 hover:text-black font-bold">
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-zinc-700 uppercase mb-1">Project Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-[#38BDF8]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-zinc-700 uppercase mb-1">Tagline</label>
                  <input
                    type="text"
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-[#38BDF8]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-zinc-700 uppercase mb-1">Category *</label>
                  <select
                    value={formData.propertyCategory}
                    onChange={(e) => setFormData({ ...formData, propertyCategory: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-[#38BDF8] bg-white"
                  >
                    <option value="Residential Plots">Residential Plots</option>
                    <option value="Commercial Plots">Commercial Plots</option>
                    <option value="Open Plots">Open Plots</option>
                    <option value="Open Land for Investment">Open Land for Investment</option>
                    <option value="Farm Lands">Farm Lands</option>
                    <option value="Corporate Land Banks">Corporate Land Banks</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-zinc-700 uppercase mb-1">Corridor Zone *</label>
                  <select
                    value={formData.corridorZone}
                    onChange={(e) => setFormData({ ...formData, corridorZone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-[#38BDF8] bg-white"
                  >
                    <option value="Tirupati">Tirupati</option>
                    <option value="Naidupeta">Naidupeta</option>
                    <option value="Sullurpeta">Sullurpeta</option>
                    <option value="Tada">Tada</option>
                    <option value="Renigunta Airport Road">Renigunta Airport Road</option>
                    <option value="Sri City Belt">Sri City Belt</option>
                    <option value="Krishnapatnam Port Road">Krishnapatnam Port Road</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-zinc-700 uppercase mb-1">Location Details *</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-[#38BDF8]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-zinc-700 uppercase mb-1">Available Plot Sizes *</label>
                  <input
                    type="text"
                    required
                    value={formData.availablePlotSizes}
                    onChange={(e) => setFormData({ ...formData, availablePlotSizes: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-[#38BDF8]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-zinc-700 uppercase mb-1">Total Project Area</label>
                  <input
                    type="text"
                    value={formData.totalLandArea}
                    onChange={(e) => setFormData({ ...formData, totalLandArea: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-[#38BDF8]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-zinc-700 uppercase mb-1">Price Range *</label>
                  <input
                    type="text"
                    required
                    value={formData.priceRange}
                    onChange={(e) => setFormData({ ...formData, priceRange: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-[#38BDF8]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              </div>

              <div>
                <label className="block font-bold text-zinc-700 uppercase mb-1">Featured Image URL *</label>
                <input
                  type="url"
                  required
                  value={formData.featuredImage}
                  onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-[#38BDF8]"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-700 uppercase mb-1">Short Description *</label>
                <textarea
                  required
                  rows={2}
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-[#38BDF8]"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-700 uppercase mb-1">Detailed Overview *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.detailedOverview}
                  onChange={(e) => setFormData({ ...formData, detailedOverview: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-[#38BDF8]"
                />
              </div>

              <div className="flex items-center space-x-6 pt-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeaturedOnHome}
                    onChange={(e) => setFormData({ ...formData, isFeaturedOnHome: e.target.checked })}
                    className="w-4 h-4 text-[#38BDF8] rounded"
                  />
                  <span className="font-bold text-zinc-800">Feature this project on Homepage</span>
                </label>
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
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProjects;
