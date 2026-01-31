import React from 'react';
import { Instagram, Linkedin } from 'lucide-react';

interface FooterProps {
  isDarkMode?: boolean;
  onNavigate: (page: string) => void;
  customDarkBg?: string;
  customDarkBorder?: string;
}

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Footer: React.FC<FooterProps> = ({ isDarkMode = false, onNavigate, customDarkBg, customDarkBorder }) => {
  const linkClass = `text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-[#0D1C22]'} cursor-pointer block mb-3 text-left`;
  const headingClass = `font-black text-sm uppercase tracking-widest mb-6 text-left ${isDarkMode ? 'text-white' : 'text-[#0D1C22]'}`;

  const activeDarkBg = customDarkBg || 'bg-[#0D1C22]';
  const activeDarkBorder = customDarkBorder || 'border-gray-800';

  return (
    <footer className={`py-20 px-4 md:px-12 border-t transition-colors duration-700 ${isDarkMode ? `${activeDarkBg} ${activeDarkBorder}` : 'bg-[#FDFDF5] border-gray-200'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
          
          {/* Column 1: Company */}
          <div className="flex flex-col items-start">
            <h3 className={headingClass}>Company</h3>
            <button onClick={() => onNavigate('about')} className={linkClass}>About</button>
            <button onClick={() => onNavigate('blog')} className={linkClass}>Blog</button>
            <button onClick={() => onNavigate('careers-page')} className={linkClass}>Careers</button>
            <button onClick={() => onNavigate('contact')} className={linkClass}>Contact</button>
          </div>

          {/* Column 2: Students */}
          <div className="flex flex-col items-start">
            <h3 className={headingClass}>Students</h3>
            <button onClick={() => onNavigate('login-student')} className={linkClass}>Student Login</button>
            <button onClick={() => onNavigate('career-tips')} className={linkClass}>Career Tips</button>
          </div>

          {/* Column 3: Colleges */}
          <div className="flex flex-col items-start">
            <h3 className={headingClass}>Colleges</h3>
            <button onClick={() => onNavigate('login-university')} className={linkClass}>University Login</button>
            <button onClick={() => onNavigate('university-how-it-works')} className={linkClass}>How it Works</button>
          </div>

          {/* Column 4: Employers */}
          <div className="flex flex-col items-start">
            <h3 className={headingClass}>Employers</h3>
            <button onClick={() => onNavigate('employer-landing')} className={linkClass}>Post a Job</button>
            <button onClick={() => onNavigate('employer-request-demo')} className={linkClass}>Request a Demo</button>
          </div>

        </div>

        <div className={`flex flex-col md:flex-row gap-8 justify-between items-center pt-8 border-t ${isDarkMode ? activeDarkBorder : 'border-gray-200'}`}>
           <div className="flex flex-col md:flex-row items-center gap-8">
               <h2 className={`text-2xl font-black italic tracking-tight ${isDarkMode ? 'text-white' : 'text-[#0D1C22]'}`}>OnCampus</h2>
               
               {/* Social Icons */}
               <div className={`flex gap-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>
                  <a 
                    href="https://www.instagram.com/joinoncampus/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={`transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-[#0D1C22]'}`} 
                    aria-label="Instagram"
                  >
                    <Instagram size={20} />
                  </a>
                  <a 
                    href="#" 
                    className={`transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-[#0D1C22]'}`} 
                    aria-label="X (Twitter)"
                  >
                    <XIcon className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://www.linkedin.com/company/joinoncampus" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={`transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-[#0D1C22]'}`} 
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={20} />
                  </a>
               </div>
           </div>
           
           <div className={`flex gap-6 text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
             <button className={`hover:underline ${isDarkMode ? 'hover:text-white' : 'hover:text-black'}`}>Privacy Policy</button>
             <button className={`hover:underline ${isDarkMode ? 'hover:text-white' : 'hover:text-black'}`}>Terms of Use</button>
           </div>
           
           <div className={`text-sm ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
             © 2024 OnCampus Inc.
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;