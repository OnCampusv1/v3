import React, { useState } from 'react';
import { CheckCircle2, Building2 } from 'lucide-react';

const PricingCard = ({ 
  title, 
  price, 
  description, 
  features = [], 
  isPopular = false, 
  buttonText = "Get Started",
  buttonColor = "bg-gray-100 text-[#0D1C22] hover:bg-gray-200",
  textColor = "text-[#0D1C22]",
  bgColor = "bg-white",
  borderColor = "border-gray-200",
  billingCycle = 'monthly'
}: any) => {
  // Ensure features is always an array to prevent "Uncaught TypeError"
  const safeFeatures = Array.isArray(features) ? features : [];

  return (
    <div className={`relative p-8 rounded-[2.5rem] border ${isPopular ? 'border-[#0D1C22] shadow-2xl scale-105 z-10' : borderColor + ' shadow-lg'} ${bgColor} flex flex-col h-full transition-transform hover:-translate-y-1 duration-300`}>
      {isPopular && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#D7F037] text-[#0D1C22] px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest border border-[#0D1C22] shadow-sm">
          Most Popular
        </div>
      )}
      <div className="mb-8">
        <h3 className={`text-2xl font-black mb-2 ${textColor}`}>{title}</h3>
        <p className={`text-sm opacity-70 mb-6 font-medium ${textColor}`}>{description}</p>
        <div className={`flex items-baseline gap-1 ${textColor}`}>
          <span className="text-4xl font-black">{price}</span>
          {price !== 'Free' && price !== 'Custom' && (
              <span className="text-sm font-bold opacity-60">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
          )}
        </div>
      </div>
      
      <div className="space-y-4 mb-8 flex-1">
        {safeFeatures.map((feat: string, i: number) => (
          <div key={i} className={`flex items-start gap-3 text-sm font-bold ${textColor}`}>
            <CheckCircle2 className={`shrink-0 w-5 h-5 ${isPopular ? 'text-[#D7F037]' : 'text-green-500'}`} />
            <span className="opacity-90">{feat}</span>
          </div>
        ))}
      </div>

      <button className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-sm ${buttonColor}`}>
        {buttonText}
      </button>
    </div>
  );
};

const EmployerPricing: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <section className="py-24 px-4 md:px-12 bg-[#FDFDF5]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Simple Pricing</p>
          <h2 className="text-4xl md:text-5xl font-black text-[#0D1C22] mb-6">Hiring that scales with you.</h2>
          <p className="text-xl text-gray-600 font-medium mb-8">Start for free. Upgrade when you're ready to hire your entire workforce from campus.</p>
          
          {/* Billing Toggle */}
          <div className="inline-flex items-center p-1.5 bg-gray-200 rounded-full relative">
             <div className={`absolute top-1.5 left-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white rounded-full shadow-sm transition-transform duration-300 ${billingCycle === 'yearly' ? 'translate-x-full' : 'translate-x-0'}`}></div>
             <button 
                onClick={() => setBillingCycle('monthly')}
                className={`relative z-10 px-6 py-2 text-sm font-bold rounded-full transition-colors ${billingCycle === 'monthly' ? 'text-[#0D1C22]' : 'text-gray-500'}`}
             >
                Monthly
             </button>
             <button 
                onClick={() => setBillingCycle('yearly')}
                className={`relative z-10 px-6 py-2 text-sm font-bold rounded-full transition-colors flex items-center gap-2 ${billingCycle === 'yearly' ? 'text-[#0D1C22]' : 'text-gray-500'}`}
             >
                Yearly <span className="bg-[#D7F037] text-[#0D1C22] text-[9px] px-1.5 py-0.5 rounded ml-1">-20%</span>
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <PricingCard 
            title="Starter"
            price="Free"
            description="Perfect for startups posting their first internship or job."
            billingCycle={billingCycle}
            features={[
              "1 Active Job Post",
              "Access to verified students",
              "Basic applicant filtering",
              "Direct messaging (limited)",
              "Email support"
            ]}
            buttonText="Post Free Job"
            buttonColor="bg-white border-2 border-[#0D1C22] text-[#0D1C22] hover:bg-gray-50"
          />
          <PricingCard 
            title="Growth"
            price={billingCycle === 'monthly' ? "₹4,999" : "₹47,999"}
            description="For growing teams hiring regularly from multiple campuses."
            isPopular={true}
            billingCycle={billingCycle}
            bgColor="bg-[#0D1C22]"
            textColor="text-white"
            buttonText="Start Free Trial"
            buttonColor="bg-[#D7F037] text-[#0D1C22] hover:bg-[#c5dc33]"
            features={[
              "Five active job posts",
              "Unlimited applicant view",
              "Targeted campus selection",
              "Smart eligibility filtering",
              "Direct messaging with candidates"
            ]}
          />
          <PricingCard 
            title="Enterprise"
            price="Custom"
            description="For large organizations running nationwide campus drives."
            billingCycle={billingCycle}
            buttonText="Contact Sales"
            buttonColor="bg-[#0D1C22] text-white hover:bg-gray-800"
            features={[
              "Unlimited Job Posts",
              "Dedicated Account Manager",
              "Custom branding on pages",
              "API Access",
              "Bulk candidate export",
              "Pre-placement talk hosting",
              "SLA Support"
            ]}
          />
        </div>
        
        <div className="mt-20 bg-white rounded-3xl p-8 border border-gray-200 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 max-w-5xl mx-auto">
            <div className="flex items-center gap-6">
               <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-[#0D1C22]">
                  <Building2 size={32} />
               </div>
               <div>
                  <h4 className="font-bold text-xl text-[#0D1C22] mb-1">Planning a large campus drive?</h4>
                  <p className="text-gray-500 font-medium">We manage end-to-end physical and virtual drives for 50+ hires.</p>
               </div>
            </div>
            <button className="whitespace-nowrap px-8 py-4 bg-gray-100 text-[#0D1C22] font-bold rounded-xl hover:bg-gray-200 transition-colors">
               Talk to Sales
            </button>
        </div>
      </div>
    </section>
  );
};

export default EmployerPricing;