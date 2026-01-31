import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';

// Employer Components
import EmployerHero from './components/EmployerHero';
import EmployerFeatures from './components/EmployerFeatures';
import EmployerTestimonials from './components/EmployerTestimonials';
import EmployerDashboard from './components/EmployerDashboard';
import EmployerRequestDemo from './components/EmployerRequestDemo';
import EmployerPricing from './components/EmployerPricing';

// University Components
import UniversityHero from './components/UniversityHero';
import UniversityFeatures from './components/UniversityFeatures';
import UniversityImpact from './components/UniversityImpact';
import UniversityDashboard from './components/UniversityDashboard';
import UniversityOnboarding from './components/UniversityOnboarding';
import UniversityHowItWorks from './components/UniversityHowItWorks';

// Static / Info Pages
import Blog from './components/Blog';
import { About, CareersPage, Contact, CareerTips } from './components/InfoPages';

type ViewState = 'landing' | 'employer-landing' | 'university-landing' | 'signup' | 'login' | 'onboarding' | 'university-onboarding' | 'dashboard' | 'employer-dashboard' | 'university-dashboard' | 
'about' | 'blog' | 'careers-page' | 'contact' | 'career-tips' | 'university-how-it-works' | 'employer-request-demo';

type Persona = 'student' | 'employer' | 'university';

// SEO & Routing Configuration
const VIEW_CONFIG: Record<ViewState, { path: string, title: string, description: string }> = {
  'landing': { 
    path: '/', 
    title: "OnCampus | Find Internships & Fresher Jobs", 
    description: "The student-first career platform. Get matched with jobs, connect with alumni, and launch your career." 
  },
  'employer-landing': { 
    path: '/employers', 
    title: "Hire Campus Talent | OnCampus for Employers", 
    description: "Post jobs for free and hire verified students from 500+ top colleges in India. Skip the agency fees." 
  },
  'university-landing': { 
    path: '/universities', 
    title: "Digital Placement Cell | OnCampus for Universities", 
    description: "Empower your placement cell with a digital operating system. Manage drives, track offers, and increase placement rates." 
  },
  'signup': { path: '/signup', title: "Sign Up | OnCampus", description: "Create your account to get started." },
  'login': { path: '/login', title: "Log In | OnCampus", description: "Access your dashboard." },
  'onboarding': { path: '/onboarding', title: "Complete Profile | OnCampus", description: "Setup your student profile." },
  'university-onboarding': { path: '/universities/onboarding', title: "Institute Setup | OnCampus", description: "Setup your digital placement cell." },
  'dashboard': { path: '/dashboard', title: "Dashboard | OnCampus", description: "Your career command center." },
  'employer-dashboard': { path: '/employers/dashboard', title: "Employer Dashboard | OnCampus", description: "Manage your hiring pipeline." },
  'university-dashboard': { path: '/universities/dashboard', title: "Placement Cell Dashboard | OnCampus", description: "Manage students and drives." },
  'about': { path: '/about', title: "About Us | OnCampus", description: "We are bridging the gap between ambition and opportunity." },
  'blog': { path: '/blog', title: "Career Insights Blog | OnCampus", description: "Latest trends in campus hiring and career advice." },
  'careers-page': { path: '/careers', title: "Work at OnCampus", description: "Join our team and help build the future of hiring." },
  'contact': { path: '/contact', title: "Contact Us | OnCampus", description: "Get in touch with our team." },
  'career-tips': { path: '/resources/career-tips', title: "Career Tips & Guides | OnCampus", description: "Resume hacks, interview prep, and salary negotiation guides." },
  'university-how-it-works': { path: '/universities/how-it-works', title: "How it Works | OnCampus for Universities", description: "Digitize your placement cell in 3 steps." },
  'employer-request-demo': { path: '/employers/request-demo', title: "Request Demo | OnCampus", description: "Schedule a demo to see how we can help you hire better." },
};

// Reverse lookup for initial load
const PATH_TO_VIEW: Record<string, ViewState> = Object.entries(VIEW_CONFIG).reduce((acc, [view, config]) => {
  acc[config.path] = view as ViewState;
  return acc;
}, {} as Record<string, ViewState>);

