import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  MessageSquare, 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal,
  MapPin, 
  Clock, 
  Download, 
  ChevronRight, 
  Bell, 
  User, 
  CheckCircle2, 
  X, 
  ArrowLeft, 
  Home, 
  Image as ImageIcon, 
  Video, 
  ThumbsUp, 
  Share2, 
  Lock, 
  Globe, 
  Laptop, 
  Building2, 
  DollarSign, 
  Upload, 
  FileText, 
  Trash2, 
  Briefcase as BriefcaseIcon, 
  Mail, 
  Save, 
  ArrowUpRight, 
  Eye, 
  Check, 
  LogOut, 
  Calendar as CalendarIcon, 
  Phone, 
  Github, 
  Linkedin, 
  ExternalLink, 
  GraduationCap, 
  ChevronDown, 
  Send
} from 'lucide-react';

type Tab = 'feed' | 'overview' | 'jobs' | 'candidates' | 'messages' | 'profile';

interface EmployerDashboardProps {
  onLogout: () => void;
  currentTab: string;
  onTabChange: (tab: any) => void;
}

// --- Mock Data ---
const INITIAL_CANDIDATES = [
  { 
      id: 1, 
      name: "Arjun Kumar", 
      college: "IIT Delhi", 
      course: "B.Tech CSE", 
      batch: "2025", 
      skills: ["React", "Node.js", "Python", "SQL", "AWS"], 
      gpa: "9.2", 
      status: "Applied",
      appliedFor: 1, // Job ID
      email: "arjun.k@iitd.ac.in",
      phone: "+91 98765 43210",
      location: "New Delhi, India",
      about: "Passionate Full Stack Developer with experience in React, Node.js, and Cloud technologies. I enjoy building scalable web applications.",
      experience: [
          { role: "SDE Intern", company: "Zomato", duration: "May 2024 - July 2024", desc: "Optimized payment gateway latency by 15%." }
      ],
      projects: [
          { title: "E-Commerce Microservices", desc: "Built using Spring Boot and Kafka." }
      ]
  },
  { 
      id: 2, 
      name: "Priya Sharma", 
      college: "NIT Trichy", 
      course: "B.Tech ECE", 
      batch: "2025", 
      skills: ["Java", "Spring Boot", "AWS", "Docker"], 
      gpa: "8.8", 
      status: "Open", // Not applied yet
      appliedFor: null,
      email: "priya.s@nitt.edu",
      phone: "+91 98765 43211",
      location: "Trichy, India",
      about: "Backend enthusiast with strong command over Data Structures and Algorithms.",
      experience: [],
      projects: [
          { title: "Smart Traffic System", desc: "IoT based project using Raspberry Pi." }
      ]
  },
  { id: 3, name: "Rohan Gupta", college: "BITS Pilani", course: "B.E. CSE", batch: "2024", skills: ["Figma", "UI/UX", "Frontend"], gpa: "8.5", status: "Interviewed", appliedFor: 1, email: "rohan@bits.ac.in", phone: "+91 91234 56789", location: "Pilani", about: "Designer who codes.", experience: [], projects: [] },
  { id: 4, name: "Sneha Reddy", college: "Anna University", course: "B.Tech IT", batch: "2025", skills: ["Python", "Django", "SQL"], gpa: "9.0", status: "Applied", appliedFor: 2, email: "sneha@annauniv.edu", phone: "+91 99887 76655", location: "Chennai", about: "Aspiring Data Engineer.", experience: [], projects: [] },
  { id: 5, name: "Vikram Singh", college: "IIT Bombay", course: "B.Tech Mech", batch: "2025", skills: ["SolidWorks", "Python", "ML"], gpa: "9.5", status: "Applied", appliedFor: 1, email: "vikram@iitb.ac.in", phone: "+91 88776 65544", location: "Mumbai", about: "Mechanical engineer pivoting to Robotics.", experience: [], projects: [] },
];

const JOBS_DATA = [
  { id: 1, title: "SDE-1 (Frontend)", location: "Bangalore", type: "Full-time", applicants: 145, status: "Active", posted: "2 days ago", deadline: "2024-11-15", duration: null },
  { id: 2, title: "Product Design Intern", location: "Remote", type: "Internship", applicants: 89, status: "Active", posted: "5 days ago", deadline: "2024-11-20", duration: "6 Months" },
  { id: 3, title: "Backend Developer", location: "Gurgaon", type: "Full-time", applicants: 230, status: "Closed", posted: "2 weeks ago", deadline: "2024-10-30", duration: null },
];

const FEED_POSTS = [
  { id: 1, author: "Placement Cell, NIT Trichy", role: "University Partner", content: "We are happy to announce that our placement season for Batch 2025 starts next week. We welcome our hiring partners to book their slots.", likes: 142, comments: 12, time: "2h ago", avatarColor: "bg-purple-100 text-purple-700" },
  { id: 2, author: "Arjun Kumar", role: "Student at IIT Delhi", content: "Excited to share that I've been shortlisted for the final round at Microsoft! Thanks to the resources shared on this platform.", likes: 89, comments: 24, time: "5h ago", avatarColor: "bg-blue-100 text-blue-700" },
];

// --- Sub-Components ---

