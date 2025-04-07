"use client";

import Link from 'next/link';
import axios from 'axios';
import {useState, useEffect} from 'react';
// import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [username, setUsername] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // const navigate = useNavigate();
  const fetchUser = async() => {
    
      const token = localStorage.getItem("token");
      console.log(token);
      if(!token){
          setUsername(null);
          setIsLoading(false);
          return;
      }
      axios.get("http://localhost:3000/api/v1/admin/me", {
        headers: {
          Authorization:  token,
        },
      }).then((response) => {
          const data = response.data;
          if(response.status === 200){
              setUsername(data.username);
          }else{
            setUsername(null);
          }
          setIsLoading(false);
      })
    .catch(() => {
      setUsername(null);
      setIsLoading(false);
    });
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUsername(null);
    window.location.href = "/signin";
  };
  return (
    <nav className="bg-gradient-to-r from-slate-800 via-stone-700 to-slate-600 shadow-lg py-4 border-b border-gray-700 relative z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/landing">
          <h1 className="text-2xl font-bold text-white hover:text-amber-400 transition cursor-pointer">
            ArchiStudio
          </h1>
        </Link>

        <div className="space-x-4">
          {isLoading ? (
            <p>Loading...</p>
          ) : username ? (
            <>
              <Link href="/items">
                <button className="bg-amber-500 text-white px-4 py-2 rounded-xl shadow-md hover:bg-amber-600 transition">
                  Explore
                </button>
              </Link>
              <Link href="/">
                <button 
                onClick={handleLogout}
                className="border border-white text-white px-4 py-2 rounded-xl hover:bg-white hover:text-slate-800 transition">
                  Log Out
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/signup">
                <button className="bg-amber-500 text-white px-4 py-2 rounded-xl shadow-md hover:bg-amber-600 transition">
                  Sign Up
                </button>
              </Link>
              <Link href="/signin">
                <button className="border border-white text-white px-4 py-2 rounded-xl hover:bg-white hover:text-slate-800 transition">
                  Sign In
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}