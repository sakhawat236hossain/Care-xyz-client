import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, HeartPulse, Baby, UserRound } from 'lucide-react';

const services = [
  {
    id: 1,
    title: 'Baby Care',
    description: 'Expert nannies and caregivers to provide a safe and nurturing environment for your little ones.',
    icon: <Baby className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=500', // Baby care image
    color: 'bg-pink-500',
    link: '/services/baby-care'
  },
  {
    id: 2,
    title: 'Elderly Care',
    description: 'Compassionate companionship and medical assistance for seniors to live comfortably at home.',
    icon: <UserRound className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1581578017093-cd30fce4eeb7?q=80&w=500', // Elderly care image
    color: 'bg-blue-500',
    link: '/services/elderly-care'
  },
  {
    id: 3,
    title: 'Sick Care',
    description: 'Professional nursing care and support for patients recovering from illness or surgery.',
    icon: <HeartPulse className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=500', // Sick care image
    color: 'bg-emerald-500',
    link: '/services/sick-care'
  }
];

const ServicesSection = () => {
  return (
    <section className="py-24 bg-zinc-50 dark:bg-black transition-colors duration-500" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-blue-600 dark:text-blue-400 font-bold tracking-widest uppercase text-sm">
            Our Specialization
          </h2>
          <h3 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white">
            Care Specialized for <br /> Your Needs
          </h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-base">
            We provide a wide range of caregiving services tailored to meet the unique needs of your family members.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div 
              key={service.id}
              className="group relative bg-white dark:bg-zinc-900 rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-zinc-800 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="relative h-64 w-full overflow-hidden">
                <Image 
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Floating Icon */}
                <div className={`absolute bottom-6 left-6 p-3 rounded-2xl ${service.color} text-white shadow-lg`}>
                  {service.icon}
                </div>
              </div>

              {/* Content */}
              <div className="p-8 space-y-4">
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {service.title}
                </h4>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">
                  {service.description}
                </p>
                <Link 
                  href={service.link}
                  className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm group/btn"
                >
                  Learn More 
                  <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;