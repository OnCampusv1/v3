import React, { useRef, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface Testimonial {
  id: number;
  text: string;
  name: string;
  role: string;
  company: string;
  color: string;
  textColor: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "We closed our entire fresher hiring mandate for the year in just 3 weeks. The quality of candidates from Tier-2 colleges was surprisingly good.",
    name: "Sneha Reddy",
    role: "Lead Recruiter",
    company: "Swiggy",
    color: "bg-[#D7F037]",
    textColor: "text-[#0D1C22]"
  },
  {
    id: 2,
    text: "The ability to filter candidates based on verified coding skills saved us hundreds of hours of screening time. Highly recommended for campus hiring.",
    name: "Vikram Malhotra",
    role: "Head of Talent",
    company: "Cred",
    color: "bg-[#0D1C22]",
    textColor: "text-white"
  },
  {
    id: 3,
    text: "OnCampus helped us build our brand across 100+ campuses without visiting them physically. It's a game changer for university recruiting.",
    name: "Ananya Gupta",
    role: "HR Manager",
    company: "Microsoft IDC",
    color: "bg-white border border-gray-200",
    textColor: "text-[#0D1C22]"
  },
  {
    id: 4,
    text: "We found exceptional UI/UX designers from NID and IIT Guwahati through the platform. The portfolio showcase feature is brilliant.",
    name: "Rohan Shah",
    role: "Design Lead",
    company: "Razorpay",
    color: "bg-[#F3F4F6]",
    textColor: "text-[#0D1C22]"
  }
];

interface EmployerTestimonialsProps {
    isDarkMode?: boolean;
}

const EmployerTestimonials: React.FC<EmployerTestimonialsProps> = ({ isDarkMode = false }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const firstCard = current.children[0] as HTMLElement;
      const cardWidth = firstCard ? firstCard.offsetWidth : 400;
      const scrollAmount = cardWidth + 24; 
      
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="py-20 pl-4 md:pl-12 overflow-hidden transition-colors duration-700">
      <div className="mb-10 pr-4 md:pr-12 max-w-7xl mx-auto">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Success Stories</p>
        <h2 className={`text-3xl md:text-4xl font-bold leading-tight transition-colors duration-700 ${isDarkMode ? 'text-white' : 'text-[#0D1C22]'}`}>
          Trusted by India's<br />
          <span className="text-gray-400">fastest growing companies</span>
        </h2>
      </div>

      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto no-scrollbar pb-10 pr-12 snap-x snap-mandatory"
      >
        {testimonials.map((item) => (
          <div 
            key={item.id} 
            className={`min-w-[85vw] md:min-w-[450px] snap-center rounded-[2rem] p-8 md:p-10 ${item.color} relative flex flex-col justify-between shadow-lg transition-transform hover:scale-[1.01]`}
          >
             <div className="space-y-6 relative z-10">
                <p className={`text-lg font-medium leading-relaxed ${item.textColor}`}>
                  "{item.text}"
                </p>
                <div className={`pt-4 border-t ${item.textColor === 'text-white' ? 'border-gray-700' : 'border-black/10'}`}>
                   <p className={`font-bold text-sm ${item.textColor}`}>{item.name}</p>
                   <p className={`text-xs opacity-70 mt-0.5 ${item.textColor}`}>{item.role}, {item.company}</p>
                </div>
             </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-4 pl-2 max-w-7xl mx-auto">
        <button 
          onClick={() => scroll('left')} 
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-700 ${isDarkMode ? 'bg-white text-[#0D1C22] hover:bg-gray-200' : 'bg-gray-100 text-[#0D1C22] hover:bg-gray-200'}`}
        >
          <ArrowLeft size={20} />
        </button>
        <button 
          onClick={() => scroll('right')} 
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-700 ${isDarkMode ? 'bg-white text-[#0D1C22] hover:bg-gray-200' : 'bg-gray-100 text-[#0D1C22] hover:bg-gray-200'}`}
        >
          <ArrowRight size={20} />
        </button>
      </div>
    </section>
  );
};

export default EmployerTestimonials;