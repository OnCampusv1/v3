import React, { useState } from 'react';

interface HeroProps {
  onStartSignup?: (email: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onStartSignup }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onStartSignup && email) {
      onStartSignup(email);
    }
  };

  return (
    <section className="w-full px-4 md:px-8 py-6">
      <div className="relative w-full bg-[#0D1C22] rounded-[2rem] overflow-hidden min-h-[600px] flex flex-col md:flex-row items-stretch shadow-2xl">
        
        {/* Background Image Layer */}
        <div className="absolute inset-0 md:left-[20%] z-0">
          <img 
            src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=2574&auto=format&fit=crop" 
            alt="Student smiling" 
            className="w-full h-full object-cover object-top md:object-[center_20%]"
          />
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-[#0D1C22]/90 md:bg-transparent md:bg-gradient-to-r from-[#0D1C22] via-[#0D1C22] to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1C22] via-transparent to-transparent md:hidden"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full flex flex-col justify-between p-6 md:p-16 max-w-[1400px] mx-auto">
          
          {/* Top Badge */}
          <div className="flex justify-center md:justify-start">
             <div className="bg-[#1A2E35] border border-[#2A434E] rounded-full px-5 py-2 inline-flex items-center shadow-lg backdrop-blur-sm">
               <span className="text-white text-xs md:text-sm font-semibold tracking-wide">Companies come here to hire students like you</span>
             </div>
          </div>

          {/* Main Typography */}
          <div className="flex-1 flex flex-col justify-center items-center md:items-start my-12 md:my-0">
            <h1 className="flex flex-col text-[14vw] md:text-[9rem] lg:text-[11rem] leading-[0.85] font-black italic tracking-tighter text-[#D7F037] text-center md:text-left drop-shadow-2xl uppercase transform md:-translate-x-2">
              <span>Get Seen</span>
              <span>Get Hired</span>
            </h1>
          </div>

          {/* Bottom CTA Bar */}
          <div className="w-full flex flex-col md:flex-row items-center gap-8 justify-between mt-auto pt-8 md:pt-0">
             <h2 className="text-white text-xl md:text-3xl font-medium max-w-md text-center md:text-left leading-tight">
               Join the network built to get you placed.
             </h2>
             
             <form onSubmit={handleSubmit} className="w-full max-w-xl bg-white rounded-xl p-2 flex flex-col md:flex-row gap-2 shadow-xl">
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Type school or personal email here" 
                  className="flex-1 px-4 py-3 outline-none text-gray-900 placeholder:text-gray-500 rounded-lg text-lg"
                />
                <button type="submit" className="bg-[#D7F037] hover:bg-[#c5dc33] text-[#0D1C22] font-bold px-6 py-3 rounded-lg whitespace-nowrap transition-colors text-lg">
                  Find internship and jobs
                </button>
             </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;