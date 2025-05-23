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
         
          axios.post("http://3.110.37.154:80/api/v1/admin/signin", {
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
                  router.push('/landing')
                  window.location.href = "/landing";
                 
              }else{
                  alert(data.message);
              }
          })
        }catch(e){
            console.log("ERR", e);
        }
         
      }
    return (
      <div className="min-h-screen relative bg-gradient-to-br from-stone-50 via-stone-100 to-amber-50">
        {/* Background patterns */}
        <div className="fixed inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-[0.015] pointer-events-none"></div>
        <div className="fixed inset-0 bg-[url('/architectural-pattern.svg')] bg-cover opacity-[0.03]"></div>

        <div className="flex items-center justify-center min-h-screen relative z-10 px-6">
          <div className="bg-white/80 backdrop-blur-lg p-12 rounded-3xl shadow-2xl w-full max-w-md border border-stone-200 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-amber-600/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-stone-400/20 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl font-extrabold text-stone-800 text-center mb-2">
                Welcome Back
              </h2>
              <p className="text-stone-600 text-center mb-8">Sign in to your account</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-stone-700 text-sm font-medium mb-2">Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all"
                    placeholder="Enter your username or email"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 text-sm font-medium mb-2">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all"
                    placeholder="Enter your password"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-3 rounded-xl font-medium shadow-xl hover:shadow-amber-200/50 transition-all duration-300 hover:-translate-y-0.5"
                >
                  Sign In
                </button>
              </form>

              <p className="mt-8 text-center text-stone-600">
                New to ArchiStudio?{' '}
                <Link href="/signup" className="text-amber-600 hover:text-amber-700 font-medium">
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
}