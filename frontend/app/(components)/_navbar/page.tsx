"use client";
import { FaShoppingCart } from 'react-icons/fa';

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
    <>{isAuthenticated ? ( <nav className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-xl py-8 border-b border-amber-500/20 relative z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="group flex flex-col justify-center items-center w-8 h-8 relative"
          >
            <span className={`bg-amber-500 block h-0.5 w-6 rounded-sm transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`} />
            <span className={`bg-amber-500 block h-0.5 w-6 rounded-sm my-0.5 transition-all duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`bg-amber-500 block h-0.5 w-6 rounded-sm transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`} />
          </button>
  
          <Link href="/landing">
            <h1 className="text-3xl font-light text-white hover:text-amber-400 transition-all duration-300 relative group">
              ArchiStudio
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
            </h1>
          </Link>
        </div>
  
        <div className="flex items-center space-x-6">
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-amber-500"></div>
          ) : isAuthenticated ? (
            <>
              {currentUrl === '/items' && (
                <form
                  onSubmit={handleSearch}
                  className="hidden md:flex items-center relative w-full max-w-sm"
                >
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full px-4 py-2 bg-white/10 border border-slate-700 text-white placeholder-slate-400 rounded-none
                             focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all duration-300"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 text-slate-400 hover:text-amber-400 transition-colors duration-300"
                  >
                    🔍
                  </button>
                </form>
              )}
              <Link href="/cart" className="relative group">
                <div className="text-white/80 hover:text-amber-400 transition-colors duration-300">
                  <FaShoppingCart size={30} />
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center text-xs text-white">
                    0
                  </span>
                </div>
              </Link>
            </>
          ) : (
            <>
              <Link href="/signup">
                <button className="relative overflow-hidden px-6 py-2 bg-amber-500 text-white tracking-wider hover:bg-amber-400 transition-all duration-300
                               before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:border before:border-amber-500
                               before:-translate-x-1 before:-translate-y-1 before:transition-transform before:duration-300
                               hover:before:translate-x-0 hover:before:translate-y-0">
                  Sign Up
                </button>
              </Link>
              <Link href="/signin">
                <button className="relative overflow-hidden px-6 py-2 bg-transparent text-white tracking-wider border border-white/30
                               hover:border-amber-500 hover:text-amber-400 transition-all duration-300
                               before:content-[''] before:absolute before:inset-0 before:bg-amber-500/10 before:scale-x-0 before:origin-right
                               hover:before:scale-x-100 hover:before:origin-left before:transition-transform before:duration-300">
                  Sign In
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
  
      {/* Sidebar Menu */}
      {isOpen && (
        <div className="fixed top-0 left-0 h-full w-64 bg-slate-900/95 backdrop-blur-xl shadow-2xl z-50 p-6 transition-transform duration-300 flex flex-col gap-4 border-r border-amber-500/20">
          <button
            onClick={() => setIsOpen(false)}
            className="self-end text-2xl text-amber-500 hover:text-amber-400 focus:outline-none transition-all duration-300"
          >
            ×
          </button>
          
          {["Home", "Add Items", "Items", "Cart", "Architects", "Add Architect", "Bookings"].map((item) => (
            <Link 
              key={item}
              href={`/${item === "Home" ? "landing" : item.toLowerCase().replace(" ", "")}`} 
              onClick={() => setIsOpen(false)}
            >
              <button className="w-full text-left text-white/80 font-light px-4 py-2 hover:text-amber-400 hover:bg-white/5 transition-all duration-300 relative group">
                {item}
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-0 bg-amber-500 transition-all duration-300 group-hover:h-full"></span>
              </button>
            </Link>
          ))}
  
          <button
            onClick={() => {
              setIsOpen(false);
              handleLogout();
            }}
            className="w-full text-left text-red-500 font-light px-4 py-2 hover:text-red-400 hover:bg-white/5 transition-all duration-300 mt-auto relative group"
          >
            Logout
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-0 bg-red-500 transition-all duration-300 group-hover:h-full"></span>
          </button>
        </div>
      )}
    </nav> ) : (<> </>)}
    </>
  );
    
}