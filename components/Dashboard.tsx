import React, { useState, useRef } from 'react';
import { 
  Home, 
  Briefcase, 
  Calendar, 
  MessageCircle, 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  MoreHorizontal,
  ThumbsUp,
  Share2,
  Send,
  User,
  CheckCircle2,
  ArrowLeft,
  FileText,
  Edit2,
  Plus,
  UploadCloud,
  Image as ImageIcon,
  Video,
  LogOut,
  X,
  Github,
  Linkedin,
  Globe,
  ExternalLink,
  Mail,
  Phone,
  Lock,
  Save,
  Trash2,
  ChevronDown,
  ClipboardList,
  Building,
  DollarSign,
  Check,
  Bookmark,
  Share,
  Users,
  AlertCircle,
  IndianRupee,
  Camera,
  MessageSquare,
  Loader2
} from 'lucide-react';

type Tab = 'feed' | 'jobs' | 'events' | 'inbox' | 'profile';

interface DashboardProps {
  onLogout: () => void;
  currentTab: string;
  onTabChange: (tab: any) => void;
}

// --- MOCK DATA ---
const JOBS = [
  { 
    id: 1, 
    title: 'Product Design Intern', 
    company: 'Cred', 
    location: 'Bangalore, KA', 
    type: 'Internship', 
    posted: '2d ago', 
    logo: 'https://logo.clearbit.com/cred.club', 
    isCampus: false, 
    eligible: true,
    salary: '40,000/mo',
    experience: 'Fresher',
    applicants: 128,
    deadline: 'Nov 15, 2024',
    duration: '6 Months',
    skills: ['Figma', 'Prototyping', 'Visual Design', 'Interaction Design'],
    aboutCompany: 'CRED is a members-only club that rewards individuals for their financial trustworthiness. We are building a community of creditworthy individuals.',
    hiringManager: { name: 'Siddharth Menon', role: 'Design Lead', avatar: 'S', id: 'hm1' },
    description: `About the role:
We are looking for a Product Design Intern who is passionate about building creditworthy products. You will work closely with our design and product teams to create seamless user experiences.

Key Responsibilities:
• Collaborate with product managers and engineers to define and implement innovative solutions for the product direction, visuals, and experience.
• Execute all visual design stages from concept to final hand-off to engineering.
• Conceptualize original ideas that bring simplicity and user friendliness to complex design roadblocks.
• Create wireframes, storyboards, user flows, process flows and site maps to effectively communicate interaction and design ideas.

Requirements:
• Proficiency in Figma and Adobe Suite.
• Strong understanding of UI/UX principles.
• A portfolio demonstrating user-centric design solutions.
• Ability to present your designs and sell your solutions to various stakeholders.`,
    requirements: ['Proficiency in Figma and Adobe Suite', 'Strong understanding of UI/UX principles', 'A portfolio demonstrating user-centric design solutions']
  },
  { 
    id: 2, 
    title: 'SDE-1 (New Grad)', 
    company: 'Flipkart', 
    location: 'Bangalore, KA', 
    type: 'Full-time', 
    posted: '5h ago', 
    logo: 'https://logo.clearbit.com/flipkart.com', 
    isCampus: true, 
    eligible: true,
    salary: '18 LPA',
    experience: '0-1 Years',
    applicants: 450,
    deadline: 'Oct 30, 2024',
    duration: null,
    skills: ['Java', 'Data Structures', 'Algorithms', 'System Design', 'SQL'],
    aboutCompany: 'Flipkart is India’s leading e-commerce marketplace with over 80 million products across 80+ categories.',
    hiringManager: { name: 'Ravi Kumar', role: 'Engineering Manager', avatar: 'R', id: 'hm2' },
    description: `About the role:
Join India's leading e-commerce marketplace. As an SDE-1, you will be responsible for designing and implementing scalable backend systems that power millions of transactions.

Key Responsibilities:
• Design, develop, test, deploy, maintain and improve software.
• Manage individual project priorities, deadlines and deliverables.
• Focus on scalability, performance, and availability of our systems.
• Participate in code reviews and ensure code quality.

Requirements:
• Strong problem-solving skills in Data Structures and Algorithms.
• Experience with Java/C++ or Python.
• Knowledge of DBMS and Operating Systems.
• B.Tech/B.E. in Computer Science or related field.`,
    requirements: ['Strong problem-solving skills in DSA', 'Experience with Java/C++ or Python', 'Knowledge of DBMS and Operating Systems']
  },
  { 
    id: 3, 
    title: 'Marketing Associate', 
    company: 'Zomato', 
    location: 'Gurgaon, HR', 
    type: 'Full-time', 
    posted: '1d ago', 
    logo: 'https://logo.clearbit.com/zomato.com', 
    isCampus: false, 
    eligible: false,
    salary: '12 LPA',
    experience: '0-2 Years',
    applicants: 89,
    deadline: 'Nov 05, 2024',
    duration: null,
    skills: ['Social Media Marketing', 'Content Strategy', 'Analytics', 'Brand Management'],
    aboutCompany: 'Zomato is an Indian restaurant aggregator and food delivery startup. We provide information, menus and user-reviews of restaurants.',
    hiringManager: { name: 'Aisha Khan', role: 'Marketing Head', avatar: 'A', id: 'hm3' },
    description: `About the role:
Zomato is looking for a Marketing Associate to drive brand awareness and user acquisition. You will execute marketing campaigns across various channels and analyze their performance.

Key Responsibilities:
• Plan and execute digital marketing campaigns.
• Monitor and analyze performance of marketing initiatives.
• Collaborate with content and design teams to create engaging campaigns.
• Manage social media handles and community engagement.

Requirements:
• Excellent communication and interpersonal skills.
• Experience in digital marketing or brand management.
• Creative thinking and analytical mindset.`,
    requirements: ['Excellent communication skills', 'Experience in digital marketing', 'Creative thinking and analytical mindset']
  },
  { 
    id: 4, 
    title: 'Data Scientist Intern', 
    company: 'Swiggy', 
    location: 'Remote', 
    type: 'Internship', 
    posted: '3d ago', 
    logo: 'https://logo.clearbit.com/swiggy.com', 
    isCampus: true, 
    eligible: true,
    salary: '35,000/mo',
    experience: 'Fresher',
    applicants: 210,
    deadline: 'Nov 10, 2024',
    duration: '3 Months',
    skills: ['Python', 'Machine Learning', 'SQL', 'Pandas', 'NumPy'],
    aboutCompany: 'Swiggy is India’s largest online food ordering and delivery platform. We are changing the way India eats.',
    hiringManager: { name: 'Karthik S', role: 'Lead Data Scientist', avatar: 'K', id: 'hm4' },
    description: `About the role:
Work with our Data Science team to analyze large datasets and build predictive models for food delivery optimization.

Key Responsibilities:
• Analyze large datasets to derive actionable insights.
• Build and deploy machine learning models for demand prediction.
• Collaborate with engineering teams to integrate models into production.
• Visualize data findings for stakeholders.

Requirements:
• Proficiency in Python and SQL.
• Knowledge of Machine Learning algorithms and libraries.
• Strong statistical background.`,
    requirements: ['Proficiency in Python and SQL', 'Knowledge of Machine Learning algorithms', 'Strong statistical background']
  },
  { 
    id: 5, 
    title: 'Campus Ambassador', 
    company: 'OnePlus', 
    location: 'On Campus', 
    type: 'Part-time', 
    posted: '1w ago', 
    logo: 'https://logo.clearbit.com/oneplus.com', 
    isCampus: true, 
    eligible: true,
    salary: '5,000/mo + Incentives',
    experience: 'Student',
    applicants: 56,
    deadline: 'Oct 28, 2024',
    duration: '1 Year',
    skills: ['Marketing', 'Communication', 'Event Management', 'Networking'],
    aboutCompany: 'OnePlus is a global mobile technology company challenging conventional concepts of technology.',
    hiringManager: { name: 'Pooja Verma', role: 'Community Manager', avatar: 'P', id: 'hm5' },
    description: `About the role:
Represent OnePlus on your campus. Organize events, drive community engagement, and be the face of the brand among your peers.

Key Responsibilities:
• Organize workshops and events on campus.
• Promote OnePlus products and campaigns via social media.
• Gather feedback from students and report to the community manager.
• Build a community of tech enthusiasts on campus.

Requirements:
• Active participation in college clubs.
• Strong networking skills.
• Passion for technology and gadgets.`,
    requirements: ['Active participation in college clubs', 'Strong networking skills', 'Passion for technology']
  },
  { 
    id: 6, 
    title: 'Business Analyst', 
    company: 'Deloitte', 
    location: 'Hyderabad, TS', 
    type: 'Full-time', 
    posted: '4d ago', 
    logo: 'https://logo.clearbit.com/deloitte.com', 
    isCampus: false, 
    eligible: false,
    salary: '10 LPA',
    experience: '0-2 Years',
    applicants: 320,
    deadline: 'Nov 01, 2024',
    duration: null,
    skills: ['Excel', 'SQL', 'Tableau', 'Data Analysis', 'Problem Solving'],
    aboutCompany: 'Deloitte is a leading global provider of audit and assurance, consulting, financial advisory, risk advisory, tax and related services.',
    hiringManager: { name: 'Amit Shah', role: 'Senior Manager', avatar: 'A', id: 'hm6' },
    description: `About the role:
Deloitte is hiring Business Analysts to bridge the gap between IT and business using data analytics to assess processes, determine requirements and deliver data-driven recommendations and reports to executives and stakeholders.

Key Responsibilities:
• Engage with business leaders and users to understand how data-driven changes to process, products, services, software and hardware can improve efficiencies and add value.
• articulate those ideas but also balance them against what’s technologically feasible and financially and functionally reasonable.
• Use strong analytical skills to interpret complex data sets.

Requirements:
• Strong analytical skills.
• Proficiency in Excel and SQL.
• Good presentation and communication skills.`,
    requirements: ['Strong analytical skills', 'Proficiency in Excel and SQL', 'Good presentation skills']
  },
];

