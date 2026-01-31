import React from 'react';
import { Building2, CheckCircle2, TrendingUp, Users, Laptop } from 'lucide-react';

const UniversityHowItWorks: React.FC = () => {
  return (
    <div className="w-full bg-[#FDFDF5]">
      <section className="max-w-5xl mx-auto px-4 py-20">
        <div className="text-center mb-20">
          <span className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2 block">For Placement Cells</span>
          <h1 className="text-4xl md:text-6xl font-black text-[#0D1C22] mb-6">Digitize your<br/>Placement Cell in 3 Steps</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Move away from spreadsheets and emails. Adopt the operating system built for modern, digital-first campus placements.</p>
        </div>

        <div className="space-y-24 relative">
          {/* Connecting Line */}
          <div className="absolute left-[28px] top-8 bottom-8 w-0.5 bg-gray-200 hidden md:block"></div>

          {/* Step 1 */}
          <div className="flex flex-col md:flex-row gap-8 relative">
            <div className="md:w-16 md:h-16 w-12 h-12 bg-[#0D1C22] text-white rounded-full flex items-center justify-center text-xl font-bold shrink-0 z-10">1</div>
            <div className="flex-1 bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
              <Building2 className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold text-[#0D1C22] mb-3">Create Digital Profile</h3>
              <p className="text-gray-600 leading-relaxed">
                Sign up and create a verified profile for your institute. Upload past placement data, alumni success stories, and branch details. This becomes your digital brochure for recruiters to discover.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col md:flex-row gap-8 relative">
            <div className="md:w-16 md:h-16 w-12 h-12 bg-[#0D1C22] text-white rounded-full flex items-center justify-center text-xl font-bold shrink-0 z-10">2</div>
            <div className="flex-1 bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
              <Users className="w-10 h-10 text-green-600 mb-4" />
              <h3 className="text-2xl font-bold text-[#0D1C22] mb-3">Onboard Students</h3>
              <p className="text-gray-600 leading-relaxed">
                Invite students via bulk email upload. Students create their profiles and get verified automatically via college email domains. You get a real-time dashboard of your entire batch's status.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col md:flex-row gap-8 relative">
            <div className="md:w-16 md:h-16 w-12 h-12 bg-[#D7F037] text-[#0D1C22] rounded-full flex items-center justify-center text-xl font-bold shrink-0 z-10">3</div>
            <div className="flex-1 bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
              <Laptop className="w-10 h-10 text-orange-600 mb-4" />
              <h3 className="text-2xl font-bold text-[#0D1C22] mb-3">Online Hiring & Offers</h3>
              <p className="text-gray-600 leading-relaxed">
                Companies post jobs visible to your eligible students online. Students apply, interview, and get hired entirely through the platform. No physical drives, no logistical headaches—just offer letters.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center">
          <button className="bg-[#0D1C22] text-white font-bold px-8 py-4 rounded-xl text-lg hover:bg-gray-800 transition-colors shadow-xl">
            Create University Account
          </button>
        </div>
      </section>
    </div>
  );
};

export default UniversityHowItWorks;