import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Search, ShieldCheck } from 'lucide-react';
import PageHeadingBanner from '../components/PageHeadingBanner';
import api from '../api/client';

const Insights = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All',
    'Infrastructure Updates',
    'Buying Checklists',
    'Land-use and Approval Basics',
    'Industrial News',
    'Investment Education'
  ];

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedCategory !== 'All') params.append('category', selectedCategory);
      if (searchQuery) params.append('search', searchQuery);

      const res = await api.get(`/blogs?${params.toString()}`);
      if (res.data?.data) {
        setBlogs(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load insights:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [selectedCategory]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchBlogs();
  };

  return (
    <div className="bg-white">
      {/* Black Banner Heading with script accent */}
      <PageHeadingBanner
        title="Insights Into Land and Regional Growth"
        subtitle="In-depth analysis of highways, port projects, industrial expansion, and statutory land verification in Andhra Pradesh, backed by official sources."
        breadcrumbs={[{ label: 'Insights & Blog' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Search & Categories */}
        <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 mb-12 shadow-sm space-y-4">
          <form onSubmit={handleSearchSubmit} className="flex gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Search articles by title or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#38BDF8] bg-white"
              />
            </div>
            <button
              type="submit"
              className="bg-black hover:bg-zinc-800 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-colors"
            >
              Search
            </button>
          </form>

          {/* Category Chips */}
          <div className="flex flex-wrap gap-2 pt-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-black text-white shadow-sm'
                    : 'bg-white text-zinc-700 border border-zinc-200 hover:border-zinc-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blogs Grid */}
        {loading ? (
          <div className="py-20 text-center text-zinc-500">
            <div className="w-8 h-8 border-4 border-[#38BDF8] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm">Loading articles & official analysis...</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="py-20 text-center bg-zinc-50 rounded-2xl border border-zinc-200">
            <p className="text-base font-semibold text-zinc-700">No articles found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <article
                key={blog._id}
                data-aos="fade-up"
                className="bg-white rounded-2xl overflow-hidden border border-zinc-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100">
                  <img
                    src={blog.featuredImage}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md text-[#38BDF8] text-[11px] font-bold px-3 py-1 rounded-full uppercase">
                    {blog.category}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center text-xs text-zinc-400 gap-4 mb-2.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#38BDF8]" />
                        {new Date(blog.publicationDate).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-zinc-400" />
                        {blog.author}
                      </span>
                    </div>

                    <h3 className="font-bold text-lg text-zinc-900 group-hover:text-[#38BDF8] transition-colors leading-snug mb-3">
                      {blog.title}
                    </h3>

                    <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed line-clamp-3 mb-6">
                      {blog.shortDescription}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
                    <Link
                      to={`/insights/${blog.slug || blog._id}`}
                      className="inline-flex items-center space-x-1.5 text-xs font-bold text-black group-hover:text-[#38BDF8] transition-colors"
                    >
                      <span>Read Full Analysis</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    {blog.officialSourceLinks?.length > 0 && (
                      <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 font-semibold flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        <span>Official Sources Cited</span>
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Insights;
