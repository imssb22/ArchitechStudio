"use client";
import Link from 'next/link'
import axios from 'axios'
import {useState} from 'react';
// import {useNavigate} from 'react-router-dom'
// import { useRouter } from 'next/navigation'
// import { o } from 'assert';
export default  function Signup(){
  // axios.defaults.headers.common['authorization'] = `Bearer ${localStorage.getItem('token')}`;

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    // const router = useRouter();

    const handleSignup = () => {
        try{
          debugger
          axios.post('http://localhost:3000/api/v1/admin/signup', {
            username : username, 
            password : password,
            email : email
        }).then((response) => {
          console.log(response);
          const data = response.data
        if(response.status === 200){
            localStorage.setItem("token", data.token)
            console.log("token")
            // router.push("/landing");
            window.location.href = "/landing";
        }else {
          alert(data.message);
        }
        })
        
        
        }catch(e){
            console.error("ERROR",  e)
            alert("Signup failed")
        }
    }
    
    return (
      <div>
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-100 via-stone-100 to-zinc-100 relative overflow-hidden">
  
      <div className="absolute inset-0 bg-noise opacity-10"></div>
    
      <div className="bg-white p-12 rounded-3xl shadow-2xl w-96 border border-gray-200 relative overflow-hidden">
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-amber-300 opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-amber-300 opacity-20 rounded-full blur-3xl"></div>
    
        <h2 className="text-3xl font-extrabold text-slate-800 text-center relative z-10">Sign Up</h2>
        <p className="text-gray-500 text-center mt-2 relative z-10">Enter your credentials to continue</p>
    
        <form className="mt-6 relative z-10" onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium">Username</label>
            <input 
              placeholder="example" 
              value={username}
              type="name"
              onChange={(e) => {setUsername(e.target.value)}} 
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none shadow-md bg-gray-50" 
            />
            </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium">Email</label>
            <input 
              placeholder="example@gmail.com" 
              type="email" 
              value={email}
              onChange={(e) => {setEmail(e.target.value)}}
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
            type="submit"
            className="w-full bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600 transition shadow-lg"
            >
            Sign Up
          </button>
          <p className="text-center text-sm text-gray-500 mt-4">Already a member? <Link className="text-blue-500 hover:underline" href="/signin">Sign In</Link></p>
        </form>
      </div>
    </div>
    </div>
      );
}