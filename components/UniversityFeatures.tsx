import React from 'react';
import { HiringPartnersScreen, PlacementTrackerScreen, PlacementControlsScreen } from './UniversityPhoneScreens';

interface FeatureCardProps {
  pillText: string;
  title: string;
  description: string;
  bgGradient: string;
  phoneComponent: React.ReactNode;
  isDarkMode?: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ pillText, title, description, bgGradient, phoneComponent, isDarkMode }) => {
  return (
    <div className="flex flex-col gap-6 group">
      {/* Text Content */}
      <div className="px-4">
        <span className={`inline-block px-3 py-1 border rounded-full text-xs font-medium mb-4 transition-colors duration-700 ${isDarkMode ? 'bg-[#3c0a45] border-[#551461] text-[#D7F037]' : 'border-gray-300 bg-white text-[#0D1C22]'}`}>
          {pillText}
        </span>
        <h3 className={`text-3xl md:text-4xl font-bold mb-4 leading-tight transition-colors duration-700 ${isDarkMode ? 'text-white' : 'text-[#0D1C22]'}`}>{title}</h3>
        <p className={`leading-relaxed max-w-sm transition-colors duration-700 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {description}
        </p>
      </div>

      {/* Visual Container */}
      <div className={`relative w-full aspect-[4/5] md:aspect-square rounded-[2.5rem] overflow-hidden flex items-end justify-center pt-10 px-6 transition-colors duration-700 ${isDarkMode ? 'bg-[#3c0a45] border border-[#551461] shadow-none' : 'bg-gray-100 shadow-sm border border-gray-200'}`}>
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

interface UniversityFeaturesProps {
    isDarkMode?: boolean;
}

const UniversityFeatures: React.FC<UniversityFeaturesProps> = ({ isDarkMode = false }) => {
  return (
    <section className="w-full relative z-10 transition-colors duration-700">
      <div className="px-4 md:px-12 max-w-7xl mx-auto py-20">
        <div className="mb-16 text-center md:text-left">
          <p className={`text-sm font-bold uppercase tracking-widest mb-2 transition-colors duration-700 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Modernize Your Placement Cell</p>
          <h2 className={`text-4xl md:text-5xl font-black transition-colors duration-700 ${isDarkMode ? 'text-white' : 'text-[#0D1C22]'}`}>The operating system for<br/>campus placements.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16">
          <FeatureCard 
            pillText="Network"
            title="More companies, less outreach"
            description="Instead of reaching out to dozens of companies every year, get access to companies already hiring interns and entry-level roles. Your students are visible without extra follow-ups."
            bgGradient="bg-gradient-to-b from-[#D7F037]/20 to-[#D7F037]/50"
            phoneComponent={<HiringPartnersScreen />}
            isDarkMode={isDarkMode}
          />
          <FeatureCard 
            pillText="Management"
            title="One dashboard for all placements"
            description="Manage job postings, student applications, interviews, offers. Even offline placements in one place, without juggling Excel sheets and WhatsApp groups."
            bgGradient="bg-gradient-to-b from-blue-100 to-blue-200"
            phoneComponent={<PlacementTrackerScreen />}
            isDarkMode={isDarkMode}
          />
          <FeatureCard 
            pillText="Control"
            title="Control without friction"
            description="Set your eligibility rules, review companies, and decide which opportunities to go live. Keep the placement process smooth for students and employers."
            bgGradient="bg-gradient-to-b from-gray-200 to-gray-300"
            phoneComponent={<PlacementControlsScreen />}
            isDarkMode={isDarkMode}
          />
        </div>
      </div>
    </section>
  );
};

export default UniversityFeatures;