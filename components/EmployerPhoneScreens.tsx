import React from 'react';
import { Search, MapPin, CheckCircle2, Building2, Users, GraduationCap, Briefcase, Calendar, Check, MessageSquare, X } from 'lucide-react';

const Avatar = ({ fallback, color = "bg-gray-200" }: { fallback: string, color?: string }) => (
  <div className={`w-8 h-8 rounded-full ${color} overflow-hidden border border-gray-100 flex items-center justify-center shrink-0`}>
    <span className="text-xs font-bold text-gray-700">{fallback}</span>
  </div>
);

// --- Screen 1: Talent Discovery (Discover talent beyond usual campuses) ---
export const TalentDiscoveryScreen = () => {
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="px-4 py-3 border-b border-gray-100 bg-[#0D1C22] text-white">
         <h3 className="font-bold text-sm">Talent Map</h3>
         <p className="text-[10px] text-gray-400">Access 500+ Verified Colleges</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50">
          <div className="bg-[#D7F037] p-3 rounded-xl shadow-sm flex items-center gap-3">
             <div className="bg-[#0D1C22] p-2 rounded-lg text-white"><MapPin size={16} /></div>
             <div>
                <div className="font-bold text-xs text-[#0D1C22]">All India Access</div>
                <div className="text-[10px] text-[#0D1C22]">Tier 1, 2 & 3 Cities</div>
             </div>
          </div>

          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-2 px-1">Top Talent Pools</p>
          
          {[
            { name: "NIT Trichy", loc: "Tamil Nadu", count: "850+ Students" },
            { name: "Thapar University", loc: "Punjab", count: "1,200+ Students" },
            { name: "VIT Vellore", loc: "Tamil Nadu", count: "2,000+ Students" },
            { name: "Manipal (MAHE)", loc: "Karnataka", count: "1,500+ Students" },
          ].map((c, i) => (
             <div key={i} className="bg-white p-3 rounded-xl border border-gray-100 flex justify-between items-center">
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 font-bold text-xs">
                        <Building2 size={14} />
                    </div>
                    <div>
                        <h4 className="font-bold text-xs text-[#0D1C22]">{c.name}</h4>
                        <p className="text-[10px] text-gray-500">{c.loc}</p>
                    </div>
                 </div>
                 <span className="text-[9px] font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{c.count}</span>
             </div>
          ))}
      </div>
    </div>
  );
};

