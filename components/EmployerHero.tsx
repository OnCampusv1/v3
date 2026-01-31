import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

interface EmployerHeroProps {
  onStartHiring?: (email: string) => void;
}

const EmployerHero: React.FC<EmployerHeroProps> = ({ onStartHiring }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onStartHiring && email) {
        onStartHiring(email);
    }
  };

  return (
    <section className="w-full px-4 md:px-8 py-8">
      <div className="relative w-full bg-[#FDFDF5] rounded-[2.5rem] overflow-hidden min-h-[700px] flex flex-col md:flex-row items-stretch shadow-xl border border-gray-200">
        
        {/* Content Container */}
        <div className="relative z-10 w-full flex flex-col justify-center p-8 md:p-24 max-w-[1400px] mx-auto md:w-1/2">
          
          {/* Top Badge */}
          <div className="flex justify-center md:justify-start mb-10">
             <div className="bg-[#D7F037] border border-[#0D1C22] rounded-full px-6 py-2.5 inline-flex items-center shadow-[4px_4px_0px_#0D1C22]">
               <span className="text-[#0D1C22] text-xs md:text-sm font-bold tracking-wide uppercase">🎁 First Job Post is Free</span>
             </div>
          </div>

          {/* Main Typography */}
          <div className="flex flex-col items-center md:items-start mb-12">
            <h1 className="flex flex-col text-[12vw] md:text-7xl lg:text-8xl leading-[0.9] font-black tracking-tight text-[#0D1C22] text-center md:text-left">
              <span>HIRE FRESH</span>
              <span className="text-white bg-[#0D1C22] px-3 -ml-2 transform -skew-x-6 inline-block origin-left">TALENT</span>
              <span>IN MINUTES</span>
            </h1>
            <p className="mt-10 text-lg md:text-xl text-gray-600 max-w-lg text-center md:text-left font-medium leading-relaxed">
                Skip the recruitment agencies. Post your first job for free and instantly access verified students from 500+ top colleges.
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
                  placeholder="Work email address" 
                  className="flex-1 px-6 py-4 outline-none text-gray-900 placeholder:text-gray-400 bg-transparent rounded-xl text-lg font-medium w-full"
                />
                <button type="submit" className="bg-[#0D1C22] hover:bg-black text-white font-bold px-8 py-4 rounded-xl whitespace-nowrap transition-colors text-lg shadow-sm w-full sm:w-auto">
                  Post a Job for Free
                </button>
             </form>
             <div className="flex flex-wrap justify-center md:justify-start gap-6 text-xs font-bold text-gray-500">
                <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#0D1C22]"/> 1st Post Free</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#0D1C22]"/> No Credit Card</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#0D1C22]"/> Instant Access</span>
             </div>
          </div>

        </div>

        {/* Right Side Visuals */}
        <div className="relative w-full md:w-1/2 bg-[#0D1C22] md:rounded-l-[4rem] overflow-hidden flex items-center justify-center p-8">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-700 via-[#0D1C22] to-[#0D1C22]"></div>
            
            {/* Abstract Graphic */}
            <div className="relative z-10 w-full max-w-md aspect-square">
                 <img 
                    src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop"
                    alt="Meeting"
                    className="w-full h-full object-cover rounded-2xl opacity-60 mix-blend-overlay absolute top-0 left-0 grayscale"
                 />
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-[#D7F037]/20 rounded-full animate-[spin_60s_linear_infinite]"></div>
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] border border-[#D7F037]/40 rounded-full animate-[spin_40s_linear_infinite_reverse]"></div>
                 
                 {/* Floating Cards */}
                 <div className="absolute top-[20%] -right-4 md:-right-12 bg-white p-5 rounded-2xl shadow-2xl animate-bounce duration-[3000ms]">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#FDFDF5] border border-gray-200 flex items-center justify-center text-[#0D1C22] font-bold text-lg">AK</div>
                        <div>
                            <p className="text-base font-bold text-gray-900">Arjun Kumar</p>
                            <p className="text-xs text-gray-500 font-medium">IIT Delhi • CS '25</p>
                        </div>
                    </div>
                    <div className="mt-3 flex gap-2">
                        <span className="px-2 py-1 bg-gray-100 rounded-md text-[10px] font-bold text-gray-600">React</span>
                        <span className="px-2 py-1 bg-gray-100 rounded-md text-[10px] font-bold text-gray-600">Python</span>
                    </div>
                 </div>

                 <div className="absolute bottom-[20%] -left-4 md:-left-12 bg-[#D7F037] p-5 rounded-2xl shadow-2xl animate-bounce duration-[4000ms]">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-[#0D1C22] flex items-center justify-center text-white"><span className="text-sm">✔</span></div>
                        <p className="text-base font-bold text-[#0D1C22]">Application Shortlisted</p>
                    </div>
                    <div className="w-56 h-2.5 bg-black/10 rounded-full overflow-hidden">
                        <div className="w-3/4 h-full bg-[#0D1C22] rounded-full"></div>
                    </div>
                 </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default EmployerHero;