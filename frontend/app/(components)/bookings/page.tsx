"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import type { RootState } from '../../../public/store'
import { useSelector} from 'react-redux'
import Link from "next/link";
import Image from "next/image";

interface Booking {
    id: string;       
    startTime: Date;  
    endTime: Date;           
    name: string;          
    imageurl: string;      
}

export default function Bookings() {
    const token = useSelector((state: RootState) => state.auth.token)
    const [bookings, setBookings] = useState<Booking[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getBookings = async() => {
            if(!token) {
                return alert("Please sign in")
            }
            try {
                const response = await axios.get("http://localhost:3000/api/v1/admin/bookings");
                if(response.status === 200) {
                    setBookings(response.data)
                }
            } catch(e) {
                console.error("Error fetching bookings:", e);
                alert("Failed to fetch bookings")
            } finally {
                setLoading(false)
            }
        }
        getBookings()
    }, [token]) // Remove bookings from dependency array

    const handleDelete = async(bookingId: string) => {
        try {
            await axios.delete(`http://localhost:3000/api/v1/admin/bookings/${bookingId}`);
            // Update the bookings list after successful deletion
            setBookings(bookings.filter(booking => booking.id !== bookingId));
        } catch(e) {
            console.error(e);
            alert("Failed to delete booking");
        }
    };

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleString('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short'
        });
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-stone-50 via-stone-100 to-amber-50 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-stone-800 mb-8">Your Bookings</h1>
                
                {loading ? (
                    <div className="flex justify-center items-center min-h-[400px]">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
                    </div>
                ) : bookings.length === 0 ? (
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 text-center border border-stone-200 shadow-lg">
                        <Link href= 'architects' className="text-2xl text-amber-600 hover:text-amber-700 font-medium">
                        <p className="text-stone-600 text-2xl">No bookings found. Schedule a consultation with one of our architects</p>
                         here!
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {bookings.map((booking) => (
                            <div 
                                key={booking.id}
                                className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden border border-stone-200 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                            >
                                <div className="relative h-48">
                                    <Image
                                        src={booking.imageurl}
                                        alt={booking.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-stone-800 mb-4">
                                        {booking.name}
                                    </h3>
                                    <div className="space-y-2 text-stone-600">
                                        <div className="flex items-center">
                                            <svg className="w-5 h-5 mr-2 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span>Start: {formatDate(booking.startTime)}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <svg className="w-5 h-5 mr-2 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span>End: {formatDate(booking.endTime)}</span>
                                        </div>
                                    </div>
                                    <div className="mt-6 pt-4 border-t border-stone-100">
                                        <button 
                                            onClick={() => handleDelete(booking.id)}
                                            className="w-full group flex items-center justify-center px-4 py-2 rounded-lg
                                                     text-red-600 hover:text-white
                                                     border border-red-200 hover:border-red-600
                                                     hover:bg-red-600 transition-all duration-300"
                                        >
                                            <svg 
                                                className="w-5 h-5 mr-2" 
                                                fill="none" 
                                                stroke="currentColor" 
                                                viewBox="0 0 24 24"
                                            >
                                                <path 
                                                    strokeLinecap="round" 
                                                    strokeLinejoin="round" 
                                                    strokeWidth="2" 
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                                                />
                                            </svg>
                                            Cancel Booking
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}