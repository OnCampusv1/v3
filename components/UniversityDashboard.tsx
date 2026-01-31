import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Building2, 
  GraduationCap, 
  MessageSquare, 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal,
  MapPin,
  Calendar,
  CheckCircle2,
  TrendingUp,
  Mail,
  User,
  Briefcase,
  Image as ImageIcon,
  Video,
  ThumbsUp,
  Share2,
  Link as LinkIcon,
  X,
  MessageCircle,
  Clock,
  Users,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  ArrowRight,
  Settings,
  Globe,
  Phone,
  Save,
  Shield,
  LogOut,
  Edit2,
  Trash2,
  BookOpen
} from 'lucide-react';

type Tab = 'overview' | 'events' | 'students' | 'messages' | 'settings';

interface UniversityDashboardProps {
  onLogout: () => void;
  currentTab: string;
  onTabChange: (tab: any) => void;
}

// --- Mock Data ---
const STUDENTS = [
  { id: 1, name: "Arjun Kumar", branch: "CSE", batch: "2025", cgpa: "9.2", status: "Placed", company: "Google", email: "arjun@nit.edu", phone: "9876543210" },
  { id: 2, name: "Priya Singh", branch: "ECE", batch: "2025", cgpa: "8.8", status: "Looking", company: "-", email: "priya@nit.edu", phone: "9876543211" },
  { id: 3, name: "Rahul Verma", branch: "ME", batch: "2025", cgpa: "8.5", status: "Looking", company: "-", email: "rahul@nit.edu", phone: "9876543212" },
  { id: 4, name: "Ananya Gupta", branch: "CSE", batch: "2025", cgpa: "9.0", status: "Shortlisted", company: "Microsoft", email: "ananya@nit.edu", phone: "9876543213" },
  { id: 5, name: "Vikram Malhotra", branch: "Civil", batch: "2025", cgpa: "8.1", status: "Looking", company: "-", email: "vikram@nit.edu", phone: "9876543214" },
];

const FEED_POSTS = [
  { id: 1, author: "Placement Cell", role: "Official", content: "📣 Announcement: The deadline for Deloitte registration has been extended to 5 PM today. Please complete your applications ASAP.", likes: 124, comments: 12, time: "1h ago", type: "official", avatarColor: "bg-[#2c0033] text-white" },
  { id: 2, author: "Arjun Kumar", role: "Student • CSE", content: "Thrilled to share that I have accepted a full-time offer at Google! A huge thank you to the placement team and my professors for their guidance. 🚀", likes: 452, comments: 89, time: "3h ago", type: "student", avatarColor: "bg-gray-200 text-gray-600" },
  { id: 3, author: "Swiggy", role: "Company", content: "We are excited to kickstart our campus drive tomorrow! Looking forward to meeting the bright minds of NIT.", likes: 230, comments: 45, time: "1d ago", type: "company", avatarColor: "bg-orange-500 text-white" },
];

const EVENTS = [
    { 
        id: 1, 
        title: 'TCS National Qualifier Test', 
        company: 'TCS', 
        date: '2024-10-24', 
        time: '10:00 AM', 
        location: 'Online Assessment', 
        type: 'Exam',
        registrations: [
            { name: "Arjun Kumar", id: "101" },
            { name: "Priya Singh", id: "102" },
            { name: "Rahul Verma", id: "103" },
            { name: "Sneha Gupta", id: "104" }
        ] 
    },
    { 
        id: 2, 
        title: 'Placement Prep Workshop', 
        company: 'Placement Cell', 
        date: '2024-10-26', 
        time: '04:00 PM', 
        location: 'Seminar Hall, Block B', 
        type: 'Workshop',
        registrations: [
             { name: "Rahul Verma", id: "103" }
        ]
    },
];

const BRANCHES = ["All Branches", "Computer Science (CSE)", "Electronics (ECE)", "Mechanical (ME)", "Civil (CE)", "Electrical (EEE)", "Chemical (ChE)"];

// --- Sub-Components ---

