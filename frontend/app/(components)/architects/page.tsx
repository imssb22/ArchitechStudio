"use client";
interface Architect  {
    id : string,
    name : string, 
    description : string,
    yoe : number,
    imageurl : string,
    rating : number,
    phone : string
}
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import type { RootState } from '../../../public/store'
import { useSelector} from 'react-redux'

export default function Architects() {
    const [items, setItems] = useState([]);
    const router = useRouter();
    const token = useSelector((state : RootState) => state.auth.token)

    const handleUpdate = async(itemId : string) => {
      router.push(`/architects/${itemId}/edit`)
    }
    const handleBook = async(item : Architect) => {
        try{
         
            await axios.put("http://localhost:3000/api/v1/admin/bookings", {
                name : item.name,
                description : item.description,
                phone : item.phone,
                imageurl : item.imageurl,
                quantity : 1,
                itemId : item.id,
            });
            alert("Added successfully to bookings");
        }catch(e){
            console.log("err", e);
            alert("something went wrong while sending the req")
        }
    }
    
    useEffect(() => {
      const fetchItems = () => {
        try {
          if(!token){
              return alert("Please sign in")
          }
          
          axios.get("http://localhost:3000/api/v1/admin/architects", {
        
            headers: {
              Authorization:  token, 
          }
          }).then((response) => {
              const data = response.data;
              if(response.status === 200){
                  setItems(data.allItems);
              }
              else{
                  console.log("Error getting items")
              }
          })
          }catch(e){
             console.log("ERR" , e);
          }
      };
      fetchItems();
    }, [token])
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-stone-900 to-amber-900 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0 bg-[url('/blueprint-pattern.svg')] bg-repeat"></div>
        </div>
    
        <div className="max-w-7xl mx-auto px-6 py-12 relative">
          <h2 className="text-5xl font-light text-center text-white mb-12">
            <span className="relative">
              Meet Our Architects
              <span className="absolute -bottom-2 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></span>
            </span>
          </h2>
    
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {items.map((architect: Architect) => (
              <div
                key={architect.id}
                className="group bg-gradient-to-br from-stone-800 to-stone-900 backdrop-blur-sm rounded-lg shadow-2xl hover:shadow-amber-500/10 transition-all duration-500 overflow-hidden flex flex-col border border-stone-700/50"
              >
                <div className="h-72 w-full overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent opacity-50 group-hover:opacity-30 transition-opacity duration-500 z-10"></div>
                  <Image
                    width={1000}
                    height={1000}
                    src={architect.imageurl}
                    alt={architect.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 right-0 bg-amber-400 text-stone-900 px-4 py-2 text-sm font-medium">
                    {architect.yoe} Years Experience
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-semibold text-xl mb-2 text-amber-100 group-hover:text-amber-400 transition-colors duration-300">
                    {architect.name}
                  </h3>
                  <div className="flex items-center mb-3">
                    <div className="flex items-center text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(architect.rating) ? 'fill-current' : 'fill-stone-700'}`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                        </svg>
                      ))}
                      <span className="ml-2 text-sm text-stone-400">{architect.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <p className="text-sm text-stone-300 mb-4 line-clamp-2">{architect.description}</p>
                  <div className="text-sm text-stone-400 mb-4">
                    <span className="inline-flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                      </svg>
                      {architect.phone}
                    </span>
                  </div>
                  <div className="mt-auto flex justify-end items-center space-x-3">
                    <button
                      onClick={() => {handleBook(architect)}}
                      className="relative px-6 py-2.5 bg-amber-400 text-stone-900 text-sm font-medium tracking-wider hover:bg-amber-300 transition-all duration-300 rounded-lg"
                    >
                      Book Now
                    </button>
                    
                    <button 
                      onClick={() => {handleUpdate(architect.id)}}
                      className="relative px-6 py-2.5 bg-transparent text-amber-400 text-sm tracking-wider border border-amber-400/50 
                              hover:bg-amber-400 hover:text-stone-900 transition-all duration-300 rounded-lg"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
}