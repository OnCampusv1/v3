import React, { useState } from 'react';
import { ChevronRight, ArrowLeft, Check, BookOpen, Users, ShieldCheck, Briefcase, Building2, CheckCircle2, Search, X } from 'lucide-react';

interface UniversityOnboardingProps {
  onComplete: () => void;
}

const UniversityOnboarding: React.FC<UniversityOnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  
  // Form States
  const [degrees, setDegrees] = useState<string[]>([]);
  const [branches, setBranches] = useState<string[]>([]);
  const [gradYears, setGradYears] = useState<string[]>([]);
  
  // Search Inputs
  const [degreeSearch, setDegreeSearch] = useState('');
  const [branchSearch, setBranchSearch] = useState('');
  const [isDegreeOpen, setIsDegreeOpen] = useState(false);
  const [isBranchOpen, setIsBranchOpen] = useState(false);

  const [stats, setStats] = useState({
      studentCount: '',
      placementStart: '',
      placementEnd: '',
      internshipStart: '',
      internshipEnd: ''
  });

  const [preferences, setPreferences] = useState({
      minCTC: '',
      allowInternships: true,
      minStipend: '',
      roleRestrictions: [] as string[],
      eligibility: [] as string[]
  });

  const [permissions, setPermissions] = useState({
      verifyStudents: false,
      showProfile: true,
      trackPlacements: true
  });

  const toggleItem = (item: string, list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>) => {
     if (list.includes(item)) {
         setList(list.filter(i => i !== item));
     } else {
         setList([...list, item]);
     }
  };

  const removeItem = (item: string, list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>) => {
      setList(list.filter(i => i !== item));
  };

  const addItem = (item: string, list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>) => {
      if (!list.includes(item)) {
          setList([...list, item]);
      }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  // Expanded Data Lists
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

  const YEAR_OPTIONS = ["2024", "2025", "2026", "2027", "2028", "2029"];
  const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  // Filter Logic
  const filteredDegrees = ALL_DEGREES.filter(d => d.toLowerCase().includes(degreeSearch.toLowerCase()));
  const filteredBranches = ALL_BRANCHES.filter(b => b.toLowerCase().includes(branchSearch.toLowerCase()));

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#FDFDF5]">
      
      {/* Left Panel: Visuals & Context */}
      <div className="lg:w-1/3 bg-[#0D1C22] p-8 lg:p-12 flex flex-col justify-between relative overflow-hidden text-white min-h-[300px] lg:min-h-screen border-r border-gray-800">
         {/* Background Elements */}
         <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-600 rounded-full blur-[100px] opacity-20 translate-y-1/3 translate-x-1/3 pointer-events-none"></div>
         <div className="absolute top-0 left-0 w-64 h-64 bg-[#D7F037] rounded-full blur-[120px] opacity-5 -translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>

         <div className="relative z-10">
            <div className="flex items-center gap-2 mb-10 opacity-80">
               <Building2 size={24} className="text-[#D7F037]" />
               <span className="font-bold text-lg tracking-tight">University Partner</span>
            </div>

            <h1 className="text-3xl lg:text-5xl font-black mb-6 leading-tight">
               Setup your <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D7F037] to-white">Digital Placement Cell.</span>
            </h1>
            
            <div className="space-y-6 mt-8">
               <div className={`flex items-start gap-4 transition-opacity duration-300 ${step === 1 ? 'opacity-100' : 'opacity-40'}`}>
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm shrink-0 ${step === 1 ? 'border-[#D7F037] text-[#D7F037] bg-[#D7F037]/10' : 'border-gray-600 text-gray-600'}`}>1</div>
                  <div>
                     <h4 className="font-bold text-white">Academic Structure</h4>
                     <p className="text-xs text-gray-400 mt-1">Define courses and batches active on campus.</p>
                  </div>
               </div>
               <div className={`flex items-start gap-4 transition-opacity duration-300 ${step === 2 ? 'opacity-100' : 'opacity-40'}`}>
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm shrink-0 ${step === 2 ? 'border-[#D7F037] text-[#D7F037] bg-[#D7F037]/10' : 'border-gray-600 text-gray-600'}`}>2</div>
                  <div>
                     <h4 className="font-bold text-white">Student Stats</h4>
                     <p className="text-xs text-gray-400 mt-1">Help employers understand your talent pool size.</p>
                  </div>
               </div>
               <div className={`flex items-start gap-4 transition-opacity duration-300 ${step === 3 ? 'opacity-100' : 'opacity-40'}`}>
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm shrink-0 ${step === 3 ? 'border-[#D7F037] text-[#D7F037] bg-[#D7F037]/10' : 'border-gray-600 text-gray-600'}`}>3</div>
                  <div>
                     <h4 className="font-bold text-white">Placement Policy</h4>
                     <p className="text-xs text-gray-400 mt-1">Set criteria for companies (CTC, Roles).</p>
                  </div>
               </div>
               <div className={`flex items-start gap-4 transition-opacity duration-300 ${step === 4 ? 'opacity-100' : 'opacity-40'}`}>
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm shrink-0 ${step === 4 ? 'border-[#D7F037] text-[#D7F037] bg-[#D7F037]/10' : 'border-gray-600 text-gray-600'}`}>4</div>
                  <div>
                     <h4 className="font-bold text-white">Permissions</h4>
                     <p className="text-xs text-gray-400 mt-1">Configure visibility and verification.</p>
                  </div>
               </div>
            </div>
         </div>

         <div className="relative z-10 mt-auto pt-8">
            <p className="text-xs text-gray-500 font-medium">© 2024 OnCampus Inc.</p>
         </div>
      </div>

      {/* Right Panel: Form */}
      <div className="flex-1 flex flex-col justify-center p-6 lg:p-12 xl:p-20 relative bg-white lg:bg-[#FDFDF5]">
         <div className="w-full max-w-2xl mx-auto bg-white lg:p-10 lg:rounded-[2rem] lg:shadow-xl lg:border border-gray-100">
            
            {/* Header with Back Button */}
            <div className="flex items-center justify-between mb-8">
               {step > 1 ? (
                   <button onClick={prevStep} className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#0D1C22] transition-colors">
                      <ArrowLeft size={16} /> Back
                   </button>
               ) : (
                   <div></div>
               )}
               <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Step {step} of 4</span>
            </div>

            {/* --- STEP 1: ACADEMICS --- */}
            {step === 1 && (
              <div className="animate-in slide-in-from-right-4 fade-in duration-300">
                <div className="mb-8">
                    <h2 className="text-3xl font-black text-[#0D1C22] mb-2">Academic Structure</h2>
                    <p className="text-gray-500">Select all the courses and branches offered at your institute.</p>
                </div>

                <div className="space-y-8">
                  {/* Degrees */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">Degrees Offered</label>
                    
                    {/* Selected Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                        {degrees.map(deg => (
                            <span key={deg} className="px-3 py-1 bg-[#0D1C22] text-white rounded-lg text-sm font-bold flex items-center gap-2">
                                {deg}
                                <button onClick={() => removeItem(deg, degrees, setDegrees)} className="hover:text-[#D7F037]"><X size={14}/></button>
                            </span>
                        ))}
                    </div>

                    {/* Search Input */}
                    <div className="relative">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input 
                                type="text"
                                value={degreeSearch}
                                onChange={(e) => { setDegreeSearch(e.target.value); setIsDegreeOpen(true); }}
                                onFocus={() => setIsDegreeOpen(true)}
                                placeholder="Search or add custom degree (e.g. B.Tech)"
                                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D1C22]"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && degreeSearch.trim()) {
                                        e.preventDefault();
                                        addItem(degreeSearch.trim(), degrees, setDegrees);
                                        setDegreeSearch('');
                                        setIsDegreeOpen(false);
                                    }
                                }}
                            />
                        </div>
                        {isDegreeOpen && degreeSearch && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-100 rounded-xl shadow-xl max-h-48 overflow-y-auto">
                                {filteredDegrees.map(deg => (
                                    <button
                                        key={deg}
                                        onClick={() => {
                                            addItem(deg, degrees, setDegrees);
                                            setDegreeSearch('');
                                            setIsDegreeOpen(false);
                                        }}
                                        className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-gray-700"
                                    >
                                        {deg}
                                    </button>
                                ))}
                                {filteredDegrees.length === 0 && (
                                    <button
                                        onClick={() => {
                                            addItem(degreeSearch, degrees, setDegrees);
                                            setDegreeSearch('');
                                            setIsDegreeOpen(false);
                                        }}
                                        className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-[#0D1C22] font-bold"
                                    >
                                        Add "{degreeSearch}"
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                  </div>

                  {/* Branches */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Branches / Specializations</label>
                    <p className="text-xs text-gray-500 mb-3">Add all specializations available across selected degrees.</p>
                    
                    {/* Selected Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                        {branches.map(br => (
                            <span key={br} className="px-3 py-1 bg-gray-100 text-gray-700 border border-gray-200 rounded-lg text-sm font-bold flex items-center gap-2">
                                {br}
                                <button onClick={() => removeItem(br, branches, setBranches)} className="hover:text-red-500"><X size={14}/></button>
                            </span>
                        ))}
                    </div>

                    {/* Search Input */}
                    <div className="relative">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input 
                                type="text"
                                value={branchSearch}
                                onChange={(e) => { setBranchSearch(e.target.value); setIsBranchOpen(true); }}
                                onFocus={() => setIsBranchOpen(true)}
                                placeholder="Search or add specialization (e.g. Computer Science)"
                                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D1C22]"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && branchSearch.trim()) {
                                        e.preventDefault();
                                        addItem(branchSearch.trim(), branches, setBranches);
                                        setBranchSearch('');
                                        setIsBranchOpen(false);
                                    }
                                }}
                            />
                        </div>
                        {isBranchOpen && branchSearch && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-100 rounded-xl shadow-xl max-h-48 overflow-y-auto">
                                {filteredBranches.map(br => (
                                    <button
                                        key={br}
                                        onClick={() => {
                                            addItem(br, branches, setBranches);
                                            setBranchSearch('');
                                            setIsBranchOpen(false);
                                        }}
                                        className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-gray-700"
                                    >
                                        {br}
                                    </button>
                                ))}
                                {filteredBranches.length === 0 && (
                                    <button
                                        onClick={() => {
                                            addItem(branchSearch, branches, setBranches);
                                            setBranchSearch('');
                                            setIsBranchOpen(false);
                                        }}
                                        className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-[#0D1C22] font-bold"
                                    >
                                        Add "{branchSearch}"
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                  </div>

                  {/* Grad Years */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">Active Batches (Graduation Year)</label>
                    <div className="flex flex-wrap gap-3">
                       {YEAR_OPTIONS.map(yr => (
                           <button
                              key={yr}
                              onClick={() => toggleItem(yr, gradYears, setGradYears)}
                              className={`px-4 py-2.5 rounded-xl text-sm font-bold border transition-all ${gradYears.includes(yr) ? 'bg-[#0D1C22] text-white border-[#0D1C22] shadow-md' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
                           >
                              {yr}
                           </button>
                       ))}
                    </div>
                  </div>

                  <button 
                    onClick={nextStep}
                    disabled={degrees.length === 0 || branches.length === 0 || gradYears.length === 0}
                    className="w-full bg-[#D7F037] text-[#0D1C22] font-bold py-4 rounded-xl text-lg hover:bg-[#c5dc33] transition-colors shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-4 transform active:scale-[0.98]"
                  >
                    Next Step <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            )}

            {/* --- STEP 2: STATS --- */}
            {step === 2 && (
              <div className="animate-in slide-in-from-right-4 fade-in duration-300">
                 <div className="mb-8">
                    <h2 className="text-3xl font-black text-[#0D1C22] mb-2">Student Stats</h2>
                    <p className="text-gray-500">Provide an estimate of your placement pool.</p>
                </div>

                <div className="space-y-6">
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Total Students Eligible for Placements</label>
                    <input
                      type="number"
                      value={stats.studentCount}
                      onChange={(e) => setStats({...stats, studentCount: e.target.value})}
                      placeholder="e.g. 500"
                      className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D1C22] transition-all shadow-sm font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Placement Start</label>
                        <select 
                            value={stats.placementStart}
                            onChange={(e) => setStats({...stats, placementStart: e.target.value})}
                            className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D1C22] shadow-sm font-medium"
                        >
                            <option value="">Select Month</option>
                            {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Placement End</label>
                        <select 
                            value={stats.placementEnd}
                            onChange={(e) => setStats({...stats, placementEnd: e.target.value})}
                            className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D1C22] shadow-sm font-medium"
                        >
                            <option value="">Select Month</option>
                            {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                      </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Internship Start</label>
                        <select 
                            value={stats.internshipStart}
                            onChange={(e) => setStats({...stats, internshipStart: e.target.value})}
                            className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D1C22] shadow-sm font-medium"
                        >
                            <option value="">Select Month</option>
                            {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Internship End</label>
                        <select 
                            value={stats.internshipEnd}
                            onChange={(e) => setStats({...stats, internshipEnd: e.target.value})}
                            className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D1C22] shadow-sm font-medium"
                        >
                            <option value="">Select Month</option>
                            {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                      </div>
                  </div>

                  <button 
                    onClick={nextStep}
                    className="w-full bg-[#0D1C22] text-white font-bold py-4 rounded-xl text-lg hover:bg-gray-900 transition-colors shadow-lg flex items-center justify-center gap-2 mt-4"
                  >
                    Next Step <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            )}

            {/* --- STEP 3: PREFERENCES --- */}
            {step === 3 && (
              <div className="animate-in slide-in-from-right-4 fade-in duration-300">
                 <div className="mb-8">
                    <h2 className="text-3xl font-black text-[#0D1C22] mb-2">Placement Policy</h2>
                    <p className="text-gray-500">Define criteria to automatically filter companies.</p>
                </div>

                <div className="space-y-6">
                    
                    {/* CTC & Roles */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Min CTC Preference (LPA)</label>
                            <select 
                                value={preferences.minCTC}
                                onChange={(e) => setPreferences({...preferences, minCTC: e.target.value})}
                                className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D1C22] shadow-sm font-medium"
                            >
                                <option value="">No Preference</option>
                                <option value="3">3 LPA</option>
                                <option value="5">5 LPA</option>
                                <option value="8">8 LPA</option>
                                <option value="12">12 LPA</option>
                                <option value="20">20+ LPA</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Role Type Restrictions</label>
                            <div className="flex flex-wrap gap-2">
                                {['Tech', 'Non-Tech', 'Core', 'Sales'].map(role => (
                                    <button 
                                        key={role}
                                        onClick={() => toggleItem(role, preferences.roleRestrictions, (val) => setPreferences({...preferences, roleRestrictions: val as any}))}
                                        className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all ${preferences.roleRestrictions.includes(role) ? 'bg-[#0D1C22] text-white border-[#0D1C22]' : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'}`}
                                    >
                                        {role}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Eligibility */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Student Eligibility</label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-3 cursor-pointer bg-white px-5 py-4 rounded-xl border border-gray-200 has-[:checked]:border-[#0D1C22] has-[:checked]:bg-gray-50 flex-1 shadow-sm transition-all hover:border-gray-300">
                                <input 
                                    type="checkbox" 
                                    checked={preferences.eligibility.includes('Final Year')}
                                    onChange={() => toggleItem('Final Year', preferences.eligibility, (val) => setPreferences({...preferences, eligibility: val as any}))}
                                    className="accent-[#0D1C22] w-5 h-5"
                                />
                                <span className="text-sm font-bold text-[#0D1C22]">Final Year</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer bg-white px-5 py-4 rounded-xl border border-gray-200 has-[:checked]:border-[#0D1C22] has-[:checked]:bg-gray-50 flex-1 shadow-sm transition-all hover:border-gray-300">
                                <input 
                                    type="checkbox" 
                                    checked={preferences.eligibility.includes('Pre-Final Year')}
                                    onChange={() => toggleItem('Pre-Final Year', preferences.eligibility, (val) => setPreferences({...preferences, eligibility: val as any}))}
                                    className="accent-[#0D1C22] w-5 h-5"
                                />
                                <span className="text-sm font-bold text-[#0D1C22]">Pre-Final Year</span>
                            </label>
                        </div>
                    </div>

                    {/* Internships */}
                    <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h4 className="font-bold text-[#0D1C22]">Allow Internships?</h4>
                                <p className="text-xs text-gray-500">Can companies offer internships?</p>
                            </div>
                            <div 
                                onClick={() => setPreferences({...preferences, allowInternships: !preferences.allowInternships})}
                                className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${preferences.allowInternships ? 'bg-[#D7F037]' : 'bg-gray-300'}`}
                            >
                                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${preferences.allowInternships ? 'translate-x-6' : 'translate-x-0'}`}></div>
                            </div>
                        </div>

                        {preferences.allowInternships && (
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-2">Minimum Stipend Preference (₹/month)</label>
                                <input
                                    type="number"
                                    value={preferences.minStipend}
                                    onChange={(e) => setPreferences({...preferences, minStipend: e.target.value})}
                                    placeholder="e.g. 15000"
                                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0D1C22] text-sm font-medium"
                                />
                            </div>
                        )}
                    </div>

                    <button 
                        onClick={nextStep}
                        className="w-full bg-[#0D1C22] text-white font-bold py-4 rounded-xl text-lg hover:bg-gray-900 transition-colors shadow-lg flex items-center justify-center gap-2 mt-4"
                    >
                        Next Step <ChevronRight size={20} />
                    </button>
                </div>
              </div>
            )}

            {/* --- STEP 4: PERMISSIONS --- */}
            {step === 4 && (
              <div className="animate-in slide-in-from-right-4 fade-in duration-300">
                 <div className="mb-8">
                    <h2 className="text-3xl font-black text-[#0D1C22] mb-2">Permissions</h2>
                    <p className="text-gray-500">Configure privacy and data handling.</p>
                </div>

                <div className="space-y-4">
                   
                   <label className="flex items-start gap-4 p-5 border border-gray-200 rounded-2xl cursor-pointer hover:bg-gray-50 transition-colors bg-white shadow-sm">
                      <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center mt-0.5 shrink-0 transition-colors ${permissions.verifyStudents ? 'bg-[#0D1C22] border-[#0D1C22]' : 'border-gray-300'}`}>
                          {permissions.verifyStudents && <Check size={14} className="text-white" />}
                      </div>
                      <input type="checkbox" className="hidden" checked={permissions.verifyStudents} onChange={() => setPermissions({...permissions, verifyStudents: !permissions.verifyStudents})} />
                      <div>
                          <h4 className="font-bold text-[#0D1C22] text-sm md:text-base">Verify students via email domain</h4>
                          <p className="text-xs md:text-sm text-gray-500 mt-1">Allow OnCampus to automatically mark students with your college email domain (e.g., @nitt.edu) as verified.</p>
                      </div>
                   </label>

                   <label className="flex items-start gap-4 p-5 border border-gray-200 rounded-2xl cursor-pointer hover:bg-gray-50 transition-colors bg-white shadow-sm">
                      <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center mt-0.5 shrink-0 transition-colors ${permissions.showProfile ? 'bg-[#0D1C22] border-[#0D1C22]' : 'border-gray-300'}`}>
                          {permissions.showProfile && <Check size={14} className="text-white" />}
                      </div>
                      <input type="checkbox" className="hidden" checked={permissions.showProfile} onChange={() => setPermissions({...permissions, showProfile: !permissions.showProfile})} />
                      <div>
                          <h4 className="font-bold text-[#0D1C22] text-sm md:text-base">Show college profile to employers</h4>
                          <p className="text-xs md:text-sm text-gray-500 mt-1">Make your college profile, including placement stats and student demographics, visible to registered employers.</p>
                      </div>
                   </label>

                   <label className="flex items-start gap-4 p-5 border border-gray-200 rounded-2xl cursor-pointer hover:bg-gray-50 transition-colors bg-white shadow-sm">
                      <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center mt-0.5 shrink-0 transition-colors ${permissions.trackPlacements ? 'bg-[#0D1C22] border-[#0D1C22]' : 'border-gray-300'}`}>
                          {permissions.trackPlacements && <Check size={14} className="text-white" />}
                      </div>
                      <input type="checkbox" className="hidden" checked={permissions.trackPlacements} onChange={() => setPermissions({...permissions, trackPlacements: !permissions.trackPlacements})} />
                      <div>
                          <h4 className="font-bold text-[#0D1C22] text-sm md:text-base">Track placements via OnCampus</h4>
                          <p className="text-xs md:text-sm text-gray-500 mt-1">Allow the platform to track offers generated through the system for analytics reporting.</p>
                      </div>
                   </label>

                   <button 
                        onClick={onComplete}
                        className="w-full bg-[#D7F037] text-[#0D1C22] font-bold py-4 rounded-xl text-lg hover:bg-[#c5dc33] transition-colors shadow-lg mt-8 transform active:scale-[0.98]"
                    >
                        Complete Registration
                    </button>
                </div>
              </div>
            )}

         </div>
      </div>
    </div>
  );
};

export default UniversityOnboarding;