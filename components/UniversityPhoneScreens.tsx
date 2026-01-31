import React from 'react';
import { Search, Filter, Briefcase, Calendar, CheckCircle, Building2, Globe, Send, Plus, Check, MoreHorizontal, Settings, X, Shield, Lock, GraduationCap, Eye } from 'lucide-react';

const Avatar = ({ fallback, color = "bg-gray-200" }: { fallback: string, color?: string }) => (
  <div className={`w-8 h-8 rounded-full ${color} overflow-hidden border border-gray-100 flex items-center justify-center shrink-0`}>
    <span className="text-xs font-bold text-gray-700">{fallback}</span>
  </div>
);

// --- Screen 1: Partner Network (More companies, less outreach) ---
export const HiringPartnersScreen = () => {
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-100 bg-[#0D1C22] text-white flex justify-between items-center">
         <div>
            <span className="font-bold text-sm block">Partner Network</span>
            <span className="text-[10px] text-gray-400">Companies actively looking</span>
         </div>
         <div className="px-2 py-0.5 bg-white/10 text-white text-[9px] font-bold rounded border border-white/20">500+ Connected</div>
      </div>
      
      {/* List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50">
         
         {/* Google - Viewing Profiles */}
         <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-2">
                <div className="flex gap-3">
                   <div className="w-10 h-10 bg-white border border-gray-100 rounded-lg flex items-center justify-center p-1">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="G" className="w-full h-full" />
                   </div>
                   <div>
                      <h4 className="font-bold text-sm text-[#0D1C22]">Google</h4>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                        <p className="text-[10px] text-gray-500 font-medium">Actively Viewing Profiles</p>
                      </div>
                   </div>
                </div>
            </div>
            <div className="flex items-center justify-between mt-3 bg-gray-50 p-2 rounded-lg">
               <div className="text-center flex-1 border-r border-gray-200">
                   <div className="flex items-center justify-center gap-1 text-gray-400 mb-0.5">
                        <Eye size={10} /> <span className="text-[9px] uppercase font-bold">Views</span>
                   </div>
                   <p className="text-sm font-black text-[#0D1C22]">1.2k</p>
               </div>
               <div className="text-center flex-1">
                   <div className="flex items-center justify-center gap-1 text-gray-400 mb-0.5">
                        <Briefcase size={10} /> <span className="text-[9px] uppercase font-bold">Roles</span>
                   </div>
                   <p className="text-sm font-black text-[#0D1C22]">3 Active</p>
               </div>
            </div>
         </div>

         {/* Microsoft - Shortlisting */}
         <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-2">
                <div className="flex gap-3">
                   <div className="w-10 h-10 bg-white border border-gray-100 rounded-lg flex items-center justify-center p-1">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="M" className="w-full h-full" />
                   </div>
                   <div>
                      <h4 className="font-bold text-sm text-[#0D1C22]">Microsoft</h4>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                        <p className="text-[10px] text-gray-500 font-medium">Shortlisting Candidates</p>
                      </div>
                   </div>
                </div>
            </div>
            <div className="flex items-center justify-between mt-3 bg-gray-50 p-2 rounded-lg">
               <div className="text-center flex-1 border-r border-gray-200">
                   <div className="flex items-center justify-center gap-1 text-gray-400 mb-0.5">
                        <Eye size={10} /> <span className="text-[9px] uppercase font-bold">Views</span>
                   </div>
                   <p className="text-sm font-black text-[#0D1C22]">850</p>
               </div>
               <div className="text-center flex-1">
                   <div className="flex items-center justify-center gap-1 text-gray-400 mb-0.5">
                        <CheckCircle size={10} /> <span className="text-[9px] uppercase font-bold">Matches</span>
                   </div>
                   <p className="text-sm font-black text-[#0D1C22]">128</p>
               </div>
            </div>
         </div>

         {/* Zomato - New Post */}
         <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-2">
                <div className="flex gap-3">
                   <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold italic text-xs shadow-sm">Z</div>
                   <div>
                      <h4 className="font-bold text-sm text-[#0D1C22]">Zomato</h4>
                      <p className="text-[10px] text-gray-500 mt-0.5">New Role Posted</p>
                   </div>
                </div>
            </div>
            <div className="mt-2">
                <div className="bg-orange-50 text-orange-700 text-[10px] px-2 py-2 rounded-lg font-bold border border-orange-100 mb-1 flex justify-between items-center">
                    <span>Marketing Intern</span>
                    <span className="bg-white/50 px-1.5 py-0.5 rounded text-[8px]">2 Months</span>
                </div>
                <div className="flex justify-between items-center mt-2 px-1">
                    <span className="text-[9px] text-gray-400">Posted 2h ago</span>
                    <span className="text-[9px] text-blue-600 font-bold cursor-pointer hover:underline">View Details</span>
                </div>
            </div>
         </div>

      </div>
    </div>
  );
};

