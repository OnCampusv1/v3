import React from 'react';
import { Search, MapPin, MoreHorizontal, Heart, MessageCircle, Share2, Filter, ArrowUpDown, Calendar, ChevronLeft } from 'lucide-react';

// --- Helper Components ---
const Avatar = ({ src, fallback }: { src?: string; fallback: string }) => (
  <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden border border-gray-100 flex items-center justify-center shrink-0">
    {src ? <img src={src} alt="Avatar" className="w-full h-full object-cover" /> : <span className="text-xs font-bold text-gray-500">{fallback}</span>}
  </div>
);

const CompanyLogo = ({ color, letter }: { color: string; letter: string }) => (
  <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center text-white font-bold text-lg shadow-sm`}>
    {letter}
  </div>
);

// --- Screen 1: Jobs ---
export const JobsScreen = () => {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="px-4 pb-2 border-b border-gray-100 bg-white">
        <div className="flex items-center justify-between mb-4">
           <div className="flex items-center gap-2">
             <Avatar fallback="U" src="https://picsum.photos/seed/user1/100/100" />
             <span className="font-bold text-lg">Jobs</span>
           </div>
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          <span className="bg-black text-white px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap">All Opportunities</span>
          <span className="bg-white border border-gray-200 text-gray-600 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap">My College</span>
          <span className="p-1 rounded-full border border-gray-200"><Filter size={12} /></span>
        </div>
      </div>
      
      {/* List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
         <p className="text-xs font-semibold text-purple-600 mb-2">Top jobs for Krisha</p>
         
         {[
           { company: "EY India", role: "Software Developer", pay: "₹8-12L/yr", time: "3 hours ago", color: "bg-yellow-500", letter: "EY" },
           { company: "Amazon India", role: "SDE Intern", pay: "₹100K/month", time: "2 days ago", color: "bg-black", letter: "A" },
           { company: "Flipkart", role: "Backend Engineer", pay: "₹10-15L/yr", time: "Full-time", color: "bg-blue-600", letter: "F" },
         ].map((job, i) => (
           <div key={i} className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex gap-3">
             <CompanyLogo color={job.color} letter={job.letter} />
             <div className="flex-1">
               <div className="flex justify-between items-start">
                  <h4 className="font-bold text-sm text-gray-900">{job.company}</h4>
                  <span className="text-gray-400"><MoreHorizontal size={14} /></span>
               </div>
               <p className="text-xs font-medium text-gray-700">{job.role}</p>
               <div className="flex items-center gap-2 mt-2 text-[10px] text-gray-500">
                 <span>{job.pay}</span>
                 <span>•</span>
                 <span>{job.time}</span>
               </div>
             </div>
           </div>
         ))}
      </div>
    </div>
  );
};

// --- Screen 2: Feed ---
export const FeedScreen = () => {
  return (
    <div className="flex flex-col h-full bg-gray-50">
       <div className="px-4 py-3 bg-white border-b border-gray-100 flex items-center gap-3">
          <Avatar fallback="F" src="https://picsum.photos/seed/feed/100/100" />
          <span className="font-bold text-lg">Feed</span>
       </div>
       <div className="flex gap-2 px-4 py-2 bg-white overflow-x-auto border-b border-gray-100">
          <span className="bg-black text-white px-3 py-1 rounded-full text-xs">All</span>
          <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs">Your college</span>
          <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs">Employers</span>
       </div>
       
       <div className="flex-1 overflow-y-auto">
          {/* Post 1 */}
          <div className="bg-white mb-2 p-4 pb-0">
             <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Avatar fallback="K" src="https://picsum.photos/seed/krisha/100/100" />
                  <div>
                    <h4 className="text-xs font-bold">Krisha Singh</h4>
                    <p className="text-[10px] text-gray-500">B.Tech CSE • NSUT</p>
                  </div>
                </div>
                <span className="text-[10px] text-gray-400">2m</span>
             </div>
             <p className="text-xs text-gray-800 leading-snug mb-3">
               Just received my offer letter from Microsoft! 🎉 Can't believe this is happening. Thank you to everyone who supported me through the interview process.
             </p>
             <div className="flex items-center justify-between py-3 border-t border-gray-50 text-gray-500">
                <div className="flex gap-4 text-xs font-medium">
                  <span className="flex items-center gap-1 hover:text-red-500"><Heart size={14} /> 234</span>
                  <span className="flex items-center gap-1"><MessageCircle size={14} /> 45</span>
                </div>
                <Share2 size={14} />
             </div>
          </div>
          
           {/* Post 2 */}
           <div className="bg-white p-4">
             <div className="flex items-center gap-2 mb-2">
               <Avatar fallback="K" src="https://picsum.photos/seed/kavita/100/100" />
               <div>
                  <h4 className="text-xs font-bold">Kavita Menon ✅</h4>
                  <p className="text-[10px] text-gray-500">HR Manager • EY India</p>
               </div>
             </div>
             <p className="text-xs text-gray-800">We're excited to announce openings for our Graduate Program 2024!</p>
          </div>
       </div>
    </div>
  );
};

// --- Screen 3: Events ---
export const EventsScreen = () => {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="px-4 py-3 bg-white border-b border-gray-100 flex justify-between items-center">
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
              <Calendar size={18} />
            </div>
            <span className="font-bold text-lg">Events</span>
        </div>
      </div>
      
      <div className="p-4 flex-1 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-bold text-gray-700">48 upcoming events</span>
          <span className="text-[10px] flex items-center gap-1 text-gray-500"><ArrowUpDown size={10} /> Date</span>
        </div>

        {/* Event Card */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-1 h-full bg-purple-500"></div>
           <div className="flex items-start justify-between mb-2">
             <div className="flex gap-2">
                <CompanyLogo color="bg-blue-800" letter="TCS" />
                <div>
                   <h4 className="text-sm font-bold text-gray-900">TCS - Pre-Placement Talk</h4>
                   <p className="text-[10px] text-gray-500">Tata Consultancy Services</p>
                </div>
             </div>
           </div>
           
           <div className="space-y-1.5 mt-3 mb-4">
              <div className="flex items-center gap-2 text-[10px] text-gray-600">
                 <Calendar size={12} />
                 <span>Tomorrow, Jan 15 • 10:00 AM</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-gray-600">
                 <MapPin size={12} />
                 <span>Auditorium Hall A - Offline</span>
              </div>
           </div>
           
           <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-0.5 bg-purple-50 text-purple-700 rounded text-[10px] font-medium">Pre-Placement Talk</span>
           </div>
           
           <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
              <span className="text-[10px] text-green-600 flex items-center gap-1">✅ You're eligible</span>
              <button className="bg-gray-900 text-white text-[10px] px-3 py-1.5 rounded-md font-medium">Register</button>
           </div>
        </div>

         {/* Event Card 2 */}
         <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mt-3 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
           <div className="flex gap-2">
               <CompanyLogo color="bg-red-600" letter="Wi" />
                <div>
                   <h4 className="text-sm font-bold text-gray-900">Wipro - Aptitude Test</h4>
                   <p className="text-[10px] text-gray-500">Wipro Technologies</p>
                </div>
           </div>
           <div className="mt-2 text-[10px] text-gray-600 flex gap-2"><Calendar size={12}/> Jan 18 • 2:00 PM</div>
        </div>
      </div>
    </div>
  );
};

// --- Screen 4: Chat ---
export const ChatScreen = () => {
  return (
    <div className="flex flex-col h-full bg-[#F5F7F4]">
      {/* Header */}
      <div className="px-3 py-3 bg-white flex items-center gap-2 shadow-sm z-10">
         <ChevronLeft size={20} className="text-gray-400" />
         <Avatar fallback="N" src="https://picsum.photos/seed/nina/100/100" />
         <div className="flex-1">
            <h4 className="text-xs font-bold text-gray-900">Nina Patel</h4>
            <p className="text-[10px] text-gray-500">Talent Recruiter @ Saral Software</p>
         </div>
         <span className="text-[10px] text-gray-400">Mute</span>
      </div>

      {/* Messages */}
      <div className="flex-1 p-3 space-y-4 overflow-y-auto bg-[url('https://www.transparenttextures.com/patterns/subtle-white-feathers.png')]">
         <div className="text-center">
            <span className="text-[9px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">Tue, Aug 19 at 2:16 PM</span>
         </div>
         
         {/* Message Left */}
         <div className="flex gap-2">
            <div className="mt-1"><Avatar fallback="N" src="https://picsum.photos/seed/nina/100/100" /></div>
            <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[85%] text-xs text-gray-800 leading-relaxed border border-gray-100">
               <p className="mb-1 font-bold">Hi Devon,</p>
               <p>Saw your profile, and it looks like your qualifications and experience are a good match for our Brand Partnerships position.</p>
            </div>
         </div>

         {/* Job Card Attachment */}
         <div className="ml-10 bg-white p-3 rounded-xl shadow-sm border border-gray-100 max-w-[85%]">
            <div className="flex gap-2 items-center mb-2">
               <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center text-white font-bold text-xs">S</div>
               <div>
                  <h5 className="font-bold text-xs">Saral Software</h5>
                  <p className="text-[9px] text-gray-500">Technology</p>
               </div>
            </div>
            <div className="font-bold text-xs mb-1">Brand Partnerships Manager</div>
            <div className="text-[10px] text-gray-500">₹12-18 LPA • Full-time job</div>
            <div className="text-[10px] text-gray-400 mt-1">Pune, MH (Hybrid) • 4 days ago</div>
         </div>
      </div>
    </div>
  );
};