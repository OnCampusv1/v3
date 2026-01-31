import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronDown, GraduationCap, Building2, School, Bell, User, LogOut } from 'lucide-react';

interface NavbarProps {
  onSignup?: () => void;
  onLogin?: () => void;
  onLogoClick?: () => void;
  hideAuthButtons?: boolean;
  isLoggedIn?: boolean;
  activePersona?: 'student' | 'employer' | 'university';
  onPersonaChange?: (persona: 'student' | 'employer' | 'university') => void;
  onProfileClick?: () => void;
  onLogout?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  onSignup, 
  onLogin, 
  onLogoClick, 
  hideAuthButtons = false, 
  isLoggedIn = false,
  activePersona = 'student',
  onPersonaChange,
  onProfileClick,
  onLogout
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target;
      if (dropdownRef.current && target instanceof Node && !dropdownRef.current.contains(target)) {
        setDropdownOpen(false);
      }
      if (notifRef.current && target instanceof Node && !notifRef.current.contains(target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close dropdown when persona changes (navigation)
  useEffect(() => {
    setDropdownOpen(false);
  }, [activePersona]);

  const handlePersonaSelect = (persona: 'student' | 'employer' | 'university') => {
    setDropdownOpen(false);
    onPersonaChange?.(persona);
  };

  const getPersonaLabel = (p: string) => {
    if (p === 'university') return 'Universities';
    return p + 's';
  };

  const PROFILE_PIC = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2680&auto=format&fit=crop";

  return (
    <nav className="w-full px-4 md:px-8 py-4 flex items-center justify-between relative z-50 bg-[#FDFDF5] border-b border-gray-100">
      {/* Logo */}
      <div onClick={onLogoClick} className="flex items-center gap-3 cursor-pointer select-none">
        <div className="w-10 h-10 rounded-lg bg-[#0D1C22] flex items-center justify-center shrink-0">
             <span className="font-black italic text-[#D7F037] text-3xl leading-none pt-1 pr-1">O</span>
        </div>
        <span className="font-black text-2xl italic tracking-tight text-[#0D1C22]">OnCampus</span>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6 text-sm font-semibold">
        
        {!isLoggedIn && (
          <div className="relative mr-2" ref={dropdownRef}>
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 hover:text-gray-600 transition-colors py-2 text-[#0D1C22] capitalize"
            >
              {getPersonaLabel(activePersona || 'student')} <ChevronDown size={16} strokeWidth={2.5} className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 flex flex-col z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <button 
                  onClick={() => handlePersonaSelect('student')}
                  className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors group text-left w-full ${activePersona === 'student' ? 'bg-gray-50' : ''}`}
                >
                  <GraduationCap size={20} strokeWidth={2} className="text-[#0D1C22]" />
                  <span className="font-medium text-base text-[#0D1C22]">Students</span>
                </button>
                <button 
                  onClick={() => handlePersonaSelect('employer')}
                  className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors group text-left w-full ${activePersona === 'employer' ? 'bg-gray-50' : ''}`}
                >
                  <Building2 size={20} strokeWidth={2} className="text-[#0D1C22]" />
                  <span className="font-medium text-base text-[#0D1C22]">Employers</span>
                </button>
                <button 
                  onClick={() => handlePersonaSelect('university')}
                  className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors group text-left w-full ${activePersona === 'university' ? 'bg-gray-50' : ''}`}
                >
                  <School size={20} strokeWidth={2} className="text-[#0D1C22]" />
                  <span className="font-medium text-base text-[#0D1C22]">Universities</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        {!isLoggedIn && !hideAuthButtons && (
          <>
            <button 
              onClick={onSignup}
              className="px-5 py-2.5 border border-black text-[#0D1C22] font-bold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Sign up
            </button>
            <button 
              onClick={onLogin}
              className="px-5 py-2.5 bg-[#0D1C22] text-white font-bold rounded-lg hover:bg-opacity-90 transition-colors"
            >
              Log in
            </button>
          </>
        )}

        {isLoggedIn && (
           <div className="flex items-center gap-6">
              <div className="relative" ref={notifRef}>
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="text-gray-500 hover:text-[#0D1C22] transition-colors relative"
                >
                   <Bell size={24} />
                   <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
                {showNotifications && (
                  <div className="absolute top-full right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                      <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
                          <span className="font-bold text-[#0D1C22]">Notifications</span>
                          <span className="text-xs text-gray-500 cursor-pointer hover:text-[#0D1C22]">Mark all read</span>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                          <div className="p-4 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-50">
                              <p className="text-sm text-gray-800 font-medium">Your profile is 80% complete.</p>
                              <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                          </div>
                          <div className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                              <p className="text-sm text-gray-800 font-medium">New job match: Frontend Dev at Swiggy</p>
                              <p className="text-xs text-gray-400 mt-1">5 hours ago</p>
                          </div>
                      </div>
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-3 pl-2 border-l border-gray-200">
                  <button 
                    onClick={onProfileClick}
                    className="w-10 h-10 rounded-full bg-[#D7F037] border-2 border-white shadow-sm flex items-center justify-center overflow-hidden hover:scale-105 transition-transform"
                  >
                    <img 
                      src={PROFILE_PIC}
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </button>
              </div>
           </div>
        )}
      </div>

      {/* Mobile Menu Toggle / Profile */}
      <div className="md:hidden">
         {isLoggedIn ? (
            <button onClick={() => setIsOpen(!isOpen)} className="relative outline-none">
              <div className="w-10 h-10 rounded-full bg-[#D7F037] border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
                 <img 
                    src={PROFILE_PIC}
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
              </div>
              {isOpen && (
                 <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 border border-gray-200">
                    <X size={12} className="text-black"/>
                 </div>
              )}
            </button>
         ) : (
            <button className="text-[#0D1C22]" onClick={() => setIsOpen(!isOpen)}>
               {isOpen ? <X /> : <Menu />}
            </button>
         )}
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#FDFDF5] shadow-lg flex flex-col p-6 gap-6 md:hidden border-b border-gray-200 z-40 animate-in slide-in-from-top-2 fade-in duration-200">
           {!isLoggedIn && (
             <div className="flex flex-col gap-4">
               <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Explore</span>
               <button onClick={() => { handlePersonaSelect('student'); setIsOpen(false); }} className={`flex items-center gap-3 text-lg font-bold ${activePersona === 'student' ? 'text-[#0D1C22]' : 'text-gray-500'}`}>
                  <GraduationCap size={20} /> Students
               </button>
               <button onClick={() => { handlePersonaSelect('employer'); setIsOpen(false); }} className={`flex items-center gap-3 text-lg font-bold ${activePersona === 'employer' ? 'text-[#0D1C22]' : 'text-gray-500'}`}>
                  <Building2 size={20} /> Employers
               </button>
               <button onClick={() => { handlePersonaSelect('university'); setIsOpen(false); }} className={`flex items-center gap-3 text-lg font-bold ${activePersona === 'university' ? 'text-[#0D1C22]' : 'text-gray-500'}`}>
                  <School size={20} /> Universities
               </button>
             </div>
           )}
           {!isLoggedIn && !hideAuthButtons && (
             <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
               <button onClick={() => { onSignup?.(); setIsOpen(false); }} className="w-full py-3 border border-black rounded-lg font-bold text-[#0D1C22]">Sign up</button>
               <button onClick={() => { onLogin?.(); setIsOpen(false); }} className="w-full py-3 bg-[#0D1C22] text-white rounded-lg font-bold">Log in</button>
             </div>
           )}
           {isLoggedIn && (
              <div className="flex flex-col gap-4">
                 <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                    <div className="w-12 h-12 rounded-full bg-[#D7F037] border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
                       <img 
                          src={PROFILE_PIC}
                          alt="Profile" 
                          className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                       <p className="font-bold text-[#0D1C22]">Arjun Kumar</p>
                       <p className="text-sm text-gray-500">arjun@nitt.edu</p>
                    </div>
                 </div>
                 <button onClick={() => { onProfileClick?.(); setIsOpen(false); }} className="flex items-center gap-3 text-lg font-bold text-[#0D1C22]">
                    <User size={20} /> Profile
                 </button>
                 <button className="flex items-center gap-3 text-lg font-bold text-[#0D1C22]">
                    <Bell size={20} /> Notifications
                 </button>
                 <button onClick={() => { onLogout?.(); setIsOpen(false); }} className="flex items-center gap-3 text-lg font-bold text-red-600 mt-2">
                    <LogOut size={20} /> Log Out
                 </button>
              </div>
           )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;