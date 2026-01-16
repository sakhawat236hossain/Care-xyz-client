import Image from 'next/image';
import { Star, CheckCircle2, Award } from 'lucide-react';

const caregivers = [
  {
    id: 1,
    name: "Sarah Johnson",
    speciality: "Infant & Baby Care",
    experience: "5+ Years Exp.",
    rating: 4.9,
    reviews: 120,
    image: "https://i.pravatar.cc/300?u=sarah",
    verified: true,
  },
  {
    id: 2,
    name: "Dr. Michael Rahaman",
    speciality: "Elderly Care Specialist",
    experience: "8+ Years Exp.",
    rating: 5.0,
    reviews: 85,
    image: "https://i.pravatar.cc/300?u=michael",
    verified: true,
  },
  {
    id: 3,
    name: "Ayesha Siddiqua",
    speciality: "Post-Surgery Recovery",
    experience: "4+ Years Exp.",
    rating: 4.8,
    reviews: 95,
    image: "https://i.pravatar.cc/300?u=ayesha",
    verified: true,
  },
  {
    id: 4,
    name: "Robert Wilson",
    speciality: "Palliative Care",
    experience: "6+ Years Exp.",
    rating: 4.9,
    reviews: 110,
    image: "https://i.pravatar.cc/300?u=robert",
    verified: true,
  }
];

const FeaturedCaregivers = () => {
  return (
    <section className="py-24 bg-zinc-50 dark:bg-black transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest text-sm">
            Expert Team
          </h2>
          <h3 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white">
            Meet Our Top Caregivers
          </h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Our professionals are background-verified, highly trained, and committed to providing the best care for your loved ones.
          </p>
        </div>

        {/* Caregivers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {caregivers.map((person) => (
            <div 
              key={person.id}
              className="group relative bg-white dark:bg-zinc-900 rounded-[2rem] p-4 border border-gray-100 dark:border-zinc-800 hover:shadow-2xl transition-all duration-500"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[4/5] rounded-[1.5rem] overflow-hidden mb-6">
                <Image 
                  src={person.image}
                  alt={person.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Verified Badge */}
                {person.verified && (
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md p-1.5 rounded-xl shadow-lg border border-green-100 dark:border-green-900/30">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  </div>
                )}
                {/* Experience Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md py-2 px-4 rounded-xl shadow-lg flex items-center justify-between border border-white/20">
                    <span className="text-[10px] font-black text-blue-600 uppercase">{person.experience}</span>
                    <div className="flex items-center gap-1">
                        <Star size={12} className="fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-bold dark:text-white">{person.rating}</span>
                    </div>
                </div>
              </div>

              {/* Info */}
              <div className="px-2 pb-2 text-center">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                  {person.name}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-4">
                  {person.speciality}
                </p>
                
                <button className="w-full py-3 cursor-pointer bg-gray-50 dark:bg-zinc-800 hover:bg-blue-600 hover:text-white dark:text-gray-200 rounded-xl font-bold text-xs transition-all duration-300 uppercase tracking-widest flex items-center justify-center gap-2 group/btn">
                  View Profile
                  <Award size={14} className="group-hover/btn:rotate-12 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCaregivers;