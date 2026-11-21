import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, ExternalLink, ShieldCheck, Share2 } from 'lucide-react';
import PageHeadingBanner from '../components/PageHeadingBanner';
import api from '../api/client';

const BlogDetails = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/blogs/${slug}`);
        if (res.data?.data) {
          setBlog(res.data.data);
        }
      } catch (err) {
        console.error('Failed to load article:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="py-32 text-center text-zinc-500">
        <div className="w-8 h-8 border-4 border-[#38BDF8] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm">Loading article...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="py-32 text-center">
        <h2 className="text-2xl font-bold text-zinc-900 mb-2">Article Not Found</h2>
        <Link to="/insights" className="inline-flex items-center space-x-2 bg-black text-white px-5 py-2.5 rounded-xl text-sm font-semibold">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Insights</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Black Banner Heading with script accent */}
      <PageHeadingBanner
        title={blog.title}
        subtitle={`${blog.category} • Published ${new Date(blog.publicationDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}`}
        breadcrumbs={[
          { label: 'Insights', path: '/insights' },
          { label: blog.title }
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
        {/* Back Link & Meta */}
        <div className="flex items-center justify-between pb-6 border-b border-zinc-200 text-xs text-zinc-500">
          <Link to="/insights" className="inline-flex items-center space-x-1.5 text-zinc-700 hover:text-[#38BDF8] font-bold">
            <ArrowLeft className="w-4 h-4" />
            <span>All Articles</span>
          </Link>
          <div className="flex items-center space-x-4">
            <span>Author: <strong>{blog.author}</strong></span>
            <span>Category: <strong className="text-[#38BDF8]">{blog.category}</strong></span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="aspect-[16/9] rounded-3xl overflow-hidden bg-zinc-100 border border-zinc-200 shadow-md">
          <img src={blog.featuredImage} alt={blog.title} className="w-full h-full object-cover" />
        </div>

        {/* Short Summary Callout */}
        <div className="p-6 rounded-2xl bg-sky-50/70 border-l-4 border-[#38BDF8] text-sm sm:text-base text-zinc-800 leading-relaxed font-medium">
          {blog.shortDescription}
        </div>

        {/* Article Body */}
        <div className="prose prose-zinc max-w-none text-zinc-800 leading-relaxed space-y-4 whitespace-pre-line text-base">
          {blog.content}
        </div>

        {/* Official Sources Cited (Strict Requirement) */}
        {blog.officialSourceLinks?.length > 0 && (
          <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-3">
            <h4 className="text-xs uppercase font-bold text-zinc-800 tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Official Government & Infrastructure References Cited:</span>
            </h4>
            <div className="space-y-2">
              {blog.officialSourceLinks.map((src, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-xs">
                  <span className="font-semibold text-zinc-800">• {src.sourceName}:</span>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#38BDF8] hover:underline inline-flex items-center gap-1"
                  >
                    <span>{src.url}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="pt-8 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h5 className="font-bold text-zinc-900 text-sm">Have Questions Regarding This Corridor Zone?</h5>
            <p className="text-xs text-zinc-500">Our advisory desk can guide you with verified local revenue maps.</p>
          </div>
          <Link
            to="/contact"
            className="bg-black hover:bg-zinc-800 text-white px-6 py-2.5 rounded-full text-xs font-bold transition-all shadow-md shrink-0"
          >
            Speak to an Advisor &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
