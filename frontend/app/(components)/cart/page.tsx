"use client"
import type { RootState } from '../../../public/store'
import { useSelector} from 'react-redux'
import Image from 'next/image';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
interface CartItem {
    id: string;
    title: string;
    description: string;
    price: number;
    imageurl: string;
    quantity: number;
    itemId : string
  }
export default function Cart(){
    const router = useRouter();
    const [currQuantity, setCurrQuantity] = useState(0)
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const token = useSelector((state : RootState) => state.auth.token);
    
    useEffect(() => {
        const getCartItems = async() => {
            try{
                if(!token){
                    return alert("Please sign in")
                }
                const response = await axios.get("http://3.110.37.154:80/api/v1/admin/cart");
                if(response.status === 200){
                    setCartItems(response.data)
                    setCurrQuantity(response.data.quantity)
                    setIsLoading(false)
                }
            }catch(e){
                console.log("Err", e);
                alert("Something went wrong");
            }
        }
        getCartItems();
    }, [cartItems, token,currQuantity])

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }
    const handleQuantityChange = async (itemId : string, change : number) =>{ 
        
        try{
        
            if (!token) {
                return alert("Please sign in");
            }
            const response = await axios.put(`http://3.110.37.154:80/api/v1/admin/cart/${itemId}`, {change : change});
            if(response.status === 200){
                setCurrQuantity(response.data.quantity)
                console.log("updated")
            }
        }catch(e){
            console.log("Err", e);
            alert("Failed to update the quantity")
        }
    }
      return (
          <div className="min-h-screen bg-gradient-to-br from-slate-100 via-stone-100 to-zinc-100 py-12 px-4">
              <div className="max-w-7xl mx-auto relative">
                  <h2 className="text-4xl font-light text-center text-slate-800 mb-12">
                      <span className="relative">
                          Shopping Cart
                          <span className="absolute -bottom-2 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"></span>
                      </span>
                  </h2>
    
                  {cartItems.length === 0 ? (
                      <div className="text-center py-12 bg-white/80 backdrop-blur-sm shadow-xl p-8">
                          <div className="text-slate-600 text-xl mb-4">Your cart is empty</div>
                          <p className="text-slate-500 mb-8">Add some items to get started!</p>
                          <button
                              onClick={() => { router.push('/items') }}
                              className="group relative px-8 py-4 bg-amber-500 text-white font-light tracking-wider hover:bg-amber-400 transition-all duration-300
                                      before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:border before:border-amber-500
                                      before:-translate-x-2 before:-translate-y-2 before:transition-transform before:duration-300
                                      hover:before:translate-x-0 hover:before:translate-y-0"
                          >
                              Browse Items
                          </button>
                      </div>
                  ) : (
                      <div className="space-y-8">
                          {cartItems.map((item) => (
                              <div key={item.id} 
                                  className="group bg-white/80 backdrop-blur-sm rounded-none shadow-xl hover:shadow-2xl transition-all duration-500 p-6 border-l-2 border-l-transparent hover:border-l-amber-500 flex items-center space-x-6"
                              >
                                  <div className="flex-shrink-0 w-24 h-24 relative overflow-hidden">
                                      <Image
                                          src={item.imageurl}
                                          alt={item.title}
                                          fill
                                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                                      />
                                  </div>
                                  <div className="flex-1">
                                      <h3 className="text-xl font-light text-slate-800 group-hover:text-amber-700 transition-colors duration-300">
                                          {item.title}
                                      </h3>
                                      <p className="mt-1 text-sm text-slate-600">{item.description}</p>
                                      <div className="mt-4 flex items-center justify-between">
                                          <div className="flex items-center space-x-4">
                                              <button
                                                  onClick={() => handleQuantityChange(item.itemId, -1)}
                                                  className="w-8 h-8 flex items-center justify-center border border-slate-300 hover:border-amber-500 hover:text-amber-500 transition-colors duration-300"
                                              >
                                                  -
                                              </button>
                                              <span className="w-8 text-center text-slate-800">{item.quantity}</span>
                                              <button
                                                  onClick={() => handleQuantityChange(item.itemId, 1)}
                                                  className="w-8 h-8 flex items-center justify-center border border-slate-300 hover:border-amber-500 hover:text-amber-500 transition-colors duration-300"
                                              >
                                                  +
                                              </button>
                                          </div>
                                          <span className="font-light text-xl text-slate-800">
                                              ₹{(item.price * item.quantity).toLocaleString()}
                                          </span>
                                      </div>
                                  </div>
                              </div>
                          ))}
    
                          <div className="mt-12 border-t border-amber-200/30 pt-8">
                              <div className="flex justify-between items-center">
                                  <span className="text-2xl font-light text-slate-800">Total</span>
                                  <span className="text-2xl font-light text-amber-600">
                                      ₹{cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toLocaleString()}
                                  </span>
                              </div>
                          </div>
                      </div>
                  )}
              </div>
          </div>
      );
}