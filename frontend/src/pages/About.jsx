import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  Users,
  MessageSquare,
  FileText,
  MapPin,
  ArrowRight,
  Award
} from 'lucide-react';
import PageHeadingBanner from '../components/PageHeadingBanner';
import OrangeCTABanner from '../components/OrangeCTABanner';

const About = () => {
  const teamMembers = [
    {
      name: "Satish K.",
      role: "Founder & Lead Advisor",
      experience: "15+ years corridor advisory",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "R. Narayana Swamy",
      role: "Land Verification & Revenue Due Diligence",
      experience: "Retired Revenue Officer & Title Specialist",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "B. Sneha Reddy",
      role: "Client Relations & NRI Desk",
      experience: "Specialized in NRI and family property onboarding",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "V. Madhava Rao",
      role: "Corporate Land Bank & Industrial Liaison",
      experience: "Infrastructure & industrial corridor consultant",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
    }
  ];

  return (
    <div className="bg-white">
      {/* 1. Deep Navy Page Header matching PDF Page 7 */}
      <PageHeadingBanner
        title="Advisors for land, built on local knowledge"
        subtitle="We are a land investment advisory on the Tirupati–Naidupeta corridor. Our role is to help you make a sound decision, not just a sale."
        breadcrumbs={[{ label: 'About' }]}
      />

      {/* 2. OUR STORY - Local roots, clear advice (PDF Page 7) */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B00] block">
              Our Story
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Local roots, clear advice
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Before you commit, we explain the location, the infrastructure plans, the title and approval status, and the likely use of the land. That way you buy knowing exactly what you own and why it should grow in value.
            </p>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Rooted in the Tirupati–Naidupeta growth belt with over a decade of ground presence, Triport was created to eliminate the opacity, pressure, and uncertainty common in traditional real estate transactions.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-xl bg-slate-100 aspect-[16/10] border border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"
                alt="NH 16 Highway Corridor"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 bg-black/75 backdrop-blur-md px-4 py-2 rounded-xl text-white text-xs font-bold flex items-center space-x-2 border border-white/20">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B00]" />
                <span>NH-16 Chennai–Kolkata Economic Highway</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR APPROACH - How we work with you (PDF Page 7) */}
      <section className="bg-slate-50 py-16 sm:py-24 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B00] block">
              Our Approach
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              How we work with you
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-[#38BDF8] flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-[#38BDF8]" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Plain-language advice</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                We explain location, infrastructure plans and approvals in simple terms, with no pressure to buy.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Verified before we recommend</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Records, title and layout approvals are checked before any land reaches your shortlist.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">For every kind of buyer</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Individuals, families, farmers and companies — each with advice suited to their goal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. OUR PROMISE QUOTED STATEMENT (PDF Page 8) */}
      <section className="py-20 sm:py-28 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-full bg-amber-50 flex items-center justify-center shadow-inner">
          <Award className="w-8 h-8 text-[#FF6B00]" />
        </div>
        <blockquote className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          “We recommend only the land we would be comfortable buying ourselves.”
        </blockquote>
        <div className="text-xs font-bold uppercase tracking-widest text-[#FF6B00]">
          Our Promise
        </div>
      </section>

      {/* 5. THE TEAM - People you will meet (PDF Page 8) */}
      <section className="bg-slate-50 py-16 sm:py-24 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-2 mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B00] block">
              The Team
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              People you will meet
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between"
              >
                <div>
                  <div className="h-64 overflow-hidden bg-slate-100">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 space-y-1.5">
                    <h3 className="font-bold text-lg text-slate-900">
                      {member.name}
                    </h3>
                    <div className="text-xs font-semibold text-[#FF6B00]">
                      {member.role}
                    </div>
                    <p className="text-xs text-slate-500 pt-2 leading-relaxed">
                      {member.experience}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. ORANGE CTA BANNER (PDF Page 8) */}
      <OrangeCTABanner />
    </div>
  );
};

export default About;
