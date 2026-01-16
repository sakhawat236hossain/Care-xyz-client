import Image from 'next/image';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Tanvir Ahmed",
    role: "Business Owner",
    content: "During my father's illness, your caregiver service was a symbol of trust. Their compassion and professionalism were truly commendable.",
    image: "https://i.pravatar.cc/150?u=tanvir",
    rating: 5
  },
  {
    id: 2,
    name: "Nazia Sultana",
    role: "Corporate Professional",
    content: "Going to the office is much easier now that I have your nanny service for my child. Highly secure and reliable. Thank you!",
    image: "https://i.pravatar.cc/150?u=nazia",
    rating: 5
  },
  {
    id: 3,
    name: "Rashed Chowdhury",
    role: "Software Engineer",
    content: "I opted for your nursing service for post-operative care. The hygiene standards and punctuality were absolutely perfect.",
    image: "https://i.pravatar.cc/150?u=rashed",
    rating: 4
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-white dark:bg-[#080808] transition-colors duration-500 relative overflow-hidden">
      {/* Background Glows for Dark Mode */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-[0.2em] text-xs mb-3">
            Real Stories
          </h2>
          <h3 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white">
            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-400">Clients Say</span>
          </h3>
          <p className="mt-4 text-gray-500 dark:text-zinc-400 max-w-xl mx-auto">
            Discover how our professional care services have made a difference in the lives of families across the country.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div 
              key={item.id}
              className="group relative p-8 rounded-[2.5rem] transition-all duration-500
                         bg-zinc-50 border border-gray-100 
                         dark:bg-white/5 dark:backdrop-blur-xl dark:border-white/10 dark:hover:border-blue-500/30
                         hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] 
                         hover:-translate-y-2"
            >
              {/* Quote Icon */}
              <div className="absolute top-8 right-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote size={40} className="text-blue-600 dark:text-white transform -scale-x-100" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} size={14} className="fill-yellow-500 text-yellow-500" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-600 dark:text-zinc-300 text-lg leading-relaxed mb-8 relative z-10 italic">
                "{item.content}"
              </p>

              {/* User Info */}
              <div className="flex items-center gap-4 border-t border-gray-200/50 dark:border-white/5 pt-6 mt-auto">
                <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-blue-600/20 group-hover:ring-blue-500 transition-all">
                  <Image 
                    src={item.image} 
                    alt={item.name} 
                    fill 
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-base leading-tight">
                    {item.name}
                  </h4>
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-medium uppercase tracking-wider mt-1">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;