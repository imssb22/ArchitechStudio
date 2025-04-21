"use client"
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState , useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import axios from "axios";
import type { RootState } from '../../../public/store'
import { useSelector} from 'react-redux'
interface Item {
    id : string,
    title: string;
    description: string;
    price: number;
    imageurl: string;
  }
export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') ?? "";
  const [items, setItems] = useState<Item[]>([]);
  const token = useSelector((state : RootState) => state.auth.token)

  useEffect(() => {
    const fetchItems = async() => {
        try{
        
    if(!token){
        return alert( "You are not signed in")
    }
    axios.get(`http://3.110.37.154:80/api/v1/admin/search?q=${encodeURIComponent(query)}`, {
      
          headers: {
            Authorization:  token
        }
    }).then((response) => {
        const data = response.data;
        if(response.status === 200){
            setItems(data)
        }else{
            return alert("Error")
        }
    })
    }catch(e){
        console.error("ERR", e);
        alert("ERror")
    }
}
    if(query)fetchItems();
  }, [query, token])
  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold">Search Results for: `{query}`</h1>
      {query ? (
        <div className="mt-4">
          <div className="max-w-7xl mx-auto px-6 py-12">
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
                    <h3 className="font-semibold text-lg mb-1 text-gray-800">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="mt-auto flex justify-between items-center">
                      <span className="text-amber-600 font-bold text-lg">
                        ₹{item.price}
                      </span>
                      <button className="bg-amber-500 text-white text-sm px-3 py-1.5 rounded-lg hover:bg-amber-600 transition">
                        Buy
                      </button>
                      <Link href="/">
                        <button className="bg-amber-500 text-white text-sm px-3 py-1.5 rounded-lg hover:bg-amber-600 transition">
                          Update
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-gray-600">
            [Your filtered item results based on `{query}`]
          </p>
        </div>
      ) : (
        <p className="text-gray-500 mt-4">No search query provided.</p>
      )}
    </div>
  );
}
