"use client";
interface Item {
  id : string,
  title: string;
  description: string;
  price: number;
  imageurl: string;
}
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Items() {
    const [items, setItems] = useState([]);
    const router = useRouter();
    const handleUpdate = async(itemId : string) => {
      router.push(`/items/${itemId}/edit`)
    }
    
    const fetchItems = () => {
      try {
        const token = localStorage.getItem("token");
        if(!token){
            return alert("Please sign in")
        }
        axios.get("http://localhost:3000/api/v1/admin/items", {
      
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
    useEffect(() => {
      fetchItems();
    }, [])
    
    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Browse Items</h2>
  
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {items.map((item : Item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow overflow-hidden flex flex-col"
            >
              <div className="h-48 w-full bg-gray-100 overflow-hidden">
                <Image
                  width={1000}
                  height={1000}
                  src={item.imageurl}
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-semibold text-lg mb-1 text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-500 mb-3 line-clamp-2">{item.description}</p>
                <div className="mt-auto flex justify-between items-center">
                  <span className="text-amber-600 font-bold text-lg">₹{item.price}</span>
                  <button className="bg-amber-500 text-white text-sm px-3 py-1.5 rounded-lg hover:bg-amber-600 transition">
                    Buy
                  </button>
                  
                  <button onClick={() => {handleUpdate(item.id)}}
                  className="bg-amber-500 text-white text-sm px-3 py-1.5 rounded-lg hover:bg-amber-600 transition">
                    Update
                  </button>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }