import React, { useRef, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface Testimonial {
  id: number;
  text: string;
  name: string;
  role: string;
  batch: string;
  color: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "I was looking for internships and had a hard time at first using other job sites. Then I started looking into OnCampus. I got a direct message from the employer that invited me to apply for the internship position. After I applied, the rest was history.",
    name: "Krisha Singh (she/her)",
    role: "Netaji Subhas University of Technology",
    batch: "Class of 2027",
    color: "bg-[#D7F037]",
  },
  {
    id: 2,
    text: "I was looking for a fresh start and had a hard time at first using other sites. Then I started looking into OnCampus. I got a direct message from the employer that invited me to apply for the internship position. After I applied, the rest was history.",
    name: "Aditi Jain (she/her)",
    role: "Mount Carmel College",
    batch: "Class of 2026",
    color: "bg-[#FF5A36]", 
  },
  {
    id: 3,
    text: "OnCampus simplified the entire recruitment process. The direct connection with recruiters made all the difference in landing my dream role.",
    name: "Rahul Sharma (he/him)",
    role: "IIT Delhi",
    batch: "Class of 2025",
    color: "bg-[#A78BFA]",
  },
  {
    id: 4,
    text: "The platform is incredibly user-friendly and the job recommendations were spot on. I found my summer internship within a week of signing up.",
    name: "Priya Patel",
    role: "BITS Pilani",
    batch: "Class of 2026",
    color: "bg-[#4ADE80]",
  },
  {
    id: 5,
    text: "Networking with alumni has never been easier. I got valuable guidance that helped me crack my placement interviews.",
    name: "Arjun Mehta",
    role: "NIT Trichy",
    batch: "Class of 2025",
    color: "bg-[#60A5FA]",
  },
  {
     id: 6,
     text: "The event tracking feature helped me stay organized during the chaotic placement season. Highly recommended!",
     name: "Sneha Gupta",
     role: "DTU",
     batch: "Class of 2025",
     color: "bg-[#F472B6]",
  }
];

interface TestimonialsProps {
  isDarkMode?: boolean;
}

const Testimonials: React.FC<TestimonialsProps> = ({ isDarkMode = false }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto slideshow logic: Scrolls 2 items every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { current } = scrollRef;
        if (current.children.length === 0) return;
        
        // Calculate width of one card + gap
        const firstCard = current.children[0] as HTMLElement;
        const cardWidth = firstCard ? firstCard.offsetWidth : 0;
        const gap = 24; // gap-6 = 24px
        const itemWidth = cardWidth + gap;
        
        // Scroll by 2 items
        const scrollAmount = itemWidth * 2;
        
        const currentScroll = current.scrollLeft;
        const maxScroll = current.scrollWidth - current.clientWidth;

        // If we can't scroll full amount, or correspond to end, wrap to start
        if (currentScroll + 10 >= maxScroll) {
            current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
             // If scrolling by 2 goes beyond max, loop to start
             if (currentScroll + scrollAmount > maxScroll) {
                 current.scrollTo({ left: 0, behavior: 'smooth' });
             } else {
                 current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
             }
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      if (current.children.length === 0) return;

      const firstCard = current.children[0] as HTMLElement;
      const cardWidth = firstCard ? firstCard.offsetWidth : 600;
      const scrollAmount = cardWidth + 24; // Scroll 1 item on manual click
      
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="testimonials-section" className="py-20 pl-4 md:pl-12 overflow-hidden transition-colors duration-700">
      <div className="mb-10 pr-4 md:pr-12">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Testimonials</p>
        <h2 className={`text-3xl md:text-4xl font-bold leading-tight transition-colors duration-700 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          For people who are<br />
          <span className="text-gray-400">(or have been)</span> in your shoes
        </h2>
      </div>

      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto no-scrollbar pb-10 pr-12 snap-x snap-mandatory"
      >
        {testimonials.map((item) => (
          <div 
            key={item.id} 
            className={`min-w-[85vw] md:min-w-[calc(50%-12px)] snap-center rounded-[2.5rem] p-8 md:p-12 ${item.color} relative flex flex-col justify-between shadow-lg transition-transform hover:scale-[1.01]`}
          >
             <div className="space-y-6 relative z-10">
                <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-900">
                  "{item.text}"
                </p>
                <div className="pt-4 border-t border-black/10 text-gray-900">
                   <p className="font-bold text-sm">{item.name}</p>
                   <p className="text-xs opacity-70 mt-1">{item.role}</p>
                   <p className="text-xs opacity-70">{item.batch}</p>
                </div>
             </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-4 pl-2">
        <button 
          onClick={() => scroll('left')} 
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-700 ${isDarkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}
        >
          <ArrowLeft size={20} />
        </button>
        <button 
          onClick={() => scroll('right')} 
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-700 ${isDarkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}
        >
          <ArrowRight size={20} />
        </button>
      </div>
    </section>
  );
};

export default Testimonials;