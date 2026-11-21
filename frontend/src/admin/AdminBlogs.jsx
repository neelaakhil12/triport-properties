import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, CheckCircle2, ShieldCheck, ExternalLink } from 'lucide-react';
import api from '../api/client';

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Infrastructure Updates',
    featuredImage: '',
    shortDescription: '',
    content: '',
    author: 'Triport Research Desk',
    isPublished: true,
    officialSourcesText: ''
  });

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await api.get('/blogs?all=true');
      if (res.data?.data) {
        setBlogs(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching blogs', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleOpenModal = (blog = null) => {
    if (blog) {
      setEditingBlog(blog);
      const sourcesText = (blog.officialSourceLinks || [])
        .map((s) => `${s.sourceName} | ${s.url}`)
        .join('\n');

      setFormData({
        title: blog.title || '',
        slug: blog.slug || '',
        category: blog.category || 'Infrastructure Updates',
        featuredImage: blog.featuredImage || '',
        shortDescription: blog.shortDescription || '',
        content: blog.content || '',
        author: blog.author || 'Triport Research Desk',
        isPublished: blog.isPublished !== false,
        officialSourcesText: sourcesText
      });
    } else {
      setEditingBlog(null);
      setFormData({
        title: '',
        slug: '',
        category: 'Infrastructure Updates',
        featuredImage: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80',
        shortDescription: '',
        content: '',
        author: 'Triport Research Desk',
        isPublished: true,
        officialSourcesText: 'National Highways Authority of India (NHAI) | https://nhai.gov.in'
      });
    }
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedSources = formData.officialSourcesText
        .split('\n')
        .filter((l) => l.trim())
        .map((l) => {
          const parts = l.split('|').map((p) => p.trim());
          return { sourceName: parts[0] || 'Official Source', url: parts[1] || 'https://' };
        });

      const payload = {
        title: formData.title,
        slug: formData.slug,
        category: formData.category,
        featuredImage: formData.featuredImage,
        shortDescription: formData.shortDescription,
        content: formData.content,
        author: formData.author,
        isPublished: formData.isPublished,
        officialSourceLinks: parsedSources
      };

      if (editingBlog) {
        await api.put(`/blogs/${editingBlog._id}`, payload);
      } else {
        await api.post('/blogs', payload);
      }
      setModalOpen(false);
      fetchBlogs();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving article');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this article?')) return;
    try {
      await api.delete(`/blogs/${id}`);
      setBlogs(blogs.filter((b) => b._id !== id));
    } catch (err) {
      alert('Error deleting article');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Insights & Blog Management</h1>
          <p className="text-xs text-zinc-500">Publish verified infrastructure analysis, buyer checklists, and official source links.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center space-x-1.5 bg-black hover:bg-zinc-800 text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow-sm"
        >
          <Plus className="w-4 h-4 text-[#38BDF8]" />
          <span>Create Article</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-zinc-400 text-xs">Loading articles...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3 px-4">Article</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Author</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-zinc-700">
                {blogs.map((b) => (
                  <tr key={b._id} className="hover:bg-zinc-50/70">
                    <td className="py-3 px-4 flex items-center space-x-3">
                      <img src={b.featuredImage} alt={b.title} className="w-12 h-10 rounded-lg object-cover" />
                      <div>
                        <span className="font-bold text-zinc-900 text-sm block max-w-sm truncate">{b.title}</span>
                        <span className="text-[10px] text-zinc-400 block">{new Date(b.publicationDate).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-zinc-800">{b.category}</td>
                    <td className="py-3 px-4 text-zinc-600">{b.author}</td>
                    <td className="py-3 px-4">
                      {b.isPublished ? (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">Published</span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-500 font-bold text-[10px]">Draft</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right space-x-1">
                      <button
                        onClick={() => handleOpenModal(b)}
                        className="p-1.5 rounded-lg bg-zinc-100 hover:bg-black hover:text-white"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(b._id)}
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
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-zinc-900">
              {editingBlog ? `Edit: ${editingBlog.title}` : 'Create Article'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-zinc-700 uppercase mb-1">Article Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-300"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-zinc-700 uppercase mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-300 bg-white"
                  >
                    <option value="Infrastructure Updates">Infrastructure Updates</option>
                    <option value="Buying Checklists">Buying Checklists</option>
                    <option value="Land-use and Approval Basics">Land-use and Approval Basics</option>
                    <option value="Industrial News">Industrial News</option>
                    <option value="Investment Education">Investment Education</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-zinc-700 uppercase mb-1">Author Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-300"
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
                <label className="block font-bold text-zinc-700 uppercase mb-1">Full Article Content (Markdown) *</label>
                <textarea
                  required
                  rows={8}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-300 font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-700 uppercase mb-1">
                  Official Source Links (Required: Source Name | URL, one per line)
                </label>
                <textarea
                  rows={3}
                  placeholder="National Highways Authority | https://nhai.gov.in"
                  value={formData.officialSourcesText}
                  onChange={(e) => setFormData({ ...formData, officialSourcesText: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-300 font-mono"
                />
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="isPub"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  className="w-4 h-4 rounded text-[#38BDF8]"
                />
                <label htmlFor="isPub" className="font-bold text-zinc-800">Publish Article Immediately</label>
              </div>

              <div className="pt-3 border-t flex justify-end space-x-2">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 border rounded-xl">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-black text-white font-bold rounded-xl">
                  Save Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlogs;