// --- Screen 2: Placement Tracking (Dashboard) ---
export const PlacementTrackerScreen = () => {
  return (
    <div className="flex flex-col h-full bg-white">
       <div className="px-4 py-3 border-b border-gray-100 bg-white">
          <h3 className="font-bold text-sm text-[#0D1C22]">Placement Dashboard</h3>
          <p className="text-[10px] text-gray-500">Track online & offline drives</p>
       </div>
       
       <div className="p-3 space-y-3 overflow-y-auto bg-[#FDFDF5] h-full">
          
          {/* Active Drive Card - Online */}
          <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
             <div className="flex justify-between items-center mb-3">
                 <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-[10px]">S</div>
                    <span className="font-bold text-xs">Swiggy</span>
                 </div>
                 <span className="text-[9px] font-bold bg-green-50 text-green-600 px-2 py-0.5 rounded-full">Online</span>
             </div>
             
             {/* Progress Steps */}
             <div className="relative pl-3 border-l border-gray-200 space-y-3">
                <div className="relative">
                   <div className="absolute -left-[17px] top-1 w-2 h-2 rounded-full bg-green-500 ring-2 ring-white"></div>
                   <p className="text-[10px] font-bold text-gray-800">Applications</p>
                   <p className="text-[9px] text-gray-400">450 Applied • Closed</p>
                </div>
                <div className="relative">
                   <div className="absolute -left-[17px] top-1 w-2 h-2 rounded-full bg-blue-500 ring-2 ring-white animate-pulse"></div>
                   <p className="text-[10px] font-bold text-blue-600">Interview Round 1</p>
                   <p className="text-[9px] text-gray-400">24 Shortlisted • Ongoing</p>
                </div>
             </div>
          </div>

          {/* Active Drive Card - Offline */}
          <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
             <div className="flex justify-between items-center mb-3">
                 <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-[10px]">T</div>
                    <span className="font-bold text-xs">TCS</span>
                 </div>
                 <span className="text-[9px] font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">Offline</span>
             </div>
             
             <div className="flex justify-between items-center mt-2">
                 <div className="text-center">
                    <div className="text-lg font-black text-[#0D1C22]">850</div>
                    <div className="text-[8px] font-bold text-gray-400 uppercase">Reg.</div>
                 </div>
                 <div className="w-px h-8 bg-gray-100"></div>
                 <div className="text-center">
                    <div className="text-lg font-black text-[#0D1C22]">Auditorium</div>
                    <div className="text-[8px] font-bold text-gray-400 uppercase">Venue</div>
                 </div>
                 <div className="w-px h-8 bg-gray-100"></div>
                 <div className="text-center">
                    <div className="text-lg font-black text-green-600">Today</div>
                    <div className="text-[8px] font-bold text-gray-400 uppercase">Date</div>
                 </div>
             </div>
          </div>
       </div>
    </div>
  );
};

// --- Screen 3: Controls (Rules & Settings) ---
export const PlacementControlsScreen = () => {
    return (
      <div className="flex flex-col h-full bg-gray-50">
        <div className="px-4 py-4 bg-white border-b border-gray-100">
            <h3 className="font-bold text-sm text-[#0D1C22]">Placement Rules</h3>
            <p className="text-[10px] text-gray-500">Set eligibility & permissions</p>
        </div>
        
        <div className="p-3 space-y-3">
            {/* Rule 1 */}
            <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
                <div className="flex gap-3 items-center">
                    <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
                        <GraduationCap size={14} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-[#0D1C22]">Minimum CGPA</p>
                        <p className="text-[10px] text-gray-500">Global Cutoff</p>
                    </div>
                </div>
                <div className="bg-gray-100 rounded-lg px-3 py-1 font-bold text-xs text-[#0D1C22]">6.0</div>
            </div>

            {/* Rule 2 */}
            <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
                <div className="flex gap-3 items-center">
                    <div className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center">
                        <Lock size={14} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-[#0D1C22]">Active Backlogs</p>
                        <p className="text-[10px] text-gray-500">Max Allowed</p>
                    </div>
                </div>
                <div className="bg-gray-100 rounded-lg px-3 py-1 font-bold text-xs text-[#0D1C22]">0</div>
            </div>

            {/* Rule 3 */}
            <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
                <div className="flex gap-3 items-center">
                    <div className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                        <CheckCircle size={14} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-[#0D1C22]">One Offer Policy</p>
                        <p className="text-[10px] text-gray-500">Auto-reject others</p>
                    </div>
                </div>
                <div className="w-8 h-4 bg-[#0D1C22] rounded-full relative">
                    <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full"></div>
                </div>
            </div>

            {/* Pending Approvals Section */}
            <p className="text-[10px] font-bold text-gray-400 uppercase mt-2 px-1">Pending Review</p>
            <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm opacity-80">
                <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-[#0D1C22]">Amazon (SDE Intern)</span>
                    <span className="text-[9px] bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded">Review</span>
                </div>
            </div>
        </div>
      </div>
    );
};

// Re-export old ones if needed elsewhere, but mainly focused on updated ones
export const DigitalProfileScreen = PlacementControlsScreen;