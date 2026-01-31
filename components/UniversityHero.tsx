import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface UniversityHeroProps {
  onRequestDemo?: (email: string) => void;
  isDarkMode?: boolean;
}

const UniversityHero: React.FC<UniversityHeroProps> = ({ onRequestDemo, isDarkMode = false }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onRequestDemo && email) {
        onRequestDemo(email);
    }
  };

  return (
    <section className="w-full px-4 md:px-8 py-8">
      <div className={`relative w-full rounded-[2.5rem] overflow-hidden min-h-[750px] flex flex-col md:flex-row items-stretch shadow-2xl border transition-colors duration-700 ${isDarkMode ? 'bg-[#2c0033] border-[#441052]' : 'bg-white border-gray-200'}`}>
        
        {/* Left Content Container */}
        <div className="relative z-10 w-full flex flex-col justify-center p-8 md:p-24 max-w-[1400px] mx-auto md:w-1/2 order-2 md:order-1">
          
          {/* Top Badge */}
          <div className="flex justify-center md:justify-start mb-10">
             <div className={`rounded-full px-6 py-2.5 inline-flex items-center transition-colors duration-700 ${isDarkMode ? 'bg-white/10 text-[#D7F037]' : 'bg-[#0D1C22] text-[#D7F037]'}`}>
               <span className="text-xs md:text-sm font-bold tracking-wide uppercase">For Placement Cells</span>
             </div>
          </div>

          {/* Main Typography */}
          <div className="flex flex-col items-center md:items-start mb-12">
            <h1 className={`flex flex-col text-[12vw] md:text-7xl lg:text-8xl leading-[0.9] font-black tracking-tight text-center md:text-left transition-colors duration-700 ${isDarkMode ? 'text-white' : 'text-[#0D1C22]'}`}>
              <span>BRING MORE</span>
              <span className={`px-3 transform -skew-x-3 inline-block origin-left transition-colors duration-700 ${isDarkMode ? 'bg-white text-[#2c0033]' : 'bg-[#0D1C22] text-white'}`}>COMPANIES</span>
              <span>TO CAMPUS</span>
            </h1>
            <p className={`mt-10 text-xl md:text-2xl max-w-lg text-center md:text-left font-medium leading-relaxed transition-colors duration-700 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Get companies hiring interns and freshers in one place without repeated outreach from your placement team.
            </p>
          </div>

          {/* Bottom CTA Bar */}
          <div className="w-full flex flex-col items-center md:items-start gap-6">
             <form onSubmit={handleSubmit} className="w-full max-w-xl bg-white rounded-2xl p-1.5 flex flex-col sm:flex-row gap-2 shadow-xl focus-within:ring-2 focus-within:ring-[#0D1C22] transition-all border border-transparent">
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Official college email ID" 
                  className="flex-1 px-6 py-4 outline-none text-gray-900 placeholder:text-gray-400 bg-transparent rounded-xl text-lg font-medium w-full"
                />
                <button type="submit" className="bg-[#D7F037] hover:bg-[#c5dc33] text-[#0D1C22] font-black px-8 py-4 rounded-xl whitespace-nowrap transition-colors text-lg shadow-sm flex items-center gap-2 justify-center w-full sm:w-auto">
                  Partner with Us <ArrowRight size={22} strokeWidth={3} />
                </button>
             </form>
             <p className={`text-sm font-bold flex items-center gap-2 transition-colors duration-700 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>
                <CheckCircle2 size={16} /> Trusted by 500+ Placement Cells
             </p>
          </div>

        </div>

        {/* Right Side Visuals - Network & Opportunity */}
        <div className={`relative w-full md:w-1/2 md:rounded-l-[4rem] overflow-hidden flex items-center justify-center p-8 order-1 md:order-2 border-l transition-colors duration-700 ${isDarkMode ? 'bg-[#1b0021] border-[#441052]' : 'bg-[#F5F5F7] border-gray-100'}`}>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            
            {/* Central Hub - The University Profile */}
            <div className="relative z-10 w-full max-w-md">
                
                {/* Floating Notification - Visibility */}
                <div className="absolute -top-12 -right-8 bg-white p-4 rounded-xl shadow-xl border border-gray-100 flex items-center gap-3 animate-bounce duration-[3000ms] z-20 hidden md:flex">
                     <div className="flex -space-x-2">
                        <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-200"></div>
                        <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-300"></div>
                        <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-400"></div>
                     </div>
                     <div>
                         <p className="text-xs font-bold text-[#0D1C22]">Global Visibility</p>
                         <p className="text-[10px] text-green-600 font-bold">Students seen by 500+ Companies</p>
                     </div>
                </div>

                {/* Main Card: University Dashboard/Profile */}
                <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden transform md:rotate-3 md:hover:rotate-0 transition-transform duration-500">
                     <div className={`h-24 relative transition-colors duration-700 ${isDarkMode ? 'bg-[#2c0033]' : 'bg-[#0D1C22]'}`}>
                         <div className="absolute -bottom-8 left-6 w-16 h-16 bg-[#D7F037] rounded-2xl border-4 border-white flex items-center justify-center text-[#0D1C22] font-black text-xl shadow-md">
                             NIT
                         </div>
                         <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                             <span className="text-[10px] font-bold text-white flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span> Connected</span>
                         </div>
                     </div>
                     <div className="pt-10 px-6 pb-6">
                         <div className="flex justify-between items-start mb-6">
                             <div>
                                 <h3 className="text-xl font-black text-[#0D1C22]">NIT Trichy</h3>
                                 <p className="text-sm text-gray-500 font-medium">Digital Placement Cell</p>
                             </div>
                             <div className="text-right">
                                 <p className="text-2xl font-black text-[#0D1C22]">500+</p>
                                 <p className="text-[10px] font-bold text-gray-400 uppercase">Hiring Partners</p>
                             </div>
                         </div>

                         <div className="space-y-3">
                             <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Live Opportunities</p>
                             
                             {/* Incoming Request 1 */}
                             <div className="flex items-center gap-4 p-3 rounded-xl border border-gray-100 bg-gray-50 group hover:bg-white hover:shadow-md transition-all">
                                 <div className="w-10 h-10 bg-white rounded-lg p-2 border border-gray-200 flex items-center justify-center">
                                     <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" />
                                 </div>
                                 <div className="flex-1">
                                     <h4 className="font-bold text-sm text-[#0D1C22]">Google</h4>
                                     <p className="text-[10px] text-gray-500">SDE-II • Pan-India</p>
                                 </div>
                                 <div className="text-right">
                                     <span className="block text-xs font-bold text-[#0D1C22]">128 Applied</span>
                                     <span className="text-[9px] text-green-600 font-bold">Active</span>
                                 </div>
                             </div>

                             {/* Incoming Request 2 */}
                             <div className="flex items-center gap-4 p-3 rounded-xl border border-gray-100 bg-gray-50 group hover:bg-white hover:shadow-md transition-all">
                                 <div className="w-10 h-10 bg-white rounded-lg p-2 border border-gray-200 flex items-center justify-center">
                                     <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" />
                                 </div>
                                 <div className="flex-1">
                                     <h4 className="font-bold text-sm text-[#0D1C22]">Microsoft</h4>
                                     <p className="text-[10px] text-gray-500">Data Science • Remote</p>
                                 </div>
                                 <div className="text-right">
                                     <span className="block text-xs font-bold text-[#0D1C22]">84 Applied</span>
                                     <span className="text-[9px] text-green-600 font-bold">Active</span>
                                 </div>
                             </div>

                             {/* Incoming Request 3 */}
                             <div className="flex items-center gap-4 p-3 rounded-xl border border-gray-100 bg-gray-50 group hover:bg-white hover:shadow-md transition-all">
                                 <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center text-white font-bold text-[10px]">
                                     CRED
                                 </div>
                                 <div className="flex-1">
                                     <h4 className="font-bold text-sm text-[#0D1C22]">CRED</h4>
                                     <p className="text-[10px] text-gray-500">Product Design</p>
                                 </div>
                                 <div className="text-right">
                                     <span className="block text-xs font-bold text-[#0D1C22]">45 Applied</span>
                                     <span className="text-[9px] text-green-600 font-bold">Active</span>
                                 </div>
                             </div>

                         </div>
                     </div>
                </div>

                {/* Floating Notification - Offer */}
                <div className="absolute -bottom-6 -left-4 bg-[#D7F037] p-4 rounded-xl shadow-xl border border-[#0D1C22] flex items-center gap-3 animate-bounce duration-[4000ms] z-20">
                     <div className="w-10 h-10 bg-[#0D1C22] rounded-full flex items-center justify-center text-white">
                         <CheckCircle2 size={20} />
                     </div>
                     <div>
                         <p className="text-xs font-bold text-[#0D1C22]">3 Students Placed</p>
                         <p className="text-[10px] text-[#0D1C22] font-medium">At Microsoft today</p>
                     </div>
                </div>

            </div>
        </div>
      </div>
    </section>
  );
};

export default UniversityHero;