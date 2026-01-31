import React from 'react';
import { JobsScreen, FeedScreen, EventsScreen, ChatScreen } from './PhoneScreens';

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
        <span className="inline-block px-3 py-1 border border-gray-300 rounded-full text-xs font-medium mb-4">
          {pillText}
        </span>
        <h3 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{title}</h3>
        <p className="text-gray-600 leading-relaxed max-w-sm">
          {description}
        </p>
      </div>

      {/* Visual Container */}
      <div className="relative w-full aspect-[4/5] md:aspect-square bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex items-end justify-center pt-10 px-6">
        {/* Background Blob */}
        <div className={`absolute inset-0 w-full h-full opacity-90 ${bgGradient}`} style={{ clipPath: 'polygon(0 20%, 100% 40%, 100% 100%, 0% 100%)' }}></div>
        
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

const Features: React.FC = () => {
  return (
    <section className="w-full bg-[#FDFDF5] relative z-10">
      <div className="px-4 md:px-12 max-w-7xl mx-auto py-20">
        <div className="mb-16">
          <h2 className="text-xl font-bold text-gray-900">How it works</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
          <FeatureCard 
            pillText="Jobs"
            title="Jobs Meant for You"
            description="Shows only fresher and internship roles you are eligible for, so you don't waste time on irrelevant jobs."
            bgGradient="bg-gradient-to-tr from-orange-400 to-red-500"
            phoneComponent={<JobsScreen />}
          />
          <FeatureCard 
            pillText="Feed"
            title="Things to Know"
            description="A shared space where colleges, employers, and students share official hiring activity, guidance, and important campus opportunities."
            bgGradient="bg-gradient-to-tr from-blue-400 to-indigo-500"
            phoneComponent={<FeedScreen />}
          />
          <FeatureCard 
            pillText="Jobs"
            title="Events for You"
            description="All placement-related tests, interviews, PPTs, and hiring events scheduled by your college and employers."
            bgGradient="bg-gradient-to-tr from-purple-400 to-fuchsia-500"
            phoneComponent={<EventsScreen />}
          />
          <FeatureCard 
            pillText="Feed"
            title="Make Connections"
            description="Find and connect with a network of peers, mentors, and thought leaders to get career support."
            bgGradient="bg-gradient-to-tr from-green-700 to-olive-500"
            phoneComponent={<ChatScreen />}
          />
        </div>
      </div>
    </section>
  );
};

export default Features;