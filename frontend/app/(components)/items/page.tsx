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
import type { RootState } from '../../../public/store'
import { useSelector} from 'react-redux'
// import { useRouter } from "next/navigation";
// import { login } from '../../../public/features/auth/authSlice'
export default function Items() {
    const [items, setItems] = useState([]);
    const router = useRouter();
    const token = useSelector((state : RootState) => state.auth.token)

    const handleUpdate = async(itemId : string) => {
      router.push(`/items/${itemId}/edit`)
    }
    const handleBuy = async(item : Item) => {
        try{
            await axios.put("http://3.110.37.154:80/api/v1/admin/cart", {
              title : item.title,
                description : item.description,
                price : item.price,
                imageurl : item.imageurl,
                quantity : 1,
                itemId : item.id,
            });
            alert("Added successfully to cart");
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
          
          axios.get("http://3.110.37.154:80/api/v1/admin/items", {
        
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
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-stone-100 to-zinc-100 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f59e0b' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
    
        <div className="max-w-7xl mx-auto px-6 py-12 relative">
          <h2 className="text-4xl font-light text-center text-slate-800 mb-12">
            <span className="relative">
              Browse Items
              <span className="absolute -bottom-2 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"></span>
            </span>
          </h2>
    
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {items.map((item: Item) => (
              <div
                key={item.id}
                className="group bg-white/80 backdrop-blur-sm rounded-none shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col border-l-2 border-l-transparent hover:border-l-amber-500"
              >
                <div className="h-56 w-full overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-900/50 via-amber-800/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                  <Image
                    width={1000}
                    height={1000}
                    src={item.imageurl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 right-0 bg-amber-500 text-white px-4 py-2 text-sm font-light tracking-wider">
                    ₹{item.price.toLocaleString()}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow bg-gradient-to-br from-white/90 to-amber-50/90">
                  <h3 className="font-light text-xl mb-2 text-slate-800 group-hover:text-amber-700 transition-colors duration-300">{item.title}</h3>
                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">{item.description}</p>
                  <div className="mt-auto flex justify-end items-center space-x-3">
                    <button
                      onClick={() => {handleBuy(item)}}
                      className="relative overflow-hidden px-6 py-2.5 bg-amber-500 text-white text-sm tracking-wider hover:bg-amber-400 transition-all duration-300
                              before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:border before:border-amber-500
                              before:-translate-x-2 before:-translate-y-2 before:transition-transform before:duration-300
                              hover:before:translate-x-0 hover:before:translate-y-0
                              after:content-[''] after:absolute after:h-[200%] after:w-[200%] after:bg-white/10 after:rotate-45 after:-translate-x-full
                              hover:after:translate-x-[50%] after:transition-transform after:duration-700"
                    >
                      Buy
                    </button>
                    
                    <button 
                      onClick={() => {handleUpdate(item.id)}}
                      className="relative overflow-hidden px-6 py-2.5 bg-transparent text-amber-600 text-sm tracking-wider border border-amber-500 
                              hover:bg-amber-500 hover:text-white transition-all duration-300
                              before:content-[''] before:absolute before:inset-0 before:bg-amber-500/10 before:scale-x-0 before:origin-right
                              hover:before:scale-x-100 hover:before:origin-left before:transition-transform before:duration-300"
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