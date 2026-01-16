import { ShieldCheck, Cross, ClipboardList, CheckCircle2 } from 'lucide-react';

const WhyChooseUs = () => {
  const benefits = [
    {
      id: 1,
      title: "Background Checked Staff",
      description: "Every caregiver undergoes a rigorous multi-level background check and identity verification for your safety.",
      icon: <ShieldCheck className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
    },
    {
      id: 2,
      title: "First Aid Training",
      description: "Our team is professionally trained in medical first aid and emergency response to handle any situation.",
      icon: <Cross className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
    },
    {
      id: 3,
      title: "Personalized Care Plan",
      description: "We don't believe in one-size-fits-all. We create customized care plans tailored to your specific needs.",
      icon: <ClipboardList className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
    }
  ];

  return (
    <section className="py-24 bg-white dark:bg-gray-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Text Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider text-sm mb-3">
                Why Care.xyz
              </h2>
              <h3 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">
                Your Safety and Comfort <br /> is Our Top Priority
              </h3>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              We stand out because we care more. Our rigorous selection process and continuous training ensure that you get the best support possible.
            </p>

            <ul className="space-y-4">
              {["24/7 Dedicated Support", "Certified Medical Professionals", "Flexible Scheduling"].map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-gray-700 dark:text-gray-300 font-semibold">
                  <CheckCircle2 className="text-green-500 w-5 h-5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side: Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            {benefits.map((benefit) => (
              <div 
                key={benefit.id}
                className="group p-8 bg-gray-50 dark:bg-zinc-900/50 border border-gray-100 dark:border-zinc-800 rounded-[2rem] hover:bg-white dark:hover:bg-zinc-900 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 flex flex-col md:flex-row gap-6 items-start"
              >
                <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {benefit.title}
                  </h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;