import React from 'react';
import { ArrowRight, Mail, MapPin, CheckCircle2, Target, Heart, Zap, PlayCircle, BookOpen, PenTool } from 'lucide-react';

export const About = () => (
  <div className="max-w-4xl mx-auto px-4 py-20">
    <h1 className="text-5xl md:text-7xl font-black text-[#0D1C22] mb-8 leading-tight">WE BRIDGE<br/><span className="text-[#D7F037] bg-[#0D1C22] px-2">AMBITION</span> & OPPORTUNITY</h1>
    <p className="text-xl text-gray-600 leading-relaxed mb-12">
      OnCampus was founded with a simple belief: Talent is distributed equally, but opportunity is not. We are building the digital infrastructure to democratize campus placements in India.
    </p>
    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
        <Target className="w-12 h-12 text-[#0D1C22] mb-6" />
        <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
        <p className="text-gray-600">To help every student find a career they love, regardless of which college they attend or where they are located.</p>
      </div>
      <div className="bg-[#0D1C22] p-8 rounded-3xl text-white shadow-xl">
        <Heart className="w-12 h-12 text-[#D7F037] mb-6" />
        <h3 className="text-2xl font-bold mb-4">Our Values</h3>
        <p className="text-gray-400">Students first. Transparency in hiring. Level playing field for all colleges. Speed and efficiency.</p>
      </div>
    </div>
  </div>
);

export const CareersPage = () => (
  <div className="max-w-5xl mx-auto px-4 py-20">
    <div className="text-center mb-16">
      <h1 className="text-4xl md:text-6xl font-black text-[#0D1C22] mb-6">Join the Team</h1>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">We're a team of dreamers and doers building the future of early-career recruiting. Come build with us.</p>
    </div>
    
    <div className="space-y-4">
      {['Founding Engineer (Frontend)', 'Product Designer', 'Campus Growth Lead', 'Backend Developer'].map((role, i) => (
        <div key={i} className="flex flex-col md:flex-row items-center justify-between bg-white p-6 rounded-2xl border border-gray-200 hover:border-[#0D1C22] transition-colors group cursor-pointer">
          <div>
            <h3 className="text-xl font-bold text-[#0D1C22]">{role}</h3>
            <p className="text-gray-500 text-sm mt-1">Bangalore • Full-time</p>
          </div>
          <button className="mt-4 md:mt-0 flex items-center gap-2 font-bold text-[#0D1C22] group-hover:underline">
            Apply Now <ArrowRight size={18} />
          </button>
        </div>
      ))}
    </div>
  </div>
);

export const Contact = () => (
  <div className="max-w-3xl mx-auto px-4 py-20">
    <h1 className="text-4xl md:text-6xl font-black text-[#0D1C22] mb-12 text-center">Get in Touch</h1>
    <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-200 shadow-xl">
      <form className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Name</label>
            <input type="text" className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0D1C22]" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
            <input type="email" className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0D1C22]" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
          <textarea rows={4} className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0D1C22]"></textarea>
        </div>
        <button className="w-full bg-[#0D1C22] text-white font-bold py-4 rounded-xl hover:bg-gray-900 transition-colors">Send Message</button>
      </form>
      
      <div className="mt-12 pt-12 border-t border-gray-100 flex flex-col md:flex-row gap-8 justify-around text-gray-600">
        <div className="flex items-center gap-3">
          <Mail className="text-[#0D1C22]" /> hello@oncampus.in
        </div>
        <div className="flex items-center gap-3">
          <MapPin className="text-[#0D1C22]" /> Bangalore, India
        </div>
      </div>
    </div>
  </div>
);

