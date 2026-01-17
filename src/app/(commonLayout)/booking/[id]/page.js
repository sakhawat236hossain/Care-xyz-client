import BookingForm from "@/components/BookingForm/BookingForm";
import { collections, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export default async function BookingPage({ params }) {
  const { id } = await params;
  
  const serviceCollection = await dbConnect(collections.SERVICES);
  const service = await serviceCollection.findOne({ _id: new ObjectId(id) });

  if (!service) return <div className="text-center py-20">Service not found</div>;

  return (
    <div className="min-h-screen  py-12 px-4">
      <div className="max-w-xl mx-auto">
        <h1 className="text-4xl font-black mb-8 text-center italic">Finalize Booking</h1>
        <BookingForm service={JSON.parse(JSON.stringify(service))} />
      </div>
    </div>
  );
}