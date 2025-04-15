"use client"
import axios from "axios";
import { useState } from "react";
import type { RootState } from '../../../public/store'
import { useSelector } from 'react-redux'
// import { login } from '../../../public/features/auth/authSlice'
interface Architect  {
    name : string, 
    description : string,
    yoe : number,
    imageurl : string,
    rating : number,
    phone : string
}

export default function Additems() {
    const [formdata, setFormData] = useState<Architect>({name:"", description : "", imageurl : "", yoe : 0, rating : 0, phone : ""});
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
            axios.post("http://localhost:3000/api/v1/admin/addarchitect",{
                name : formdata.name, 
                description : formdata.description,
                yoe : Number(formdata.yoe),
                imageurl : formdata.imageurl,
                rating : Number(formdata.rating),
                phone : (formdata.phone)
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
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-stone-100 to-amber-50 px-4 py-12 flex justify-center items-center relative">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-[url('/architectural-pattern.svg')] bg-repeat opacity-[0.03]"></div>

      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-12 max-w-4xl w-full relative border border-stone-200">
        <h2 className="text-4xl font-bold text-center text-stone-800 mb-2">
          Add Architect
        </h2>
        <p className="text-center text-stone-600 mb-12">Add a new architect to our team</p>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={handleSubmit}>
        <div className="relative group md:col-span-2">
            <input
              name="name"
              type="text"
              required
              placeholder=" "
              onChange={handleChange}
              value={formdata.name}
              className="peer h-14 w-full border-2 border-stone-200 text-stone-800 placeholder-transparent focus:outline-none focus:border-amber-500 bg-white/50 px-4 rounded-xl transition-all duration-300"
            />
            <label className="absolute left-4 -top-3.5 text-stone-600 text-sm transition-all bg-white/50 px-2
                    peer-placeholder-shown:text-base peer-placeholder-shown:text-stone-500 peer-placeholder-shown:top-4 
                    peer-focus:-top-3.5 peer-focus:text-amber-600 peer-focus:text-sm">
              Full Name
            </label>
          </div>

          <div className="relative group">
            <input
              name="yoe"
              type="number"
              required
              placeholder=" "
              onChange={handleChange}
              value={formdata.yoe}
              className="peer h-14 w-full border-2 border-stone-200 text-stone-800 placeholder-transparent focus:outline-none focus:border-amber-500 bg-white/50 px-4 rounded-xl transition-all duration-300"
            />
            <label className="absolute left-4 -top-3.5 text-stone-600 text-sm transition-all bg-white/50 px-2
                    peer-placeholder-shown:text-base peer-placeholder-shown:text-stone-500 peer-placeholder-shown:top-4 
                    peer-focus:-top-3.5 peer-focus:text-amber-600 peer-focus:text-sm">
              Years of Experience
            </label>
          </div>

          <div className="relative group">
            <input
              name="phone"
              type="text"
              required
              placeholder=" "
              onChange={handleChange}
              value={formdata.phone}
              className="peer h-14 w-full border-2 border-stone-200 text-stone-800 placeholder-transparent focus:outline-none focus:border-amber-500 bg-white/50 px-4 rounded-xl transition-all duration-300"
            />
            <label className="absolute left-4 -top-3.5 text-stone-600 text-sm transition-all bg-white/50 px-2
                    peer-placeholder-shown:text-base peer-placeholder-shown:text-stone-500 peer-placeholder-shown:top-4 
                    peer-focus:-top-3.5 peer-focus:text-amber-600 peer-focus:text-sm">
              Phone Number
            </label>
          </div>

          <div className="relative group">
            <input
              name="rating"
              type="number"
              required
              placeholder=" "
              onChange={handleChange}
              value={formdata.rating}
              min="0"
              max="5"
              step="0.1"
              className="peer h-14 w-full border-2 border-stone-200 text-stone-800 placeholder-transparent focus:outline-none focus:border-amber-500 bg-white/50 px-4 rounded-xl transition-all duration-300"
            />
            <label className="absolute left-4 -top-3.5 text-stone-600 text-sm transition-all bg-white/50 px-2
                    peer-placeholder-shown:text-base peer-placeholder-shown:text-stone-500 peer-placeholder-shown:top-4 
                    peer-focus:-top-3.5 peer-focus:text-amber-600 peer-focus:text-sm">
              Rating (0-5)
            </label>
          </div>

          <div className="relative group md:col-span-2">
            <textarea
              name="description"
              required
              placeholder=" "
              onChange={handleChange}
              value={formdata.description}
              rows={4}
              className="peer w-full border-2 border-stone-200 text-stone-800 placeholder-transparent focus:outline-none focus:border-amber-500 bg-white/50 p-4 rounded-xl transition-all duration-300 resize-none"
            />
            <label className="absolute left-4 -top-3.5 text-stone-600 text-sm transition-all bg-white/50 px-2
                    peer-placeholder-shown:text-base peer-placeholder-shown:text-stone-500 peer-placeholder-shown:top-4 
                    peer-focus:-top-3.5 peer-focus:text-amber-600 peer-focus:text-sm">
              Description
            </label>
          </div>

          <div className="relative group md:col-span-2">
            <input
              name="imageurl"
              type="text"
              required
              placeholder=" "
              onChange={handleChange}
              value={formdata.imageurl}
              className="peer h-14 w-full border-2 border-stone-200 text-stone-800 placeholder-transparent focus:outline-none focus:border-amber-500 bg-white/50 px-4 rounded-xl transition-all duration-300"
            />
            <label className="absolute left-4 -top-3.5 text-stone-600 text-sm transition-all bg-white/50 px-2
                    peer-placeholder-shown:text-base peer-placeholder-shown:text-stone-500 peer-placeholder-shown:top-4 
                    peer-focus:-top-3.5 peer-focus:text-amber-600 peer-focus:text-sm">
              Profile Image URL
            </label>
          </div>

          <div className="md:col-span-2 flex justify-center mt-8">
            <button
              type="submit"
              className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-12 py-4 rounded-xl font-medium 
                       shadow-xl hover:shadow-amber-200/50 transition-all duration-300 hover:-translate-y-0.5"
            >
              Add Architect
            </button>
          </div>
        </form>
      </div>
    </div>
);

}