import React, { useState, useMemo } from 'react';
import { Upload, FileText, Link as LinkIcon, ChevronRight, ArrowLeft, GraduationCap, Sparkles, CheckCircle2, ChevronDown, Search } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
  inviteCode?: string;
}

// Mock Database for Colleges and Degrees
const COLLEGE_DB: Record<string, { name: string; degrees: string[] }> = {
  'NIT-T': { 
    name: 'NIT Trichy', 
    degrees: ['B.Tech', 'M.Tech', 'MBA', 'MCA', 'Ph.D'] 
  },
  'IIT-D': { 
    name: 'IIT Delhi', 
    degrees: ['B.Tech', 'M.Tech', 'Ph.D'] 
  },
};

const ALL_DEGREES = [
    "B.Tech", "B.E.", "M.Tech", "M.E.", "BCA", "MCA", "B.Sc", "M.Sc", "MBA", "BBA", "B.Com", "M.Com",
    "B.A.", "M.A.", "PhD", "Diploma", "B.Des", "M.Des", "B.Arch", "M.Arch", "MBBS", "BDS", "B.Pharm", "M.Pharm",
    "LLB", "LLM", "BHM", "B.Voc"
];

const ALL_BRANCHES = [
    "Computer Science", "Information Technology", "Electronics & Communication", "Electrical Engineering", 
    "Mechanical Engineering", "Civil Engineering", "Chemical Engineering", "Aerospace Engineering", "Biotechnology",
    "Artificial Intelligence", "Data Science", "Cyber Security", "Robotics", "Automobile Engineering",
    "Finance", "Marketing", "Human Resources", "Operations", "International Business", "Supply Chain",
    "Physics", "Chemistry", "Mathematics", "Economics", "Psychology", "English Literature", "History",
    "Law", "Architecture", "Design", "Pharmacy", "Nursing", "Hotel Management"
];

