"use client"
import axios from "axios";
import { useState } from "react";

export default function Additems() {
    const [formdata, setFormData] = useState({title:"", description : "", price: 0, imageurl : ""});
    // const [message , setMessage]  = useState("");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        setFormData({ ...formdata, [e.target.name]: e.target.value });
      };
    const handleSubmit = ()=> {
        try{
            debugger
            const token = localStorage.getItem("token");
            if(!token){
                console.log("No token");
                return;
            }
            axios.post("http://localhost:3000/api/v1/admin/additems",{
                title : formdata.title, 
                description : formdata.description,
                price : Number(formdata.price),
                imageurl : formdata.imageurl
            }, {
                headers: {
                    Authorization:  token,
                  },
            }).then((response) => {
                // const data = response.data;
                if(response.status === 200){
                    return console.log("Success");
                }   
                else{
                    return alert(response.data.message);
                }
            })

        }catch(e){
            console.log("ERR", e);
            alert("Failed")
        }
    }
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-zinc-100 px-4 py-12 flex justify-center items-center">
      <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-4xl w-full relative overflow-hidden">


        <div className="absolute -top-20 -left-20 w-60 h-60 bg-blue-200 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-purple-300 rounded-full blur-3xl opacity-30"></div>
        <h2 className="text-4xl font-extrabold text-center text-slate-900 mb-8">
          Create a New Listing
        </h2>


        <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={handleSubmit}>
          <div className="relative">
            <label
                className="absolute left-4 top-3 text-gray-500 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-gray-500 transition-all"
            >
                Title
            </label>
            <input
                name="title"
                type="text"
                required
                placeholder=" "
                onChange={handleChange}
                value={formdata.title}
                className="peer w-full pt-6 px-4 pb-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
            />
            </div>


          <div className="relative">
                <label
                    className="absolute left-4 top-3 text-gray-500 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-gray-500 transition-all"
                >
                    Price
                </label>
                <input
                    name="price"
                    type="number"
                    required
                    placeholder=" "
                    onChange={handleChange}
                    value={formdata.price}
                    className="peer w-full pt-6 px-4 pb-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 appearance-none 
                    [&::-webkit-outer-spin-button]:appearance-none 
                    [&::-webkit-inner-spin-button]:appearance-none 
                    [&::-moz-inner-spin-button]:appearance-none"
                />
                </div>


            <div className="md:col-span-2 relative">
            <label className="absolute left-4 top-3 text-gray-500 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-gray-500 transition-all">
                Description
            </label>
            <textarea
                name="description"
                required
                placeholder=" "
                onChange={handleChange}
                value={formdata.description}
                className="peer w-full pt-6 px-4 pb-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 resize-none"
            />
            </div>


          <div className="md:col-span-2 relative">
                <label
                    className="absolute left-4 top-3 text-gray-500 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-gray-500 transition-all"
                >
                    Image Link
                </label>
                <input
                    name="imageurl"
                    
                    required
                    placeholder=" "
                    onChange={handleChange}
                    value={formdata.imageurl}
                    className="peer w-full pt-6 px-4 pb-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
                />
                </div>
                <div className="mt-10 flex justify-center">
                <button
                    type="submit"
                    className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-3 rounded-xl shadow-md transition-transform hover:scale-105"
                >
                    Submit Listing
                </button>
                </div>
        </form>

        
      </div>
    </div>
  );

}