export default function App() {
  // Initialize view based on current URL path
  const getInitialView = (): ViewState => {
    try {
      const path = window.location.pathname;
      return PATH_TO_VIEW[path] || 'landing';
    } catch (e) {
      return 'landing';
    }
  };

  const [view, setViewState] = useState<ViewState>(getInitialView);
  const [persona, setPersona] = useState<Persona>('student');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [inviteCode, setInviteCode] = useState(''); 

  // Dashboard Tabs State
  const [studentTab, setStudentTab] = useState('feed');
  const [employerTab, setEmployerTab] = useState('feed');
  const [universityTab, setUniversityTab] = useState('overview');

  // --- Router Logic ---
  const navigate = useCallback((newView: ViewState) => {
    setViewState(newView);
    const config = VIEW_CONFIG[newView];
    if (config) {
      window.history.pushState({}, '', config.path);
      // Update Metadata
      document.title = config.title;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', config.description);
      }
      window.scrollTo(0, 0);
    }
  }, []);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const newView = PATH_TO_VIEW[path] || 'landing';
      setViewState(newView);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Sync Persona with View (Correction logic)
  useEffect(() => {
    if (view.startsWith('employer')) setPersona('employer');
    else if (view.startsWith('university')) setPersona('university');
    else if (view === 'landing' || view === 'dashboard') setPersona('student');
  }, [view]);

  // Handle dark mode scroll effect with safety check
  useEffect(() => {
    if (view === 'university-landing') {
        setIsDarkMode(true);
    } else {
        setIsDarkMode(false);
    }

    if (view !== 'landing' && view !== 'university-landing' && view !== 'employer-landing') {
      return;
    }

    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) return;

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (view === 'university-landing') {
                if (entry.target.id === 'uni-hero') setIsDarkMode(true);
                else if (entry.target.id === 'uni-features') setIsDarkMode(false);
                else if (entry.target.id === 'uni-impact') setIsDarkMode(true);
            } 
            else if (view === 'employer-landing') {
                if (entry.target.id === 'employer-dark-mode-section') setIsDarkMode(true);
                else setIsDarkMode(false);
            }
            else if (view === 'landing') {
                 if (entry.target.id === 'dark-mode-section') setIsDarkMode(true);
                 else setIsDarkMode(false);
            }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.15,
      rootMargin: "-10% 0px -10% 0px"
    });

    const targets = [];
    if (view === 'university-landing') {
        const h = document.getElementById('uni-hero');
        const f = document.getElementById('uni-features');
        const i = document.getElementById('uni-impact');
        if (h) targets.push(h);
        if (f) targets.push(f);
        if (i) targets.push(i);
    } else if (view === 'employer-landing') {
        const d = document.getElementById('employer-dark-mode-section');
        if (d) targets.push(d);
        const top = document.querySelector('main > section:first-child'); 
        if (top) targets.push(top);
    } else if (view === 'landing') {
        const d = document.getElementById('dark-mode-section');
        if (d) targets.push(d);
        const top = document.querySelector('main > section:first-child');
        if (top) targets.push(top);
    }

    // Only observe valid targets
    targets.forEach(t => {
        if (t) observer.observe(t);
    });

    return () => {
        targets.forEach(t => {
            if (t) observer.unobserve(t);
        });
        observer.disconnect();
    };
  }, [view]);

  const handleStartSignup = (email: string) => {
    setUserEmail(email);
    navigate('signup');
  };

  const handleLogin = () => {
    navigate('login');
  };
  
  const handleSignupClick = () => {
    navigate('signup');
  };

  const handleSignupComplete = (data?: any) => {
    if (data && data.inviteCode) {
        setInviteCode(data.inviteCode);
    }

    if (persona === 'student') {
        navigate('onboarding');
    } else if (persona === 'employer') {
        navigate('employer-dashboard');
    } else if (persona === 'university') {
        navigate('university-onboarding');
    }
  };
  
  const handleLoginSuccess = () => {
    if (persona === 'student') {
        navigate('dashboard');
    } else if (persona === 'employer') {
        navigate('employer-dashboard');
    } else if (persona === 'university') {
        navigate('university-dashboard');
    }
  };

  const handleOnboardingComplete = () => {
    if (persona === 'university') {
        navigate('university-dashboard');
    } else {
        navigate('dashboard');
    }
  };

  const handleLogoClick = () => {
    if (persona === 'employer') {
        navigate('employer-landing');
    } else if (persona === 'university') {
        navigate('university-landing');
    } else {
        navigate('landing');
    }
  };

  const handlePersonaChange = (newPersona: Persona) => {
    setPersona(newPersona);
    if (view === 'signup' || view === 'login') return;

    if (newPersona === 'employer') {
        navigate('employer-landing');
    } else if (newPersona === 'university') {
        navigate('university-landing');
    } else {
        navigate('landing');
    }
  };

  const handleLogout = () => {
    if (persona === 'employer') {
        navigate('employer-landing');
    } else if (persona === 'university') {
        navigate('university-landing');
    } else {
        navigate('landing');
    }
  };

  const handleProfileClick = () => {
      if (persona === 'student') setStudentTab('profile');
      if (persona === 'employer') setEmployerTab('profile');
      if (persona === 'university') setUniversityTab('settings');
      window.scrollTo(0, 0);
  };

  const handleFooterNavigate = (page: string) => {
      if (page === 'login') handleLogin();
      else if (page === 'login-student') { setPersona('student'); handleLogin(); }
      else if (page === 'login-university') { setPersona('university'); handleLogin(); }
      else if (page === 'employer-landing') { setPersona('employer'); navigate('employer-landing'); }
      else if (page === 'university-how-it-works') { setPersona('university'); navigate('university-how-it-works'); }
      else if (page === 'employer-request-demo') { setPersona('employer'); navigate('employer-request-demo'); }
      else navigate(page as ViewState);
  };

  // --- Render Views ---

  if (view === 'signup') {
    return (
      <div className="min-h-screen bg-[#FDFDF5]">
        <Navbar onLogoClick={handleLogoClick} onLogin={handleLogin} onSignup={() => navigate('signup')} hideAuthButtons={true} activePersona={persona} onPersonaChange={handlePersonaChange} />
        <SignUp email={userEmail} onNext={handleSignupComplete} onLoginClick={handleLogin} persona={persona} />
        <Footer onNavigate={handleFooterNavigate} />
      </div>
    );
  }

  if (view === 'login') {
    return (
      <div className="min-h-screen bg-[#FDFDF5]">
        <Navbar onLogoClick={handleLogoClick} onLogin={handleLogin} onSignup={() => navigate('signup')} hideAuthButtons={true} activePersona={persona} onPersonaChange={handlePersonaChange} />
        <Login onLoginSuccess={handleLoginSuccess} onSignupClick={handleSignupClick} persona={persona} />
        <Footer onNavigate={handleFooterNavigate} />
      </div>
    );
  }

  if (view === 'onboarding') {
    return (
      <div className="min-h-screen bg-[#FDFDF5]">
        <Navbar onLogoClick={handleLogoClick} onLogin={handleLogin} onSignup={() => navigate('signup')} hideAuthButtons={true} activePersona={persona} onPersonaChange={handlePersonaChange} />
        <Onboarding onComplete={handleOnboardingComplete} inviteCode={inviteCode} />
      </div>
    );
  }

  if (view === 'university-onboarding') {
    return (
      <div className="min-h-screen bg-[#FDFDF5]">
        <Navbar onLogoClick={handleLogoClick} onLogin={handleLogin} onSignup={() => navigate('signup')} hideAuthButtons={true} activePersona={persona} onPersonaChange={handlePersonaChange} />
        <UniversityOnboarding onComplete={handleOnboardingComplete} />
      </div>
    );
  }

  if (view === 'dashboard') {
    return (
       <div className="min-h-screen bg-[#FDFDF5]">
          <Navbar 
            onLogoClick={handleLogoClick} 
            onLogin={handleLogin} 
            onSignup={() => navigate('signup')} 
            isLoggedIn={true} 
            activePersona={persona} 
            onPersonaChange={handlePersonaChange} 
            onProfileClick={handleProfileClick}
            onLogout={handleLogout}
          />
          <Dashboard onLogout={handleLogout} currentTab={studentTab} onTabChange={setStudentTab} />
       </div>
    );
  }

  if (view === 'employer-dashboard') {
    return (
       <div className="min-h-screen bg-[#FDFDF5]">
          <Navbar 
            onLogoClick={handleLogoClick} 
            onLogin={handleLogin} 
            onSignup={() => navigate('signup')} 
            isLoggedIn={true} 
            activePersona={persona} 
            onPersonaChange={handlePersonaChange} 
            onProfileClick={handleProfileClick}
            onLogout={handleLogout}
          />
          <EmployerDashboard onLogout={handleLogout} currentTab={employerTab} onTabChange={setEmployerTab} />
       </div>
    );
  }

  if (view === 'university-dashboard') {
    return (
       <div className="min-h-screen bg-[#FDFDF5]">
          <Navbar 
            onLogoClick={handleLogoClick} 
            onLogin={handleLogin} 
            onSignup={() => navigate('signup')} 
            isLoggedIn={true} 
            activePersona={persona} 
            onPersonaChange={handlePersonaChange} 
            onProfileClick={handleProfileClick}
            onLogout={handleLogout}
          />
          <UniversityDashboard onLogout={handleLogout} currentTab={universityTab} onTabChange={setUniversityTab} />
       </div>
    );
  }

  if (view === 'employer-landing') {
      return (
        <div className={`min-h-screen transition-colors duration-700 ease-in-out ${isDarkMode ? 'bg-[#0D1C22]' : 'bg-[#FDFDF5]'} text-gray-900 overflow-x-hidden selection:bg-[#0D1C22] selection:text-white`}>
            <Navbar onLogoClick={handleLogoClick} onLogin={handleLogin} onSignup={() => navigate('signup')} activePersona="employer" onPersonaChange={handlePersonaChange} />
            <main>
                <EmployerHero onStartHiring={(email) => handleStartSignup(email)} />
                <EmployerFeatures />
                <EmployerPricing />
                <div id="employer-dark-mode-section">
                    <EmployerTestimonials isDarkMode={isDarkMode} />
                    <Footer isDarkMode={isDarkMode} onNavigate={handleFooterNavigate} />
                </div>
            </main>
        </div>
      );
  }

  if (view === 'university-landing') {
      return (
        <div className={`min-h-screen transition-colors duration-700 ease-in-out ${isDarkMode ? 'bg-[#2c0033]' : 'bg-[#FDFDF5]'} text-gray-900 overflow-x-hidden selection:bg-[#D7F037] selection:text-black`}>
            <Navbar onLogoClick={handleLogoClick} onLogin={handleLogin} onSignup={() => navigate('signup')} activePersona="university" onPersonaChange={handlePersonaChange} />
            <main>
                <div id="uni-hero">
                    <UniversityHero onRequestDemo={(email) => handleStartSignup(email)} isDarkMode={isDarkMode} />
                </div>
                <div id="uni-features">
                   <UniversityFeatures isDarkMode={isDarkMode} />
                </div>
                <div id="uni-impact">
                   <UniversityImpact isDarkMode={isDarkMode} />
                   <Footer 
                      isDarkMode={isDarkMode} 
                      onNavigate={handleFooterNavigate} 
                      customDarkBg="bg-[#2c0033]"
                      customDarkBorder="border-[#441052]"
                   />
                </div>
            </main>
        </div>
      );
  }

  // Static / Info Pages
  if (view === 'about') { return (<div className="min-h-screen bg-[#FDFDF5]"><Navbar onLogoClick={handleLogoClick} onLogin={handleLogin} onSignup={() => navigate('signup')} activePersona={persona} onPersonaChange={handlePersonaChange} /><About /><Footer onNavigate={handleFooterNavigate} /></div>); }
  if (view === 'blog') { return (<div className="min-h-screen bg-[#FDFDF5]"><Navbar onLogoClick={handleLogoClick} onLogin={handleLogin} onSignup={() => navigate('signup')} activePersona={persona} onPersonaChange={handlePersonaChange} /><Blog /><Footer onNavigate={handleFooterNavigate} /></div>); }
  if (view === 'careers-page') { return (<div className="min-h-screen bg-[#FDFDF5]"><Navbar onLogoClick={handleLogoClick} onLogin={handleLogin} onSignup={() => navigate('signup')} activePersona={persona} onPersonaChange={handlePersonaChange} /><CareersPage /><Footer onNavigate={handleFooterNavigate} /></div>); }
  if (view === 'contact') { return (<div className="min-h-screen bg-[#FDFDF5]"><Navbar onLogoClick={handleLogoClick} onLogin={handleLogin} onSignup={() => navigate('signup')} activePersona={persona} onPersonaChange={handlePersonaChange} /><Contact /><Footer onNavigate={handleFooterNavigate} /></div>); }
  if (view === 'career-tips') { return (<div className="min-h-screen bg-[#FDFDF5]"><Navbar onLogoClick={handleLogoClick} onLogin={handleLogin} onSignup={() => navigate('signup')} activePersona={persona} onPersonaChange={handlePersonaChange} /><CareerTips /><Footer onNavigate={handleFooterNavigate} /></div>); }
  if (view === 'university-how-it-works') { return (<div className="min-h-screen bg-[#FDFDF5]"><Navbar onLogoClick={handleLogoClick} onLogin={handleLogin} onSignup={() => navigate('signup')} activePersona="university" onPersonaChange={handlePersonaChange} /><UniversityHowItWorks /><Footer onNavigate={handleFooterNavigate} /></div>); }
  if (view === 'employer-request-demo') { return (<div className="min-h-screen bg-[#FDFDF5]"><Navbar onLogoClick={handleLogoClick} onLogin={handleLogin} onSignup={() => navigate('signup')} activePersona="employer" onPersonaChange={handlePersonaChange} /><EmployerRequestDemo /><Footer onNavigate={handleFooterNavigate} /></div>); }

  return (
    <div className={`min-h-screen transition-colors duration-700 ease-in-out ${isDarkMode ? 'bg-[#0D1C22]' : 'bg-[#FDFDF5]'} text-gray-900 overflow-x-hidden selection:bg-[#D7F037] selection:text-black`}>
      <Navbar onLogoClick={handleLogoClick} onLogin={handleLogin} onSignup={() => navigate('signup')} activePersona="student" onPersonaChange={handlePersonaChange} />
      <main>
        <Hero onStartSignup={handleStartSignup} />
        <Features />
        <div id="dark-mode-section">
          <Testimonials isDarkMode={isDarkMode} />
          <Footer isDarkMode={isDarkMode} onNavigate={handleFooterNavigate} />
        </div>
      </main>
    </div>
  );
}