const StudentDetailModal: React.FC<{
    student: any,
    onClose: () => void
}> = ({ student, onClose }) => {
    if (!student) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-[2rem] w-full max-w-3xl p-8 relative animate-in slide-in-from-bottom-8 duration-300 shadow-2xl">
                <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                   <X size={24} />
                </button>

                <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-1/3 flex flex-col items-center">
                        <div className="w-32 h-32 rounded-full bg-[#2c0033] flex items-center justify-center text-4xl font-bold text-white mb-4">
                            {student.name?.[0]}
                        </div>
                        <h2 className="text-2xl font-black text-[#2c0033] text-center">{student.name}</h2>
                        <p className="text-gray-500 font-medium">{student.branch} • {student.batch}</p>
                        
                        <div className="mt-6 w-full space-y-3">
                            <button className="w-full py-2 bg-gray-100 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-200 transition-colors">
                                View Resume
                            </button>
                            <button className="w-full py-2 bg-[#2c0033] rounded-xl text-sm font-bold text-white hover:bg-black transition-colors">
                                Send Message
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 space-y-6">
                        <div>
                            <h3 className="font-bold text-[#2c0033] border-b border-gray-100 pb-2 mb-4">Placement Status</h3>
                            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-100">
                                <div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                          student.status === 'Placed' ? 'bg-green-100 text-green-700' : 
                                          student.status === 'Shortlisted' ? 'bg-purple-100 text-purple-700' :
                                          'bg-orange-100 text-orange-700'
                                      }`}>
                                         {student.status}
                                    </span>
                                </div>
                                {student.company !== '-' && (
                                    <div className="text-right">
                                        <p className="text-xs text-gray-500 font-bold uppercase">Company</p>
                                        <p className="font-bold text-[#2c0033]">{student.company}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <h3 className="font-bold text-[#2c0033] border-b border-gray-100 pb-2 mb-4">Academic Details</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 bg-white border border-gray-200 rounded-xl">
                                    <p className="text-xs text-gray-400 font-bold uppercase">CGPA</p>
                                    <p className="font-bold text-[#2c0033] text-lg">{student.cgpa}</p>
                                </div>
                                <div className="p-3 bg-white border border-gray-200 rounded-xl">
                                    <p className="text-xs text-gray-400 font-bold uppercase">ID Number</p>
                                    <p className="font-bold text-[#2c0033] text-lg">10123</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-bold text-[#2c0033] border-b border-gray-100 pb-2 mb-4">Contact</h3>
                            <div className="space-y-2">
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <Mail size={16} /> {student.email}
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <Phone size={16} /> {student.phone}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const UniversityDashboard: React.FC<UniversityDashboardProps> = ({ onLogout, currentTab, onTabChange }) => {
  const [showEventForm, setShowEventForm] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [expandedEventId, setExpandedEventId] = useState<number | null>(null);
  const [inviteLinkCopied, setInviteLinkCopied] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);
  const [actionMenuOpenId, setActionMenuOpenId] = useState<number | null>(null);

  // --- Settings State ---
  const [profileData, setProfileData] = useState({
      instituteName: "National Institute of Technology, Trichy",
      location: "Tiruchirappalli, Tamil Nadu",
      website: "https://www.nitt.edu",
      about: "NIT Trichy is one of the premier engineering institutions in India, known for its academic excellence and vibrant campus life. We consistently rank among the top engineering colleges in the country.",
      tpoName: "Dr. A. K. Bakthavatsalam",
      tpoEmail: "tpo@nitt.edu",
      tpoPhone: "+91 94860 01100",
      minCTC: "6",
      placementStart: "August",
      placementEnd: "April",
      offeredDegrees: ["B.Tech", "M.Tech", "MBA", "MCA", "Ph.D"],
      offeredBranches: ["Computer Science", "Electronics & Comm", "Mechanical", "Civil", "Chemical", "Production"]
  });
  const [isSaving, setIsSaving] = useState(false);
  
  // Settings - New Inputs
  const [newDegree, setNewDegree] = useState('');
  const [newBranch, setNewBranch] = useState('');

  const toggleEventExpand = (id: number) => {
      if (expandedEventId === id) setExpandedEventId(null);
      else setExpandedEventId(id);
  };

  const handleCreateEvent = (e: React.FormEvent) => {
      e.preventDefault();
      setShowEventForm(false);
      alert("Event Created Successfully! Eligibility criteria saved.");
  };

  const handleSaveProfile = () => {
      setIsSaving(true);
      setTimeout(() => {
          setIsSaving(false);
          alert("Profile updated successfully!");
      }, 1000);
  };

  const copyInviteLink = () => {
      navigator.clipboard.writeText("oncampus.in/student/invite/nit-trichy");
      setInviteLinkCopied(true);
      setTimeout(() => setInviteLinkCopied(false), 2000);
  };

  const toggleActionMenu = (e: React.MouseEvent, id: number) => {
      e.stopPropagation();
      setActionMenuOpenId(actionMenuOpenId === id ? null : id);
  };

  // Helper for array management in settings
  const addItem = (item: string, listKey: 'offeredDegrees' | 'offeredBranches', inputSetter: any) => {
      if (item && !profileData[listKey].includes(item)) {
          setProfileData(prev => ({
              ...prev,
              [listKey]: [...prev[listKey], item]
          }));
          inputSetter('');
      }
  };

  const removeItem = (item: string, listKey: 'offeredDegrees' | 'offeredBranches') => {
      setProfileData(prev => ({
          ...prev,
          [listKey]: prev[listKey].filter(i => i !== item)
      }));
  };

  const NavItem = ({ tab, icon: Icon, label }: { tab: Tab, icon: any, label: string }) => (
    <button 
      onClick={() => onTabChange(tab)}
      className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-200 group ${currentTab === tab ? 'bg-[#2c0033] text-white shadow-lg shadow-purple-900/20' : 'text-gray-500 hover:bg-white hover:text-[#2c0033]'}`}
    >
      <Icon size={22} strokeWidth={currentTab === tab ? 2.5 : 2} className="shrink-0" />
      <span className="font-bold text-base hidden md:block">{label}</span>
      {currentTab === tab && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#D7F037] hidden md:block"></div>}
    </button>
  );

  const navItems = [
    { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
    { id: 'events', icon: Calendar, label: 'Events' },
    { id: 'students', icon: GraduationCap, label: 'Students' },
    { id: 'messages', icon: MessageSquare, label: 'Messages' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar - Desktop Only */}
        <aside className="hidden md:block w-64 shrink-0">
          <nav className="sticky top-24 space-y-2 bg-gray-50/50 p-3 rounded-3xl border border-gray-100/50 backdrop-blur-sm">
            <NavItem tab="overview" icon={LayoutDashboard} label="Overview" />
            <NavItem tab="events" icon={Calendar} label="Events" />
            <NavItem tab="students" icon={GraduationCap} label="Students" />
            <NavItem tab="messages" icon={MessageSquare} label="Messages" />
            <NavItem tab="settings" icon={Settings} label="Settings" />
          </nav>
        </aside>

        {/* Bottom Navigation - Mobile Only */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 z-50 flex justify-between items-center pb-[env(safe-area-inset-bottom)]">
            {navItems.map((item) => (
               <button 
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex flex-col items-center gap-1 transition-all duration-200 ${currentTab === item.id ? 'text-[#2c0033]' : 'text-gray-400'}`}
               >
                  <item.icon size={24} strokeWidth={currentTab === item.id ? 2.5 : 2} /> 
                  <span className={`text-[10px] font-bold ${currentTab === item.id ? 'text-[#2c0033]' : 'text-gray-400'}`}>{item.label}</span>
               </button>
            ))}
        </div>

        {/* Main Content */}
        <main className="flex-1 min-w-0 pb-24 md:pb-0">
          
          {/* Overview Tab */}
          {currentTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                 <div>
                    <h1 className="text-3xl font-black text-[#2c0033]">Placement Cell</h1>
                    <p className="text-gray-500 font-medium">National Institute of Technology</p>
                 </div>
                 <div className="flex gap-3">
                     <button 
                        onClick={() => setShowInviteModal(true)}
                        className="flex items-center gap-2 bg-[#2c0033] text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-purple-900/20 hover:bg-[#1a001f] transition-all transform hover:-translate-y-1"
                     >
                        <Plus size={20} /> Invite Student
                     </button>
                 </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full -mr-8 -mt-8 opacity-50 group-hover:scale-110 transition-transform"></div>
                   <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-blue-50 text-blue-600 rounded-xl"><GraduationCap size={20} /></div>
                          <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">+12%</span>
                      </div>
                      <div className="text-3xl font-black text-[#2c0033]">1,240</div>
                      <div className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">Total Students</div>
                   </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-full -mr-8 -mt-8 opacity-50 group-hover:scale-110 transition-transform"></div>
                   <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-orange-50 text-orange-600 rounded-xl"><Building2 size={20} /></div>
                          <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">+5 New</span>
                      </div>
                      <div className="text-3xl font-black text-[#2c0033]">42</div>
                      <div className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">Active Companies</div>
                   </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-full -mr-8 -mt-8 opacity-50 group-hover:scale-110 transition-transform"></div>
                   <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-purple-50 text-purple-600 rounded-xl"><Briefcase size={20} /></div>
                      </div>
                      <div className="text-3xl font-black text-[#2c0033]">18</div>
                      <div className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">Open Drives</div>
                   </div>
                </div>

                <div className="bg-[#2c0033] p-6 rounded-3xl border border-[#2c0033] shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 group-hover:scale-110 transition-transform"></div>
                   <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-white/10 text-[#D7F037] rounded-xl"><CheckCircle2 size={20} /></div>
                      </div>
                      <div className="text-3xl font-black text-white">128</div>
                      <div className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">Offers Rolled Out</div>
                   </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Column: Feed */}
                  <div className="lg:col-span-2 space-y-6">
                      
                      {/* Create Post Widget */}
                      <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
                          <div className="flex gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-[#2c0033] flex items-center justify-center shrink-0 text-white">
                              <User size={20} />
                            </div>
                            <input 
                              type="text" 
                              placeholder="Post an official announcement for students..." 
                              className="flex-1 bg-gray-50 rounded-2xl px-5 py-2.5 outline-none focus:ring-2 focus:ring-[#2c0033] transition-all text-sm font-medium"
                            />
                          </div>
                          <div className="flex justify-between items-center px-2">
                            <div className="flex gap-4">
                              <button className="flex items-center gap-2 text-gray-500 hover:text-[#2c0033] text-sm font-bold bg-gray-50 px-3 py-1.5 rounded-lg transition-colors">
                                <ImageIcon size={18} /> Photo
                              </button>
                              <button className="flex items-center gap-2 text-gray-500 hover:text-[#2c0033] text-sm font-bold bg-gray-50 px-3 py-1.5 rounded-lg transition-colors">
                                <Video size={18} /> Video
                              </button>
                            </div>
                            <button className="bg-[#2c0033] text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-black transition-colors shadow-md">
                              Post Update
                            </button>
                          </div>
                      </div>

                      {/* Feed */}
                      <div className="space-y-4">
                          <h3 className="font-bold text-xl text-[#2c0033] px-1 flex items-center gap-2"><LayoutDashboard size={20}/> Campus Feed</h3>
                          {FEED_POSTS.map(post => (
                              <div key={post.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:border-gray-200 transition-colors">
                                  <div className="flex items-center gap-4 mb-4">
                                      <div className={`w-12 h-12 rounded-full flex items-center justify-center overflow-hidden font-bold text-lg shadow-sm ${post.avatarColor}`}>
                                          {post.type === 'official' ? <Building2 size={20} /> : post.author?.[0]}
                                      </div>
                                      <div>
                                          <h4 className="font-bold text-[#2c0033] flex items-center gap-2 text-base">
                                              {post.author} 
                                              {post.type === 'official' && <CheckCircle2 size={16} className="text-blue-500" />}
                                          </h4>
                                          <p className="text-xs text-gray-500 font-medium">{post.role} • {post.time}</p>
                                      </div>
                                  </div>
                                  <p className="text-gray-800 mb-6 leading-relaxed text-base">{post.content}</p>
                                  <div className="flex gap-6 text-gray-500 text-sm font-bold border-t border-gray-50 pt-4">
                                      <button className="flex items-center gap-2 hover:text-[#2c0033] px-2 py-1 rounded-lg hover:bg-gray-50 transition-colors"><ThumbsUp size={18}/> {post.likes}</button>
                                      <button className="flex items-center gap-2 hover:text-[#2c0033] px-2 py-1 rounded-lg hover:bg-gray-50 transition-colors"><MessageCircle size={18}/> {post.comments}</button>
                                      <button className="flex items-center gap-2 hover:text-[#2c0033] px-2 py-1 rounded-lg hover:bg-gray-50 transition-colors"><Share2 size={18}/> Share</button>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>

                  {/* Right Column: Status */}
                  <div className="space-y-6">
                      {/* Placement Status */}
                      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm sticky top-24">
                          <h3 className="font-bold text-lg text-[#2c0033] mb-8 text-center">Batch Status</h3>
                          <div className="relative w-56 h-56 mx-auto mb-8">
                              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                  <circle cx="50" cy="50" r="40" stroke="#f3f4f6" strokeWidth="8" fill="none" />
                                  <circle cx="50" cy="50" r="40" stroke="#2c0033" strokeWidth="8" fill="none" strokeDasharray="251.2" strokeDashoffset="60" strokeLinecap="round" />
                              </svg>
                              <div className="absolute inset-0 flex flex-col items-center justify-center">
                                  <span className="text-5xl font-black text-[#2c0033] tracking-tight">76%</span>
                                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-2">Placed</span>
                              </div>
                          </div>
                          <div className="space-y-4">
                              <div className="flex justify-between items-center p-4 bg-green-50/50 rounded-2xl border border-green-100">
                                  <div className="flex items-center gap-3">
                                      <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                                      <span className="text-sm font-bold text-gray-700">Placed Students</span>
                                  </div>
                                  <span className="font-black text-[#2c0033] text-lg">942</span>
                              </div>
                              <div className="flex justify-between items-center p-4 bg-gray-50/50 rounded-2xl border border-gray-100">
                                  <div className="flex items-center gap-3">
                                      <div className="w-2.5 h-2.5 rounded-full bg-gray-400"></div>
                                      <span className="text-sm font-bold text-gray-700">Looking</span>
                                  </div>
                                  <span className="font-black text-[#2c0033] text-lg">298</span>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
            </div>
          )}

          {/* Events Tab */}
          {currentTab === 'events' && (
             <div className="space-y-6 animate-in fade-in duration-500">
                <div className="flex justify-between items-center">
                   <div>
                      <h2 className="text-3xl font-black text-[#2c0033]">Events & Drives</h2>
                      <p className="text-gray-500 font-medium">Manage campus events, workshops, and placement drives.</p>
                   </div>
                   <button 
                    onClick={() => setShowEventForm(true)}
                    className="flex items-center gap-2 bg-[#2c0033] text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-purple-900/20 hover:bg-[#1a001f] transition-all"
                   >
                      <Plus size={20} /> Create Event
                   </button>
                </div>

                {/* Create Event Form (Inline) */}
                {showEventForm && (
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl mb-8 animate-in slide-in-from-top-4">
                        <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                            <h3 className="font-bold text-xl text-[#2c0033]">New Event Details</h3>
                            <button onClick={() => setShowEventForm(false)} className="text-gray-400 hover:text-gray-600 bg-gray-50 p-2 rounded-full"><X size={20} /></button>
                        </div>
                        <form onSubmit={handleCreateEvent} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Event Title</label>
                                <input type="text" placeholder="e.g. Pre-Placement Talk - Google" className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2c0033]" required />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Company / Organizer</label>
                                <input type="text" placeholder="e.g. Google" className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2c0033]" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Location / Link</label>
                                <input type="text" placeholder="e.g. Auditorium or Zoom Link" className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2c0033]" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Date</label>
                                <input type="date" className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2c0033]" required />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Time</label>
                                <input type="time" className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2c0033]" required />
                            </div>
                            
                            {/* Eligibility Section */}
                            <div className="md:col-span-2 border-t border-gray-100 pt-6 mt-2">
                                <h4 className="font-bold text-[#2c0033] mb-4 text-lg">Eligibility & Target Audience</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">Min CGPA</label>
                                        <input type="number" placeholder="e.g. 7.0" className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2c0033]" step="0.1" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">Eligible Branches</label>
                                        <select className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2c0033]">
                                            {BRANCHES.map(branch => (
                                                <option key={branch} value={branch}>{branch}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="md:col-span-3">
                                        <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">Target Students</label>
                                        <select className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2c0033]">
                                            <option value="all">All Eligible Students</option>
                                            <option value="final_year">Final Year Only</option>
                                            <option value="pre_final">Pre-Final Year Only</option>
                                            <option value="selected">Select Specific Students</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="md:col-span-2 flex justify-end gap-3 mt-6 border-t border-gray-100 pt-6">
                                <button type="button" onClick={() => setShowEventForm(false)} className="px-6 py-3 text-gray-600 font-bold hover:bg-gray-50 rounded-xl transition-colors">Cancel</button>
                                <button type="submit" className="px-8 py-3 bg-[#2c0033] text-white font-bold rounded-xl hover:bg-black transition-colors shadow-lg">Publish Event</button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="grid gap-6">
                    {EVENTS.map((event) => (
                        <div key={event.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
                            <div className="p-6 flex flex-col md:flex-row items-start justify-between gap-6">
                                <div className="flex items-start gap-6 w-full md:w-auto">
                                    <div className="w-20 h-20 bg-gray-50 rounded-2xl border border-gray-200 flex flex-col items-center justify-center shrink-0 group-hover:border-[#2c0033]/20 transition-colors">
                                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                                        <span className="text-3xl font-black text-[#2c0033]">{new Date(event.date).getDate()}</span>
                                    </div>
                                    <div className="pt-1">
                                        <h3 className="font-bold text-xl text-[#2c0033] mb-2">{event.title}</h3>
                                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 font-medium">
                                            <span className="flex items-center gap-1.5"><Building2 size={16} className="text-gray-400" /> {event.company}</span>
                                            <span className="flex items-center gap-1.5"><Clock size={16} className="text-gray-400" /> {event.time}</span>
                                            <span className="flex items-center gap-1.5"><MapPin size={16} className="text-gray-400" /> {event.location}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-3 w-full md:w-auto self-center">
                                    <button className="flex-1 md:flex-none px-5 py-2.5 border border-gray-200 text-gray-600 rounded-xl font-bold hover:bg-gray-50 transition-colors">Edit</button>
                                    <button 
                                        onClick={() => toggleEventExpand(event.id)}
                                        className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors ${expandedEventId === event.id ? 'bg-gray-100 text-[#2c0033]' : 'bg-[#2c0033] text-white hover:bg-[#1a001f]'}`}
                                    >
                                        Registrations
                                        {expandedEventId === event.id ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}
                                    </button>
                                </div>
                            </div>
                            
                            {/* Registrations Panel */}
                            {expandedEventId === event.id && (
                                <div className="bg-gray-50 border-t border-gray-100 p-8 animate-in slide-in-from-top-2">
                                    <div className="flex justify-between items-center mb-6">
                                        <h4 className="font-bold text-base text-[#2c0033]">Registered Students ({event.registrations.length})</h4>
                                        <button className="text-xs font-bold text-[#2c0033] bg-white border border-gray-200 px-3 py-1.5 rounded-lg hover:shadow-sm transition-shadow">Download CSV</button>
                                    </div>
                                    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                                        <table className="w-full text-left text-sm">
                                            <thead className="bg-gray-50/50 border-b border-gray-100">
                                                <tr>
                                                    <th className="p-4 font-bold text-gray-500 uppercase text-xs tracking-wider">Student Name</th>
                                                    <th className="p-4 font-bold text-gray-500 uppercase text-xs tracking-wider">ID</th>
                                                    <th className="p-4 font-bold text-gray-500 uppercase text-xs tracking-wider">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-50">
                                                {event.registrations.map((reg, idx) => (
                                                    <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                                                        <td className="p-4 font-bold text-[#2c0033]">{reg.name}</td>
                                                        <td className="p-4 text-gray-500 font-medium">{reg.id}</td>
                                                        <td className="p-4"><span className="text-green-700 text-xs font-bold bg-green-50 border border-green-100 px-2.5 py-1 rounded-full flex items-center gap-1 w-fit"><Check size={10} /> Registered</span></td>
                                                    </tr>
                                                ))}
                                                {event.registrations.length === 0 && (
                                                    <tr>
                                                        <td colSpan={3} className="p-8 text-center text-gray-400 font-medium">No registrations yet.</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
             </div>
          )}

          {/* Students Tab */}
          {currentTab === 'students' && (
             <div className="space-y-6 animate-in fade-in duration-500">
                <div className="flex justify-between items-center">
                   <div>
                       <h2 className="text-3xl font-black text-[#2c0033]">Student Database</h2>
                       <p className="text-gray-500 font-medium mt-1">Manage all your student profiles and their placement status.</p>
                   </div>
                   <button className="flex items-center gap-2 bg-white border border-gray-200 px-5 py-2.5 rounded-xl font-bold text-[#2c0033] hover:bg-gray-50 shadow-sm transition-all">
                      <Share2 size={18} /> Share Profile Link
                   </button>
                </div>
                
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-visible">
                   {/* Table Header Controls */}
                   <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex gap-4 rounded-t-3xl">
                       <div className="relative flex-1">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                          <input type="text" placeholder="Search by name, branch, or ID..." className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2c0033]" />
                       </div>
                       <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl font-bold text-gray-600 hover:text-[#2c0033] flex items-center gap-2">
                           <Filter size={18} /> Filter
                       </button>
                   </div>

                   <div className="overflow-visible">
                       <table className="w-full text-left">
                          <thead className="bg-white border-b border-gray-100">
                             <tr>
                                <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Name</th>
                                <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Branch</th>
                                <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Batch</th>
                                <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-wider">CGPA</th>
                                <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Company</th>
                                <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Action</th>
                             </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-50 relative">
                             {STUDENTS.map((student) => (
                                <tr 
                                    key={student.id} 
                                    onClick={() => setSelectedStudent(student)}
                                    className="hover:bg-gray-50 transition-colors group cursor-pointer relative"
                                >
                                   <td className="p-5 font-bold text-[#2c0033] flex items-center gap-3">
                                       <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 group-hover:bg-[#2c0033] group-hover:text-white transition-colors">{student.name?.[0]}</div>
                                       {student.name}
                                   </td>
                                   <td className="p-5 text-gray-600 font-medium">{student.branch}</td>
                                   <td className="p-5 text-gray-600 font-medium">{student.batch}</td>
                                   <td className="p-5 font-bold text-[#2c0033]">{student.cgpa}</td>
                                   <td className="p-5">
                                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                                          student.status === 'Placed' ? 'bg-green-50 text-green-700 border-green-100' : 
                                          student.status === 'Shortlisted' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                                          'bg-orange-50 text-orange-700 border-orange-100'
                                      }`}>
                                         {student.status}
                                      </span>
                                   </td>
                                   <td className="p-5 text-sm font-bold text-gray-700">{student.company !== '-' ? student.company : <span className="text-gray-300">-</span>}</td>
                                   <td className="p-5 text-right relative">
                                      <button 
                                        onClick={(e) => toggleActionMenu(e, student.id)}
                                        className="p-2 text-gray-400 hover:text-[#2c0033] hover:bg-gray-100 rounded-lg transition-colors"
                                      >
                                        <MoreHorizontal size={20}/>
                                      </button>
                                      
                                      {/* Action Menu Dropdown */}
                                      {actionMenuOpenId === student.id && (
                                          <div className="absolute right-8 top-8 w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-20 flex flex-col p-1 animate-in fade-in zoom-in-95 duration-200">
                                              <button onClick={(e) => { e.stopPropagation(); setSelectedStudent(student); setActionMenuOpenId(null); }} className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-lg text-sm font-medium text-gray-700 text-left">
                                                  <User size={16} /> View Profile
                                              </button>
                                              <button onClick={(e) => { e.stopPropagation(); setActionMenuOpenId(null); }} className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-lg text-sm font-medium text-gray-700 text-left">
                                                  <Edit2 size={16} /> Edit Status
                                              </button>
                                              <button onClick={(e) => { e.stopPropagation(); setActionMenuOpenId(null); }} className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-lg text-sm font-medium text-gray-700 text-left">
                                                  <MessageSquare size={16} /> Send Message
                                              </button>
                                              <div className="h-px bg-gray-100 my-1"></div>
                                              <button onClick={(e) => { e.stopPropagation(); setActionMenuOpenId(null); }} className="flex items-center gap-2 px-3 py-2 hover:bg-red-50 rounded-lg text-sm font-medium text-red-600 text-left">
                                                  <Trash2 size={16} /> Remove
                                              </button>
                                          </div>
                                      )}
                                   </td>
                                </tr>
                             ))}
                          </tbody>
                       </table>
                   </div>
                   
                   {/* Pagination */}
                   <div className="p-4 border-t border-gray-100 flex justify-between items-center bg-gray-50/50 rounded-b-3xl">
                       <span className="text-sm text-gray-500 font-medium">Showing 5 of 1240 students</span>
                       <div className="flex gap-2">
                           <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm font-bold text-gray-400 hover:text-gray-600 disabled:opacity-50">Prev</button>
                           <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm font-bold text-[#2c0033] bg-white hover:bg-gray-50">Next</button>
                       </div>
                   </div>
                </div>
             </div>
          )}
          
          {/* Messages Tab Placeholder */}
          {currentTab === 'messages' && (
             <div className="flex flex-col items-center justify-center h-[500px] bg-white rounded-3xl border border-gray-100 shadow-sm">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                   <Mail size={32} className="text-gray-400" />
                </div>
                <h3 className="text-2xl font-black text-[#2c0033]">Inbox</h3>
                <p className="text-gray-500 font-medium">Communicate directly with recruiters and students.</p>
                <button className="mt-6 px-6 py-3 bg-[#2c0033] text-white font-bold rounded-xl hover:bg-black transition-colors">Start Conversation</button>
             </div>
          )}

          {/* Settings Tab */}
          {currentTab === 'settings' && (
             <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
                <div className="flex justify-between items-center">
                   <div>
                      <h2 className="text-3xl font-black text-[#2c0033]">Settings</h2>
                      <p className="text-gray-500 font-medium">Manage institute profile, placement policies, and account settings.</p>
                   </div>
                   <div className="flex gap-3">
                       <button 
                          onClick={handleSaveProfile}
                          disabled={isSaving}
                          className="flex items-center gap-2 bg-[#2c0033] text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-[#1a001f] transition-all disabled:opacity-70"
                       >
                          {isSaving ? 'Saving...' : <><Save size={20} /> Save Changes</>}
                       </button>
                       <button 
                          onClick={onLogout}
                          className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 px-6 py-3 rounded-xl font-bold hover:bg-red-100 transition-all"
                       >
                          <LogOut size={20} /> Logout
                       </button>
                   </div>
                </div>

                <div className="grid gap-8">
                    
                    {/* Institute Profile Card */}
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                            <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-700 flex items-center justify-center">
                                <Building2 size={20} />
                            </div>
                            <h3 className="text-xl font-bold text-[#2c0033]">Institute Profile</h3>
                        </div>
                        
                        <div className="space-y-6">
                            {/* Logo Upload Simulation */}
                            <div className="flex items-center gap-6">
                                <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-300 hover:border-[#2c0033] cursor-pointer transition-colors group">
                                    <div className="text-center text-gray-400 group-hover:text-[#2c0033]">
                                        <ImageIcon size={24} className="mx-auto mb-1" />
                                        <span className="text-[10px] font-bold uppercase">Upload Logo</span>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-[#2c0033]">Institute Logo</h4>
                                    <p className="text-sm text-gray-500 mt-1">This logo will be visible on your public profile and job postings. Recommended size: 512x512px.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Institute Name</label>
                                    <input 
                                        type="text" 
                                        value={profileData.instituteName}
                                        onChange={(e) => setProfileData({...profileData, instituteName: e.target.value})}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2c0033] font-medium"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Location</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input 
                                            type="text" 
                                            value={profileData.location}
                                            onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2c0033] font-medium"
                                        />
                                    </div>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Website</label>
                                    <div className="relative">
                                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input 
                                            type="text" 
                                            value={profileData.website}
                                            onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2c0033] font-medium"
                                        />
                                    </div>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">About Institute</label>
                                    <textarea 
                                        value={profileData.about}
                                        onChange={(e) => setProfileData({...profileData, about: e.target.value})}
                                        rows={4}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2c0033] font-medium resize-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Academic Configuration (New Section) */}
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                            <div className="w-10 h-10 rounded-full bg-green-50 text-green-700 flex items-center justify-center">
                                <BookOpen size={20} />
                            </div>
                            <h3 className="text-xl font-bold text-[#2c0033]">Academic Configuration</h3>
                        </div>

                        <div className="space-y-8">
                            {/* Degrees */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-3">Courses / Degrees Offered</label>
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {profileData.offeredDegrees.map(deg => (
                                        <span key={deg} className="px-3 py-1 bg-gray-100 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 flex items-center gap-2 group">
                                            {deg}
                                            <button onClick={() => removeItem(deg, 'offeredDegrees')} className="text-gray-400 hover:text-red-500"><X size={14}/></button>
                                        </span>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <input 
                                        type="text" 
                                        value={newDegree}
                                        onChange={(e) => setNewDegree(e.target.value)}
                                        placeholder="Add new degree (e.g. B.Arch)"
                                        className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2c0033]"
                                        onKeyDown={(e) => e.key === 'Enter' && addItem(newDegree, 'offeredDegrees', setNewDegree)}
                                    />
                                    <button onClick={() => addItem(newDegree, 'offeredDegrees', setNewDegree)} className="px-4 py-2 bg-[#2c0033] text-white rounded-xl font-bold text-sm">Add</button>
                                </div>
                            </div>

                            {/* Branches */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-3">Branches / Specializations</label>
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {profileData.offeredBranches.map(br => (
                                        <span key={br} className="px-3 py-1 bg-gray-100 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 flex items-center gap-2 group">
                                            {br}
                                            <button onClick={() => removeItem(br, 'offeredBranches')} className="text-gray-400 hover:text-red-500"><X size={14}/></button>
                                        </span>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <input 
                                        type="text" 
                                        value={newBranch}
                                        onChange={(e) => setNewBranch(e.target.value)}
                                        placeholder="Add new branch (e.g. Robotics)"
                                        className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2c0033]"
                                        onKeyDown={(e) => e.key === 'Enter' && addItem(newBranch, 'offeredBranches', setNewBranch)}
                                    />
                                    <button onClick={() => addItem(newBranch, 'offeredBranches', setNewBranch)} className="px-4 py-2 bg-[#2c0033] text-white rounded-xl font-bold text-sm">Add</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Placement Policy Card */}
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center">
                                <Shield size={20} />
                            </div>
                            <h3 className="text-xl font-bold text-[#2c0033]">Placement Policy</h3>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Minimum CTC Criteria (LPA)</label>
                                <input 
                                    type="number" 
                                    value={profileData.minCTC}
                                    onChange={(e) => setProfileData({...profileData, minCTC: e.target.value})}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2c0033] font-medium"
                                />
                                <p className="text-xs text-gray-500 mt-2">Companies offering below this will require special approval.</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Start Month</label>
                                    <select 
                                        value={profileData.placementStart}
                                        onChange={(e) => setProfileData({...profileData, placementStart: e.target.value})}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2c0033] font-medium"
                                    >
                                        {["August", "September", "October"].map(m => <option key={m} value={m}>{m}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">End Month</label>
                                    <select 
                                        value={profileData.placementEnd}
                                        onChange={(e) => setProfileData({...profileData, placementEnd: e.target.value})}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2c0033] font-medium"
                                    >
                                        {["March", "April", "May"].map(m => <option key={m} value={m}>{m}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Info Card */}
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                            <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-700 flex items-center justify-center">
                                <User size={20} />
                            </div>
                            <h3 className="text-xl font-bold text-[#2c0033]">Contact Information</h3>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Placement Officer Name</label>
                                <input 
                                    type="text" 
                                    value={profileData.tpoName}
                                    onChange={(e) => setProfileData({...profileData, tpoName: e.target.value})}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2c0033] font-medium"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Official Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input 
                                        type="email" 
                                        value={profileData.tpoEmail}
                                        onChange={(e) => setProfileData({...profileData, tpoEmail: e.target.value})}
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2c0033] font-medium"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input 
                                        type="tel" 
                                        value={profileData.tpoPhone}
                                        onChange={(e) => setProfileData({...profileData, tpoPhone: e.target.value})}
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2c0033] font-medium"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
             </div>
          )}

        </main>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2c0033]/20 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-[2rem] w-full max-w-lg p-10 shadow-2xl relative animate-in slide-in-from-bottom-8 duration-300">
                <button onClick={() => setShowInviteModal(false)} className="absolute top-6 right-6 p-2 hover:bg-gray-50 rounded-full transition-colors text-gray-400">
                   <X size={24} />
                </button>
                
                <div className="text-center mb-8">
                   <div className="w-20 h-20 bg-[#D7F037] rounded-full flex items-center justify-center mx-auto mb-6 text-[#2c0033] shadow-lg shadow-[#D7F037]/30">
                      <Plus size={40} strokeWidth={3} />
                   </div>
                   <h3 className="text-3xl font-black text-[#2c0033] tracking-tight">Invite Students</h3>
                   <p className="text-gray-500 mt-2 text-lg">Get your students onboarded to OnCampus.</p>
                </div>

                <div className="space-y-6">
                    <div>
                       <label className="block text-sm font-bold text-gray-700 mb-3">Share Invite Link</label>
                       <div className="flex gap-2">
                          <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-sm text-gray-600 truncate font-medium">
                             oncampus.in/student/invite/nit-trichy
                          </div>
                          <button 
                            onClick={copyInviteLink}
                            className={`p-4 rounded-xl font-bold transition-all shadow-md ${inviteLinkCopied ? 'bg-green-500 text-white' : 'bg-[#2c0033] text-white hover:bg-[#1a001f]'}`}
                          >
                             {inviteLinkCopied ? <Check size={20} /> : <Copy size={20} />}
                          </button>
                       </div>
                    </div>

                    <div className="relative flex py-2 items-center">
                        <div className="flex-grow border-t border-gray-200"></div>
                        <span className="flex-shrink-0 mx-4 text-gray-400 text-xs font-bold uppercase tracking-widest">Or Send Emails</span>
                        <div className="flex-grow border-t border-gray-200"></div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3">Email Addresses</label>
                        <textarea 
                           className="w-full h-32 bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#2c0033] font-medium"
                           placeholder="Enter emails separated by commas..."
                        ></textarea>
                    </div>

                    <button className="w-full bg-[#2c0033] text-white font-bold py-4 rounded-xl text-lg hover:bg-[#1a001f] transition-colors shadow-xl">
                       Send Invites
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* Student Detail Modal */}
      {selectedStudent && (
          <StudentDetailModal 
            student={selectedStudent} 
            onClose={() => setSelectedStudent(null)} 
          />
      )}
    </div>
  );
};

export default UniversityDashboard;