const Onboarding: React.FC<OnboardingProps> = ({ onComplete, inviteCode = '' }) => {
  const [step, setStep] = useState(1);
  const [academicData, setAcademicData] = useState({
    degree: '',
    branch: '',
    gradYear: ''
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeLink, setResumeLink] = useState('');

  // Dropdown States
  const [isDegreeOpen, setIsDegreeOpen] = useState(false);
  const [degreeSearch, setDegreeSearch] = useState('');
  
  const [isBranchOpen, setIsBranchOpen] = useState(false);
  const [branchSearch, setBranchSearch] = useState('');

  // Determine College Context
  const college = COLLEGE_DB[inviteCode] || null;
  // If specific college invite used, prioritize their degrees, else use global list
  const availableDegrees = college && college.degrees.length > 0 ? college.degrees : ALL_DEGREES;

  // Filter degrees based on search
  const filteredDegrees = useMemo(() => {
    return availableDegrees.filter(d => d.toLowerCase().includes(degreeSearch.toLowerCase()));
  }, [availableDegrees, degreeSearch]);

  const filteredBranches = useMemo(() => {
      return ALL_BRANCHES.filter(b => b.toLowerCase().includes(branchSearch.toLowerCase()));
  }, [branchSearch]);

  const handleAcademicChange = (name: string, value: string) => {
    setAcademicData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const nextStep = () => setStep(2);
  const prevStep = () => setStep(1);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#FDFDF5]">
      
      {/* Left Panel: Visuals & Context */}
      <div className="lg:w-5/12 bg-[#0D1C22] p-8 lg:p-16 flex flex-col justify-between relative overflow-hidden text-white min-h-[300px] lg:min-h-screen">
         {/* Background Elements */}
         <div className="absolute top-0 right-0 w-96 h-96 bg-[#D7F037] rounded-full blur-[120px] opacity-10 -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
         <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-10 translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>

         <div className="relative z-10">
            <div className="flex items-center gap-2 mb-12 opacity-80">
               <div className="w-8 h-8 rounded-lg bg-[#D7F037] flex items-center justify-center">
                  <span className="font-bold text-[#0D1C22] italic text-sm">On</span>
               </div>
               <span className="font-bold text-lg tracking-tight">OnCampus Profile</span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-black mb-6 leading-tight">
               Let's get you <br/>
               <span className="text-[#D7F037]">hired.</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-md leading-relaxed">
               {college 
                 ? `Welcome, student of ${college.name}. Complete your profile to unlock exclusive campus drives.` 
                 : "Complete your profile to unlock exclusive opportunities from India's top employers."}
            </p>
         </div>

         {/* Dynamic Tip Card */}
         <div className="relative z-10 mt-auto hidden lg:block animate-in slide-in-from-bottom-4 duration-700 delay-200">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
               <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#D7F037]/20 flex items-center justify-center shrink-0 text-[#D7F037]">
                     <Sparkles size={20} />
                  </div>
                  <div>
                     <p className="font-bold text-sm mb-1 text-white">
                        {step === 1 ? "Why accurate details matter?" : "Did you know?"}
                     </p>
                     <p className="text-xs text-gray-400 leading-relaxed">
                        {step === 1 
                           ? "Recruiters filter candidates by Graduation Year and Branch first. Ensure these match your official college records." 
                           : "Profiles with a verified resume link receive 5x more interview calls on average compared to empty profiles."}
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* Right Panel: Form */}
      <div className="flex-1 flex flex-col justify-center p-6 lg:p-12 xl:p-24 relative bg-white lg:bg-[#FDFDF5]">
         
         <div className="w-full max-w-lg mx-auto">
            {/* Progress Indicator */}
            <div className="flex items-center justify-between mb-8">
               <div className="flex gap-2">
                  <div className={`h-2 w-12 rounded-full transition-colors duration-300 ${step >= 1 ? 'bg-[#0D1C22]' : 'bg-gray-200'}`}></div>
                  <div className={`h-2 w-12 rounded-full transition-colors duration-300 ${step >= 2 ? 'bg-[#0D1C22]' : 'bg-gray-200'}`}></div>
               </div>
               <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Step {step} of 2</span>
            </div>

            {/* Step 1: Academic Details */}
            {step === 1 && (
               <div className="animate-in slide-in-from-right-8 fade-in duration-500">
                  <h2 className="text-3xl font-black text-[#0D1C22] mb-2">Academic Details</h2>
                  <p className="text-gray-500 mb-8">Tell us about your educational background.</p>

                  <div className="space-y-6">
                     
                     {/* Searchable Dropdown for Degree */}
                     <div className="relative">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Course / Degree</label>
                        <div 
                           className="relative w-full"
                           onClick={() => setIsDegreeOpen(!isDegreeOpen)}
                        >
                           <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                           <input
                              type="text"
                              readOnly
                              value={academicData.degree}
                              placeholder="Select your degree"
                              className="w-full pl-10 pr-10 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D1C22] focus:border-transparent transition-all shadow-sm font-medium cursor-pointer"
                           />
                           <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                        </div>

                        {isDegreeOpen && (
                           <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl max-h-60 overflow-hidden flex flex-col animate-in fade-in slide-in-from-top-2 duration-200">
                              <div className="p-2 border-b border-gray-50 sticky top-0 bg-white">
                                 <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                    <input 
                                       type="text" 
                                       autoFocus
                                       placeholder="Search..." 
                                       value={degreeSearch}
                                       onChange={(e) => setDegreeSearch(e.target.value)}
                                       className="w-full pl-9 pr-4 py-2 bg-gray-50 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#0D1C22]"
                                    />
                                 </div>
                              </div>
                              <div className="overflow-y-auto flex-1 p-2">
                                 {filteredDegrees.map((deg) => (
                                    <button
                                       key={deg}
                                       onClick={() => {
                                          handleAcademicChange('degree', deg);
                                          setIsDegreeOpen(false);
                                          setDegreeSearch('');
                                       }}
                                       className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors ${academicData.degree === deg ? 'bg-[#0D1C22]/5 text-[#0D1C22]' : 'text-gray-600'}`}
                                    >
                                       {deg}
                                    </button>
                                 ))}
                                 {filteredDegrees.length === 0 && (
                                    <div className="p-4 text-center text-sm text-gray-400">No results found</div>
                                 )}
                              </div>
                           </div>
                        )}
                     </div>

                     {/* Searchable Dropdown for Branch */}
                     <div className="relative">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Branch / Specialization</label>
                        <div 
                           className="relative w-full"
                           onClick={() => setIsBranchOpen(!isBranchOpen)}
                        >
                           <input
                              type="text"
                              readOnly
                              value={academicData.branch}
                              placeholder="e.g. Computer Science, Marketing"
                              className="w-full px-4 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D1C22] focus:border-transparent transition-all shadow-sm font-medium cursor-pointer"
                           />
                           <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                        </div>

                        {isBranchOpen && (
                           <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl max-h-60 overflow-hidden flex flex-col animate-in fade-in slide-in-from-top-2 duration-200">
                              <div className="p-2 border-b border-gray-50 sticky top-0 bg-white">
                                 <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                    <input 
                                       type="text" 
                                       autoFocus
                                       placeholder="Search specialization..." 
                                       value={branchSearch}
                                       onChange={(e) => setBranchSearch(e.target.value)}
                                       className="w-full pl-9 pr-4 py-2 bg-gray-50 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#0D1C22]"
                                    />
                                 </div>
                              </div>
                              <div className="overflow-y-auto flex-1 p-2">
                                 {filteredBranches.map((br) => (
                                    <button
                                       key={br}
                                       onClick={() => {
                                          handleAcademicChange('branch', br);
                                          setIsBranchOpen(false);
                                          setBranchSearch('');
                                       }}
                                       className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors ${academicData.branch === br ? 'bg-[#0D1C22]/5 text-[#0D1C22]' : 'text-gray-600'}`}
                                    >
                                       {br}
                                    </button>
                                 ))}
                                 {filteredBranches.length === 0 && (
                                    <button
                                        onClick={() => {
                                            handleAcademicChange('branch', branchSearch);
                                            setIsBranchOpen(false);
                                            setBranchSearch('');
                                        }}
                                        className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-[#0D1C22] font-bold"
                                    >
                                        Add "{branchSearch}"
                                    </button>
                                )}
                              </div>
                           </div>
                        )}
                     </div>

                     <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Graduation Year</label>
                        <div className="grid grid-cols-3 gap-3">
                           {['2024', '2025', '2026', '2027', '2028', '2029'].map(year => (
                              <button
                                 key={year}
                                 onClick={() => handleAcademicChange('gradYear', year)}
                                 className={`py-3 rounded-xl text-sm font-bold border transition-all ${
                                    academicData.gradYear === year 
                                    ? 'bg-[#0D1C22] text-white border-[#0D1C22] shadow-md transform scale-105' 
                                    : 'bg-white text-gray-600 border-gray-200 hover:border-[#0D1C22] hover:bg-gray-50'
                                 }`}
                              >
                                 {year}
                              </button>
                           ))}
                        </div>
                     </div>

                     <div className="pt-6">
                        <button 
                           onClick={nextStep}
                           disabled={!academicData.degree || !academicData.branch || !academicData.gradYear}
                           className="w-full bg-[#D7F037] text-[#0D1C22] font-bold py-4 rounded-xl text-lg hover:bg-[#c5dc33] transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98]"
                        >
                           Continue <ChevronRight size={20} />
                        </button>
                     </div>
                  </div>
               </div>
            )}

            {/* Step 2: Resume */}
            {step === 2 && (
               <div className="animate-in slide-in-from-right-8 fade-in duration-500">
                  <button onClick={prevStep} className="flex items-center gap-2 text-sm text-gray-500 font-bold hover:text-[#0D1C22] mb-6 transition-colors">
                     <ArrowLeft size={16} /> Back
                  </button>

                  <h2 className="text-3xl font-black text-[#0D1C22] mb-2">Add Resume</h2>
                  <p className="text-gray-500 mb-8">Upload your CV to get matched with relevant jobs.</p>

                  <div className="space-y-6">
                     {/* File Upload Area */}
                     <label className={`relative border-2 border-dashed rounded-2xl p-10 text-center transition-all cursor-pointer group flex flex-col items-center justify-center min-h-[200px] ${resumeFile ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-[#0D1C22] hover:bg-gray-50'}`}>
                        <input 
                           type="file" 
                           accept=".pdf,.doc,.docx"
                           onChange={handleFileChange}
                           className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all ${resumeFile ? 'bg-green-100 text-green-600 scale-110' : 'bg-gray-100 text-gray-400 group-hover:bg-[#0D1C22] group-hover:text-white'}`}>
                           {resumeFile ? <CheckCircle2 size={32} /> : <Upload size={32} />}
                        </div>
                        {resumeFile ? (
                           <>
                              <p className="font-bold text-[#0D1C22] text-lg">{resumeFile.name}</p>
                              <p className="text-sm text-green-600 font-medium mt-1">Ready to upload</p>
                              <p className="text-xs text-gray-400 mt-2">Click to replace</p>
                           </>
                        ) : (
                           <>
                              <p className="font-bold text-[#0D1C22] text-lg">Click to upload resume</p>
                              <p className="text-sm text-gray-500 mt-1 group-hover:text-gray-700">or drag and drop PDF, DOCX (Max 10MB)</p>
                           </>
                        )}
                     </label>

                     <div className="relative flex py-2 items-center">
                        <div className="flex-grow border-t border-gray-200"></div>
                        <span className="flex-shrink-0 mx-4 text-gray-400 text-xs font-bold uppercase tracking-widest">Or paste link</span>
                        <div className="flex-grow border-t border-gray-200"></div>
                     </div>

                     {/* Link Input */}
                     <div className="relative group">
                        <LinkIcon size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0D1C22] transition-colors" />
                        <input
                           type="url"
                           value={resumeLink}
                           onChange={(e) => setResumeLink(e.target.value)}
                           placeholder="Google Drive, LinkedIn, Portfolio link..."
                           className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D1C22] focus:border-transparent transition-all shadow-sm font-medium"
                        />
                     </div>

                     <div className="flex flex-col gap-3 pt-4">
                        <button 
                           onClick={onComplete}
                           className="w-full bg-[#0D1C22] text-white font-bold py-4 rounded-xl text-lg hover:bg-black transition-all shadow-lg transform active:scale-[0.98]"
                        >
                           Complete Profile
                        </button>
                        <button 
                           onClick={onComplete}
                           className="w-full py-3 text-gray-400 font-bold hover:text-gray-600 text-sm transition-colors"
                        >
                           I'll do this later
                        </button>
                     </div>
                  </div>
               </div>
            )}

         </div>
      </div>
    </div>
  );
};

export default Onboarding;