export const CareerTips = () => (
  <div className="max-w-6xl mx-auto px-4 py-16">
    <div className="text-center mb-16">
      <div className="inline-flex items-center gap-2 bg-[#D7F037] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
        <BookOpen size={16} /> Student Resources
      </div>
      <h1 className="text-5xl md:text-7xl font-black text-[#0D1C22] mb-6">Career Playbook</h1>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">Master the art of getting hired. From resume building to salary negotiation, we've got you covered.</p>
    </div>

    {/* Video Section */}
    <div className="mb-20">
      <h2 className="text-2xl font-bold text-[#0D1C22] mb-8 flex items-center gap-2">
        <PlayCircle className="text-red-500" /> Featured Video Guides
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { title: "How to introduce yourself in an interview?", views: "125K views", thumb: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop" },
          { title: "Resume mistakes that get you rejected", views: "89K views", thumb: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=800&auto=format&fit=crop" },
          { title: "Solving System Design for Freshers", views: "210K views", thumb: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop" }
        ].map((vid, i) => (
          <div key={i} className="group cursor-pointer">
            <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 shadow-lg">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              <img src={vid.thumb} alt={vid.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center pl-1 group-hover:scale-110 transition-transform">
                  <PlayCircle size={24} className="text-[#0D1C22]" />
                </div>
              </div>
              <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">10:24</div>
            </div>
            <h3 className="font-bold text-lg text-[#0D1C22] leading-tight group-hover:text-blue-600 transition-colors">{vid.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{vid.views} • 2 days ago</p>
          </div>
        ))}
      </div>
    </div>

    {/* Reading Section */}
    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
      {[
        { 
          title: "The 1-Page Resume Framework", 
          desc: "Recruiters spend 6 seconds on a resume. Use the XYZ format: Accomplished [X] as measured by [Y], by doing [Z].", 
          icon: <CheckCircle2 className="text-green-600" size={32}/>,
          tag: "Resume" 
        },
        { 
          title: "Cold Emailing like a Pro", 
          desc: "Don't ask for a job. Ask for advice. Keep it short (under 100 words), personalized, and always follow up after 3 days.", 
          icon: <Mail className="text-blue-600" size={32}/>,
          tag: "Networking"
        },
        { 
          title: "DSA vs Development?", 
          desc: "For product companies, you need both. Focus on easy/medium Leetcode problems and build 2 solid full-stack projects.", 
          icon: <Zap className="text-orange-500" size={32}/>,
          tag: "Preparation"
        },
        { 
          title: "Salary Negotiation 101", 
          desc: "Never share your expected number first. Research market rates on Glassdoor. Focus on learning potential over earning potential for year 1.", 
          icon: <Target className="text-purple-600" size={32}/>,
          tag: "Offer"
        },
      ].map((tip, i) => (
        <div key={i} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
          <div className="flex justify-between items-start mb-6">
            <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-[#0D1C22] group-hover:text-white transition-colors">
              {tip.icon}
            </div>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-600 uppercase tracking-wider">{tip.tag}</span>
          </div>
          <h3 className="text-2xl font-bold text-[#0D1C22] mb-3 group-hover:text-blue-600 transition-colors">{tip.title}</h3>
          <p className="text-gray-600 leading-relaxed font-medium">{tip.desc}</p>
          <div className="mt-6 pt-6 border-t border-gray-50 flex items-center text-[#0D1C22] font-bold text-sm cursor-pointer hover:underline">
            Read full guide <ArrowRight size={16} className="ml-2" />
          </div>
        </div>
      ))}
    </div>

    {/* Newsletter / Updates */}
    <div className="mt-20 bg-[#0D1C22] rounded-[2.5rem] p-8 md:p-16 text-center text-white relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto">
            <PenTool size={48} className="mx-auto mb-6 text-[#D7F037]" />
            <h2 className="text-3xl md:text-4xl font-black mb-4">Get weekly placement hacks</h2>
            <p className="text-gray-400 mb-8 text-lg">Join 50,000+ students receiving our weekly newsletter on off-campus drives and resume tips.</p>
            <div className="flex flex-col md:flex-row gap-3 max-w-md mx-auto">
                <input type="email" placeholder="Your email address" className="flex-1 px-6 py-4 rounded-xl text-gray-900 focus:outline-none" />
                <button className="bg-[#D7F037] text-[#0D1C22] font-bold px-8 py-4 rounded-xl hover:bg-[#c5dc33] transition-colors">Subscribe</button>
            </div>
        </div>
        {/* Abstract Background */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-gray-800 via-[#0D1C22] to-[#0D1C22]"></div>
    </div>
  </div>
);
