import { Search, CalendarCheck, Home, ArrowRight } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Select Service",
      description: "Choose from our specialized categories like Baby, Elderly, or Sick Care based on your family's needs.",
      icon: <Search className="w-7 h-7" />,
      stepNum: "01",
      gradient: "from-blue-600 to-cyan-500"
    },
    {
      id: 2,
      title: "Book a Schedule",
      description: "Pick a convenient date and time. Our system ensures instant confirmation for your peace of mind.",
      icon: <CalendarCheck className="w-7 h-7" />,
      stepNum: "02",
      gradient: "from-indigo-600 to-purple-500"
    },
    {
      id: 3,
      title: "Receive Care",
      description: "A background-verified professional caregiver arrives at your home to provide the best possible support.",
      icon: <Home className="w-7 h-7" />,
      stepNum: "03",
      gradient: "from-emerald-600 to-teal-500"
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-white dark:bg-black transition-colors duration-500">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-50/50 dark:bg-blue-900/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800">
              <span className="text-[10px] font-bold text-blue-700 dark:text-blue-300 uppercase tracking-[0.2em]">Our Process</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">
              Get Professional Care in <span className="text-blue-600">3 Easy Steps</span>
            </h2>
          </div>
          <p className="text-gray-500 dark:text-gray-400 max-w-sm text-sm md:text-base border-l-2 border-blue-600 pl-6 py-2">
            We've simplified the journey of finding the right caregiver for your loved ones.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={step.id} className="group relative">
              
              {/* Connector Arrow (Desktop Only) */}
              {index !== steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 -right-6 translate-x-1/2 z-10">
                  <ArrowRight className="w-8 h-8 text-gray-200 dark:text-gray-800 group-hover:text-blue-500 group-hover:translate-x-2 transition-all duration-500" />
                </div>
              )}

              <div className="relative h-full p-8 md:p-10 rounded-[2.5rem] bg-gray-50/50 dark:bg-zinc-900/50 border border-gray-100 dark:border-white/5 hover:bg-white dark:hover:bg-zinc-900 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/5 overflow-hidden">
                
                {/* Background Step Number (Huge & Faded) */}
                <span className="absolute -bottom-4 -right-2 text-9xl font-black text-gray-200/40 dark:text-white/5 pointer-events-none transition-transform duration-700 group-hover:-translate-y-4">
                  {step.stepNum}
                </span>

                {/* Icon Container */}
                <div className={`mb-8 w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} p-0.5 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                  <div className="w-full h-full bg-white dark:bg-zinc-900 rounded-[calc(1rem-2px)] flex items-center justify-center text-gray-900 dark:text-white group-hover:bg-transparent group-hover:text-white transition-colors duration-500">
                    {step.icon}
                  </div>
                </div>

                {/* Text Content */}
                <div className="relative z-10 space-y-4">
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Bottom Accent Line */}
                <div className={`absolute bottom-0 left-0 h-1.5 bg-gradient-to-r ${step.gradient} w-0 group-hover:w-full transition-all duration-500`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;