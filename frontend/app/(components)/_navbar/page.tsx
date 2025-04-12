"use client";

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {useState, useEffect} from 'react';
import type { RootState } from '../../../public/store'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../../public/features/auth/authSlice'
export default function Navbar() {
  
  const [isLoading, setIsLoading] = useState(true)
  const [query, setQuery] = useState('');
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const isAuthenticated = useSelector((state : RootState) => state.auth.isAuthenticated)
  const dispatch = useDispatch();
  const currentUrl = usePathname();
  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(logout());
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, dispatch]);
  console.log("The current endpoint is: ", currentUrl)
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery('');
    }
  };
  const handleLogout = () => {
    dispatch(logout())
    window.location.href = "/signin";
  };

    return (
      
      <nav className="flex h-25 bg-gradient-to-r from-slate-800 via-stone-700 to-slate-600 shadow-lg py-4 border-b border-gray-700 relative z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
    
          <div className="flex items-center space-x-4">
            <button onClick={() => setIsOpen(!isOpen)} className="  flex flex-col justify-center items-center mr-2">
              <span className={`bg-white block h-0.5 w-6 rounded-sm transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`} />
              <span className={`bg-white block h-0.5 w-6 rounded-sm my-0.5 transition-all duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`bg-white block h-0.5 w-6 rounded-sm transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`} />
            </button>
    
            <Link href="/landing">
              <h1 className=" text-3xl font-bold text-white hover:text-amber-400 transition cursor-pointer">
                ArchiStudio
              </h1>
            </Link>
          </div>
    
         
          <div className="flex items-center space-x-4">
            {isLoading ? (
              <p className="text-white">Loading...</p>
            ) : isAuthenticated ? ( currentUrl === '/items' ?
              <>
                <form
                  onSubmit={handleSearch}
                  className="hidden md:flex items-center relative w-full max-w-sm"
                >
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="peer w-full px-4 py-2 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 text-gray-500 hover:text-blue-500 transition-all"
                  >
                    🔍
                  </button>
                </form>
              </>
              : <></>
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
    
        
        {isOpen && (
          <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-2xl z-50 p-6 transition-transform duration-300 flex flex-col gap-4">
            <button
              onClick={() => setIsOpen(false)}
              className="self-end text-xl text-gray-600 hover:text-gray-800 focus:outline-none transition-all duration-[500ms] ease-out"
            >
              ×
            </button>
            <Link href="/landing" onClick={() => setIsOpen(false)}>
              <button className="w-full text-left text-slate-800 font-medium px-4 py-2 rounded-md hover:bg-gray-100 transition">
                Home
              </button>
            </Link>
 
            <Link href="/additems" onClick={() => setIsOpen(false)}>
              <button className="w-full text-left text-slate-800 font-medium px-4 py-2 rounded-md hover:bg-gray-100 transition">
                Add Items
              </button>
            </Link>
    
            <Link href="/items" onClick={() => setIsOpen(false)}>
              <button className="w-full text-left text-slate-800 font-medium px-4 py-2 rounded-md hover:bg-gray-100 transition">
                Item List
              </button>
            </Link>
    
            <button
              onClick={() => {
                setIsOpen(false);
                handleLogout();
              }}
              className="w-full text-left text-red-600 font-medium px-4 py-2 rounded-md hover:bg-gray-100 transition"
            >
              Logout
            </button>
          </div>
        )}
      </nav>
    );
    
}