const CandidateDetailModal: React.FC<{ 
    candidate: any, 
    jobs: any[],
    onClose: () => void,
    onShortlist: (jobId: number) => void,
    onMessage: () => void
}> = ({ candidate, jobs, onClose, onShortlist, onMessage }) => {
    const [isShortlistOpen, setIsShortlistOpen] = useState(false);

    if (!candidate) return null;

    const activeJobs = Array.isArray(jobs) ? jobs.filter(j => j.status === 'Active') : [];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-[2rem] w-full max-w-5xl max-h-[95vh] overflow-y-auto relative animate-in slide-in-from-bottom-8 duration-300 shadow-2xl flex flex-col md:flex-row">
                <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 z-10">
                   <X size={24} />
                </button>

                {/* Left Sidebar: Basic Info */}
                <div className="w-full md:w-80 bg-gray-50 p-8 border-r border-gray-100 shrink-0">
                    <div className="flex flex-col items-center text-center mb-6">
                        <div className="w-32 h-32 rounded-full bg-[#D7F037] flex items-center justify-center text-4xl font-bold text-[#0D1C22] border-4 border-white shadow-lg mb-4">
                            {candidate.name?.[0]}
                        </div>
                        <h2 className="text-2xl font-black text-[#0D1C22]">{candidate.name}</h2>
                        <p className="text-sm text-gray-500 font-medium mt-1">{candidate.course}</p>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">{candidate.college}</p>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-white p-4 rounded-xl border border-gray-200">
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Current Status</p>
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${candidate.status === 'Shortlisted' ? 'bg-blue-100 text-blue-700' : candidate.status === 'Interviewed' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'}`}>
                                {candidate.status}
                            </span>
                        </div>
                        
                        <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-3">
                            <div className="flex items-center gap-3 text-sm font-medium text-gray-600">
                                <Mail size={16} /> {candidate.email}
                            </div>
                            <div className="flex items-center gap-3 text-sm font-medium text-gray-600">
                                <Phone size={16} /> {candidate.phone}
                            </div>
                            <div className="flex items-center gap-3 text-sm font-medium text-gray-600">
                                <MapPin size={16} /> {candidate.location}
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button className="flex-1 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                                <Linkedin size={18} />
                            </button>
                            <button className="flex-1 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                                <Github size={18} />
                            </button>
                            <button className="flex-1 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                                <Globe size={18} />
                            </button>
                        </div>
                        
                        <button 
                            onClick={onMessage}
                            className="w-full py-3 bg-[#0D1C22] text-white font-bold rounded-xl hover:bg-black transition-colors shadow-lg flex items-center justify-center gap-2"
                        >
                            <MessageSquare size={18} /> Message
                        </button>
                    </div>
                </div>

                {/* Right Content: Details */}
                <div className="flex-1 p-8 md:p-10 space-y-8">
                    
                    {/* About */}
                    <section>
                        <h3 className="text-lg font-bold text-[#0D1C22] mb-3 flex items-center gap-2">
                            <User size={20} className="text-gray-400" /> About
                        </h3>
                        <p className="text-gray-600 leading-relaxed bg-white p-0">
                            {candidate.about}
                        </p>
                    </section>

                    <div className="h-px bg-gray-100 w-full"></div>

                    {/* Academic & Skills Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <section>
                            <h3 className="text-lg font-bold text-[#0D1C22] mb-4 flex items-center gap-2">
                                <Building2 size={20} className="text-gray-400" /> Academics
                            </h3>
                            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-500 font-medium">Batch</span>
                                    <span className="text-sm font-bold text-[#0D1C22]">{candidate.batch}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-500 font-medium">Degree</span>
                                    <span className="text-sm font-bold text-[#0D1C22]">{candidate.course}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-500 font-medium">CGPA</span>
                                    <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">{candidate.gpa}</span>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-lg font-bold text-[#0D1C22] mb-4 flex items-center gap-2">
                                <CheckCircle2 size={20} className="text-gray-400" /> Skills
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {Array.isArray(candidate.skills) && candidate.skills.map((skill: string) => (
                                    <span key={skill} className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-lg shadow-sm">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Experience Section */}
                    {candidate.experience && candidate.experience.length > 0 && (
                        <>
                        <div className="h-px bg-gray-100 w-full"></div>
                        <section>
                            <h3 className="text-lg font-bold text-[#0D1C22] mb-4 flex items-center gap-2">
                                <BriefcaseIcon size={20} className="text-gray-400" /> Experience
                            </h3>
                            <div className="space-y-4">
                                {candidate.experience.map((exp: any, index: number) => (
                                    <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                        <div className="mt-1">
                                            <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-500 shadow-sm">
                                                <BriefcaseIcon size={18} />
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-[#0D1C22]">{exp.role}</h4>
                                            <div className="flex items-center gap-2 text-sm text-gray-500 font-medium mt-0.5">
                                                <span className="text-[#0D1C22]">{exp.company}</span>
                                                <span>•</span>
                                                <span>{exp.duration}</span>
                                            </div>
                                            {exp.desc && <p className="text-sm text-gray-600 mt-2 leading-relaxed">{exp.desc}</p>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                        </>
                    )}

                    <div className="h-px bg-gray-100 w-full"></div>

                    {/* Resume Section */}
                    <section>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-[#0D1C22] flex items-center gap-2">
                                <FileText size={20} className="text-gray-400" /> Resume
                            </h3>
                            <button className="text-blue-600 font-bold text-sm hover:underline flex items-center gap-1">
                                Download <Download size={14} />
                            </button>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-200 hover:border-[#0D1C22] transition-colors cursor-pointer group">
                            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center shrink-0">
                                <FileText size={24} />
                            </div>
                            <div className="flex-1">
                                <p className="font-bold text-[#0D1C22] text-sm group-hover:text-blue-600 transition-colors">
                                    {candidate.name?.replace(' ', '_') || 'Resume'}_Resume.pdf
                                </p>
                                <p className="text-xs text-gray-400 mt-1">Uploaded 5 days ago</p>
                            </div>
                            <ExternalLink size={18} className="text-gray-400 group-hover:text-[#0D1C22]" />
                        </div>
                    </section>

                    {/* Actions Footer */}
                    <div className="flex gap-4 pt-4">
                        <button className="flex-1 py-3 border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 font-bold rounded-xl transition-colors">
                            Reject
                        </button>
                        
                        <div className="relative flex-1">
                            <button 
                                onClick={() => setIsShortlistOpen(!isShortlistOpen)}
                                className="w-full py-3 bg-[#D7F037] text-[#0D1C22] font-bold rounded-xl hover:bg-[#c5dc33] transition-colors shadow-md flex items-center justify-center gap-2"
                            >
                                {candidate.status === 'Shortlisted' ? 'Update Status' : 'Shortlist Candidate'}
                                <ChevronDown size={18} />
                            </button>
                            
                            {isShortlistOpen && (
                                <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-2 z-20">
                                    <div className="p-3 bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                        Select Job
                                    </div>
                                    <div className="max-h-48 overflow-y-auto">
                                        {activeJobs.map(job => (
                                            <button 
                                                key={job.id}
                                                onClick={() => {
                                                    onShortlist(job.id);
                                                    setIsShortlistOpen(false);
                                                }}
                                                className="w-full text-left px-4 py-3 hover:bg-gray-50 text-sm font-medium text-gray-700 flex justify-between items-center"
                                            >
                                                {job.title}
                                                {candidate.appliedFor === job.id && candidate.status === 'Shortlisted' && <Check size={14} className="text-green-600" />}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

const EmployerDashboard: React.FC<EmployerDashboardProps> = ({ onLogout, currentTab, onTabChange }) => {
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<any | null>(null);
  const [showPostJobModal, setShowPostJobModal] = useState(false);
  const [activeConversationId, setActiveConversationId] = useState<number | null>(null);
  const [jobs, setJobs] = useState(JOBS_DATA);
  const [candidates, setCandidates] = useState(INITIAL_CANDIDATES);

  // --- Profile State ---
  const [profile, setProfile] = useState({
      name: "Sneha Reddy",
      designation: "Senior Technical Recruiter",
      companyName: "Swiggy",
      email: "sneha.reddy@swiggy.in",
      companyEmail: "careers@swiggy.in",
      location: "Bangalore, India",
      about: "Recruiting top talent for Swiggy's engineering and product teams."
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // --- Post Job Form State ---
  const [jobForm, setJobForm] = useState({
      title: '',
      type: 'Full-time', // Full-time, Internship, Contract
      locationType: 'On-site', // On-site, Remote, Hybrid
      location: '',
      salaryMin: '',
      salaryMax: '',
      currency: 'INR',
      description: '',
      duration: '3 Months',
      // Skills
      skillInput: '',
      skills: [] as string[],
      // Eligibility
      eligibility: [] as string[], // 'final_year', 'pre_final'
      // Hiring Process
      interviewRounds: '3',
      hasAssignment: false,
      assignmentFile: null as File | null,
      // Hiring Scope (Premium)
      hiringScope: 'all', // 'all', 'specific'
      selectedCampuses: [] as string[],
      // Closing
      closingDate: '',
      closingTime: ''
  });

  const handlePostJob = (e: React.FormEvent) => {
      e.preventDefault();
      const newJob = {
          id: jobs.length + 1,
          title: jobForm.title,
          location: jobForm.locationType === 'Remote' ? 'Remote' : jobForm.location,
          type: jobForm.type,
          applicants: 0,
          status: 'Active',
          posted: 'Just now',
          deadline: jobForm.closingDate,
          duration: jobForm.type === 'Internship' ? jobForm.duration : null
      };
      setJobs([newJob, ...jobs]);
      setShowPostJobModal(false);
      onTabChange('jobs');
  };

  const handleAddSkill = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && jobForm.skillInput.trim()) {
      e.preventDefault();
      if (!jobForm.skills.includes(jobForm.skillInput.trim())) {
        setJobForm(prev => ({ ...prev, skills: [...prev.skills, prev.skillInput.trim()], skillInput: '' }));
      }
    }
  };

  const removeSkill = (skillToRemove: string) => {
      setJobForm(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skillToRemove) }));
  };

  const toggleEligibility = (year: string) => {
      setJobForm(prev => {
          const current = prev.eligibility;
          if (current.includes(year)) {
              return { ...prev, eligibility: current.filter(y => y !== year) };
          } else {
              return { ...prev, eligibility: [...current, year] };
          }
      });
  };

  const handleShortlistCandidate = (jobId: number) => {
      if (selectedCandidate) {
          const updatedCandidates = candidates.map(c => 
              c.id === selectedCandidate.id 
                  ? { ...c, status: 'Shortlisted', appliedFor: jobId } 
                  : c
          );
          setCandidates(updatedCandidates);
          
          // Update selected candidate view immediately
          setSelectedCandidate({ ...selectedCandidate, status: 'Shortlisted', appliedFor: jobId });
          
          alert(`Candidate shortlisted for ${jobs.find(j => j.id === jobId)?.title}`);
      }
  };

  const handleSendMessage = () => {
      if (selectedCandidate) {
          setActiveConversationId(selectedCandidate.id);
          setSelectedCandidate(null);
          onTabChange('messages');
      }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          setJobForm(prev => ({ ...prev, assignmentFile: e.target.files![0] }));
      }
  };

  const NavItem = ({ tab, icon: Icon, label }: { tab: Tab, icon: any, label: string }) => (
    <button 
      onClick={() => onTabChange(tab)}
      className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-200 group ${currentTab === tab ? 'bg-[#0D1C22] text-white shadow-lg shadow-black/20' : 'text-gray-500 hover:bg-white hover:text-[#0D1C22]'}`}
    >
      <Icon size={24} strokeWidth={currentTab === tab ? 2.5 : 2} className="shrink-0" />
      <span className="font-bold text-lg hidden md:block">{label}</span>
      {currentTab === tab && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#D7F037] hidden md:block"></div>}
    </button>
  );

  const navItems = [
    { id: 'feed', icon: Home, label: 'Home' },
    { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
    { id: 'jobs', icon: Briefcase, label: 'Jobs' },
    { id: 'candidates', icon: Users, label: 'Candidates' },
    { id: 'messages', icon: MessageSquare, label: 'Messages' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  // --- Sub-View: Messages ---
  const MessagesView = () => {
      const activeCandidateForChat = candidates.find(c => c.id === activeConversationId);
      // Mock list of conversations (just using the candidates list for demo)
      const conversations = candidates.slice(0, 4); 

      // Safe check for name split to prevent "Uncaught TypeError" if name is undefined
      const candidateFirstName = activeCandidateForChat?.name?.split(' ')[0] || 'Candidate';

      return (
        <div className="flex h-[calc(100vh-140px)] bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden animate-in fade-in duration-500">
            {/* Sidebar List */}
            <div className={`w-full md:w-80 border-r border-gray-100 flex flex-col ${activeConversationId ? 'hidden md:flex' : 'flex'}`}>
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-2xl font-black text-[#0D1C22]">Messages</h2>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {conversations.map(c => (
                        <div 
                            key={c.id}
                            onClick={() => setActiveConversationId(c.id)}
                            className={`p-4 flex gap-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 transition-colors ${activeConversationId === c.id ? 'bg-gray-50 border-l-4 border-l-[#0D1C22]' : ''}`}
                        >
                            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600 shrink-0">
                                {c.name?.[0]}
                            </div>
                            <div className="overflow-hidden flex-1">
                                <div className="flex justify-between items-baseline">
                                    <h4 className={`font-bold truncate ${activeConversationId === c.id ? 'text-[#0D1C22]' : 'text-gray-700'}`}>{c.name}</h4>
                                    <span className="text-[10px] text-gray-400">2m</span>
                                </div>
                                <p className="text-xs text-gray-500 truncate">{c.id === 1 ? "Thanks for the opportunity!" : "Hi, I had a question regarding..."}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            {activeConversationId && activeCandidateForChat ? (
                <div className="flex-1 flex flex-col bg-[#FDFDF5]/50">
                    {/* Header */}
                    <div className="p-4 bg-white border-b border-gray-100 flex justify-between items-center shadow-sm z-10">
                        <div 
                            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => setSelectedCandidate(activeCandidateForChat)}
                        >
                            <button className="md:hidden mr-2" onClick={(e) => { e.stopPropagation(); setActiveConversationId(null); }}>
                                <ArrowLeft size={20} />
                            </button>
                            <div className="w-10 h-10 rounded-full bg-[#D7F037] flex items-center justify-center font-bold text-[#0D1C22]">
                                {activeCandidateForChat.name?.[0]}
                            </div>
                            <div>
                                <h3 className="font-bold text-[#0D1C22] flex items-center gap-2">
                                    {activeCandidateForChat.name}
                                    <span className="bg-gray-100 text-gray-600 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wide">Applicant</span>
                                </h3>
                                <p className="text-xs text-gray-500">{activeCandidateForChat.course} • {activeCandidateForChat.college}</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="p-2 text-gray-400 hover:text-[#0D1C22] hover:bg-gray-100 rounded-full transition-colors">
                                <Phone size={20} />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-[#0D1C22] hover:bg-gray-100 rounded-full transition-colors">
                                <MoreHorizontal size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Messages Body */}
                    <div className="flex-1 p-6 overflow-y-auto space-y-4">
                        <div className="flex justify-center mb-4">
                            <span className="text-[10px] bg-gray-100 text-gray-500 px-3 py-1 rounded-full font-medium">Today</span>
                        </div>
                        <div className="flex justify-end">
                            <div className="bg-[#0D1C22] text-white px-4 py-2 rounded-2xl rounded-tr-none max-w-[80%] text-sm shadow-md">
                                Hi {candidateFirstName}, your profile looks great! We'd like to schedule an interview.
                            </div>
                        </div>
                        <div className="flex justify-start">
                            <div className="bg-white border border-gray-100 text-gray-800 px-4 py-2 rounded-2xl rounded-tl-none max-w-[80%] text-sm shadow-sm">
                                Thank you! I am available any time after 2 PM tomorrow.
                            </div>
                        </div>
                    </div>

                    {/* Input */}
                    <div className="p-4 bg-white border-t border-gray-100">
                        <div className="flex gap-2 items-end bg-gray-50 p-2 rounded-2xl border border-gray-200 focus-within:border-[#0D1C22] focus-within:ring-1 focus-within:ring-[#0D1C22] transition-all">
                            <button className="p-2 text-gray-400 hover:text-[#0D1C22] transition-colors">
                                <Plus size={20} />
                            </button>
                            <textarea 
                                placeholder="Type a message..." 
                                className="flex-1 bg-transparent border-none outline-none resize-none max-h-32 min-h-[44px] py-2.5 text-sm font-medium"
                                rows={1}
                            />
                            <button className="p-2 bg-[#0D1C22] text-white rounded-xl hover:bg-black transition-colors shadow-sm">
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="hidden md:flex flex-1 flex-col items-center justify-center bg-gray-50/50 text-center p-8">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                        <MessageSquare size={32} className="text-gray-300" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-700">Select a conversation</h3>
                    <p className="text-gray-400 text-sm mt-1">Choose from the list to start chatting.</p>
                </div>
            )}
        </div>
      );
  }

  // --- Sub-View: Feed ---
  const FeedView = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex justify-between items-center">
            <h2 className="text-3xl font-black text-[#0D1C22]">Home</h2>
            <button 
                onClick={() => setShowPostJobModal(true)}
                className="flex items-center gap-2 bg-[#D7F037] text-[#0D1C22] px-6 py-3 rounded-xl font-bold shadow-sm hover:bg-[#c5dc33] transition-colors"
            >
                <Plus size={20} /> Post a Job
            </button>
        </div>

        {/* Create Post Widget */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-[#0D1C22] flex items-center justify-center shrink-0 text-white font-bold text-lg">
                HR
            </div>
            <input 
                type="text" 
                placeholder="Share an update, hiring announcement, or achievement..." 
                className="flex-1 bg-gray-50 rounded-2xl px-5 py-3 outline-none focus:ring-2 focus:ring-[#0D1C22] transition-all font-medium"
            />
            </div>
            <div className="flex justify-between items-center px-2">
            <div className="flex gap-4">
                <button className="flex items-center gap-2 text-gray-500 hover:text-[#0D1C22] text-sm font-bold bg-gray-50 px-3 py-1.5 rounded-lg transition-colors">
                <ImageIcon size={18} /> Photo
                </button>
                <button className="flex items-center gap-2 text-gray-500 hover:text-[#0D1C22] text-sm font-bold bg-gray-50 px-3 py-1.5 rounded-lg transition-colors">
                <Video size={18} /> Video
                </button>
            </div>
            <button className="bg-[#0D1C22] text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-black transition-colors shadow-md">
                Post
            </button>
            </div>
        </div>

        {/* Feed Posts */}
        <div className="space-y-6">
            <h3 className="font-bold text-xl text-[#0D1C22] px-1">Network Updates</h3>
            {FEED_POSTS.map(post => (
                <div key={post.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:border-gray-200 transition-colors">
                    <div className="flex items-center gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm shadow-sm ${post.avatarColor}`}>
                            {post.author[0]}
                        </div>
                        <div>
                            <h4 className="font-bold text-[#0D1C22] text-base">{post.author}</h4>
                            <p className="text-xs text-gray-500 font-medium">{post.role} • {post.time}</p>
                        </div>
                    </div>
                    <p className="text-gray-800 mb-6 leading-relaxed text-base">{post.content}</p>
                    <div className="flex gap-6 text-gray-500 text-sm font-bold border-t border-gray-50 pt-4">
                        <button className="flex items-center gap-2 hover:text-[#0D1C22] px-2 py-1 rounded-lg hover:bg-gray-50 transition-colors"><ThumbsUp size={18}/> {post.likes}</button>
                        <button className="flex items-center gap-2 hover:text-[#0D1C22] px-2 py-1 rounded-lg hover:bg-gray-50 transition-colors"><MessageSquare size={18}/> {post.comments}</button>
                        <button className="flex items-center gap-2 hover:text-[#0D1C22] px-2 py-1 rounded-lg hover:bg-gray-50 transition-colors"><Share2 size={18}/> Share</button>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );

  // --- Sub-View: Job Pipeline (ATS) ---
  const JobPipeline = ({ jobId }: { jobId: number }) => {
     const job = jobs.find(j => j.id === jobId);
     // Filter candidates for this job based on appliedFor ID
     const pipelineCandidates = candidates.filter(c => c.appliedFor === jobId);

     return (
         <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
             <div className="flex items-center gap-4">
                 <button onClick={() => setSelectedJobId(null)} className="p-3 hover:bg-white rounded-full transition-colors border border-transparent hover:border-gray-200">
                     <ArrowLeft size={24} className="text-[#0D1C22]" />
                 </button>
                 <div>
                     <h2 className="text-2xl font-black text-[#0D1C22]">{job?.title}</h2>
                     <p className="text-gray-500 text-sm font-medium">Pipeline Board</p>
                 </div>
                 <div className="ml-auto flex gap-3">
                     <button className="px-5 py-2.5 border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-white hover:text-[#0D1C22] transition-colors">Edit Job</button>
                     <button className="px-5 py-2.5 bg-[#0D1C22] text-white rounded-xl font-bold hover:bg-black transition-colors shadow-lg">Add Candidate</button>
                 </div>
             </div>

             <div className="flex gap-6 overflow-x-auto pb-6">
                 {/* Stage: Applied */}
                 <div className="min-w-[320px] flex-1">
                     <div className="flex justify-between items-center mb-4 px-2">
                         <div className="font-bold text-[#0D1C22] text-sm uppercase tracking-wide">Applied</div> 
                         <span className="bg-gray-200 text-gray-700 px-2.5 py-1 rounded-lg text-xs font-bold">{pipelineCandidates.filter(c => c.status === 'Applied').length}</span>
                     </div>
                     <div className="space-y-3">
                         {pipelineCandidates.filter(c => c.status === 'Applied').map(candidate => (
                             <div key={candidate.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm cursor-pointer hover:shadow-md transition-all hover:-translate-y-1">
                                 <div className="flex justify-between items-start mb-2">
                                     <h4 className="font-bold text-[#0D1C22]">{candidate.name}</h4>
                                     <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">{candidate.gpa} GPA</span>
                                 </div>
                                 <p className="text-sm text-gray-500 mb-3 font-medium">{candidate.college}</p>
                                 <div className="flex flex-wrap gap-1.5 mb-4">
                                     {candidate.skills.slice(0, 2).map(skill => (
                                         <span key={skill} className="px-2 py-1 bg-gray-50 text-gray-600 text-[10px] font-bold rounded border border-gray-100">{skill}</span>
                                     ))}
                                 </div>
                                 <div className="flex gap-2">
                                     <button 
                                        onClick={() => setSelectedCandidate(candidate)}
                                        className="flex-1 py-2 bg-[#0D1C22] text-white text-xs font-bold rounded-lg hover:bg-gray-800 transition-colors"
                                     >
                                        Review
                                     </button>
                                     <button className="px-2 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-400 hover:text-red-500 transition-colors"><X size={16}/></button>
                                 </div>
                             </div>
                         ))}
                     </div>
                 </div>

                 {/* Stage: Shortlisted */}
                 <div className="min-w-[320px] flex-1">
                     <div className="flex justify-between items-center mb-4 px-2">
                         <div className="font-bold text-[#0D1C22] text-sm uppercase tracking-wide">Shortlisted</div>
                         <span className="bg-blue-100 text-blue-700 px-2.5 py-1 rounded-lg text-xs font-bold">{pipelineCandidates.filter(c => c.status === 'Shortlisted').length}</span>
                     </div>
                     <div className="space-y-3">
                         {pipelineCandidates.filter(c => c.status === 'Shortlisted').map(candidate => (
                             <div key={candidate.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm cursor-pointer hover:shadow-md transition-all hover:-translate-y-1 relative overflow-hidden">
                                 <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
                                 <div className="flex justify-between items-start mb-2 pl-2">
                                     <h4 className="font-bold text-[#0D1C22]">{candidate.name}</h4>
                                     <span className="text-xs font-bold text-green-600">{candidate.gpa} GPA</span>
                                 </div>
                                 <p className="text-sm text-gray-500 mb-4 pl-2 font-medium">{candidate.college}</p>
                                 <div className="flex gap-2 pl-2">
                                     <button 
                                        onClick={() => setSelectedCandidate(candidate)}
                                        className="flex-1 py-2 bg-[#D7F037] text-[#0D1C22] text-xs font-bold rounded-lg hover:bg-[#c5dc33] transition-colors"
                                     >
                                        Schedule Interview
                                     </button>
                                 </div>
                             </div>
                         ))}
                     </div>
                 </div>

                 {/* Stage: Interview */}
                 <div className="min-w-[320px] flex-1">
                     <div className="flex justify-between items-center mb-4 px-2">
                         <div className="font-bold text-[#0D1C22] text-sm uppercase tracking-wide">Interview</div>
                         <span className="bg-purple-100 text-purple-700 px-2.5 py-1 rounded-lg text-xs font-bold">{pipelineCandidates.filter(c => c.status === 'Interviewed').length}</span>
                     </div>
                     <div className="space-y-3">
                         {pipelineCandidates.filter(c => c.status === 'Interviewed').map(candidate => (
                             <div key={candidate.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm cursor-pointer hover:shadow-md transition-all hover:-translate-y-1 relative overflow-hidden">
                                 <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500"></div>
                                 <div className="flex justify-between items-start mb-2 pl-2">
                                     <h4 className="font-bold text-[#0D1C22]">{candidate.name}</h4>
                                     <span className="text-xs font-bold text-gray-400">Round 1</span>
                                 </div>
                                 <div className="text-xs bg-purple-50 p-2 rounded-lg mb-3 text-purple-700 font-medium flex items-center gap-2 pl-2">
                                     <Clock size={12}/> Tomorrow, 10:00 AM
                                 </div>
                                 <div className="flex gap-2 pl-2">
                                     <button 
                                        onClick={() => setSelectedCandidate(candidate)}
                                        className="flex-1 py-2 bg-[#0D1C22] text-white text-xs font-bold rounded-lg hover:bg-black transition-colors"
                                     >
                                        Add Feedback
                                     </button>
                                 </div>
                             </div>
                         ))}
                     </div>
                 </div>

                 {/* Stage: Offer */}
                 <div className="min-w-[320px] flex-1">
                     <div className="flex justify-between items-center mb-4 px-2">
                         <div className="font-bold text-[#0D1C22] text-sm uppercase tracking-wide">Offer</div>
                         <span className="bg-green-100 text-green-700 px-2.5 py-1 rounded-lg text-xs font-bold">2</span>
                     </div>
                     <div className="space-y-3">
                         <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
                             <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500"></div>
                             <h4 className="font-bold text-[#0D1C22] pl-2">Vikram Singh</h4>
                             <p className="text-sm text-gray-500 pl-2 font-medium">IIT Bombay</p>
                             <div className="mt-3 text-xs font-bold text-green-700 bg-green-50 inline-flex items-center gap-1 px-2.5 py-1 rounded-full ml-2">
                                 <CheckCircle2 size={12}/> Offer Sent
                             </div>
                         </div>
                     </div>
                 </div>

             </div>
         </div>
     )
  };

  // --- Sub-View: Profile ---
  const ProfileView = () => (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-black text-[#0D1C22]">Profile</h2>
        <div className="flex gap-4">
            <button 
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              className={`px-6 py-2 rounded-xl font-bold border transition-colors ${isEditingProfile ? 'bg-[#D7F037] border-[#D7F037] text-[#0D1C22]' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
            >
              {isEditingProfile ? 'Save Changes' : 'Edit Profile'}
            </button>
            <button 
               onClick={onLogout}
               className="px-6 py-2 rounded-xl font-bold border border-red-100 bg-red-50 text-red-600 hover:bg-red-100 transition-colors flex items-center gap-2"
            >
               <LogOut size={18} /> Logout
            </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden p-8 md:p-10">
         {/* Avatar Section */}
         <div className="flex flex-col md:flex-row items-center gap-8 mb-10 pb-10 border-b border-gray-100">
            <div className="w-28 h-28 rounded-full bg-[#0D1C22] text-white flex items-center justify-center text-4xl font-bold shadow-xl">
               {profile.name[0]}
            </div>
            <div className="text-center md:text-left">
               <h3 className="text-3xl font-bold text-[#0D1C22]">{profile.name}</h3>
               <p className="text-lg text-gray-500 font-medium mt-1">{profile.designation} at {profile.companyName}</p>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
               <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
               <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    value={profile.name}
                    disabled={!isEditingProfile}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D1C22] disabled:opacity-60 disabled:cursor-not-allowed font-medium"
                  />
               </div>
            </div>

            <div>
               <label className="block text-sm font-bold text-gray-700 mb-2">Designation</label>
               <div className="relative">
                  <BriefcaseIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    value={profile.designation}
                    disabled={!isEditingProfile}
                    onChange={(e) => setProfile({...profile, designation: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D1C22] disabled:opacity-60 disabled:cursor-not-allowed font-medium"
                  />
               </div>
            </div>

            <div>
               <label className="block text-sm font-bold text-gray-700 mb-2">Company Name</label>
               <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    value={profile.companyName}
                    disabled={!isEditingProfile}
                    onChange={(e) => setProfile({...profile, companyName: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D1C22] disabled:opacity-60 disabled:cursor-not-allowed font-medium"
                  />
               </div>
            </div>

            <div>
               <label className="block text-sm font-bold text-gray-700 mb-2">Personal Email</label>
               <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="email" 
                    value={profile.email}
                    disabled={!isEditingProfile}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D1C22] disabled:opacity-60 disabled:cursor-not-allowed font-medium"
                  />
               </div>
            </div>

            <div>
               <label className="block text-sm font-bold text-gray-700 mb-2">Company Email</label>
               <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="email" 
                    value={profile.companyEmail}
                    disabled={!isEditingProfile}
                    onChange={(e) => setProfile({...profile, companyEmail: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D1C22] disabled:opacity-60 disabled:cursor-not-allowed font-medium"
                  />
               </div>
            </div>
            
             <div>
               <label className="block text-sm font-bold text-gray-700 mb-2">Location</label>
               <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    value={profile.location}
                    disabled={!isEditingProfile}
                    onChange={(e) => setProfile({...profile, location: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D1C22] disabled:opacity-60 disabled:cursor-not-allowed font-medium"
                  />
               </div>
            </div>
         </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar - Desktop Only */}
        <aside className="hidden md:block w-64 shrink-0">
          <nav className="sticky top-24 space-y-2 bg-gray-50/50 p-3 rounded-3xl border border-gray-100/50 backdrop-blur-sm">
            <NavItem tab="feed" icon={Home} label="Home" />
            <NavItem tab="overview" icon={LayoutDashboard} label="Overview" />
            <NavItem tab="jobs" icon={Briefcase} label="Jobs" />
            <NavItem tab="candidates" icon={Users} label="Candidates" />
            <NavItem tab="messages" icon={MessageSquare} label="Messages" />
            <NavItem tab="profile" icon={User} label="Profile" />
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
          
          {/* Feed Tab */}
          {currentTab === 'feed' && <FeedView />}

          {/* Overview Tab */}
          {currentTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                 <div>
                    <h1 className="text-3xl font-black text-[#0D1C22]">Hiring Overview</h1>
                    <p className="text-gray-500 font-medium">Welcome back, Recruiter.</p>
                 </div>
                 <button 
                    onClick={() => setShowPostJobModal(true)}
                    className="flex items-center gap-2 bg-[#D7F037] text-[#0D1C22] px-6 py-3 rounded-xl font-bold shadow-sm hover:bg-[#c5dc33] transition-colors"
                 >
                    <Plus size={20} /> Post New Job
                 </button>
              </div>

              {/* Stats Cards - Modern Design */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#0D1C22] text-white p-8 rounded-[2rem] shadow-xl relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 group-hover:scale-110 transition-transform"></div>
                   <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-4 text-[#D7F037]">
                         <Users size={20} />
                         <span className="text-xs font-bold uppercase tracking-wider">Total Reach</span>
                      </div>
                      <div className="text-5xl font-black mb-1">464</div>
                      <div className="text-sm text-gray-400 font-medium">Total Applications</div>
                   </div>
                </div>

                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                    <div className="absolute bottom-0 right-0 w-24 h-24 bg-purple-50 rounded-full -mr-6 -mb-6 opacity-60"></div>
                   <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-4 text-purple-600">
                         <Clock size={20} />
                         <span className="text-xs font-bold uppercase tracking-wider">In Progress</span>
                      </div>
                      <div className="text-5xl font-black text-[#0D1C22] mb-1">12</div>
                      <div className="text-sm text-gray-500 font-medium">Interviews Scheduled</div>
                   </div>
                </div>

                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                    <div className="absolute bottom-0 right-0 w-24 h-24 bg-blue-50 rounded-full -mr-6 -mb-6 opacity-60"></div>
                   <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-4 text-blue-600">
                         <Briefcase size={20} />
                         <span className="text-xs font-bold uppercase tracking-wider">Live</span>
                      </div>
                      <div className="text-5xl font-black text-[#0D1C22] mb-1">3</div>
                      <div className="text-sm text-gray-500 font-medium">Active Jobs</div>
                   </div>
                </div>
              </div>

              {/* Recent Applications */}
              <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                   <h3 className="font-bold text-lg text-[#0D1C22]">Recent Applications</h3>
                   <button 
                      onClick={() => onTabChange('candidates')}
                      className="text-sm font-bold text-gray-500 hover:text-[#0D1C22] flex items-center gap-1"
                   >
                      View All <ChevronRight size={16}/>
                   </button>
                </div>
                <div className="divide-y divide-gray-50">
                   {candidates.slice(0, 3).map((candidate) => (
                      <div 
                        key={candidate.id} 
                        onClick={() => setSelectedCandidate(candidate)}
                        className="p-6 hover:bg-gray-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 group cursor-pointer"
                      >
                         <div className="flex items-center gap-5">
                            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600 group-hover:bg-[#0D1C22] group-hover:text-white transition-colors">
                               {candidate.name[0]}
                            </div>
                            <div>
                               <h4 className="font-bold text-[#0D1C22] text-lg">{candidate.name}</h4>
                               <p className="text-sm text-gray-500 font-medium">{candidate.course} • {candidate.college}</p>
                            </div>
                         </div>
                         <div className="flex items-center gap-6">
                            <div className="flex gap-2">
                               {candidate.skills.slice(0, 2).map(skill => (
                                  <span key={skill} className="px-3 py-1 bg-gray-100 text-xs font-bold rounded-lg text-gray-600">{skill}</span>
                               ))}
                            </div>
                            <span className="px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-bold border border-blue-100">{candidate.status}</span>
                            <button className="p-2 hover:bg-gray-200 rounded-full text-gray-400 hover:text-[#0D1C22] transition-colors"><MoreHorizontal size={20}/></button>
                         </div>
                      </div>
                   ))}
                </div>
              </div>
            </div>
          )}

          {/* Candidates Tab */}
          {currentTab === 'candidates' && (
             <div className="space-y-6 animate-in fade-in duration-500">
                <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-2">
                    <div>
                        <h2 className="text-3xl font-black text-[#0D1C22]">Explore Talent</h2>
                        <p className="text-gray-500 font-medium mt-1">Access the complete database of 20,000+ verified students.</p>
                    </div>
                </div>

                {/* Search Bar - Clean & Sticky */}
                <div className="bg-white p-2 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-2 sticky top-24 z-20">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input 
                            type="text" 
                            placeholder="Search by name, skill, college, or degree..." 
                            className="w-full pl-12 pr-4 py-3 rounded-xl outline-none font-medium text-gray-700 placeholder:text-gray-400 bg-transparent" 
                        />
                    </div>
                    <div className="h-8 w-px bg-gray-200 mx-1 hidden md:block"></div>
                    <button className="hidden md:flex px-4 py-2 hover:bg-gray-50 rounded-xl text-gray-600 font-bold text-sm items-center gap-2 transition-colors">
                        <Filter size={18} /> Filters
                    </button>
                    <button className="bg-[#0D1C22] text-white p-3 rounded-xl hover:bg-black transition-colors shadow-md">
                        <Search size={20} />
                    </button>
                </div>

                {/* Clean List View */}
                <div className="space-y-3">
                    {candidates.map((candidate) => (
                        <div 
                            key={candidate.id} 
                            onClick={() => setSelectedCandidate(candidate)}
                            className="bg-white p-5 rounded-2xl border border-gray-100 hover:border-[#0D1C22]/30 hover:shadow-md transition-all cursor-pointer group flex flex-col md:flex-row gap-6 items-start md:items-center"
                        >
                            {/* Avatar & Basic Info */}
                            <div className="flex items-center gap-5 flex-[1.5]">
                                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center font-bold text-lg text-gray-500 group-hover:bg-[#D7F037] group-hover:text-[#0D1C22] transition-colors shrink-0">
                                    {candidate.name[0]}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-[#0D1C22] group-hover:text-blue-600 transition-colors">{candidate.name}</h3>
                                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-500 font-medium">
                                        <span className="flex items-center gap-1 text-gray-700"><GraduationCap size={14}/> {candidate.course}</span>
                                        <span className="hidden md:inline text-gray-300">•</span>
                                        <span className="text-gray-500">{candidate.college}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Skills - Pill Layout */}
                            <div className="flex-1 w-full md:w-auto">
                                    <div className="flex flex-wrap gap-2">
                                    {candidate.skills.slice(0, 4).map(skill => (
                                        <span key={skill} className="px-2.5 py-1 bg-gray-50 border border-gray-100 rounded-lg text-xs font-bold text-gray-600">
                                            {skill}
                                        </span>
                                    ))}
                                    {candidate.skills.length > 4 && (
                                        <span className="px-2 py-1 text-xs font-bold text-gray-400">+{candidate.skills.length - 4}</span>
                                    )}
                                    </div>
                            </div>

                            {/* Stats & Action */}
                            <div className="flex items-center gap-6 justify-between w-full md:w-auto border-t md:border-t-0 border-gray-50 pt-4 md:pt-0 pl-0 md:pl-6 md:border-l border-gray-100">
                                <div className="flex flex-col md:items-end">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Graduating</p>
                                    <p className="font-bold text-[#0D1C22] text-sm">{candidate.batch}</p>
                                </div>
                                <button className="px-5 py-2 border border-gray-200 rounded-xl font-bold text-xs md:text-sm text-gray-700 hover:bg-[#0D1C22] hover:text-white hover:border-[#0D1C22] transition-colors">
                                    View Profile
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="text-center pt-8">
                    <button className="px-6 py-3 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-colors">Load More Candidates</button>
                </div>
             </div>
          )}

          {/* Jobs Tab */}
          {currentTab === 'jobs' && (
             <>
               {selectedJobId ? (
                   <JobPipeline jobId={selectedJobId} />
               ) : (
                 <div className="space-y-8 animate-in fade-in duration-500">
                    <div className="flex justify-between items-center">
                       <div>
                           <h2 className="text-3xl font-black text-[#0D1C22]">Active Jobs</h2>
                           <p className="text-gray-500 font-medium">Manage your openings and track applications.</p>
                       </div>
                       <button 
                            onClick={() => setShowPostJobModal(true)}
                            className="flex items-center gap-2 bg-[#D7F037] text-[#0D1C22] px-6 py-3 rounded-xl font-bold shadow-sm hover:bg-[#c5dc33] transition-colors"
                        >
                          <Plus size={20} /> Post Job
                       </button>
                    </div>

                    <div className="grid gap-6">
                       {jobs.map((job) => (
                          <div key={job.id} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-8 group hover:border-gray-200 transition-all hover:shadow-md">
                             <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                   <h3 className="font-bold text-2xl text-[#0D1C22] group-hover:text-blue-600 transition-colors cursor-pointer" onClick={() => setSelectedJobId(job.id)}>{job.title}</h3>
                                   <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${job.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                      {job.status}
                                   </span>
                                </div>
                                <div className="flex gap-6 text-sm text-gray-500 font-medium">
                                   <span className="flex items-center gap-1.5"><MapPin size={16} className="text-gray-400"/> {job.location}</span>
                                   <span className="flex items-center gap-1.5"><Briefcase size={16} className="text-gray-400"/> {job.type}</span>
                                   <span className="flex items-center gap-1.5"><Clock size={16} className="text-gray-400"/> {job.posted}</span>
                                   {job.duration && <span className="flex items-center gap-1.5 text-[#0D1C22] font-bold bg-yellow-100 px-2 py-0.5 rounded"><CalendarIcon size={14}/> {job.duration}</span>}
                                </div>
                             </div>
                             
                             <div className="flex items-center gap-10">
                                <div className="text-center cursor-pointer group/stats" onClick={() => setSelectedJobId(job.id)}>
                                   <div className="text-3xl font-black text-[#0D1C22] group-hover/stats:scale-110 transition-transform">{job.applicants}</div>
                                   <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">Applicants</div>
                                </div>
                                <div className="w-px h-12 bg-gray-100 hidden md:block"></div>
                                <div className="flex gap-3">
                                   <button className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-600 transition-colors"><MoreHorizontal size={20}/></button>
                                   <button 
                                      onClick={() => setSelectedJobId(job.id)}
                                      className="px-6 py-3 bg-[#0D1C22] text-white rounded-xl font-bold hover:bg-black transition-colors shadow-lg flex items-center gap-2"
                                    >
                                      Manage Pipeline <ArrowUpRight size={18} />
                                    </button>
                                </div>
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>
               )}
             </>
          )}
          
          {/* Profile Tab */}
          {currentTab === 'profile' && <ProfileView />}

          {/* Messages Tab */}
          {currentTab === 'messages' && <MessagesView />}

        </main>
      </div>

      {/* Detail Modal */}
      {selectedCandidate && (
          <CandidateDetailModal 
            candidate={selectedCandidate}
            jobs={jobs}
            onClose={() => setSelectedCandidate(null)} 
            onShortlist={handleShortlistCandidate}
            onMessage={handleSendMessage}
          />
      )}

      {/* Post Job Modal */}
      {showPostJobModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-[2rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto p-10 shadow-2xl relative animate-in slide-in-from-bottom-8 duration-300">
                <button onClick={() => setShowPostJobModal(false)} className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                   <X size={24} />
                </button>
                
                <h2 className="text-3xl font-black text-[#0D1C22] mb-8">Post a New Job</h2>
                
                <form onSubmit={handlePostJob} className="space-y-8">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-gray-700 mb-2">Job Title</label>
                            <input 
                                type="text" 
                                required
                                value={jobForm.title}
                                onChange={e => setJobForm({...jobForm, title: e.target.value})}
                                placeholder="e.g. Software Development Engineer I" 
                                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D1C22] font-medium" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Employment Type</label>
                            <div className="relative">
                                <select 
                                    value={jobForm.type}
                                    onChange={e => setJobForm({...jobForm, type: e.target.value})}
                                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D1C22] appearance-none font-medium cursor-pointer"
                                >
                                    <option>Full-time</option>
                                    <option>Internship</option>
                                    <option>Contract</option>
                                </select>
                                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none" size={20} />
                            </div>
                        </div>
                        
                        {/* Duration Field (Conditionally Rendered for Internships) */}
                        {jobForm.type === 'Internship' && (
                            <div className="animate-in fade-in slide-in-from-top-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Duration</label>
                                <div className="relative">
                                    <select 
                                        value={jobForm.duration}
                                        onChange={e => setJobForm({...jobForm, duration: e.target.value})}
                                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D1C22] appearance-none font-medium cursor-pointer"
                                    >
                                        <option>1 Month</option>
                                        <option>2 Months</option>
                                        <option>3 Months</option>
                                        <option>6 Months</option>
                                        <option>12 Months</option>
                                    </select>
                                    <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none" size={20} />
                                </div>
                            </div>
                        )}

                        <div>
                             <label className="block text-sm font-bold text-gray-700 mb-2">Location Type</label>
                             <div className="flex gap-2">
                                {['On-site', 'Remote', 'Hybrid'].map(mode => (
                                    <label key={mode} className={`flex-1 flex items-center justify-center gap-2 px-3 py-3.5 rounded-xl border cursor-pointer transition-all ${jobForm.locationType === mode ? 'bg-[#0D1C22] text-white border-[#0D1C22] shadow-md' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                                        <input 
                                            type="radio" 
                                            name="locationType" 
                                            checked={jobForm.locationType === mode}
                                            onChange={() => setJobForm({...jobForm, locationType: mode})}
                                            className="hidden"
                                        />
                                        <span className="text-sm font-bold">{mode}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                         <div className="md:col-span-2">
                             <label className="block text-sm font-bold text-gray-700 mb-2">Location / City</label>
                             <input 
                                type="text" 
                                disabled={jobForm.locationType === 'Remote'}
                                value={jobForm.locationType === 'Remote' ? '' : jobForm.location}
                                onChange={e => setJobForm({...jobForm, location: e.target.value})}
                                placeholder="e.g. Bangalore, Karnataka" 
                                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D1C22] disabled:opacity-50 font-medium" 
                            />
                        </div>
                    </div>

                    {/* Closing Date & Description */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">Application Deadline</label>
                          <input 
                              type="date"
                              value={jobForm.closingDate}
                              onChange={e => setJobForm({...jobForm, closingDate: e.target.value})}
                              className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D1C22] font-medium" 
                          />
                       </div>
                       <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">Closing Time</label>
                          <input 
                              type="time"
                              value={jobForm.closingTime}
                              onChange={e => setJobForm({...jobForm, closingTime: e.target.value})}
                              className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D1C22] font-medium" 
                          />
                       </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Job Description</label>
                        <p className="text-xs text-gray-500 mb-3 font-medium">Include key responsibilities, requirements, and benefits.</p>
                        <textarea 
                            value={jobForm.description}
                            onChange={e => setJobForm({...jobForm, description: e.target.value})}
                            placeholder="Enter detailed job description, including key responsibilities..." 
                            className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D1C22] min-h-[150px] font-medium" 
                        ></textarea>
                    </div>

                    {/* Skills & Requirements */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Required Skills</label>
                        <div className="flex flex-wrap gap-2 mb-2 p-3 bg-gray-50 border border-gray-200 rounded-xl min-h-[60px] items-center">
                           {jobForm.skills.map(skill => (
                               <span key={skill} className="bg-white border border-gray-300 text-gray-800 px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-2 shadow-sm">
                                   {skill}
                                   <button type="button" onClick={() => removeSkill(skill)} className="text-gray-400 hover:text-red-500"><X size={14} /></button>
                               </span>
                           ))}
                           <input 
                              type="text" 
                              value={jobForm.skillInput}
                              onChange={e => setJobForm({...jobForm, skillInput: e.target.value})}
                              onKeyDown={handleAddSkill}
                              placeholder="Type skill & press Enter..." 
                              className="bg-transparent outline-none flex-1 min-w-[150px] text-sm font-medium px-2"
                           />
                        </div>
                    </div>

                    {/* Compensation */}
                    <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
                        <div className="md:col-span-3 pb-4 border-b border-gray-200 mb-6">
                            <h3 className="font-bold text-[#0D1C22] text-lg">Compensation</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Currency</label>
                                <select className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D1C22] font-medium cursor-pointer">
                                    <option>INR (₹)</option>
                                    <option>USD ($)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    {jobForm.type === 'Internship' ? 'Min Stipend / Month' : 'Min Annual CTC'}
                                </label>
                                <input 
                                    type="number" 
                                    value={jobForm.salaryMin}
                                    onChange={e => setJobForm({...jobForm, salaryMin: e.target.value})}
                                    placeholder={jobForm.type === 'Internship' ? "e.g. 15000" : "e.g. 800000"}
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D1C22] font-medium" 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    {jobForm.type === 'Internship' ? 'Max Stipend' : 'Max Annual CTC'}
                                </label>
                                <input 
                                    type="number" 
                                    value={jobForm.salaryMax}
                                    onChange={e => setJobForm({...jobForm, salaryMax: e.target.value})}
                                    placeholder={jobForm.type === 'Internship' ? "e.g. 25000" : "e.g. 1200000"}
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D1C22] font-medium" 
                                />
                            </div>
                        </div>
                    </div>

                    {/* Candidate Eligibility */}
                    <div>
                         <label className="block text-sm font-bold text-gray-700 mb-3">Candidate Eligibility</label>
                         <div className="flex gap-4">
                            <label className={`flex items-center gap-3 px-5 py-4 rounded-xl border cursor-pointer transition-all flex-1 ${jobForm.eligibility.includes('final_year') ? 'bg-blue-50 border-blue-500 text-blue-800 shadow-sm' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                                <input 
                                    type="checkbox" 
                                    checked={jobForm.eligibility.includes('final_year')}
                                    onChange={() => toggleEligibility('final_year')}
                                    className="accent-blue-600 w-5 h-5"
                                />
                                <div>
                                    <span className="font-bold text-sm block">Final Year (2025)</span>
                                    <span className="text-xs opacity-70">Graduating soon</span>
                                </div>
                            </label>
                            <label className={`flex items-center gap-3 px-5 py-4 rounded-xl border cursor-pointer transition-all flex-1 ${jobForm.eligibility.includes('pre_final') ? 'bg-blue-50 border-blue-500 text-blue-800 shadow-sm' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                                <input 
                                    type="checkbox" 
                                    checked={jobForm.eligibility.includes('pre_final')}
                                    onChange={() => toggleEligibility('pre_final')}
                                    className="accent-blue-600 w-5 h-5"
                                />
                                <div>
                                    <span className="font-bold text-sm block">Pre-Final Year (2026)</span>
                                    <span className="text-xs opacity-70">Internship candidates</span>
                                </div>
                            </label>
                         </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
                        <button 
                            type="button" 
                            onClick={() => setShowPostJobModal(false)}
                            className="px-8 py-3.5 border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="px-10 py-3.5 bg-[#0D1C22] text-white font-bold rounded-xl hover:bg-black shadow-lg transition-colors"
                        >
                            Post Job
                        </button>
                    </div>
                </form>
            </div>
          </div>
      )}
    </div>
  );
};

export default EmployerDashboard;