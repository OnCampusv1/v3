import React from 'react';
import { TalentDiscoveryScreen, StudentFocusScreen, CampusHiringHubScreen } from './EmployerPhoneScreens';

interface FeatureCardProps {
  pillText: string;
  title: string;
  description: string;
  bgGradient: string;
  phoneComponent: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ pillText, title, description, bgGradient, phoneComponent }) => {
  return (
    <div className="flex flex-col gap-6 group">
      {/* Text Content */}
      <div className="px-4">
        <span className="inline-block px-3 py-1 border border-gray-300 rounded-full text-xs font-bold mb-4 bg-white text-[#0D1C22]">
          {pillText}
        </span>
        <h3 className="text-3xl md:text-4xl font-bold mb-4 leading-tight text-[#0D1C22]">{title}</h3>
        <p className="text-gray-600 leading-relaxed max-w-sm font-medium">
          {description}
        </p>
      </div>

      {/* Visual Container */}
      <div className="relative w-full aspect-[4/5] md:aspect-square bg-gray-100 rounded-3xl overflow-hidden shadow-sm border border-gray-200 flex items-end justify-center pt-10 px-6">
        {/* Background Blob */}
        <div className={`absolute inset-0 w-full h-full opacity-80 ${bgGradient}`} style={{ clipPath: 'polygon(0 0, 100% 20%, 100% 100%, 0% 100%)' }}></div>
        
        {/* Phone Mockup */}
        <div className="relative z-10 w-full h-full max-w-[280px] md:max-w-[300px] transform translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
          <div className="w-full h-full bg-white rounded-t-[2.5rem] border-[8px] border-b-0 border-gray-900 shadow-2xl overflow-hidden relative">
            {/* Phone Notion Island/Camera */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-b-xl z-20"></div>
            {/* Screen Content */}
            <div className="w-full h-full pt-8 pb-4 bg-gray-50 overflow-hidden">
               {phoneComponent}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EmployerFeatures: React.FC = () => {
  return (
    <section className="w-full bg-[#FDFDF5] relative z-10">
      <div className="px-4 md:px-12 max-w-7xl mx-auto py-20">
        <div className="mb-16 text-center md:text-left">
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">For Talent Acquisition Teams</p>
          <h2 className="text-4xl md:text-5xl font-black text-[#0D1C22]">Everything you need to<br/>hire the next generation.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16">
          <FeatureCard 
            pillText="Reach"
            title="Discover talent beyond your usual campuses."
            description="Access students from verified colleges across India, not just the same few campuses, without opening roles to everyone."
            bgGradient="bg-gradient-to-b from-gray-200 to-gray-300"
            phoneComponent={<TalentDiscoveryScreen />}
          />
          <FeatureCard 
            pillText="Quality"
            title="Built only for interns and freshers."
            description="Every candidate on campus is a student or recent graduate, so you don't waste time screening irrelevant profiles."
            bgGradient="bg-gradient-to-b from-[#D7F037]/20 to-[#D7F037]/50"
            phoneComponent={<StudentFocusScreen />}
          />
          <FeatureCard 
            pillText="Workflow"
            title="Run campus hiring in one place."
            description="Post jobs, review applications, conduct interviews, and release offers directly. A complete Applicant Tracking System built for campus hiring."
            bgGradient="bg-gradient-to-b from-[#0D1C22]/10 to-[#0D1C22]/20"
            phoneComponent={<CampusHiringHubScreen />}
          />
        </div>
      </div>
    </section>
  );
};

export default EmployerFeatures;