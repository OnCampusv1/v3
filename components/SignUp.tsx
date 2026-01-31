import React, { useState, useEffect } from 'react';

interface SignUpProps {
  email?: string;
  onNext: (data?: any) => void;
  onLoginClick?: () => void;
  persona?: 'student' | 'employer' | 'university';
}

const SignUp: React.FC<SignUpProps> = ({ email = '', onNext, onLoginClick, persona = 'student' }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: email,
    orgName: '', // Company Name or College Name
    password: '',
    inviteCode: '',
    // University Specific
    designation: '',
    mobile: '',
    commMode: 'email', // 'call' | 'whatsapp' | 'email'
    // Employer Specific
    website: ''
  });

  // Effect to simulate extracting invite code from URL if present
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const invite = urlParams.get('invite');
    if (invite) {
      setFormData(prev => ({ ...prev, inviteCode: invite }));
    }
  }, []);
  
  // Sync email prop to state if it changes
  useEffect(() => {
      if(email) setFormData(prev => ({ ...prev, email }));
  }, [email]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  const getLabels = () => {
      switch(persona) {
          case 'employer':
              return {
                  name: "Full Name",
                  email: "Work Email",
                  org: "Company Name",
                  title: "Hire the Best Talent"
              };
          case 'university':
               return {
                  name: "Contact Person Name",
                  email: "Official Email ID",
                  org: "College / University Name",
                  title: "Join the Network"
              };
          default:
              return {
                  name: "Full Name",
                  email: "School Email",
                  org: "",
                  title: "Create Student Account"
              };
      }
  };

  const labels = getLabels();

  return (
    <div className="w-full max-w-lg mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h2 className="text-3xl font-black italic tracking-tight text-[#0D1C22] mb-2">{labels.title}</h2>
        <p className="text-gray-500 mb-8 capitalize">{persona} Registration</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Org Name (If not student) */}
          {persona !== 'student' && (
             <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">{labels.org}</label>
                <input
                type="text"
                name="orgName"
                value={formData.orgName}
                onChange={handleChange}
                placeholder={persona === 'employer' ? "e.g. Acme Corp" : "e.g. IIT Delhi"}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D1C22] transition-all"
                required
                />
            </div>
          )}

          {/* Employer: Company Website */}
          {persona === 'employer' && (
             <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Company Website</label>
                <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="e.g. https://acme.com"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D1C22] transition-all"
                required
                />
            </div>
          )}

          {/* Contact Person Name */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">{labels.name}</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="e.g. Jane Doe"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D1C22] transition-all"
              required
            />
          </div>

          {/* Employer: Designation */}
          {persona === 'employer' && (
             <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Designation</label>
                <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                placeholder="e.g. HR Manager"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D1C22] transition-all"
                required
                />
            </div>
          )}

           {/* University Specific Fields */}
           {persona === 'university' && (
            <>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Designation</label>
                <select
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D1C22] transition-all appearance-none"
                  required
                >
                    <option value="" disabled>Select Role</option>
                    <option value="Placement Officer">Placement Officer</option>
                    <option value="TPO">TPO (Training & Placement Officer)</option>
                    <option value="Faculty Coordinator">Faculty Coordinator</option>
                    <option value="Principal/Director">Principal / Director</option>
                    <option value="Student Coordinator">Student Coordinator</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Mobile Number</label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D1C22] transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Preferred Mode of Communication</label>
                <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer border border-gray-200 px-4 py-3 rounded-xl flex-1 justify-center hover:bg-gray-50 has-[:checked]:border-[#0D1C22] has-[:checked]:bg-gray-100 transition-all">
                        <input 
                            type="radio" 
                            name="commMode" 
                            value="call" 
                            checked={formData.commMode === 'call'} 
                            onChange={handleChange} 
                            className="accent-[#0D1C22]"
                        />
                        <span className="text-sm font-medium">Call</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer border border-gray-200 px-4 py-3 rounded-xl flex-1 justify-center hover:bg-gray-50 has-[:checked]:border-[#0D1C22] has-[:checked]:bg-gray-100 transition-all">
                        <input 
                            type="radio" 
                            name="commMode" 
                            value="whatsapp" 
                            checked={formData.commMode === 'whatsapp'} 
                            onChange={handleChange}
                            className="accent-[#0D1C22]" 
                        />
                        <span className="text-sm font-medium">WhatsApp</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer border border-gray-200 px-4 py-3 rounded-xl flex-1 justify-center hover:bg-gray-50 has-[:checked]:border-[#0D1C22] has-[:checked]:bg-gray-100 transition-all">
                        <input 
                            type="radio" 
                            name="commMode" 
                            value="email" 
                            checked={formData.commMode === 'email'} 
                            onChange={handleChange} 
                            className="accent-[#0D1C22]"
                        />
                        <span className="text-sm font-medium">Email</span>
                    </label>
                </div>
              </div>
            </>
           )}

          {/* Email */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">{labels.email}</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@organization.com"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D1C22] transition-all"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D1C22] transition-all"
              required
            />
          </div>

          {/* Invite Code - Mandatory for Students */}
          {persona === 'student' && (
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Invite Code (Mandatory)</label>
                <input
                type="text"
                name="inviteCode"
                value={formData.inviteCode}
                onChange={handleChange}
                placeholder="Enter college invite code"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D1C22] transition-all"
                required
                />
                <p className="text-xs text-gray-500 mt-1">This code determines your college and eligible courses.</p>
            </div>
          )}

          {/* Invite Code - Optional for University (if self-onboarding) */}
          {persona === 'university' && (
             <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Invite Code (Optional)</label>
                <input
                type="text"
                name="inviteCode"
                value={formData.inviteCode}
                onChange={handleChange}
                placeholder="Enter code if you have one"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D1C22] transition-all"
                />
            </div>
          )}

          <button 
            type="submit" 
            className="mt-4 w-full bg-[#0D1C22] text-white font-bold py-4 rounded-xl text-lg hover:bg-gray-900 transition-colors shadow-lg shadow-gray-200"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account? <button onClick={onLoginClick} className="font-bold text-[#0D1C22] underline hover:text-gray-700">Log in</button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;