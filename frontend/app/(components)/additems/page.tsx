"use client"
import axios from "axios";
import { useState } from "react";
import type { RootState } from '../../../public/store'
import { useSelector } from 'react-redux'
// import { login } from '../../../public/features/auth/authSlice'

export default function Additems() {
    const [formdata, setFormData] = useState({title:"", description : "", price: 0, imageurl : ""});
    // const [message , setMessage]  = useState("");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        setFormData({ ...formdata, [e.target.name]: e.target.value });
      };
      const token = useSelector((state : RootState) => state.auth.token)

    const handleSubmit = ()=> {
        try{
            debugger
            
            if(!token){
                console.log("No token");
                return;
            }
            axios.post("http://3.110.37.154:80/api/v1/admin/additems",{
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-12 flex justify-center items-center relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      <div className="bg-white/10 backdrop-blur-xl rounded-none shadow-2xl p-12 max-w-4xl w-full relative border-l-4 border-l-amber-500">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300"></div>
        <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-amber-500 via-amber-400 to-amber-300"></div>

        <h2 className="text-4xl font-light text-center text-white mb-2">
          <span className="relative">
            Add Items
            <span className="absolute -bottom-2 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"></span>
          </span>
        </h2>
        <p className="text-center text-slate-300 mb-12 font-light tracking-wider">Create your architectural masterpiece</p>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={handleSubmit}>
          {/* Title Input */}
          <div className="relative group">
            <input
              name="title"
              type="text"
              required
              placeholder=" "
              onChange={handleChange}
              value={formdata.title}
              className="peer h-14 w-full border-b-2 border-slate-500 text-white placeholder-transparent focus:outline-none focus:border-amber-500 bg-white/5 px-4 transition-all duration-300 backdrop-blur-sm"
            />
            <label className="absolute left-4 -top-3.5 text-slate-400 text-sm transition-all 
                    peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-4 
                    peer-focus:-top-3.5 peer-focus:text-amber-500 peer-focus:text-sm">
              Title
            </label>
          </div>

          {/* Price Input */}
          <div className="relative group">
            <input
              name="price"
              type="number"
              required
              placeholder=" "
              onChange={handleChange}
              value={formdata.price}
              className="peer h-14 w-full border-b-2 border-slate-500 text-white placeholder-transparent focus:outline-none focus:border-amber-500 bg-white/5 pl-8 pr-4 transition-all duration-300 backdrop-blur-sm"
            />
            <label className="absolute left-8 -top-3.5 text-slate-400 text-sm transition-all 
                    peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-4 
                    peer-focus:-top-3.5 peer-focus:text-amber-500 peer-focus:text-sm">
              Price
            </label>
            <span className="absolute left-4 top-4 text-slate-400">₹</span>
          </div>

          {/* Description Textarea */}
          <div className="relative group md:col-span-2">
            <textarea
              name="description"
              required
              placeholder=" "
              onChange={handleChange}
              value={formdata.description}
              rows={4}
              className="peer w-full border-b-2 border-slate-500 text-white placeholder-transparent focus:outline-none focus:border-amber-500 bg-white/5 p-4 transition-all duration-300 backdrop-blur-sm resize-none"
            />
            <label className="absolute left-4 -top-3.5 text-slate-400 text-sm transition-all 
                    peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-4 
                    peer-focus:-top-3.5 peer-focus:text-amber-500 peer-focus:text-sm">
              Description
            </label>
          </div>

          {/* Image URL Input */}
          <div className="relative group md:col-span-2">
            <input
              name="imageurl"
              type="url"
              required
              placeholder=" "
              onChange={handleChange}
              value={formdata.imageurl}
              className="peer h-14 w-full border-b-2 border-slate-500 text-white placeholder-transparent focus:outline-none focus:border-amber-500 bg-white/5 px-4 transition-all duration-300 backdrop-blur-sm"
            />
            <label className="absolute left-4 -top-3.5 text-slate-400 text-sm transition-all 
                    peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-4 
                    peer-focus:-top-3.5 peer-focus:text-amber-500 peer-focus:text-sm">
              Image URL
            </label>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-center mt-12">
            <button
              type="submit"
              className="group relative px-8 py-4 bg-amber-500 text-white font-light tracking-wider hover:bg-amber-400 transition-all duration-300
                       before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:border before:border-amber-500
                       before:-translate-x-2 before:-translate-y-2 before:transition-transform before:duration-300
                       hover:before:translate-x-0 hover:before:translate-y-0 overflow-hidden
                       after:content-[''] after:absolute after:h-[200%] after:w-[200%] after:bg-white/10 after:rotate-45 after:-translate-x-full
                       hover:after:translate-x-[50%] after:transition-transform after:duration-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
);

}