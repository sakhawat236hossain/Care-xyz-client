import { Users, Award, Clock, Heart } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    {
      id: 1,
      label: 'Happy Families',
      value: '500+',
      icon: <Users className="text-blue-600 dark:text-blue-400" size={24} />,
      description: 'Trusted by households'
    },
    {
      id: 2,
      label: 'Certified Caregivers',
      value: '200+',
      icon: <Award className="text-blue-600 dark:text-blue-400" size={24} />,
      description: 'Professionally trained'
    },
    {
      id: 3,
      label: 'Emergency Support',
      value: '24/7',
      icon: <Clock className="text-blue-600 dark:text-blue-400" size={24} />,
      description: 'Always here for you'
    },
    {
      id: 4,
      label: 'Success Rate',
      value: '99%',
      icon: <Heart className="text-blue-600 dark:text-blue-400" size={24} />,
      description: 'Satisfied service'
    }
  ];

  return (
    <section className="relative py-12 bg-white dark:bg-gray-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div 
              key={stat.id} 
              className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center group hover:border-blue-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5"
            >
              <div className="mb-4 p-3 rounded-xl bg-white dark:bg-gray-800 shadow-sm group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-black text-gray-900 dark:text-white leading-none">
                {stat.value}
              </h3>
              <p className="mt-2 text-sm font-bold text-gray-700 dark:text-gray-200">
                {stat.label}
              </p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;