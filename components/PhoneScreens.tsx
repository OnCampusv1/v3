import React from 'react';
import { Search, MapPin, MoreHorizontal, Heart, MessageCircle, Share2, Filter, Calendar, ChevronLeft, Bell, CheckCircle2, Bookmark, Briefcase } from 'lucide-react';
// --- Helper Components ---
const Avatar = ({ src, fallback, size = "w-8 h-8", color = "bg-gray-100 text-gray-500" }: { src?: string; fallback: string, size?: string, color?: string }) => (
  <div className={`${size} rounded-full ${color} overflow-hidden border border-gray-100 flex items-center justify-center shrink-0`}>
    {src ? <img src={src} alt="Avatar" className="w-full h-full object-cover" /> : <span className="text-[10px] font-bold">{fallback}</span>}
  </div>
);

// --- Screen 1: Jobs (Updated for Indian Context) ---
export const JobsScreen = () => {
  return (
    <div className="flex flex-col h-full bg-white font-sans">
      {/* Header */}
      <div className="px-5 pt-2 pb-3 bg-white sticky top-0 z-10 border-b border-gray-50">
        <div className="flex items-center justify-between mb-4">
           <div>
             <h2 className="text-xl font-bold text-[#0D1C22] tracking-tight">Jobs For You</h2>
             <p className="text-[10px] text-gray-500 font-medium">IIT Delhi • CSE • Batch '25</p>
           </div>
           <Avatar fallback="AK" color="bg-[#D7F037] text-[#0D1C22]" />
        </div>
        <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input type="text" placeholder="Search internships & fresher roles..." className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2.5 pl-9 pr-4 text-xs font-medium outline-none focus:ring-1 focus:ring-[#0D1C22]" />
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          <span className="bg-[#0D1C22] text-white px-3 py-1.5 rounded-full text-[10px] font-bold whitespace-nowrap shadow-sm">Campus Drives</span>
          <span className="bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-full text-[10px] font-bold whitespace-nowrap">Internships</span>
          <span className="bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-full text-[10px] font-bold whitespace-nowrap">Remote</span>
        </div>
      </div>
      
      {/* List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/50">
         {[
           { company: "Swiggy", role: "SDE Intern", pay: "₹45K/mo", type: "Summer Intern", logo: "https://logo.clearbit.com/swiggy.com", tag: "Campus Hire" },
           { company: "Cred", role: "Product Design Intern", pay: "₹40K/mo", type: "6 Months", logo: "https://logo.clearbit.com/cred.club", tag: "Early Access" },
           { company: "Zomato", role: "Frontend Developer", pay: "₹18 LPA", type: "Fresher (2025)", logo: "https://logo.clearbit.com/zomato.com", tag: null },
           { company: "Razorpay", role: "Data Analyst", pay: "₹12 LPA", type: "Full Time", logo: "https://logo.clearbit.com/razorpay.com", tag: "Actively Hiring" },
           { company: "Flipkart", role: "Backend Intern", pay: "₹50K/mo", type: "Winter Intern", logo: "https://logo.clearbit.com/flipkart.com", tag: "Shortlisting" },
           { company: "Uber", role: "Software Engineer", pay: "₹32 LPA", type: "Full Time", logo: "https://logo.clearbit.com/uber.com", tag: "Campus Hire" },
         ].map((job, i) => (
           <div key={i} className="bg-white p-4 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 flex gap-3.5 items-start transition-transform active:scale-[0.98]">
             <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 p-1 flex items-center justify-center shadow-sm shrink-0">
                <img src={job.logo} alt={job.company} className="w-full h-full object-contain rounded-lg" onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${job.company}&background=random` }} />
             </div>
             <div className="flex-1 min-w-0">
               <div className="flex justify-between items-start">
                  <h4 className="font-bold text-xs text-[#0D1C22] truncate pr-2">{job.role}</h4>
                  <Bookmark size={14} className="text-gray-300 shrink-0" />
               </div>
               <p className="text-[10px] font-medium text-gray-500 mb-2">{job.company}</p>
               
               <div className="flex flex-wrap gap-1.5 mb-2">
                 <span className="bg-gray-50 border border-gray-100 text-gray-600 px-1.5 py-0.5 rounded text-[9px] font-bold">{job.pay}</span>
                 <span className="bg-gray-50 border border-gray-100 text-gray-600 px-1.5 py-0.5 rounded text-[9px] font-medium">{job.type}</span>
               </div>

               {job.tag && (
                   <div className="flex items-center gap-1 text-[9px] font-bold text-[#0D1C22] bg-[#D7F037]/30 px-2 py-0.5 rounded-full w-fit">
                       <CheckCircle2 size={10} /> {job.tag}
                   </div>
               )}
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
    <div className="flex flex-col h-full bg-[#FAFAFA] font-sans">
       <div className="px-5 pt-4 pb-3 bg-white border-b border-gray-50 flex items-center justify-between sticky top-0 z-10">
          <span className="font-bold text-lg text-gray-900">Community</span>
          <Bell size={18} className="text-gray-400" />
       </div>
       
       <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-12">
          {/* Post 1 */}
          <div className="bg-white p-4 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100">
             <div className="flex items-center gap-3 mb-3">
                <Avatar fallback="KS" />
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Krisha Singh</h4>
                  <p className="text-[9px] text-gray-500 font-medium">B.Tech CSE • NSUT</p>
                </div>
                <span className="ml-auto text-[9px] text-gray-300 font-medium">2m</span>
             </div>
             <p className="text-xs text-gray-600 leading-relaxed mb-3">
               Just accepted my offer at Microsoft! 🚀 Huge thanks to the OnCampus community for the interview prep resources.
             </p>
             <div className="flex items-center gap-4 pt-3 border-t border-gray-50">
                <button className="flex items-center gap-1.5 text-gray-400 hover:text-red-500 transition-colors">
                    <Heart size={14} /> <span className="text-[10px] font-bold">284</span>
                </button>
                <button className="flex items-center gap-1.5 text-gray-400 hover:text-blue-500 transition-colors">
                    <MessageCircle size={14} /> <span className="text-[10px] font-bold">42</span>
                </button>
             </div>
          </div>
          
           {/* Post 2 - Official */}
           <div className="bg-white p-4 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 relative overflow-hidden">
             <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#D7F037]"></div>
             <div className="flex items-center gap-2 mb-2">
               <div className="w-6 h-6 rounded-md bg-black flex items-center justify-center">
                   <span className="text-[8px] font-bold text-white">UB</span>
               </div>
               <div>
                  <h4 className="text-xs font-bold text-gray-900">Uber University Team</h4>
                  <p className="text-[9px] text-gray-500 font-medium">Official Hiring Update</p>
               </div>
             </div>
             <p className="text-xs text-gray-600 leading-relaxed">Applications for the Summer Analyst program are closing tonight. Apply now!</p>
          </div>

          {/* Post 3 */}
          <div className="bg-white p-4 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100">
             <div className="flex items-center gap-3 mb-3">
                <Avatar fallback="RV" color="bg-blue-100 text-blue-600" />
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Rahul V.</h4>
                  <p className="text-[9px] text-gray-500 font-medium">NIT Trichy</p>
                </div>
             </div>
             <p className="text-xs text-gray-600 leading-relaxed">
               Can anyone share the interview experience for the Google step internship?
             </p>
          </div>
       </div>
    </div>
  );
};

// --- Screen 3: Events ---
export const EventsScreen = () => {
  return (
    <div className="flex flex-col h-full bg-[#FAFAFA] font-sans">
      <div className="px-5 pt-4 pb-4 bg-white sticky top-0 z-10 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Schedule</h2>
        <p className="text-[10px] text-gray-500 font-medium">3 Upcoming drives this week</p>
      </div>
      
      <div className="p-4 flex-1 overflow-y-auto space-y-3 pb-12">
        {/* Date Header */}
        <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Today</span>
            <div className="h-px bg-gray-200 flex-1"></div>
        </div>

        {/* Event Card */}
        <div className="bg-white p-4 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 flex gap-4">
           <div className="flex flex-col items-center justify-center w-10 h-10 bg-purple-50 rounded-xl text-purple-600 shrink-0">
              <span className="text-[9px] font-bold uppercase">Oct</span>
              <span className="text-xs font-black">24</span>
           </div>
           <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-gray-900 truncate">Google Pre-Placement Talk</h4>
              <p className="text-[10px] text-gray-500 mt-0.5">10:00 AM • Auditorium</p>
              <div className="flex items-center gap-1 mt-2">
                  <span className="bg-green-50 text-green-700 text-[9px] font-bold px-1.5 py-0.5 rounded">Mandatory</span>
              </div>
           </div>
        </div>

         <div className="bg-white p-4 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 flex gap-4">
           <div className="flex flex-col items-center justify-center w-10 h-10 bg-gray-50 rounded-xl text-gray-600 shrink-0">
              <span className="text-[9px] font-bold uppercase">Oct</span>
              <span className="text-xs font-black">25</span>
           </div>
           <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-gray-900 truncate">TCS Online Assessment</h4>
              <p className="text-[10px] text-gray-500 mt-0.5">02:00 PM • Remote</p>
              <div className="flex items-center gap-1 mt-2">
                  <span className="bg-gray-100 text-gray-600 text-[9px] font-bold px-1.5 py-0.5 rounded">Registered</span>
              </div>
           </div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 flex gap-4 opacity-75">
           <div className="flex flex-col items-center justify-center w-10 h-10 bg-gray-50 rounded-xl text-gray-600 shrink-0">
              <span className="text-[9px] font-bold uppercase">Oct</span>
              <span className="text-xs font-black">28</span>
           </div>
           <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-gray-900 truncate">Resume Workshop</h4>
              <p className="text-[10px] text-gray-500 mt-0.5">05:00 PM • Seminar Hall</p>
           </div>
        </div>
      </div>
    </div>
  );
};

// --- Screen 4: Chat ---
export const ChatScreen = () => {
  return (
    <div className="flex flex-col h-full bg-[#FAFAFA] font-sans">
      {/* Header */}
      <div className="px-4 py-4 bg-white flex items-center gap-3 shadow-[0_1px_2px_rgba(0,0,0,0.03)] z-10">
         <ChevronLeft size={18} className="text-gray-400" />
         <div className="relative">
            <Avatar fallback="NP" />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
         </div>
         <div className="flex-1">
            <h4 className="text-xs font-bold text-gray-900">Nina Patel</h4>
            <p className="text-[9px] text-gray-500 font-medium">Recruiter @ CRED</p>
         </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
         <div className="text-center">
            <span className="text-[9px] text-gray-400 font-medium">Today 2:16 PM</span>
         </div>
         
         {/* Message Left */}
         <div className="flex items-end gap-2">
            <Avatar fallback="NP" size="w-6 h-6" />
            <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 max-w-[85%]">
               <p className="text-[11px] text-gray-700 leading-relaxed">
                  Hi Arjun! We were impressed by your portfolio. Would you be free for a quick chat tomorrow?
               </p>
            </div>
         </div>

         {/* Message Right */}
         <div className="flex items-end gap-2 flex-row-reverse">
            <div className="bg-[#0D1C22] p-3 rounded-2xl rounded-br-none shadow-md max-w-[85%]">
               <p className="text-[11px] text-white leading-relaxed">
                  Hi Nina, thank you! Yes, I am available anytime after 2 PM.
               </p>
            </div>
         </div>
         
         {/* Attachment Preview */}
         <div className="flex items-end gap-2">
            <Avatar fallback="NP" size="w-6 h-6" />
            <div className="bg-white p-2 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 max-w-[75%]">
                <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-xl">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                        <Calendar size={14} />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-gray-900">Interview Invite</p>
                        <p className="text-[9px] text-gray-500">Google Meet</p>
                    </div>
                </div>
            </div>
         </div>
      </div>
      
      {/* Input Area */}
      <div className="p-3 bg-white border-t border-gray-100">
          <div className="bg-gray-50 rounded-full h-10 w-full flex items-center px-4 text-xs text-gray-400">
              Type a message...
          </div>
      </div>
    </div>
  );
};
