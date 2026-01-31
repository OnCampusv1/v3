import React from 'react';

interface UniversityImpactProps {
  isDarkMode?: boolean;
}

const UniversityImpact: React.FC<UniversityImpactProps> = ({ isDarkMode = false }) => {
  // Real SVG Logos for aspirational companies
  const LOGOS = [
    { name: 'Google', svg: <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/></svg> },
    { name: 'Microsoft', svg: <svg viewBox="0 0 23 23" className="w-full h-full" fill="currentColor"><path d="M0 0h11v11H0zM12 0h11v11H12zM0 12h11v11H0zM12 12h11v11H12z"/></svg> },
    { name: 'Amazon', svg: <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor"><path d="M13.8 14.1c-1.3-.5-2.6-.9-4.2-1.4 0 0 .5-1.4 1.2-1.9.9-.6 2.2-1 3.5-1 1.7 0 2.8.5 3.5 1.4.3.5.5 1.1.5 1.7h3.8c0-1.6-.6-3-1.7-4.1-1.5-1.5-3.6-2.2-6.1-2.2-2.7 0-4.9.8-6.4 2.3-1.4 1.4-2.1 3.2-2.1 5.4 0 2.2.8 3.9 2.3 5.3 1.5 1.3 3.6 2 6.2 2 1.6 0 3.1-.3 4.4-.8-.4-1.2-1.3-1.7-1.3-1.7-.5 1-1.7 1.6-3.4 1.6-1.5 0-2.8-.4-3.8-1.1-.9-.8-1.4-1.9-1.5-3.2l5.1-1.6c0-.2.1-.5.1-.7zm-3.6 1.4c0 .8-.3 1.5-.9 2-.5.5-1.2.7-2 .7-.7 0-1.3-.2-1.8-.7-.4-.5-.7-1.1-.7-1.9 0-.7.2-1.4.7-1.9.5-.5 1.1-.7 1.8-.7.8 0 1.4.2 1.9.7.6.5.9 1.2 1 2l-.1-.2z"/></svg> },
    { name: 'Uber', svg: <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor"><path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm7.16 8.328c-.288 3.96-3.12 7.152-7.16 7.152-3.936 0-6.936-2.928-7.152-6.72-.024-.216-.048-.432-.048-.648 0-.216.024-.432.048-.648.216-3.936 3.144-6.912 7.152-6.912 3.888 0 6.84 2.976 7.16 6.912.024.216.048.432.048.648 0 .216-.024.432-.048.648zM7.56 12.552v1.512c0 .48.408.888.888.888h1.224v1.272c0 .48.384.888.888.888h2.88c.48 0 .888-.384.888-.888v-1.272h1.224c.48 0 .888-.384.888-.888v-1.512c0-.48-.408-.888-.888-.888h-7.104c-.48 0-.888.408-.888.888z"/></svg> },
    { name: 'CRED', svg: <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor"><path d="M3.562 6.646C4.854 4.167 7.437 2.458 10.437 2.458c3.021 0 5.584 1.709 6.896 4.188L21.5 6.646C20.208 4.167 17.625 2.458 14.625 2.458c-3.021 0-5.584 1.709-6.896 4.188L3.562 6.646zm0 10.708c1.292 2.479 3.875 4.188 6.875 4.188 3.021 0 5.584-1.709 6.896-4.188l4.167 0c-1.292 2.479-3.875 4.188-6.875 4.188-3.021 0-5.584-1.709-6.896-4.188l-4.167 0z"/></svg> },
    { name: 'Zomato', svg: <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor"><path d="M14.6 2.766c.203-.092.417-.183.642-.27.426-.164.863-.313 1.309-.446 1.472-.44 2.977-.66 4.475-.65 2.053.013 4.01.554 5.688 1.57.25.152.493.313.73.483l-1.328 1.734c-.23-.153-.466-.299-.708-.436-1.398-.79-2.996-1.196-4.63-1.176-1.192.014-2.392.23-3.52.634-.413.148-.813.33-1.197.545-.19.106-.376.22-.559.338l-.666.44-5.26 6.36h12.35v2.246H9.13l-.007.006.002.003-1.618 1.956H22.5V22.5H1.5v-2.25l12.72-15.39c.125-.15.253-.298.38-.445z"/></svg> },
    { name: 'Swiggy', svg: <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor"><path d="M17.65 6.37c-.36-.08-2.61.16-3.76 1.63-.56.71-.56 1.75-.48 2.37l-2.09 3.06c-.49-.49-1.2-1.18-1.57-1.56a6.99 6.99 0 00-1.79-1.37c-1.27-.64-2.8-.5-3.78.25-1.46 1.11-1.35 3.32.22 4.29.98.61 2.21.57 3.25-.09l.13.16c-1.4 1.46-.86 3.86.99 4.67 1.83.8 3.96-.28 4.48-2.18.06-.21.08-.43.08-.65l3.52-5.18c.88.24 1.83-.02 2.45-.66 1.11-1.16.89-3.05-.51-3.92-.37-.23-.79-.37-1.21-.43l.07-.39z"/></svg> }
  ];

  const duplicatedLogos = [...LOGOS, ...LOGOS, ...LOGOS];

  return (
    <section id="university-impact-section" className="py-32 px-0 overflow-hidden transition-colors duration-700">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <div className="mb-20">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Our Core Belief</p>
          <h2 className={`text-4xl md:text-6xl font-black leading-tight transition-colors duration-700 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Placements depend on<br />
            <span className="text-gray-400">reach, not just capability.</span>
          </h2>
          <p className={`mt-6 text-xl max-w-2xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
             Your students are talented. The only thing missing is opportunity. We bring aspirational employers to your digital doorstep.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className={`p-8 rounded-[2.5rem] border transition-colors duration-700 ${isDarkMode ? 'bg-[#3c0a45] border-[#551461]' : 'bg-white border-gray-100 shadow-xl'}`}>
                <h3 className={`text-6xl font-black mb-4 ${isDarkMode ? 'text-[#D7F037]' : 'text-[#0D1C22]'}`}>3x</h3>
                <p className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-[#0D1C22]'}`}>More Companies</p>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Colleges on our platform see a 300% increase in the number of companies visiting (virtually or physically).</p>
            </div>

            {/* Card 2 */}
            <div className={`p-8 rounded-[2.5rem] border transition-colors duration-700 ${isDarkMode ? 'bg-[#3c0a45] border-[#551461]' : 'bg-white border-gray-100 shadow-xl'}`}>
                <h3 className={`text-6xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-gray-400'}`}>Zero</h3>
                <p className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-[#0D1C22]'}`}>Cold Emails</p>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Stop chasing HRs. Companies hiring on the platform come to you, requesting to hire your students.</p>
            </div>

            {/* Card 3 */}
            <div className={`p-8 rounded-[2.5rem] border transition-colors duration-700 ${isDarkMode ? 'bg-[#3c0a45] border-[#551461]' : 'bg-white border-gray-100 shadow-xl'}`}>
                <h3 className={`text-6xl font-black mb-4 ${isDarkMode ? 'text-[#D7F037]' : 'text-[#0D1C22]'}`}>100%</h3>
                <p className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-[#0D1C22]'}`}>Digital Visibility</p>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>We create a verified digital profile for your college that recruiters can search, view, and trust.</p>
            </div>
        </div>
      </div>
        
      <div className={`mt-32 pt-16 border-t ${isDarkMode ? 'border-[#441052]' : 'border-gray-200'}`}>
          <div className="max-w-7xl mx-auto px-4 md:px-12 mb-12">
             <h4 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-[#0D1C22]'}`}>Companies students aspire to work at</h4>
          </div>
          
          {/* Marquee Ticker */}
          <div className="relative w-full overflow-hidden">
             {/* Gradients for smooth fade */}
             <div className={`absolute top-0 left-0 h-full w-32 z-10 bg-gradient-to-r ${isDarkMode ? 'from-[#2c0033] to-transparent' : 'from-[#FDFDF5] to-transparent'}`}></div>
             <div className={`absolute top-0 right-0 h-full w-32 z-10 bg-gradient-to-l ${isDarkMode ? 'from-[#2c0033] to-transparent' : 'from-[#FDFDF5] to-transparent'}`}></div>

             <div className="flex gap-12 animate-marquee-left whitespace-nowrap py-4">
                {duplicatedLogos.map((logo, i) => (
                   <div key={i} className={`flex items-center gap-4 px-8 py-6 rounded-2xl border transition-colors min-w-[200px] ${isDarkMode ? 'bg-[#3c0a45] border-[#551461] text-gray-200' : 'bg-white border-gray-100 shadow-sm text-gray-800'}`}>
                       <div className="w-10 h-10 flex items-center justify-center">
                          {logo.svg}
                       </div>
                       <span className="font-bold text-xl">{logo.name}</span>
                   </div>
                ))}
             </div>
          </div>
      </div>
    </section>
  );
};

export default UniversityImpact;