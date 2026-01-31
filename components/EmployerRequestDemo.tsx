import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

const EmployerRequestDemo: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-[#FDFDF5] min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <div>
          <h1 className="text-5xl md:text-7xl font-black text-[#0D1C22] mb-6 leading-[0.95]">
            HIRE FROM<br/>
            <span className="text-[#D7F037] bg-[#0D1C22] px-2 transform -skew-x-6 inline-block">ANY CAMPUS</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 font-medium">
            See how OnCampus can help you save 80% of your time in campus recruitment. Access 500+ verified colleges in one click.
          </p>
          <div className="space-y-4">
            {["Access thousands of verified students", "One dashboard for all 500+ colleges", "AI-driven candidate matching", "Zero placement fees"].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 className="text-[#0D1C22]" />
                <span className="font-bold text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Form */}
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100">
          {!submitted ? (
            <>
              <h2 className="text-2xl font-bold text-[#0D1C22] mb-6">Schedule a Product Demo</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">First Name</label>
                    <input type="text" className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0D1C22]" required />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Last Name</label>
                    <input type="text" className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0D1C22]" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Work Email</label>
                  <input type="email" className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0D1C22]" required />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Company Name</label>
                  <input type="text" className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0D1C22]" required />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Hiring Volume (Fresher)</label>
                  <select className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0D1C22]">
                    <option>1 - 10 hires</option>
                    <option>10 - 50 hires</option>
                    <option>50 - 200 hires</option>
                    <option>200+ hires</option>
                  </select>
                </div>
                <button type="submit" className="w-full bg-[#0D1C22] text-white font-bold py-4 rounded-xl text-lg hover:bg-black transition-colors shadow-lg">
                  Book Demo
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} className="text-green-600" />
              </div>
              <h3 className="text-2xl font-black text-[#0D1C22] mb-2">Request Received!</h3>
              <p className="text-gray-600">Our team will contact you shortly to schedule your personalized demo.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default EmployerRequestDemo;