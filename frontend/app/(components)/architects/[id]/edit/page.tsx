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
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import type { RootState } from '../../../../../public/store'
import { useSelector} from 'react-redux'

export default function EditCard(){
    const itemId = useParams().id as string;
    const token = useSelector((state : RootState) => state.auth.token)
    console.log({itemId});
    const router = useRouter();
    const [formdata, setFormData] = useState<Omit<Architect, 'id'>>({
        name: '',
        description: '',
        phone: '',
        imageurl: '',
        rating : 0,
        yoe : 0
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        setFormData({ ...formdata, [e.target.name]: e.target.value });
      };

    useEffect(() => {
        const getItems = async() => {
            axios.get(`http://localhost:3000/api/v1/admin/architects/${itemId}`, {params : {id : itemId}})
      .then((res) => {
        console.log(res.data)
        setFormData(res.data)
      })
      .catch((err) => console.error(err))
        }
        getItems();
        
    }, [itemId])

    const handleUpdate = async(e: React.FormEvent) => {
        e.preventDefault();
        debugger;
        console.log(itemId);
        try {
            
            if(!token){
                 alert("Please sign in")   
                 return
            }
            await axios.put(`http://localhost:3000/api/v1/admin/architects/${itemId}`, {
                name : formdata.name,
                description : formdata.description,
                rating : Number(formdata.rating),
                yoe : Number(formdata.yoe),
                imageurl : formdata.imageurl,
                phone : (formdata.phone),
            })
            alert("Item updated successfully")
            router.push('/architects')
          }catch(e){
                alert("Failed to update")
                console.log(e)
            }
    }
    return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-stone-900 to-amber-900 px-4 py-12 flex justify-center items-center">
      <div className="bg-stone-800/80 backdrop-blur-sm rounded-3xl shadow-2xl p-12 max-w-4xl w-full relative overflow-hidden border border-stone-700">
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-amber-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-stone-500/20 rounded-full blur-3xl"></div>
        
        <h2 className="text-4xl font-extrabold text-center text-amber-100 mb-8">
          Update Architect Profile
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={handleUpdate}>
          <div className="relative">
            <input
                name="name"
                type="text"
                required
                placeholder=" "
                onChange={handleChange}
                value={formdata.name}
                className="peer w-full px-4 py-3 rounded-xl border border-stone-600 focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-stone-700/50 text-stone-100 placeholder-stone-400"
            />
            <label className="absolute left-4 -top-3.5 text-stone-400 text-sm transition-all bg-stone-800/50 px-2
                    peer-placeholder-shown:text-base peer-placeholder-shown:text-stone-500 peer-placeholder-shown:top-3 
                    peer-focus:-top-3.5 peer-focus:text-amber-500 peer-focus:text-sm">
                Full Name
            </label>
          </div>

          <div className="relative">
            <input
                name="yoe"
                type="number"
                required
                placeholder=" "
                onChange={handleChange}
                value={formdata.yoe}
                className="peer w-full px-4 py-3 rounded-xl border border-stone-600 focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-stone-700/50 text-stone-100"
            />
            <label className="absolute left-4 -top-3.5 text-stone-400 text-sm transition-all bg-stone-800/50 px-2
                    peer-placeholder-shown:text-base peer-placeholder-shown:text-stone-500 peer-placeholder-shown:top-3 
                    peer-focus:-top-3.5 peer-focus:text-amber-500 peer-focus:text-sm">
                Years of Experience
            </label>
          </div>

          <div className="relative">
            <input
                name="phone"
                type="text"
                required
                placeholder=" "
                onChange={handleChange}
                value={formdata.phone}
                className="peer w-full px-4 py-3 rounded-xl border border-stone-600 focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-stone-700/50 text-stone-100"
            />
            <label className="absolute left-4 -top-3.5 text-stone-400 text-sm transition-all bg-stone-800/50 px-2
                    peer-placeholder-shown:text-base peer-placeholder-shown:text-stone-500 peer-placeholder-shown:top-3 
                    peer-focus:-top-3.5 peer-focus:text-amber-500 peer-focus:text-sm">
                Phone Number
            </label>
          </div>

          <div className="relative">
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
                className="peer w-full px-4 py-3 rounded-xl border border-stone-600 focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-stone-700/50 text-stone-100"
            />
            <label className="absolute left-4 -top-3.5 text-stone-400 text-sm transition-all bg-stone-800/50 px-2
                    peer-placeholder-shown:text-base peer-placeholder-shown:text-stone-500 peer-placeholder-shown:top-3 
                    peer-focus:-top-3.5 peer-focus:text-amber-500 peer-focus:text-sm">
                Rating (0-5)
            </label>
          </div>

          <div className="md:col-span-2 relative">
            <textarea
                name="description"
                required
                placeholder=" "
                onChange={handleChange}
                value={formdata.description}
                rows={4}
                className="peer w-full px-4 py-3 rounded-xl border border-stone-600 focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-stone-700/50 text-stone-100 resize-none"
            />
            <label className="absolute left-4 -top-3.5 text-stone-400 text-sm transition-all bg-stone-800/50 px-2
                    peer-placeholder-shown:text-base peer-placeholder-shown:text-stone-500 peer-placeholder-shown:top-3 
                    peer-focus:-top-3.5 peer-focus:text-amber-500 peer-focus:text-sm">
                Description
            </label>
          </div>

          <div className="md:col-span-2 relative">
            <input
                name="imageurl"
                type="text"
                required
                placeholder=" "
                onChange={handleChange}
                value={formdata.imageurl}
                className="peer w-full px-4 py-3 rounded-xl border border-stone-600 focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-stone-700/50 text-stone-100"
            />
            <label className="absolute left-4 -top-3.5 text-stone-400 text-sm transition-all bg-stone-800/50 px-2
                    peer-placeholder-shown:text-base peer-placeholder-shown:text-stone-500 peer-placeholder-shown:top-3 
                    peer-focus:-top-3.5 peer-focus:text-amber-500 peer-focus:text-sm">
                Profile Image URL
            </label>
          </div>

          <div className="md:col-span-2 flex justify-center mt-8">
            <button
                type="submit"
                
                className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-10 py-4 rounded-xl font-medium 
                         shadow-xl hover:shadow-amber-500/20 transition-all duration-300 hover:-translate-y-0.5"
            >
                Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
);
}