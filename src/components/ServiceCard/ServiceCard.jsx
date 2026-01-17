import Link from "next/link";

const ServiceCard = ({ service }) => {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-lg border border-zinc-100 dark:border-zinc-800 hover:shadow-2xl transition-all group">
      <div className="relative h-52 overflow-hidden">
        <img 
          src={service.image} 
          alt={service.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
          {service.category}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">{service.title}</h3>
        <p className="text-zinc-500 text-sm line-clamp-2 mb-4">{service.description}</p>
        
        <div className="flex items-center justify-between mt-4">
          <div>
            <span className="text-2xl font-black text-blue-600">${service.price_per_hour}</span>
            <span className="text-xs text-zinc-400 ml-1">/ hour</span>
          </div>
          
          <Link href={`/service/${service._id}`}>
            <button className="cursor-pointer bg-zinc-100 dark:bg-zinc-800 hover:bg-blue-600 hover:text-white px-5 py-2 rounded-xl text-sm font-bold transition-colors">
              Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;