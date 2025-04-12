"use client";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import type { RootState } from '../../../public/store'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from "next/navigation";
import { login } from '../../../public/features/auth/authSlice'
export default function Signin(){
      const [username, setUsername] = useState("");
      const [password, setPassword] = useState("");

      const token = useSelector((state : RootState) => state.auth.token)
      const dispatch = useDispatch();
      const router = useRouter()
      // const [email, setEmail] = useState("");
      const handleSubmit = () => {
        try{
          debugger
          axios.post("http://localhost:3000/api/v1/admin/signin", {
              username : username, 
              password : password
          }).then((response) => {
              const data = response.data
              if(response.status === 200){
                localStorage.setItem("token", data.token);
                axios.defaults.headers.common['Authorization'] = token;
                  dispatch(login({
                    username : username, 
                    isAuthenticated : true,
                    token : data.token
                  }))
                  console.log(token)
                  window.location.href = "/landing";
                  router.push('/landing')
              }else{
                  alert(data.message);
              }
          })
        }catch(e){
            console.log("ERR", e);
        }
         
      }
    return (
        <div>
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-100 via-stone-100 to-zinc-100 relative overflow-hidden">
  
      <div className="absolute inset-0 bg-noise opacity-10"></div>
    
      <div className="bg-white p-12 rounded-3xl shadow-2xl w-96 border border-gray-200 relative overflow-hidden">
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-amber-300 opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-amber-300 opacity-20 rounded-full blur-3xl"></div>
    
        <h2 className="text-3xl font-extrabold text-slate-800 text-center relative z-10">Sign In</h2>
        <p className="text-gray-500 text-center mt-2 relative z-10">Enter your credentials to continue</p>
    
        <form className="mt-6 relative z-10" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium">Email or Username</label>
            <input 
              placeholder="example@gmail.com" 
              
              value={username}
              onChange={(e) => {setUsername(e.target.value)}}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none shadow-md bg-gray-50" 
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium">Password</label>
            <input 
              placeholder="password" 
              type="password"
              value={password}
              onChange={(e) => {setPassword(e.target.value)}} 
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none shadow-md bg-gray-50" 
            />
          </div>
          <button 
            type = "submit"
            className="w-full bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600 transition shadow-lg">
            Sign In
          </button>
          <p className="text-center text-sm text-gray-500 mt-4">New here? 
            <Link className="text-blue-500 hover:underline" href="/signup">Sign Up</Link></p>
        </form>
      </div>
    </div>
    </div>
      );
}