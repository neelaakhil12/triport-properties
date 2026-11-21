import React, { useState, useEffect } from 'react';
import { Search, Filter, RefreshCw } from 'lucide-react';
import PageHeadingBanner from '../components/PageHeadingBanner';
import ProjectCard from '../components/ProjectCard';
import EnquiryModal from '../components/EnquiryModal';
import api from '../api/client';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedZone, setSelectedZone] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = [
    'All',
    'Residential Plots',
    'Commercial Plots',
    'Open Plots',
    'Open Land for Investment',
    'Farm Lands',
    'Corporate Land Banks'
  ];

  const zones = [
    'All',
    'Tirupati',
    'Naidupeta',
    'Sullurpeta',
    'Tada',
    'Renigunta Airport Road',
    'Sri City Belt'
  ];

  const fetchProjects = async () => {
    setLoading(true);
    try {
      let url = '/projects?';
      const params = new URLSearchParams();
      if (selectedCategory !== 'All') params.append('category', selectedCategory);
      if (selectedZone !== 'All') params.append('corridorZone', selectedZone);
      if (searchQuery) params.append('search', searchQuery);

      const res = await api.get(`/projects?${params.toString()}`);
      if (res.data?.data) {
        setProjects(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [selectedCategory, selectedZone]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProjects();
  };

  const handleEnquire = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  return (
    <div className="bg-white">
      {/* Black Banner Heading with script accent */}
      <PageHeadingBanner
        title="Explore Land Opportunities Across the Growth Corridor"
        subtitle="TUDA approved residential layouts, highway commercial plots, fertile agro holdings, and strategic corporate land banks."
        breadcrumbs={[{ label: 'Projects' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Filters and Search Bar */}
        <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 mb-12 shadow-sm space-y-4">
          <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Search projects by name, location, or description..."
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
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSelectedZone('All');
                setSearchQuery('');
              }}
              className="inline-flex items-center justify-center space-x-1.5 px-4 py-3 rounded-xl border border-zinc-300 bg-white text-zinc-700 text-sm hover:bg-zinc-100 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </form>

          {/* Category Chips - 'All' Constant / Pinned, Remainder Scrollable */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase text-zinc-400">
                Filter by Category:
              </span>
              <span className="text-[10px] text-zinc-400 sm:hidden">
                Swipe &rarr;
              </span>
            </div>
            <div className="flex items-center gap-2">
              {/* Constant 'All' Button */}
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 shadow-sm ${
                  selectedCategory === 'All'
                    ? 'bg-black text-white'
                    : 'bg-white text-zinc-700 border border-zinc-200 hover:border-zinc-400'
                }`}
              >
                All
              </button>

              <div className="h-5 w-px bg-zinc-200 shrink-0" />

              {/* Scrollable Remaining Categories */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1.5 touch-pan-x flex-1 sm:flex-wrap">
                {categories.filter(cat => cat !== 'All').map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap shrink-0 ${
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
          </div>

          {/* Zone Chips - 'All' Constant / Pinned, Remainder Scrollable */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase text-zinc-400">
                Filter by Corridor Zone:
              </span>
              <span className="text-[10px] text-zinc-400 sm:hidden">
                Swipe &rarr;
              </span>
            </div>
            <div className="flex items-center gap-2">
              {/* Constant 'All' Zone Button */}
              <button
                onClick={() => setSelectedZone('All')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 shadow-sm ${
                  selectedZone === 'All'
                    ? 'bg-[#38BDF8] text-black font-bold'
                    : 'bg-white text-zinc-700 border border-zinc-200 hover:border-zinc-400'
                }`}
              >
                All
              </button>

              <div className="h-5 w-px bg-zinc-200 shrink-0" />

              {/* Scrollable Remaining Zones */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1.5 touch-pan-x flex-1 sm:flex-wrap">
                {zones.filter(zone => zone !== 'All').map((zone) => (
                  <button
                    key={zone}
                    onClick={() => setSelectedZone(zone)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap shrink-0 ${
                      selectedZone === zone
                        ? 'bg-[#38BDF8] text-black shadow-sm font-bold'
                        : 'bg-white text-zinc-700 border border-zinc-200 hover:border-zinc-400'
                    }`}
                  >
                    {zone}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="py-20 text-center text-zinc-500">
            <div className="w-8 h-8 border-4 border-[#38BDF8] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm font-medium">Loading verified corridor projects...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="py-20 text-center bg-zinc-50 rounded-2xl border border-zinc-200">
            <p className="text-base font-semibold text-zinc-700">No projects found matching your filter criteria.</p>
            <p className="text-xs text-zinc-500 mt-1">Try resetting the filters or searching for another keyword.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
                onEnquire={handleEnquire}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedProject ? `Enquire About ${selectedProject.name}` : 'Project Enquiry'}
        defaultProject={selectedProject}
        defaultService={selectedProject?.propertyCategory || 'Residential Plots'}
        targetTitle={selectedProject?.name || ''}
      />
    </div>
  );
};

export default Projects;