const APPLICATIONS = [
  { id: 101, jobId: 99, title: 'Frontend Developer Intern', company: 'Razorpay', status: 'Interview', date: 'Applied 1 week ago', logo: 'https://logo.clearbit.com/razorpay.com', salary: '₹25,000/mo', location: 'Bangalore, KA' },
  { id: 102, jobId: 98, title: 'SDE-1', company: 'Google', status: 'Applied', date: 'Applied 2 days ago', logo: 'https://logo.clearbit.com/google.com', salary: '₹24 LPA', location: 'Hyderabad, TS' },
  { id: 103, jobId: 97, title: 'Data Analyst', company: 'KPMG', status: 'Rejected', date: 'Applied 3 weeks ago', logo: 'https://logo.clearbit.com/kpmg.com', salary: '₹8 LPA', location: 'Gurgaon, HR' },
  { id: 104, jobId: 96, title: 'Product Manager', company: 'Uber', status: 'Shortlisted', date: 'Applied 5 days ago', logo: 'https://logo.clearbit.com/uber.com', salary: '₹22 LPA', location: 'Bangalore, KA' },
];

const INITIAL_EVENTS = [
  { id: 1, title: 'TCS National Qualifier Test', company: 'TCS', date: 'Oct 24', time: '10:00 AM', location: 'Online Assessment', logo: 'bg-blue-800 text-white' },
  { id: 2, title: 'Placement Prep Workshop', company: 'Training & Placement Cell', date: 'Oct 26', time: '4:00 PM', location: 'Seminar Hall, Block B', logo: 'bg-yellow-500 text-black' },
  { id: 3, title: 'Tech Talk: Scaling at Speed', company: 'Razorpay', date: 'Nov 02', time: '11:00 AM', location: 'Main Auditorium', logo: 'bg-blue-600 text-white' },
];

const INITIAL_POSTS = [
  { id: 1, author: 'Vikram Singh', role: 'Student at IIT Delhi', content: 'Thrilled to accept a Pre-Placement Offer (PPO) from Microsoft IDC! 🚀 Huge thanks to my seniors and the placement cell for their guidance.', likes: 452, comments: 45, time: '2h ago', liked: false },
  { id: 2, author: 'Tata Digital', role: 'Company Page', content: 'We are hiring freshers for our Neu division. Looking for React and Node.js developers. Apply now through your campus portal! 👇', likes: 856, comments: 120, time: '5h ago', liked: false },
];

const MESSAGES = [
  { id: 'm1', name: 'Siddharth Menon', role: 'Design Lead at Cred', preview: 'Hey Arjun, great to see your portfolio. When can we chat?', time: '10m', unread: true },
  { id: 'm2', name: 'Ravi Kumar', role: 'Engineering Manager at Flipkart', preview: 'Your coding round results are impressive.', time: '2h', unread: false },
  { id: 'm3', name: 'Nina Patel', role: 'Recruiter at Saral Software', preview: 'Hi, we have an opening for a frontend role.', time: '1d', unread: false },
];

const PROFILE_PIC = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2680&auto=format&fit=crop";

// --- SUB COMPONENTS ---

const JobCard: React.FC<{ 
    job: any, 
    onClick: () => void, 
    onApply: (e: React.MouseEvent) => void,
    isSaved: boolean,
    isApplied: boolean,
    onBookmark: (e: React.MouseEvent) => void,
    onShare: (e: React.MouseEvent) => void
}> = ({ job, onClick, onApply, isSaved, isApplied, onBookmark, onShare }) => (
  <div 
    onClick={onClick}
    className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row gap-4 group relative cursor-pointer"
  >
    {job.isCampus && (
      <div className="absolute top-4 right-14 bg-purple-100 text-purple-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">
        Campus Hire
      </div>
    )}
    {!job.eligible && (
        <div className="absolute top-4 right-14 bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide flex items-center gap-1">
            <Lock size={10} /> Not Eligible
        </div>
    )}
    
    {/* Actions Top Right */}
    <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
        <button onClick={onShare} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
            <Share2 size={18} />
        </button>
        <button onClick={onBookmark} className={`p-1.5 rounded-full transition-colors ${isSaved ? 'text-[#0D1C22] bg-[#D7F037]' : 'text-gray-400 hover:text-[#0D1C22] hover:bg-gray-100'}`}>
            <Bookmark size={18} fill={isSaved ? "currentColor" : "none"} />
        </button>
    </div>

    <div className="w-14 h-14 rounded-xl flex items-center justify-center font-bold text-lg shrink-0 bg-white border border-gray-100 overflow-hidden">
      <img src={job.logo} alt={job.company} className="w-full h-full object-contain p-1" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/50?text=' + (job.company?.[0] || 'C'); }} />
    </div>
    <div className="flex-1">
      <div className="flex justify-between items-start pr-24">
         <h3 className="font-bold text-lg text-[#0D1C22] group-hover:text-blue-600 transition-colors">{job.title}</h3>
      </div>
      <p className="text-gray-600 font-medium">{job.company}</p>
      
      <div className="flex items-center gap-4 mt-3 text-sm text-gray-500 flex-wrap">
         <span className="flex items-center gap-1"><MapPin size={14}/> {job.location}</span>
         <span className="flex items-center gap-1"><Briefcase size={14}/> {job.type}</span>
         <span className="flex items-center gap-1 text-[#0D1C22] font-bold"><IndianRupee size={14}/> {job.salary}</span>
         {job.duration && <span className="flex items-center gap-1"><Clock size={14}/> {job.duration}</span>}
         {!job.duration && <span className="flex items-center gap-1"><Clock size={14}/> {job.posted}</span>}
         {job.deadline && <span className="flex items-center gap-1 text-red-600 font-medium"><Calendar size={14}/> Ends: {job.deadline}</span>}
      </div>
    </div>
    <div className="flex items-end justify-end mt-4 md:mt-0">
        <button 
            onClick={isApplied ? (e) => e.stopPropagation() : onApply}
            disabled={isApplied}
            className={`px-6 py-2 rounded-xl font-bold text-sm shadow-md w-full md:w-auto transition-all flex items-center justify-center gap-2 ${
                isApplied 
                ? 'bg-green-100 text-green-700 cursor-default hover:bg-green-100' 
                : 'bg-[#0D1C22] text-white hover:bg-opacity-90'
            }`}
        >
            {isApplied ? <><CheckCircle2 size={16}/> Applied</> : 'Easy Apply'}
        </button>
    </div>
  </div>
);