// --- Screen 2: Student Focus (Built only for interns and freshers) ---
export const StudentFocusScreen = () => {
  return (
    <div className="flex flex-col h-full bg-white">
       <div className="px-4 py-3 border-b border-gray-100 bg-white flex justify-between items-center">
          <h3 className="font-bold text-sm text-[#0D1C22]">Verified Candidates</h3>
          <span className="text-[9px] bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold">Freshers Only</span>
       </div>
       
       <div className="p-3 space-y-3 overflow-y-auto bg-gray-50 h-full">
          {/* Candidate 1 */}
          <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 bg-[#0D1C22] text-white text-[9px] font-bold px-2 py-1 rounded-bl-lg">
                Class of 2025
             </div>
             <div className="flex gap-3 mb-2">
                 <Avatar fallback="AK" color="bg-blue-100" />
                 <div>
                    <h4 className="font-bold text-sm text-[#0D1C22]">Arjun Kumar</h4>
                    <p className="text-[10px] text-gray-500">B.Tech CS • 9.2 CGPA</p>
                 </div>
             </div>
             <div className="flex flex-wrap gap-1 mb-2">
                <span className="px-1.5 py-0.5 border border-gray-200 rounded text-[9px] text-gray-600">React</span>
                <span className="px-1.5 py-0.5 border border-gray-200 rounded text-[9px] text-gray-600">Node.js</span>
             </div>
             <div className="flex items-center gap-1 text-[10px] text-green-600 font-bold">
                <CheckCircle2 size={10} /> Verified Student
             </div>
          </div>

          {/* Candidate 2 */}
          <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 bg-gray-800 text-white text-[9px] font-bold px-2 py-1 rounded-bl-lg">
                Class of 2024
             </div>
             <div className="flex gap-3 mb-2">
                 <Avatar fallback="SR" color="bg-purple-100" />
                 <div>
                    <h4 className="font-bold text-sm text-[#0D1C22]">Sneha Reddy</h4>
                    <p className="text-[10px] text-gray-500">MBA Marketing • 8.8 CGPA</p>
                 </div>
             </div>
             <div className="flex flex-wrap gap-1 mb-2">
                <span className="px-1.5 py-0.5 border border-gray-200 rounded text-[9px] text-gray-600">Growth</span>
                <span className="px-1.5 py-0.5 border border-gray-200 rounded text-[9px] text-gray-600">SEO</span>
             </div>
             <div className="flex items-center gap-1 text-[10px] text-green-600 font-bold">
                <CheckCircle2 size={10} /> Verified Student
             </div>
          </div>

          <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-center">
             <p className="text-[10px] text-blue-700 font-medium">
                "Zero irrelevant profiles. Every applicant was a verified student."
             </p>
          </div>
       </div>
    </div>
  );
};

// --- Screen 3: Hiring Workflow (Run campus hiring in one place) ---
export const CampusHiringHubScreen = () => {
    return (
      <div className="flex flex-col h-full bg-gray-50">
        {/* Header */}
        <div className="px-4 py-3 bg-white border-b border-gray-100 sticky top-0 z-10">
           <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-sm text-[#0D1C22]">SDE-1 Pipeline</h3>
              <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">Active</span>
           </div>
           <div className="flex gap-1 overflow-x-auto no-scrollbar">
              <div className="flex-none px-2 py-1 bg-[#0D1C22] text-white rounded-md text-[9px] font-bold">Applied (142)</div>
              <div className="flex-none px-2 py-1 bg-white border border-gray-200 text-gray-500 rounded-md text-[9px] font-bold">Shortlisted (12)</div>
              <div className="flex-none px-2 py-1 bg-white border border-gray-200 text-gray-500 rounded-md text-[9px] font-bold">Interview</div>
           </div>
        </div>
  
        {/* Candidate List */}
        <div className="p-3 space-y-2 overflow-y-auto">
           {/* Candidate 1 */}
           <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                 <div className="flex gap-2">
                    <Avatar fallback="R" color="bg-blue-100" />
                    <div>
                       <h4 className="font-bold text-xs text-[#0D1C22]">Rahul Verma</h4>
                       <p className="text-[9px] text-gray-500">IIT Delhi • 9.0 CGPA</p>
                    </div>
                 </div>
                 <span className="text-[9px] text-gray-400">2h ago</span>
              </div>
              <div className="flex gap-1 mb-3">
                 <span className="px-1.5 py-0.5 bg-gray-50 rounded text-[9px] text-gray-600 border border-gray-100">Java</span>
                 <span className="px-1.5 py-0.5 bg-gray-50 rounded text-[9px] text-gray-600 border border-gray-100">React</span>
              </div>
              <div className="flex gap-2">
                 <button className="flex-1 bg-[#0D1C22] text-white text-[9px] py-1.5 rounded-lg font-bold">Shortlist</button>
                 <button className="px-2 bg-gray-100 text-gray-600 rounded-lg"><X size={12}/></button>
              </div>
           </div>
           
           {/* Candidate 2 */}
           <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                 <div className="flex gap-2">
                    <Avatar fallback="S" color="bg-purple-100" />
                    <div>
                       <h4 className="font-bold text-xs text-[#0D1C22]">Sneha Gupta</h4>
                       <p className="text-[9px] text-gray-500">DTU • 8.8 CGPA</p>
                    </div>
                 </div>
                 <span className="text-[9px] text-gray-400">5h ago</span>
              </div>
              <div className="flex gap-1 mb-3">
                 <span className="px-1.5 py-0.5 bg-gray-50 rounded text-[9px] text-gray-600 border border-gray-100">Python</span>
                 <span className="px-1.5 py-0.5 bg-gray-50 rounded text-[9px] text-gray-600 border border-gray-100">Django</span>
              </div>
              <div className="flex gap-2">
                 <button className="flex-1 bg-[#0D1C22] text-white text-[9px] py-1.5 rounded-lg font-bold">Shortlist</button>
                 <button className="px-2 bg-gray-100 text-gray-600 rounded-lg"><X size={12}/></button>
              </div>
           </div>

           {/* Candidate 3 */}
           <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm opacity-60">
              <div className="flex justify-between items-start mb-2">
                 <div className="flex gap-2">
                    <Avatar fallback="A" color="bg-orange-100" />
                    <div>
                       <h4 className="font-bold text-xs text-[#0D1C22]">Amit K</h4>
                       <p className="text-[9px] text-gray-500">NIT Jalandhar</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    );
};