"use client";
import { useSession } from "next-auth/react";
import { useState, useMemo, use } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function BookingForm({ service }) {
  const { data: session } = useSession();
  const router = useRouter();

  const locationData = [
    {
      region: "Dhaka",
      district: "Dhaka",
      city: "Dhaka",
      covered_area: ["Uttara", "Dhanmondi", "Mirpur", "Mohammadpur"],
    },
    {
      region: "Dhaka",
      district: "Faridpur",
      city: "Faridpur",
      covered_area: ["Goalanda", "Boalmari", "Bhanga"],
    },
    {
      region: "Dhaka",
      district: "Gazipur",
      city: "Gazipur",
      covered_area: ["Tongi", "Kaliakair", "Sreepur"],
    },
    {
      region: "Dhaka",
      district: "Gopalganj",
      city: "Gopalganj",
      covered_area: ["Tungipara", "Kotalipara", "Kashiani"],
    },
    {
      region: "Dhaka",
      district: "Kishoreganj",
      city: "Kishoreganj",
      covered_area: ["Bajitpur", "Kuliarchar", "Pakundia"],
    },
    {
      region: "Dhaka",
      district: "Madaripur",
      city: "Madaripur",
      covered_area: ["Rajoir", "Kalkini", "Shibchar"],
    },
    {
      region: "Dhaka",
      district: "Manikganj",
      city: "Manikganj",
      covered_area: ["Saturia", "Shivalaya", "Ghior"],
    },
    {
      region: "Dhaka",
      district: "Munshiganj",
      city: "Munshiganj",
      covered_area: ["Sreenagar", "Lohajang", "Sirajdikhan"],
    },
    {
      region: "Dhaka",
      district: "Narayanganj",
      city: "Narayanganj",
      covered_area: ["Fatullah", "Siddhirganj", "Rupganj"],
    },
    {
      region: "Dhaka",
      district: "Narsingdi",
      city: "Narsingdi",
      covered_area: ["Palash", "Belabo", "Raipura"],
    },
    {
      region: "Dhaka",
      district: "Rajbari",
      city: "Rajbari",
      covered_area: ["Pangsha", "Kalukhali", "Baliakandi"],
    },
    {
      region: "Dhaka",
      district: "Shariatpur",
      city: "Shariatpur",
      covered_area: ["Zajira", "Naria", "Gosairhat"],
    },
    {
      region: "Dhaka",
      district: "Tangail",
      city: "Tangail",
      covered_area: ["Delduar", "Ghatail", "Kalihati"],
    },
    {
      region: "Chattogram",
      district: "Chattogram",
      city: "Chattogram",
      covered_area: [
        "Pahartali",
        "Kotwali",
        "Halishahar",
        "Panchlaish",
        "Agrabad",
        "Chandgaon",
      ],
    },
    {
      region: "Chattogram",
      district: "Cox's Bazar",
      city: "Cox's Bazar",
      covered_area: ["Teknaf", "Ukhia", "Chakaria", "Ramu"],
    },
    {
      region: "Chattogram",
      district: "Cumilla",
      city: "Cumilla",
      covered_area: ["Laksam", "Debidwar", "Chandina", "Muradnagar"],
    },
    {
      region: "Chattogram",
      district: "Brahmanbaria",
      city: "Brahmanbaria",
      covered_area: ["Nabinagar", "Ashuganj", "Sarail"],
    },
    {
      region: "Chattogram",
      district: "Chandpur",
      city: "Chandpur",
      covered_area: ["Haimchar", "Matlab", "Shahrasti"],
    },
    {
      region: "Chattogram",
      district: "Feni",
      city: "Feni",
      covered_area: ["Parshuram", "Daganbhuiyan", "Chhagalnaiya"],
    },
    {
      region: "Chattogram",
      district: "Khagrachari",
      city: "Khagrachari",
      covered_area: ["Ramgarh", "Mahalchari", "Dighinala"],
    },
    {
      region: "Chattogram",
      district: "Lakshmipur",
      city: "Lakshmipur",
      covered_area: ["Raipur", "Ramganj", "Kamalnagar"],
    },
    {
      region: "Chattogram",
      district: "Noakhali",
      city: "Noakhali",
      covered_area: ["Begumganj", "Senbagh", "Chatkhil"],
    },
    {
      region: "Chattogram",
      district: "Rangamati",
      city: "Rangamati",
      covered_area: ["Baghaichhari", "Kaptai", "Juraichhari"],
    },
    {
      region: "Chattogram",
      district: "Bandarban",
      city: "Bandarban",
      covered_area: ["Bandarban Sadar", "Thanchi", "Lama", "Rowangchhari"],
    },
    {
      region: "Sylhet",
      district: "Sylhet",
      city: "Sylhet",
      covered_area: [
        "Zindabazar",
        "Ambarkhana",
        "Dargah Gate",
        "South Surma",
        "Subid Bazar",
        "Tilagor",
      ],
    },
    {
      region: "Sylhet",
      district: "Moulvibazar",
      city: "Moulvibazar",
      covered_area: ["Sreemangal", "Kamalganj", "Kulaura", "Barlekha"],
    },
    {
      region: "Sylhet",
      district: "Habiganj",
      city: "Habiganj",
      covered_area: ["Shaistaganj", "Madhabpur", "Chunarughat", "Nabiganj"],
    },
    {
      region: "Sylhet",
      district: "Sunamganj",
      city: "Sunamganj",
      covered_area: ["Jagannathpur", "Chhatak", "Tahirpur", "Dowarabazar"],
    },
    {
      region: "Rangpur",
      district: "Rangpur",
      city: "Rangpur",
      covered_area: [
        "Jahaj Company",
        "Pairaband",
        "Mahiganj",
        "Satmatha",
        "Lalbagh",
      ],
    },
    {
      region: "Rangpur",
      district: "Dinajpur",
      city: "Dinajpur",
      covered_area: ["Birampur", "Fulbari", "Parbatipur", "Nawabganj"],
    },
    {
      region: "Rangpur",
      district: "Thakurgaon",
      city: "Thakurgaon",
      covered_area: ["Pirganj", "Ranisankail", "Baliadangi"],
    },
    {
      region: "Rangpur",
      district: "Panchagarh",
      city: "Panchagarh",
      covered_area: ["Tetulia", "Boda", "Atwari"],
    },
    {
      region: "Rangpur",
      district: "Nilphamari",
      city: "Nilphamari",
      covered_area: ["Saidpur", "Domar", "Jaldhaka"],
    },
    {
      region: "Rangpur",
      district: "Lalmonirhat",
      city: "Lalmonirhat",
      covered_area: ["Hatibandha", "Patgram", "Aditmari"],
    },
    {
      region: "Rangpur",
      district: "Kurigram",
      city: "Kurigram",
      covered_area: ["Nageshwari", "Bhurungamari", "Chilmari", "Ulipur"],
    },
    {
      region: "Rangpur",
      district: "Gaibandha",
      city: "Gaibandha",
      covered_area: ["Gobindaganj", "Sundarganj", "Palashbari", "Phulchhari"],
    },
    {
      region: "Khulna",
      district: "Khulna",
      city: "Khulna",
      covered_area: [
        "Sonadanga",
        "Khalishpur",
        "Daulatpur",
        "Shib Bari",
        "Boyra",
      ],
    },
    {
      region: "Khulna",
      district: "Jessore",
      city: "Jessore",
      covered_area: ["Chowgachha", "Bagharpara", "Manirampur", "Abhaynagar"],
    },
    {
      region: "Khulna",
      district: "Satkhira",
      city: "Satkhira",
      covered_area: ["Tala", "Assasuni", "Kalaroa", "Debhata"],
    },
    {
      region: "Khulna",
      district: "Bagerhat",
      city: "Bagerhat",
      covered_area: ["Mongla", "Rampal", "Fakirhat", "Kachua"],
    },
    {
      region: "Khulna",
      district: "Magura",
      city: "Magura",
      covered_area: ["Sreepur", "Mohammadpur", "Shalikha"],
    },
    {
      region: "Khulna",
      district: "Narail",
      city: "Narail",
      covered_area: ["Lohagara", "Kalia", "Narail Sadar"],
    },
    {
      region: "Khulna",
      district: "Jhenaidah",
      city: "Jhenaidah",
      covered_area: ["Harinakunda", "Shailkupa", "Kaliganj"],
    },
    {
      region: "Khulna",
      district: "Chuadanga",
      city: "Chuadanga",
      covered_area: ["Alamdanga", "Damurhuda", "Jibannagar"],
    },
    {
      region: "Khulna",
      district: "Meherpur",
      city: "Meherpur",
      covered_area: ["Mujibnagar", "Gangni"],
    },
    {
      region: "Khulna",
      district: "Kushtia",
      city: "Kushtia",
      covered_area: [
        "Kushtia Sadar",
        "Kumarkhali",
        "Khoksa",
        "Mirpur",
        "Bheramara",
        "Daulatpur",
      ],
    },
    {
      region: "Rajshahi",
      district: "Rajshahi",
      city: "Rajshahi",
      covered_area: ["Boalia", "Rajpara", "Motihar", "Shah Makhdum", "Paba"],
    },
    {
      region: "Rajshahi",
      district: "Natore",
      city: "Natore",
      covered_area: ["Baraigram", "Bagatipara", "Lalpur", "Singra"],
    },
    {
      region: "Rajshahi",
      district: "Naogaon",
      city: "Naogaon",
      covered_area: ["Manda", "Sapahar", "Porsha", "Patnitala"],
    },
    {
      region: "Rajshahi",
      district: "Chapainawabganj",
      city: "Chapainawabganj",
      covered_area: ["Shibganj", "Bholahat", "Gomostapur"],
    },
    {
      region: "Rajshahi",
      district: "Pabna",
      city: "Pabna",
      covered_area: ["Ishwardi", "Bera", "Chatmohar", "Atgharia"],
    },
    {
      region: "Rajshahi",
      district: "Sirajganj",
      city: "Sirajganj",
      covered_area: ["Ullapara", "Kazipur", "Shahjadpur", "Belkuchi"],
    },
    {
      region: "Rajshahi",
      district: "Joypurhat",
      city: "Joypurhat",
      covered_area: ["Akkelpur", "Kalai", "Panchbibi"],
    },
    {
      region: "Rajshahi",
      district: "Bogura",
      city: "Bogura",
      covered_area: [
        "Sariakandi",
        "Sonatola",
        "Gabtali",
        "Sherpur",
        "Shajahanpur",
      ],
    },
    {
      region: "Barisal",
      district: "Barisal",
      city: "Barisal",
      covered_area: ["Band Road", "Kawnia", "Rupatali", "Nathullabad"],
    },
    {
      region: "Barisal",
      district: "Bhola",
      city: "Bhola",
      covered_area: ["Borhanuddin", "Tazumuddin", "Daulatkhan", "Char Fasson"],
    },
    {
      region: "Barisal",
      district: "Patuakhali",
      city: "Patuakhali",
      covered_area: ["Kalapara", "Mirzaganj", "Dashmina", "Galachipa"],
    },
    {
      region: "Barisal",
      district: "Pirojpur",
      city: "Pirojpur",
      covered_area: ["Mathbaria", "Bhandaria", "Kawkhali", "Nazirpur"],
    },
    {
      region: "Barisal",
      district: "Barguna",
      city: "Barguna",
      covered_area: ["Amtali", "Patharghata", "Betagi", "Bamna"],
    },
    {
      region: "Barisal",
      district: "Jhalokati",
      city: "Jhalokati",
      covered_area: ["Nalchity", "Rajapur", "Kathalia"],
    },
    {
      region: "Mymensingh",
      district: "Mymensingh",
      city: "Mymensingh",
      covered_area: [
        "Trishal",
        "Muktagachha",
        "Bhaluka",
        "Phulpur",
        "Haluaghat",
      ],
    },
    {
      region: "Mymensingh",
      district: "Netrokona",
      city: "Netrokona",
      covered_area: ["Khaliajuri", "Mohanganj", "Durgapur", "Barhatta"],
    },
    {
      region: "Mymensingh",
      district: "Jamalpur",
      city: "Jamalpur",
      covered_area: ["Madarganj", "Islampur", "Sarishabari", "Baksiganj"],
    },
    {
      region: "Mymensingh",
      district: "Sherpur",
      city: "Sherpur",
      covered_area: ["Nakla", "Nalitabari", "Jhenaigati", "Sreebardi"],
    },
  ];

  const regions = useMemo(
    () => [...new Set(locationData.map((item) => item.region))],
    [],
  );

  // স্টেট ম্যানেজমেন্ট
  const [duration, setDuration] = useState(1);
  const [durationType, setDurationType] = useState("hours");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [detailedAddress, setDetailedAddress] = useState("");

  const districts = locationData.filter(
    (item) => item.region === selectedRegion,
  );
  const areas =
    districts.find((item) => item.district === selectedDistrict)
      ?.covered_area || [];

  const pricePerHour = service.price_per_hour || 50;
  const pricePerDay = service.price_per_day || pricePerHour * 8;

  const totalCost =
    durationType === "hours" ? duration * pricePerHour : duration * pricePerDay;

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!selectedArea) return toast.error("Please select an area!");

    const toastId = toast.loading("Processing...");

    const res = await fetch("/api/booking", {
      method: "POST",
      body: JSON.stringify({
        userEmail: session?.user?.email,
        userName: session?.user?.name,
        userImage: session?.user?.image,

        serviceId: service._id,

        serviceTitle: service.title,
        serviceImage: service.image,
        duration: `${duration} ${durationType}`,
        totalCost,
        location: {
          region: selectedRegion,
          district: selectedDistrict,
          area: selectedArea,
          address: detailedAddress,
        },
        status: "Pending",
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      toast.success("Booking success!", { id: toastId });
      router.push("/");
    } else {
      toast.error("Booking failed.", { id: toastId });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white dark:bg-zinc-900 border dark:border-zinc-800 rounded-[2rem] shadow-xl transition-all">
      <form onSubmit={handleBooking} className="space-y-6">
        <h2 className="text-2xl font-black mb-6">Confirm Booking</h2>

        {/*  (Days/Hours) */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest ml-2">
              Duration Type
            </label>
            <select
              value={durationType}
              onChange={(e) => {
                setDurationType(e.target.value);
                setDuration(1);
              }}
              className="w-full p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800 ring-1 ring-zinc-200 dark:ring-zinc-700 outline-none font-bold"
            >
              <option value="hours">Hours</option>
              <option value="days">Days</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest ml-2">
              Number of {durationType}
            </label>
            <input
              type="number"
              min="1"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800 ring-1 ring-zinc-200 dark:ring-zinc-700 outline-none font-bold"
              required
            />
          </div>
        </div>

        <div className="space-y-4 pt-2 border-t dark:border-zinc-800">
          <p className="text-xs font-black text-zinc-400 uppercase tracking-[0.2em]">
            Location Details
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              onChange={(e) => {
                setSelectedRegion(e.target.value);
                setSelectedDistrict("");
              }}
              className="w-full p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800 ring-1 ring-zinc-200 dark:ring-zinc-700 outline-none font-bold"
              required
            >
              <option value="">Select Division</option>
              {regions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>

            <select
              disabled={!selectedRegion}
              onChange={(e) => {
                setSelectedDistrict(e.target.value);
                setSelectedArea("");
              }}
              className="w-full p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800 ring-1 ring-zinc-200 dark:ring-zinc-700 outline-none font-bold disabled:opacity-50"
              required
            >
              <option value="">Select District</option>
              {districts.map((d) => (
                <option key={d.district} value={d.district}>
                  {d.district}
                </option>
              ))}
            </select>
          </div>

          <select
            disabled={!selectedDistrict}
            onChange={(e) => setSelectedArea(e.target.value)}
            className="w-full p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800 ring-1 ring-zinc-200 dark:ring-zinc-700 outline-none font-bold disabled:opacity-50"
            required
          >
            <option value="">Select Area</option>
            {areas.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>

          <textarea
            placeholder="House/Road/Street Address..."
            onChange={(e) => setDetailedAddress(e.target.value)}
            className="w-full p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800 ring-1 ring-zinc-200 dark:ring-zinc-700 outline-none h-20 font-medium"
            required
          />
        </div>

        <div className="flex justify-between items-center p-6 bg-zinc-900 dark:bg-blue-600 rounded-[1.8rem] text-white shadow-lg">
          <div>
            <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest">
              Total Payable
            </p>
            <h3 className="text-3xl font-black">${totalCost}</h3>
          </div>
          <button
            type="submit"
            className="bg-white text-zinc-900 px-10 py-3 rounded-xl font-black hover:scale-105 transition-all"
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
}