const JobDetailModal: React.FC<{ 
    job: any, 
    onClose: () => void, 
    onApply: () => void,
    isSaved: boolean,
    isApplied: boolean,
    onBookmark: () => void,
    onMessage: (manager: any) => void
}> = ({ job, onClose, onApply, isSaved, isApplied, onBookmark, onMessage }) => {
    if (!job) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-2 md:p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[95vh] overflow-hidden flex flex-col relative animate-in slide-in-from-bottom-8 duration-300 shadow-2xl">
                
                {/* Header Section */}
                <div className="p-6 md:p-8 border-b border-gray-100 flex-shrink-0 bg-white z-10 relative">
                    <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                       <X size={24} />
                    </button>

                    <div className="flex items-start gap-5">
                        <div className="w-20 h-20 rounded-xl border border-gray-100 p-2 bg-white shadow-sm flex items-center justify-center shrink-0">
                            <img src={job.logo} alt={job.company} className="w-full h-full object-contain" />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-2xl font-black text-[#0D1C22]">{job.title}</h2>
                            <div className="flex items-center gap-2 mt-1 flex-wrap">
                                <span className="font-bold text-lg text-gray-700">{job.company}</span>
                                <span className="text-gray-300">|</span>
                                <span className="text-gray-500 text-sm flex items-center gap-1"><MapPin size={14}/> {job.location}</span>
                                <span className="text-gray-300">|</span>
                                <span className="text-gray-500 text-sm">{job.posted}</span>
                            </div>
                            
                            <div className="flex flex-wrap gap-3 mt-5">
                                <button 
                                    onClick={isApplied ? undefined : onApply} 
                                    disabled={isApplied}
                                    className={`px-8 py-2.5 rounded-full font-bold text-sm transition-all flex items-center gap-2 shadow-lg ${
                                        isApplied 
                                        ? 'bg-green-100 text-green-700 cursor-default' 
                                        : 'bg-[#0D1C22] text-white hover:bg-opacity-90'
                                    }`}
                                >
                                    {isApplied ? <><CheckCircle2 size={16}/> Applied</> : <><ExternalLink size={14} /> Easy Apply</>}
                                </button>
                                <button 
                                    onClick={onBookmark}
                                    className={`border px-6 py-2.5 rounded-full font-bold text-sm transition-colors flex items-center gap-2 ${isSaved ? 'bg-[#D7F037] border-[#D7F037] text-[#0D1C22]' : 'border-[#0D1C22] text-[#0D1C22] hover:bg-gray-50'}`}
                                >
                                    {isSaved ? <Bookmark size={16} fill="currentColor"/> : <Bookmark size={16}/>} 
                                    {isSaved ? 'Saved' : 'Save Job'}
                                </button>
                                <button className="border border-gray-200 text-gray-600 px-4 py-2.5 rounded-full font-bold text-sm hover:bg-gray-50 transition-colors">
                                    <Share2 size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Body */}
                <div className="overflow-y-auto p-6 md:p-8 flex flex-col md:flex-row gap-8 bg-[#FDFDF5]">
                    
                    {/* Left Column: Job Description */}
                    <div className="flex-1 space-y-8">
                        
                        {/* Hiring Manager Section */}
                        {job.hiringManager && (
                            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600 text-lg">
                                        {job.hiringManager.avatar}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#0D1C22]">{job.hiringManager.name}</h4>
                                        <p className="text-sm text-gray-500">{job.hiringManager.role} at {job.company}</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => onMessage(job.hiringManager)}
                                    className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 hover:text-[#0D1C22] hover:border-[#0D1C22] transition-all flex items-center gap-2"
                                >
                                    <MessageSquare size={16} /> Message
                                </button>
                            </div>
                        )}

                        {/* About the Job */}
                        <section className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                            <h3 className="font-bold text-xl text-[#0D1C22] mb-4">About the role</h3>
                            <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap space-y-4">
                                {job.description}
                            </div>
                        </section>

                        {/* Skills */}
                        {job.skills && Array.isArray(job.skills) && (
                            <section>
                                <h3 className="font-bold text-lg text-[#0D1C22] mb-4 px-2">Skills Required</h3>
                                <div className="flex flex-wrap gap-2">
                                    {job.skills.map((skill: string) => (
                                        <span key={skill} className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-bold shadow-sm">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* About Company */}
                        {job.aboutCompany && (
                            <section className="pt-6 border-t border-gray-200">
                                <h3 className="font-bold text-lg text-[#0D1C22] mb-2">About {job.company}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{job.aboutCompany}</p>
                            </section>
                        )}
                    </div>

                    {/* Right Column: Meta Details (Sidebar) */}
                    <div className="w-full md:w-80 shrink-0 space-y-6">
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                            <h3 className="font-bold text-base text-[#0D1C22] mb-4">Job Overview</h3>
                            <div className="space-y-5">
                                <div>
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Pay</p>
                                    <p className="font-black text-xl text-[#0D1C22] flex items-center gap-1"><IndianRupee size={20}/> {job.salary}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Job Type</p>
                                    <span className="inline-flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg text-sm font-bold text-gray-700 border border-gray-100"><Briefcase size={14}/>{job.type}</span>
                                </div>
                                {job.duration && (
                                    <div>
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Duration</p>
                                        <span className="inline-flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg text-sm font-bold text-gray-700 border border-gray-100"><Clock size={14}/>{job.duration}</span>
                                    </div>
                                )}
                                <div>
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Experience</p>
                                    <span className="inline-flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg text-sm font-bold text-gray-700 border border-gray-100"><Users size={14}/>{job.experience || 'Entry Level'}</span>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Location</p>
                                    <p className="text-sm font-bold text-gray-700 flex items-center gap-2"><MapPin size={16}/>{job.location}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Posted</p>
                                    <p className="text-sm font-medium text-gray-500">{job.posted}</p>
                                </div>
                                {job.deadline && (
                                    <div>
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Deadline</p>
                                        <p className="text-sm font-bold text-red-600 flex items-center gap-2"><Calendar size={16}/> {job.deadline}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {job.isCampus && (
                            <div className="bg-purple-50 p-6 rounded-3xl border border-purple-100">
                                <h3 className="font-bold text-base text-purple-900 mb-2 flex items-center gap-2">
                                    <Building size={18} /> Campus Drive
                                </h3>
                                <p className="text-xs text-purple-700 leading-relaxed font-medium">
                                    This job is exclusively available for your college. Priority hiring process enabled.
                                </p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

const ApplicationCard: React.FC<{ app: any, onClick: () => void }> = ({ app, onClick }) => {
    const getStatusColor = (status: string) => {
        switch(status) {
            case 'Applied': return 'bg-gray-100 text-gray-700';
            case 'Review': return 'bg-yellow-100 text-yellow-700';
            case 'Shortlisted': return 'bg-blue-100 text-blue-700';
            case 'Interview': return 'bg-purple-100 text-purple-700';
            case 'Rejected': return 'bg-red-50 text-red-600';
            case 'Offer': return 'bg-green-100 text-green-700';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    return (
        <div 
            onClick={onClick}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4 cursor-pointer group"
        >
            <div className="w-14 h-14 rounded-xl flex items-center justify-center font-bold text-lg shrink-0 bg-white border border-gray-100 overflow-hidden">
                <img src={app.logo} alt={app.company} className="w-full h-full object-contain p-1" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/50?text=' + (app.company?.[0] || 'C'); }} />
            </div>
            <div className="flex-1">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-bold text-lg text-[#0D1C22] group-hover:text-blue-600 transition-colors">{app.title}</h3>
                        <p className="text-gray-600 font-medium">{app.company}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(app.status)}`}>
                        {app.status}
                    </span>
                </div>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                    <span className="flex items-center gap-1"><Clock size={14} /> {app.date}</span>
                    <span className="flex items-center gap-1"><MapPin size={14} /> {app.location}</span>
                </div>
            </div>
            <ChevronDown className="text-gray-300 -rotate-90 group-hover:text-[#0D1C22] transition-colors" />
        </div>
    );
};

const ApplicationDetailModal: React.FC<{ app: any, onClose: () => void }> = ({ app, onClose }) => {
    if (!app) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-[2rem] w-full max-w-2xl p-8 relative animate-in slide-in-from-bottom-8 duration-300 shadow-2xl">
                <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                   <X size={24} />
                </button>

                <div className="text-center mb-8">
                    <div className="w-24 h-24 mx-auto bg-white border-2 border-gray-100 rounded-2xl flex items-center justify-center mb-4 p-2 shadow-sm">
                        <img src={app.logo} alt={app.company} className="w-full h-full object-contain" />
                    </div>
                    <h2 className="text-2xl font-black text-[#0D1C22]">{app.title}</h2>
                    <p className="text-lg text-gray-500 font-medium">{app.company}</p>
                </div>

                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-6">
                    <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Status</p>
                            <span className="inline-block px-3 py-1 bg-white border border-gray-200 rounded-full text-sm font-bold text-[#0D1C22]">{app.status}</span>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Applied On</p>
                            <span className="font-bold text-[#0D1C22]">{app.date}</span>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Location</p>
                            <span className="font-bold text-[#0D1C22]">{app.location}</span>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Package</p>
                            <span className="font-bold text-[#0D1C22]">{app.salary || 'Not Disclosed'}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-blue-50 border border-blue-100 p-5 rounded-2xl flex items-start gap-4">
                    <div className="bg-blue-100 text-blue-600 p-2 rounded-full shrink-0">
                        <AlertCircle size={20} />
                    </div>
                    <div>
                        <h4 className="font-bold text-blue-800 text-sm">Next Steps</h4>
                        <p className="text-blue-700 text-sm mt-1 leading-relaxed">
                            Your application is being reviewed. If you get selected, the company will reach out to you via email or phone for further rounds. Keep preparing!
                        </p>
                    </div>
                </div>

                <div className="mt-8 flex justify-center">
                    <button onClick={onClose} className="px-8 py-3 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-colors">
                        Close Details
                    </button>
                </div>
            </div>
        </div>
    );
};

const EventCard: React.FC<{ event: any }> = ({ event }) => {
    const [isRegistered, setIsRegistered] = useState(false);

    return (
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex gap-5 items-center">
            <div className="flex flex-col items-center justify-center w-16 h-16 bg-gray-50 rounded-xl border border-gray-200 shrink-0">
            <span className="text-xs font-bold text-gray-500 uppercase">{event.date.split(' ')[0]}</span>
            <span className="text-xl font-black text-[#0D1C22]">{event.date.split(' ')[1]}</span>
            </div>
            <div className="flex-1">
            <h3 className="font-bold text-lg text-[#0D1C22]">{event.title}</h3>
            <p className="text-gray-600">{event.company} • {event.time}</p>
            <p className="text-sm text-gray-400 flex items-center gap-1 mt-1"><MapPin size={12}/> {event.location}</p>
            </div>
            <button 
                onClick={() => setIsRegistered(!isRegistered)}
                className={`px-4 py-2 rounded-lg font-bold transition-all border ${isRegistered ? 'bg-green-100 text-green-700 border-green-200' : 'bg-white border-[#0D1C22] text-[#0D1C22] hover:bg-[#0D1C22] hover:text-white'}`}
            >
            {isRegistered ? <span className="flex items-center gap-1"><Check size={14}/> Registered</span> : 'Register'}
            </button>
        </div>
    );
};

// --- VIEWS ---

const FeedView = ({ setTab, userName, profileCompletionPercentage = 60 }: { setTab: (t: Tab) => void, userName: string, profileCompletionPercentage?: number }) => {
    const [posts, setPosts] = useState(INITIAL_POSTS);

    const handleLike = (id: number) => {
        setPosts(posts.map(post => {
            if (post.id === id) {
                return { 
                    ...post, 
                    liked: !post.liked, 
                    likes: post.liked ? post.likes - 1 : post.likes + 1 
                };
            }
            return post;
        }));
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* Profile Completion Prompt */}
            {profileCompletionPercentage < 100 && (
                <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
                    <div className="flex-1 w-full md:w-auto">
                        <h3 className="text-lg font-bold text-[#0D1C22] mb-1">Complete your profile to get hired faster!</h3>
                        <p className="text-sm text-gray-600 mb-3">Recruiters are looking for candidates with job preferences and social links.</p>
                        <div className="flex items-center gap-3">
                            <div className="w-full max-w-sm h-2 bg-gray-100 rounded-full overflow-hidden flex-1">
                                <div className="h-full bg-blue-500 rounded-full transition-all duration-1000" style={{ width: `${profileCompletionPercentage}%` }}></div>
                            </div>
                            <p className="text-xs text-blue-600 font-bold whitespace-nowrap">{profileCompletionPercentage}% Completed</p>
                        </div>
                    </div>
                    <button onClick={() => setTab('profile')} className="w-full md:w-auto bg-[#0D1C22] text-white px-6 py-3 rounded-xl font-bold hover:bg-black transition-colors whitespace-nowrap shadow-lg">
                        Finish Profile
                    </button>
                </div>
            )}

            {/* Welcome Header */}
            <div className="bg-[#D7F037] rounded-[2rem] p-8 md:p-10 relative overflow-hidden">
                <div className="relative z-10 max-w-lg">
                <h1 className="text-4xl md:text-5xl font-black italic tracking-tight text-[#0D1C22] mb-4">Good Morning, {userName?.split(' ')[0]}!</h1>
                <p className="text-[#0D1C22] font-medium text-lg mb-6">You have 3 new job matches and 1 upcoming event today.</p>
                <button onClick={() => setTab('jobs')} className="bg-[#0D1C22] text-white font-bold px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors">
                    View Matches
                </button>
                </div>
                <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
                <svg width="300" height="300" viewBox="0 0 100 100" fill="currentColor">
                    <path d="M48.5 18C30.5 18 18 31.5 18 50C18 68.5 30.5 82 48.5 82C66.5 82 79 68.5 79 50C79 31.5 66.5 18 48.5 18ZM48.5 8C72 8 92 27 92 50C92 73 72 92 48.5 92C25 92 8 73 8 50C8 27 25 8 48.5 8Z"/>
                </svg>
                </div>
            </div>

            {/* Create Post */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#D7F037] border border-gray-100 flex items-center justify-center shrink-0 overflow-hidden">
                <img src={PROFILE_PIC} alt="User" className="w-full h-full object-cover" />
                </div>
                <input 
                type="text" 
                placeholder="Share an update, question, or achievement..." 
                className="flex-1 bg-gray-50 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-[#0D1C22] transition-all"
                />
            </div>
            <div className="flex justify-between items-center px-2">
                <div className="flex gap-4">
                <button className="flex items-center gap-2 text-gray-500 hover:text-[#0D1C22] text-sm font-medium">
                    <ImageIcon size={18} /> Photo
                </button>
                <button className="flex items-center gap-2 text-gray-500 hover:text-[#0D1C22] text-sm font-medium">
                    <Video size={18} /> Video
                </button>
                </div>
                <button className="bg-[#0D1C22] text-white px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-opacity-90">
                Post
                </button>
            </div>
            </div>

            {/* Feed Posts */}
            <section>
            <h2 className="text-xl font-bold text-[#0D1C22] mb-4 px-2">Latest from your network</h2>
            <div className="space-y-4">
                {posts.map(post => (
                    <div key={post.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                            <User size={20} className="text-gray-500" />
                        </div>
                        <div>
                            <h4 className="font-bold text-[#0D1C22]">{post.author}</h4>
                            <p className="text-xs text-gray-500">{post.role} • {post.time}</p>
                        </div>
                    </div>
                    <p className="text-gray-800 mb-4 leading-relaxed">{post.content}</p>
                    <div className="flex gap-6 text-gray-500 text-sm font-medium border-t border-gray-50 pt-4">
                        <button 
                            onClick={() => handleLike(post.id)}
                            className={`flex items-center gap-2 transition-colors ${post.liked ? 'text-red-500 font-bold' : 'hover:text-blue-600'}`}
                        >
                            <ThumbsUp size={16} fill={post.liked ? "currentColor" : "none"} /> {post.likes}
                        </button>
                        <button className="flex items-center gap-2 hover:text-blue-600"><MessageCircle size={16}/> {post.comments}</button>
                        <button className="flex items-center gap-2 hover:text-blue-600"><Share2 size={16}/> Share</button>
                    </div>
                    </div>
                ))}
            </div>
            </section>
        </div>
    );
};

const JobsView = ({ onTabChange, onStartChat }: { onTabChange: (tab: Tab) => void, onStartChat: (manager: any) => void }) => {
  const [viewMode, setViewMode] = useState<'browse' | 'saved' | 'applications'>('browse');
  const [selectedJob, setSelectedJob] = useState<any | null>(null);
  const [selectedApp, setSelectedApp] = useState<any | null>(null);
  const [savedJobIds, setSavedJobIds] = useState<number[]>([]);
  const [appliedJobIds, setAppliedJobIds] = useState<number[]>(APPLICATIONS.map(app => app.jobId));
  
  // Filter States
  const [filter, setFilter] = useState<'all' | 'campus'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
      type: 'All', 
      locationType: 'All', 
      city: '',
      eligibility: 'eligible' 
  });

  const toggleSave = (e: React.MouseEvent, id: number) => {
      e.stopPropagation();
      if (savedJobIds.includes(id)) {
          setSavedJobIds(savedJobIds.filter(savedId => savedId !== id));
      } else {
          setSavedJobIds([...savedJobIds, id]);
      }
  };

  const handleShare = (e: React.MouseEvent) => {
      e.stopPropagation();
      alert("Job link copied to clipboard!");
  };

  const filteredJobs = JOBS.filter(job => {
      // Exclude applied jobs from browse view if needed, but standard is to show them with 'Applied' status
      // if (viewMode === 'browse' && appliedJobIds.includes(job.id)) return false;

      // Toggle Filter (All vs Campus)
      if (filter === 'campus' && !job.isCampus) return false;
      
      // Saved Filter
      if (viewMode === 'saved' && !savedJobIds.includes(job.id)) return false;

      // Eligibility Filter
      if (filters.eligibility === 'eligible' && !job.eligible) return false;

      // Panel Filters
      if (filters.type !== 'All' && job.type !== filters.type) return false;
      if (filters.locationType !== 'All') {
          if (filters.locationType === 'Remote' && job.location !== 'Remote') return false;
          if (filters.locationType === 'On-site' && job.location === 'Remote') return false;
      }
      
      // City Filter
      if (filters.city && !job.location?.toLowerCase().includes(filters.city.toLowerCase())) return false;

      return true;
  });

  const clearFilters = () => {
      setFilters({ type: 'All', locationType: 'All', city: '', eligibility: 'eligible' });
      setShowFilters(false);
  };

  const handleApply = (e: React.MouseEvent, id: number) => {
      e.stopPropagation();
      // Simulate API Call with state update
      setAppliedJobIds([...appliedJobIds, id]);
      // Optional: Add to applications list in a real app context
  };

  const handleMessageManager = (manager: any) => {
      onStartChat({ 
          id: manager.id || 'hm_new', 
          name: manager.name, 
          role: manager.role + ' at ' + selectedJob?.company, 
          preview: "Hi, I'm interested in the " + selectedJob?.title + " role.",
          time: 'Just now',
          unread: false
      });
      setSelectedJob(null);
      onTabChange('inbox');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      
      {/* Top Tabs */}
      <div className="flex gap-2 md:gap-6 border-b border-gray-100 pb-1 mb-4 sticky top-0 bg-[#FDFDF5] z-30 pt-2 overflow-x-auto no-scrollbar">
          <button 
            onClick={() => setViewMode('browse')}
            className={`pb-3 text-base md:text-lg font-bold transition-colors relative whitespace-nowrap ${viewMode === 'browse' ? 'text-[#0D1C22]' : 'text-gray-400'}`}
          >
            Explore Jobs
            {viewMode === 'browse' && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#D7F037] rounded-t-full"></div>}
          </button>
          <button 
            onClick={() => setViewMode('saved')}
            className={`pb-3 text-base md:text-lg font-bold transition-colors relative whitespace-nowrap ${viewMode === 'saved' ? 'text-[#0D1C22]' : 'text-gray-400'}`}
          >
            Saved Jobs ({savedJobIds.length})
            {viewMode === 'saved' && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#D7F037] rounded-t-full"></div>}
          </button>
          <button 
            onClick={() => setViewMode('applications')}
            className={`pb-3 text-base md:text-lg font-bold transition-colors relative whitespace-nowrap ${viewMode === 'applications' ? 'text-[#0D1C22]' : 'text-gray-400'}`}
          >
            My Applications
            {viewMode === 'applications' && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#D7F037] rounded-t-full"></div>}
          </button>
      </div>

      {(viewMode === 'browse' || viewMode === 'saved') && (
        <>
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm sticky top-16 z-20">
                <div className="flex gap-2 mb-4">
                    <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input type="text" placeholder="Search jobs, roles, or companies..." className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-lg outline-none focus:ring-2 focus:ring-[#0D1C22] transition-all" />
                    </div>
                    <button 
                        onClick={() => setShowFilters(!showFilters)}
                        className={`px-4 py-3 border rounded-lg hover:bg-gray-50 text-[#0D1C22] flex items-center gap-2 transition-colors ${showFilters || filters.type !== 'All' || filters.locationType !== 'All' || filters.city || filters.eligibility !== 'eligible' ? 'bg-gray-100 border-[#0D1C22]' : 'border-gray-200'}`}
                    >
                        <Filter size={20}/>
                    </button>
                </div>

                {/* Advanced Filters Panel */}
                {showFilters && (
                    <div className="mb-4 p-4 bg-gray-50 rounded-xl border border-gray-100 animate-in slide-in-from-top-2">
                        <div className="flex flex-wrap gap-4">
                            {/* Eligibility Filter */}
                            <div className="w-full md:w-auto min-w-[200px]">
                                <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">Eligibility</label>
                                <div className="flex gap-3">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input 
                                            type="radio" 
                                            name="eligibility" 
                                            value="eligible" 
                                            checked={filters.eligibility === 'eligible'} 
                                            onChange={(e) => setFilters({...filters, eligibility: e.target.value})}
                                            className="accent-[#0D1C22] w-4 h-4"
                                        />
                                        <span className="text-sm font-medium">Eligible for me</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input 
                                            type="radio" 
                                            name="eligibility" 
                                            value="all" 
                                            checked={filters.eligibility === 'all'} 
                                            onChange={(e) => setFilters({...filters, eligibility: e.target.value})}
                                            className="accent-[#0D1C22] w-4 h-4"
                                        />
                                        <span className="text-sm font-medium">All Opportunities</span>
                                    </label>
                                </div>
                            </div>

                            <div className="flex-1 min-w-[150px]">
                                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Job Type</label>
                                <select 
                                    value={filters.type} 
                                    onChange={(e) => setFilters({...filters, type: e.target.value})}
                                    className="w-full p-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#0D1C22]"
                                >
                                    <option>All</option>
                                    <option>Internship</option>
                                    <option>Full-time</option>
                                    <option>Part-time</option>
                                </select>
                            </div>
                            <div className="flex-1 min-w-[150px]">
                                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Location Type</label>
                                <select 
                                    value={filters.locationType}
                                    onChange={(e) => setFilters({...filters, locationType: e.target.value})}
                                    className="w-full p-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#0D1C22]"
                                >
                                    <option>All</option>
                                    <option>On-site</option>
                                    <option>Remote</option>
                                </select>
                            </div>
                            <div className="flex-1 min-w-[150px]">
                                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Specific City</label>
                                <div className="relative">
                                    <MapPin size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input 
                                        type="text"
                                        placeholder="e.g. Bangalore"
                                        value={filters.city}
                                        onChange={(e) => setFilters({...filters, city: e.target.value})}
                                        className="w-full pl-8 pr-2 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#0D1C22]"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end mt-3 border-t border-gray-100 pt-2">
                            <button onClick={clearFilters} className="text-xs font-bold text-red-500 hover:underline">Clear Filters</button>
                        </div>
                    </div>
                )}

                {/* Job Type Toggle */}
                {viewMode === 'browse' && (
                    <div className="flex bg-gray-100 p-1 rounded-lg relative">
                        <div 
                        className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-md shadow-sm transition-all duration-300 ${filter === 'campus' ? 'translate-x-[calc(100%+8px)]' : 'translate-x-0'}`}
                        ></div>
                        <button 
                        onClick={() => setFilter('all')}
                        className={`flex-1 py-2 text-sm font-bold text-center relative z-10 transition-colors ${filter === 'all' ? 'text-[#0D1C22]' : 'text-gray-500'}`}
                        >
                        All Jobs
                        </button>
                        <button 
                        onClick={() => setFilter('campus')}
                        className={`flex-1 py-2 text-sm font-bold text-center relative z-10 transition-colors ${filter === 'campus' ? 'text-[#0D1C22]' : 'text-gray-500'}`}
                        >
                        Campus Hires
                        </button>
                    </div>
                )}
            </div>
            
            <div className="space-y-4">
                {filteredJobs.length > 0 ? (
                filteredJobs.map(job => (
                    <JobCard 
                        key={job.id} 
                        job={job} 
                        onClick={() => setSelectedJob(job)} 
                        onApply={(e) => handleApply(e, job.id)}
                        isSaved={savedJobIds.includes(job.id)}
                        isApplied={appliedJobIds.includes(job.id)}
                        onBookmark={(e) => toggleSave(e, job.id)}
                        onShare={handleShare}
                    />
                ))
                ) : (
                <div className="text-center py-20 text-gray-400">
                    <Briefcase size={48} className="mx-auto mb-4 opacity-20" />
                    <p>{viewMode === 'saved' ? "You haven't saved any jobs yet." : "No jobs found matching your filters."}</p>
                    {viewMode === 'browse' && <button onClick={clearFilters} className="mt-2 text-[#0D1C22] font-bold underline">Clear Filters</button>}
                    {viewMode === 'saved' && <button onClick={() => setViewMode('browse')} className="mt-2 text-[#0D1C22] font-bold underline">Browse Jobs</button>}
                </div>
                )}
            </div>
        </>
      )}

      {/* Expanded Job Modal */}
      {selectedJob && (
          <JobDetailModal 
            job={selectedJob} 
            onClose={() => setSelectedJob(null)} 
            onApply={() => handleApply({ stopPropagation: () => {} } as any, selectedJob.id)} 
            isSaved={savedJobIds.includes(selectedJob.id)}
            isApplied={appliedJobIds.includes(selectedJob.id)}
            onBookmark={() => {
                if (savedJobIds.includes(selectedJob.id)) {
                    setSavedJobIds(savedJobIds.filter(id => id !== selectedJob.id));
                } else {
                    setSavedJobIds([...savedJobIds, selectedJob.id]);
                }
            }}
            onMessage={handleMessageManager}
          />
      )}

      {/* Expanded Application Modal */}
      {selectedApp && (
          <ApplicationDetailModal 
            app={selectedApp}
            onClose={() => setSelectedApp(null)}
          />
      )}

    </div>
  );
};

const ProfileView = ({ onLogout }: { onLogout: () => void }) => {
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [isEditingContact, setIsEditingContact] = useState(false); // Controls Phone/Location
  const [isEditingSocials, setIsEditingSocials] = useState(false);
  const [isEditingGPA, setIsEditingGPA] = useState(false);
  const [isEditingSkills, setIsEditingSkills] = useState(false);
  const [isEditingExperience, setIsEditingExperience] = useState<number | null>(null);
  
  const [isParsingResume, setIsParsingResume] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [newSkill, setNewSkill] = useState('');
  const [profile, setProfile] = useState({
    name: "Arjun Kumar",
    college: "IIT Delhi",
    course: "B.Tech Computer Science",
    batch: "2025",
    cgpa: "9.2",
    headline: "Full Stack Developer | React, Node.js | Final Year Student",
    bio: "Passionate Full Stack Developer with experience in React, Node.js, and Cloud technologies. I enjoy building scalable web applications and solving complex algorithmic problems. Currently looking for SDE roles where I can make an impact.",
    email: "arjun.k@iitd.ac.in",
    phone: "+91 98765 43210",
    location: "New Delhi, India",
    linkedin: "linkedin.com/in/arjun-kumar",
    github: "github.com/arjunk",
    website: "arjunkumar.dev",
    skills: ["React", "TypeScript", "Node.js", "Python", "SQL", "AWS", "Figma", "MongoDB", "Java"],
    resumeName: "Arjun_Kumar_Resume_v2.pdf",
    experience: [
        { 
            id: 1, 
            role: "SDE Intern", 
            company: "Zomato", 
            employmentType: "Internship",
            location: "Bangalore, India",
            locationType: "On-site",
            startDate: "2024-05", 
            endDate: "2024-07",
            description: "Worked on the payments team. Improved transaction success rate by 2%." 
        }
    ]
  });

  const handleAddSkill = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newSkill.trim()) {
      e.preventDefault();
      if (!profile.skills.includes(newSkill.trim())) {
        setProfile({ ...profile, skills: [...profile.skills, newSkill.trim()] });
        setNewSkill('');
      }
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setProfile({ ...profile, skills: profile.skills.filter(s => s !== skillToRemove) });
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          setIsParsingResume(true);
          // Simulate parsing delay
          setTimeout(() => {
              setIsParsingResume(false);
              setProfile(prev => ({
                  ...prev,
                  resumeName: file.name,
                  // Simulate parsed data update if bio was empty (example)
                  bio: prev.bio || "Extracted bio from resume...",
              }));
              alert("Resume parsed successfully! Profile details updated.");
          }, 2000);
      }
  };

  const handleAddExperience = () => {
      const newId = profile.experience.length + 1;
      const maxId = profile.experience.reduce((max, exp) => Math.max(max, exp.id), 0);
      const nextId = maxId + 1;
      setProfile({
          ...profile,
          experience: [...profile.experience, { 
              id: nextId, 
              role: "", 
              company: "", 
              employmentType: "Full-time",
              location: "",
              locationType: "On-site",
              startDate: "",
              endDate: "",
              description: "" 
          }]
      });
      setIsEditingExperience(nextId);
  };

  const handleDeleteExperience = (id: number) => {
      setProfile({
          ...profile,
          experience: profile.experience.filter(exp => exp.id !== id)
      });
  };

  const updateExperience = (id: number, field: string, value: string) => {
      setProfile({
          ...profile,
          experience: profile.experience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
      });
  };

  const formatDate = (dateString: string) => {
      if (!dateString) return "";
      const [year, month] = dateString.split('-');
      const date = new Date(parseInt(year), parseInt(month) - 1);
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in duration-500 pb-10">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-black text-[#0D1C22]">My Profile</h2>
        <button 
            onClick={onLogout}
            className="px-6 py-2 rounded-xl font-bold border border-red-100 bg-red-50 text-red-600 hover:bg-red-100 transition-colors flex items-center gap-2"
        >
            <LogOut size={18} /> Logout
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Main Info */}
        <div className="lg:col-span-2 space-y-8">
            
            {/* Header Card */}
            <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm relative overflow-hidden">
                <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="relative group shrink-0">
                        <div className="w-28 h-28 rounded-full bg-[#D7F037] flex items-center justify-center text-4xl font-bold text-[#0D1C22] border-4 border-white shadow-lg overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2680&auto=format&fit=crop" alt="Profile" className="w-full h-full object-cover" />
                        </div>
                    </div>
                    <div className="flex-1 w-full">
                        <div>
                            <h3 className="text-3xl font-bold text-[#0D1C22]">{profile.name}</h3>
                            <p className="text-lg text-gray-500 font-medium mt-1">{profile.headline}</p>
                            <div className="flex items-center gap-2 mt-3 text-sm text-gray-400 font-medium">
                                <MapPin size={14} /> {profile.location}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 relative group/bio">
                    <div className="flex justify-between items-center mb-3">
                        <h4 className="font-bold text-[#0D1C22]">About</h4>
                        <button onClick={() => setIsEditingBio(!isEditingBio)} className="text-gray-400 hover:text-[#0D1C22] opacity-0 group-hover/bio:opacity-100 transition-opacity">
                            {isEditingBio ? <Check size={16}/> : <Edit2 size={16} />}
                        </button>
                    </div>
                    
                    {isEditingBio ? (
                        <textarea 
                            value={profile.bio}
                            onChange={(e) => setProfile({...profile, bio: e.target.value})}
                            className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0D1C22] min-h-[120px] text-gray-700 leading-relaxed"
                            placeholder="Tell recruiters about yourself..."
                        />
                    ) : (
                        <p className="text-gray-600 leading-relaxed">
                            {profile.bio}
                        </p>
                    )}
                </div>
            </div>

            {/* Academic Details */}
            <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
                <h4 className="font-bold text-xl text-[#0D1C22] mb-6 flex items-center gap-2">
                    <Building size={20} className="text-gray-400" /> Academic Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">College</p>
                        <p className="font-bold text-[#0D1C22] text-lg">{profile.college}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Course</p>
                        <p className="font-bold text-[#0D1C22] text-lg">{profile.course}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Batch</p>
                        <p className="font-bold text-[#0D1C22] text-lg">{profile.batch}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 relative group/gpa">
                        <div className="flex justify-between items-start">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">CGPA</p>
                            <button onClick={() => setIsEditingGPA(!isEditingGPA)} className="text-gray-400 hover:text-[#0D1C22] opacity-0 group-hover/gpa:opacity-100 transition-opacity">
                                {isEditingGPA ? <Check size={14}/> : <Edit2 size={14} />}
                            </button>
                        </div>
                        {isEditingGPA ? (
                            <input 
                                type="text" 
                                value={profile.cgpa}
                                onChange={(e) => setProfile({...profile, cgpa: e.target.value})}
                                className="w-full bg-white px-2 py-1 rounded border border-gray-200 font-bold text-[#0D1C22] text-lg"
                            />
                        ) : (
                            <p className="font-bold text-[#0D1C22] text-lg">{profile.cgpa}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Resume - Moved UP */}
            <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h4 className="font-bold text-xl text-[#0D1C22] flex items-center gap-2">
                        <FileText size={20} className="text-gray-400" /> Resume
                    </h4>
                    <button 
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isParsingResume}
                        className="text-blue-600 font-bold text-sm hover:underline disabled:opacity-50"
                    >
                        {isParsingResume ? 'Parsing...' : 'Update / Upload'}
                    </button>
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept=".pdf,.doc,.docx"
                        onChange={handleResumeUpload}
                    />
                </div>
                <div className="flex items-center gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-200">
                    <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center shrink-0">
                        {isParsingResume ? <Loader2 size={24} className="animate-spin" /> : <FileText size={24} />}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-bold text-[#0D1C22] text-sm truncate">
                            {isParsingResume ? "Uploading & Parsing..." : profile.resumeName}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                            {isParsingResume ? "AI is extracting your details..." : "Uploaded just now • 1.2 MB"}
                        </p>
                    </div>
                    <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors text-gray-500">
                        <ExternalLink size={20} />
                    </button>
                </div>
            </div>

            {/* Experience Section */}
            <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h4 className="font-bold text-xl text-[#0D1C22] flex items-center gap-2">
                        <Briefcase size={20} className="text-gray-400" /> Experience
                    </h4>
                    <button 
                        onClick={handleAddExperience}
                        className="text-[#0D1C22] bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors"
                    >
                        <Plus size={16}/>
                    </button>
                </div>
                <div className="space-y-6">
                    {profile.experience.map((exp) => (
                        <div key={exp.id} className={`relative group/exp ${isEditingExperience === exp.id ? 'bg-gray-50 p-6 rounded-2xl border border-gray-200' : 'pl-4 border-l-2 border-gray-100 pb-2'}`}>
                            {isEditingExperience !== exp.id && (
                                <div className="absolute top-0 right-0 flex gap-2 opacity-0 group-hover/exp:opacity-100 transition-opacity">
                                    <button onClick={() => setIsEditingExperience(exp.id)} className="p-1.5 text-gray-400 hover:text-[#0D1C22]">
                                        <Edit2 size={14} />
                                    </button>
                                    <button onClick={() => handleDeleteExperience(exp.id)} className="p-1.5 text-gray-400 hover:text-red-500">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            )}

                            {isEditingExperience === exp.id ? (
                                <div className="space-y-5">
                                    {/* Title */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Title</label>
                                        <input 
                                            value={exp.role} 
                                            onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                                            className="w-full p-3 rounded-xl border border-gray-200 bg-white font-bold text-[#0D1C22] focus:outline-none focus:ring-2 focus:ring-[#0D1C22] placeholder:text-gray-300" 
                                            placeholder="Ex: Retail Sales Manager"
                                        />
                                    </div>

                                    {/* Employment Type */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Employment Type</label>
                                        <select 
                                            value={exp.employmentType}
                                            onChange={(e) => updateExperience(exp.id, 'employmentType', e.target.value)}
                                            className="w-full p-3 rounded-xl border border-gray-200 bg-white text-[#0D1C22] focus:outline-none focus:ring-2 focus:ring-[#0D1C22] cursor-pointer"
                                        >
                                            <option>Full-time</option>
                                            <option>Part-time</option>
                                            <option>Self-employed</option>
                                            <option>Freelance</option>
                                            <option>Internship</option>
                                            <option>Trainee</option>
                                        </select>
                                    </div>

                                    {/* Company */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Company name</label>
                                        <input 
                                            value={exp.company} 
                                            onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                                            className="w-full p-3 rounded-xl border border-gray-200 bg-white text-[#0D1C22] focus:outline-none focus:ring-2 focus:ring-[#0D1C22] placeholder:text-gray-300" 
                                            placeholder="Ex: Microsoft"
                                        />
                                    </div>

                                    {/* Location & Location Type */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Location</label>
                                            <input 
                                                value={exp.location} 
                                                onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                                                className="w-full p-3 rounded-xl border border-gray-200 bg-white text-[#0D1C22] focus:outline-none focus:ring-2 focus:ring-[#0D1C22] placeholder:text-gray-300" 
                                                placeholder="Ex: London, UK"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Location Type</label>
                                            <select 
                                                value={exp.locationType}
                                                onChange={(e) => updateExperience(exp.id, 'locationType', e.target.value)}
                                                className="w-full p-3 rounded-xl border border-gray-200 bg-white text-[#0D1C22] focus:outline-none focus:ring-2 focus:ring-[#0D1C22] cursor-pointer"
                                            >
                                                <option>On-site</option>
                                                <option>Hybrid</option>
                                                <option>Remote</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Dates */}
                                    <div className="grid grid-cols-2 gap-4">
                                         <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Start Date</label>
                                            <input 
                                                type="month"
                                                value={exp.startDate} 
                                                onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                                                className="w-full p-3 rounded-xl border border-gray-200 bg-white text-[#0D1C22] focus:outline-none focus:ring-2 focus:ring-[#0D1C22]" 
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">End Date</label>
                                            <input 
                                                type="month"
                                                value={exp.endDate} 
                                                onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                                                className="w-full p-3 rounded-xl border border-gray-200 bg-white text-[#0D1C22] focus:outline-none focus:ring-2 focus:ring-[#0D1C22]" 
                                            />
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description</label>
                                        <textarea 
                                            value={exp.description} 
                                            onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                                            className="w-full p-3 rounded-xl border border-gray-200 bg-white text-[#0D1C22] focus:outline-none focus:ring-2 focus:ring-[#0D1C22] min-h-[100px] placeholder:text-gray-300" 
                                            placeholder="Ex: Responsible for..."
                                        />
                                    </div>
                                    
                                    <div className="flex gap-3">
                                        <button 
                                            onClick={() => setIsEditingExperience(null)}
                                            className="flex-1 py-3 bg-[#0D1C22] text-white font-bold rounded-xl hover:bg-gray-900 transition-colors shadow-lg"
                                        >
                                            Save
                                        </button>
                                        {/* Optional Delete Button inside edit mode */}
                                        <button 
                                            onClick={() => handleDeleteExperience(exp.id)}
                                            className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors border border-red-100"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <h5 className="font-bold text-[#0D1C22] text-lg">{exp.role}</h5>
                                    <div className="text-sm text-gray-600 font-medium mt-0.5 flex flex-wrap items-center gap-1">
                                        <span>{exp.company}</span>
                                        {exp.employmentType && <span className="text-gray-400">• {exp.employmentType}</span>}
                                    </div>
                                    
                                    <div className="flex flex-wrap items-center gap-x-2 text-xs text-gray-400 mt-1">
                                        <span>{formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}</span>
                                        {exp.location && (
                                            <>
                                                <span>•</span>
                                                <span>{exp.location}</span>
                                            </>
                                        )}
                                        {exp.locationType && <span>({exp.locationType})</span>}
                                    </div>

                                    {exp.description && (
                                        <p className="text-sm text-gray-500 leading-relaxed mt-3 whitespace-pre-wrap">{exp.description}</p>
                                    )}
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm group/skills relative">
                <div className="flex justify-between items-center mb-6">
                    <h4 className="font-bold text-xl text-[#0D1C22] flex items-center gap-2">
                        <CheckCircle2 size={20} className="text-gray-400" /> Skills
                    </h4>
                    <button onClick={() => setIsEditingSkills(!isEditingSkills)} className="text-gray-400 hover:text-[#0D1C22] opacity-0 group-hover/skills:opacity-100 transition-opacity">
                        {isEditingSkills ? <Check size={18}/> : <Edit2 size={18} />}
                    </button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {profile.skills.map(skill => (
                        <span key={skill} className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 flex items-center gap-2 group">
                            {skill}
                            {isEditingSkills && (
                                <button onClick={() => removeSkill(skill)} className="text-gray-400 hover:text-red-500 transition-colors">
                                    <X size={14} />
                                </button>
                            )}
                        </span>
                    ))}
                    {isEditingSkills && (
                        <input 
                            type="text" 
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            onKeyDown={handleAddSkill}
                            placeholder="+ Add skill" 
                            className="px-4 py-2 bg-white border border-dashed border-gray-300 rounded-xl text-sm outline-none focus:border-[#0D1C22] focus:ring-1 focus:ring-[#0D1C22] min-w-[100px]"
                        />
                    )}
                </div>
            </div>
        </div>

        {/* Right Column: Contact & Socials */}
        <div className="space-y-8">
            <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm relative group/contact">
                <div className="flex justify-between items-center mb-6">
                    <h4 className="font-bold text-lg text-[#0D1C22]">Contact Info</h4>
                    <button onClick={() => setIsEditingContact(!isEditingContact)} className="text-gray-400 hover:text-[#0D1C22] opacity-0 group-hover/contact:opacity-100 transition-opacity">
                        {isEditingContact ? <Check size={16}/> : <Edit2 size={16} />}
                    </button>
                </div>
                <div className="space-y-5">
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Email</p>
                        <div className="flex items-center gap-3 text-gray-700 font-medium break-all bg-gray-50 p-2 rounded-lg border border-transparent">
                            <Mail size={18} className="shrink-0 text-gray-400" /> {profile.email}
                        </div>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Phone</p>
                        {isEditingContact ? (
                            <input 
                                type="tel" 
                                value={profile.phone} 
                                onChange={(e) => setProfile({...profile, phone: e.target.value})}
                                className="w-full bg-white px-3 py-2 rounded-lg border border-gray-200 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-[#0D1C22]"
                            />
                        ) : (
                            <div className="flex items-center gap-3 text-gray-700 font-medium p-2">
                                <Phone size={18} className="shrink-0 text-gray-400" /> {profile.phone}
                            </div>
                        )}
                    </div>
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Location</p>
                        {isEditingContact ? (
                            <input 
                                type="text" 
                                value={profile.location} 
                                onChange={(e) => setProfile({...profile, location: e.target.value})}
                                className="w-full bg-white px-3 py-2 rounded-lg border border-gray-200 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-[#0D1C22]"
                            />
                        ) : (
                            <div className="flex items-center gap-3 text-gray-700 font-medium p-2">
                                <MapPin size={18} className="shrink-0 text-gray-400" /> {profile.location}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm group/socials relative">
                <div className="flex justify-between items-center mb-6">
                    <h4 className="font-bold text-lg text-[#0D1C22]">Social Links</h4>
                    <button onClick={() => setIsEditingSocials(!isEditingSocials)} className="text-gray-400 hover:text-[#0D1C22] opacity-0 group-hover/socials:opacity-100 transition-opacity">
                        {isEditingSocials ? <Check size={16}/> : <Edit2 size={16} />}
                    </button>
                </div>
                <div className="space-y-5">
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">LinkedIn</p>
                        {isEditingSocials ? (
                            <input 
                                type="text" 
                                value={profile.linkedin} 
                                onChange={(e) => setProfile({...profile, linkedin: e.target.value})}
                                className="w-full bg-white px-3 py-2 rounded-lg border border-gray-200 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-[#0D1C22]"
                            />
                        ) : (
                            <a href={`https://${profile.linkedin}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-blue-600 font-bold hover:underline">
                                <Linkedin size={18} className="shrink-0" /> {profile.linkedin.replace('linkedin.com/in/', '')}
                            </a>
                        )}
                    </div>
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">GitHub</p>
                        {isEditingSocials ? (
                            <input 
                                type="text" 
                                value={profile.github} 
                                onChange={(e) => setProfile({...profile, github: e.target.value})}
                                className="w-full bg-white px-3 py-2 rounded-lg border border-gray-200 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-[#0D1C22]"
                            />
                        ) : (
                            <a href={`https://${profile.github}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-800 font-bold hover:underline">
                                <Github size={18} className="shrink-0" /> {profile.github.replace('github.com/', '')}
                            </a>
                        )}
                    </div>
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Portfolio</p>
                        {isEditingSocials ? (
                            <input 
                                type="text" 
                                value={profile.website} 
                                onChange={(e) => setProfile({...profile, website: e.target.value})}
                                className="w-full bg-white px-3 py-2 rounded-lg border border-gray-200 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-[#0D1C22]"
                            />
                        ) : (
                            <a href={`https://${profile.website}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-[#0D1C22] font-bold hover:underline">
                                <Globe size={18} className="shrink-0" /> {profile.website}
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard: React.FC<DashboardProps> = ({ onLogout, currentTab, onTabChange }) => {
  const userName = "Arjun Kumar";
  const [activeChats, setActiveChats] = useState<any[]>(MESSAGES); // Initialize with mock messages

  const handleStartChat = (manager: any) => {
      // Check if chat already exists
      const existingChat = activeChats.find(chat => chat.id === manager.id);
      
      if (!existingChat) {
          // Add new chat to the top of the list
          setActiveChats([manager, ...activeChats]);
      }
      // If it exists, it will just show in the inbox view based on state we'd manage there
      // For this simplified version, we just switch tabs and let the Inbox view render the list
      onTabChange('inbox');
  };

  const navItems = [
    { id: 'feed', icon: Home, label: 'Home' },
    { id: 'jobs', icon: Briefcase, label: 'Jobs' },
    { id: 'events', icon: Calendar, label: 'Events' },
    { id: 'inbox', icon: MessageCircle, label: 'Inbox' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar - Desktop Only */}
        <aside className="hidden md:block w-64 shrink-0">
          <nav className="sticky top-24 space-y-2 bg-gray-50/50 p-3 rounded-3xl border border-gray-100/50 backdrop-blur-sm">
            {navItems.map((item) => (
               <button 
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-200 ${currentTab === item.id ? 'bg-[#0D1C22] text-white shadow-lg shadow-gray-200' : 'text-gray-500 hover:bg-white hover:text-[#0D1C22]'}`}
               >
                  <item.icon size={22} strokeWidth={currentTab === item.id ? 2.5 : 2} /> 
                  <span className="font-bold text-base hidden md:block">{item.label}</span>
                  {currentTab === item.id && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#D7F037] hidden md:block"></div>}
               </button>
            ))}
          </nav>
        </aside>

        {/* Bottom Navigation - Mobile Only */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 z-50 flex justify-between items-center pb-[env(safe-area-inset-bottom)]">
            {navItems.map((item) => (
               <button 
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex flex-col items-center gap-1 transition-all duration-200 ${currentTab === item.id ? 'text-[#0D1C22]' : 'text-gray-400'}`}
               >
                  <item.icon size={24} strokeWidth={currentTab === item.id ? 2.5 : 2} /> 
                  <span className={`text-[10px] font-bold ${currentTab === item.id ? 'text-[#0D1C22]' : 'text-gray-400'}`}>{item.label}</span>
               </button>
            ))}
        </div>

        {/* Main Content */}
        <main className="flex-1 min-w-0 pb-24 md:pb-0">
           {currentTab === 'feed' && <FeedView setTab={onTabChange} userName={userName} />}
           
           {currentTab === 'jobs' && <JobsView onTabChange={onTabChange} onStartChat={handleStartChat} />}
           
           {currentTab === 'events' && (
              <div className="space-y-6 animate-in fade-in duration-500">
                  <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-3xl font-black text-[#0D1C22]">Events</h2>
                        <p className="text-gray-500 font-medium">Upcoming drives and sessions.</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                     {INITIAL_EVENTS.map(event => <EventCard key={event.id} event={event} />)}
                  </div>
              </div>
           )}

           {currentTab === 'inbox' && (
              <div className="flex h-[calc(100vh-140px)] bg-white rounded-[2.5rem] border border-gray-100 shadow-sm animate-in fade-in duration-500 overflow-hidden">
                {activeChats.length > 0 ? (
                    <>
                        {/* Chat Sidebar */}
                        <div className="w-full md:w-80 border-r border-gray-100 flex flex-col">
                            <div className="p-6 border-b border-gray-100">
                                <h2 className="text-2xl font-black text-[#0D1C22]">Messages</h2>
                            </div>
                            <div className="flex-1 overflow-y-auto">
                                {activeChats.map((msg, i) => (
                                    <div key={i} className={`p-4 flex gap-4 hover:bg-gray-50 cursor-pointer border-b border-gray-50 transition-colors ${i === 0 ? 'bg-gray-50 border-l-4 border-l-[#0D1C22]' : ''}`}>
                                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700 shrink-0">
                                            {msg.name[0]}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-baseline mb-1">
                                                <h4 className="font-bold text-[#0D1C22] truncate">{msg.name}</h4>
                                                <span className="text-[10px] text-gray-400 shrink-0">{msg.time}</span>
                                            </div>
                                            <p className="text-xs text-gray-500 truncate">{msg.preview}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Chat Area (Empty state or active chat) */}
                        <div className="hidden md:flex flex-1 flex-col bg-[#FDFDF5]/50">
                             {/* Header */}
                             <div className="p-4 bg-white border-b border-gray-100 flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700">
                                    {activeChats[0].name[0]}
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#0D1C22]">{activeChats[0].name}</h4>
                                    <p className="text-xs text-gray-500">{activeChats[0].role}</p>
                                </div>
                             </div>
                             
                             {/* Messages */}
                             <div className="flex-1 p-6 space-y-4 overflow-y-auto">
                                 {activeChats[0].id.includes('hm') ? (
                                     // New Chat Template
                                     <>
                                        <div className="flex justify-center my-4">
                                            <span className="text-[10px] bg-gray-100 text-gray-500 px-3 py-1 rounded-full">Today</span>
                                        </div>
                                        <div className="flex justify-end">
                                            <div className="bg-[#0D1C22] text-white px-5 py-3 rounded-2xl rounded-tr-sm max-w-[80%] shadow-sm">
                                                {activeChats[0].preview}
                                            </div>
                                        </div>
                                     </>
                                 ) : (
                                     // Existing Chat Mock
                                     <>
                                        <div className="flex justify-start">
                                            <div className="bg-white border border-gray-100 px-5 py-3 rounded-2xl rounded-tl-sm max-w-[80%] shadow-sm text-gray-800">
                                                Hello! Thanks for applying. We are reviewing your profile.
                                            </div>
                                        </div>
                                        <div className="flex justify-end">
                                            <div className="bg-[#0D1C22] text-white px-5 py-3 rounded-2xl rounded-tr-sm max-w-[80%] shadow-sm">
                                                Thank you! Looking forward to hearing from you.
                                            </div>
                                        </div>
                                     </>
                                 )}
                             </div>

                             {/* Input */}
                             <div className="p-4 bg-white border-t border-gray-100">
                                <div className="flex gap-3 bg-gray-50 p-2 rounded-2xl border border-gray-200">
                                    <input type="text" placeholder="Type a message..." className="flex-1 bg-transparent px-3 outline-none text-sm font-medium" />
                                    <button className="bg-[#0D1C22] text-white p-2 rounded-xl hover:bg-black transition-colors">
                                        <Send size={18} />
                                    </button>
                                </div>
                             </div>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center w-full h-full">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                        <MessageCircle size={32} className="text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-black text-[#0D1C22]">No Messages Yet</h3>
                        <p className="text-gray-500 font-medium mt-1">Start applying to jobs to connect with recruiters.</p>
                        <button 
                            onClick={() => onTabChange('jobs')} 
                            className="mt-8 px-8 py-3 bg-[#0D1C22] text-white font-bold rounded-xl hover:bg-black transition-colors"
                        >
                            Browse Jobs
                        </button>
                    </div>
                )}
             </div>
           )}

           {currentTab === 'profile' && <ProfileView onLogout={onLogout} />}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
