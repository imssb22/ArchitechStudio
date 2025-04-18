"use client"
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/public/store";
import axios from "axios";
import {useState, useEffect} from "react"
import Image from "next/image";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";


interface Architect  {
    id : string,
    name : string, 
    description : string,
    yoe : number,
    imageurl : string,
    rating : number,
    phone : string
}

interface BlockedTime {
    startTime: string;
    endTime: string;
}

export default function BookingEdit(){
    const archId = useParams().id as string;
    // const [present, setPresent] = useState(false)
    const token = useSelector((state : RootState) => state.auth.token)
    console.log({archId});
    const router = useRouter();
    const [formdata, setFormData] = useState<Omit<Architect, 'id'>>({
        name: '',
        description: '',
        rating: 0,
        imageurl: '',
        yoe : 0,
        phone : ''
    })
    const [blockedTimes, setBlockedTimes] = useState<BlockedTime[]>([])
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();
    const [selectedTime, setSelectedTime] = useState<string>("");

    useEffect(() => {
        const getInfo = async() => {
        axios.get(`http://localhost:3000/api/v1/admin/architects/${archId}`)
      .then((res) => {
        setFormData(res.data)
        setLoading(false);
      })
      .catch((err) => console.error(err))
        }
        getInfo();
    
    }, [ archId])
    useEffect(() => {
        const getBlockedTimes = async() => {
            try{
                const res = await axios.get(`http://localhost:3000/api/v1/admin/bookings/${archId}`)
                if(res.status === 200){
                    setBlockedTimes(res.data)
                    console.log(res.data)
                }
            }catch(e){
                alert("Something went wrog")
                console.error(e)
            }
            
        }
        getBlockedTimes();
    },[ archId])
    const handleBooking = async () => {
        if(!token){
            return alert("please signin")
        }
        if (!selectedDate || !selectedTime) return;
        
        try {
          const bookingTime = new Date(selectedDate);
          const [hours, minutes] = selectedTime.split(':');
          bookingTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
          console.log(bookingTime, " ");
          const st = bookingTime.toISOString();
          const tt = new Date(bookingTime.getTime() + 60 * 60 * 1000).toISOString();
          console.log(st, " ", tt);
          const res = await axios.post(`http://localhost:3000/api/v1/admin/bookings/${archId}`, {
            startTime: bookingTime.toISOString(),
            endTime: new Date(bookingTime.getTime() + 60 * 60 * 1000).toISOString(), 
            name : formdata.name,
            imageurl : formdata.imageurl
          });
          if(res.data.present){
            //  setPresent(true)
             alert("booking already present!")
          }
          else{
            router.push('/bookings');
          }
           // Redirect to bookings page after success
        } catch (error) {
          console.error('Booking error:', error);
          // Add error handling here
        }
    };

    const isTimeBlocked = (time: string) => {
        if (!selectedDate || !blockedTimes.length) return false;

        const timeToCheck = new Date(selectedDate);
        const [hours, minutes] = time.split(':');
        timeToCheck.setHours(parseInt(hours), parseInt(minutes), 0, 0);

        return blockedTimes.some(blocked => {
            const blockStart = new Date(blocked.startTime);
            const blockEnd = new Date(blocked.endTime);
            
            // Check if the selected date matches the blocked date
            return timeToCheck.toDateString() === blockStart.toDateString() && 
                   timeToCheck >= blockStart && timeToCheck < blockEnd;
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-stone-50 via-stone-100 to-amber-50 px-4 py-12">
            {loading ? (
                <div className="flex justify-center items-center min-h-[60vh]">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-600"></div>
                </div>
            ) : (
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Architect Details Card */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-stone-200 shadow-xl">
                            <div className="relative h-80 mb-6 rounded-2xl overflow-hidden">
                                <Image
                                    src={formdata.imageurl}
                                    alt={formdata.name}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute bottom-4 right-4 bg-amber-500 text-white px-4 py-2 rounded-lg">
                                    {formdata.yoe} Years Experience
                                </div>
                            </div>

                            <h1 className="text-3xl font-bold text-stone-800 mb-4">{formdata.name}</h1>

                            <div className="flex items-center mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className={`w-5 h-5 ${i < Math.floor(formdata.rating) ? 'text-amber-500' : 'text-stone-200'}`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                                <span className="ml-2 text-stone-600">{formdata.rating.toFixed(1)}</span>
                            </div>

                            <p className="text-stone-600 mb-6">{formdata.description}</p>

                            <div className="flex items-center text-stone-600">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                {formdata.phone}
                            </div>
                        </div>

                        {/* Booking Section */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-stone-200 shadow-xl">
                            <h2 className="text-2xl font-semibold text-stone-800 mb-6">Schedule a Consultation</h2>

                            <div className="mb-8">
                                <DayPicker
                                    mode="single"
                                    selected={selectedDate}
                                    onSelect={setSelectedDate}
                                    disabled={{ before: new Date(Date.now() + 86400000) }}
                                    className="!bg-white p-4 rounded-xl border border-stone-200"
                                    classNames={{
                                        day_selected: "bg-amber-500 text-white",
                                        day_today: "text-amber-600",
                                        day: "text-stone-600 hover:bg-stone-100",
                                    }}
                                />
                            </div>

                            {selectedDate && (
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium text-stone-700">Available Time Slots</h3>
                                    <div className="grid grid-cols-3 gap-3">
                                        {["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"].map((time) => {
                                            const isBlocked = isTimeBlocked(time);
                                            return (
                                                <button
                                                    key={time}
                                                    onClick={() => !isBlocked && setSelectedTime(time)}
                                                    disabled={isBlocked}
                                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 
                                                        ${isBlocked 
                                                            ? "bg-stone-200 text-stone-400 cursor-not-allowed opacity-50" 
                                                            : selectedTime === time
                                                                ? "bg-amber-500 text-white"
                                                                : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                                                        }`}
                                                >
                                                    {time}
                                                    {isBlocked && (
                                                        <span className="block text-xs mt-1 text-stone-500">
                                                            Booked
                                                        </span>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {selectedTime && (
                                        <button
                                            onClick={handleBooking}
                                            className="w-full mt-6 bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 rounded-xl font-medium 
                                                    shadow-xl hover:shadow-amber-200 transition-all duration-300 hover:-translate-y-0.5"
                                        >
                                            Confirm Booking
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}