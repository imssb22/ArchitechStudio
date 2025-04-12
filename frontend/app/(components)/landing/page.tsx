"use client"
import Image from "next/image";
import type { RootState } from '../../../public/store'
import { useSelector } from 'react-redux'
// import { useRouter } from "next/navigation";
// import { login } from '../../../public/features/auth/authSlice'
export default function Landing(){
  // const username = useSelector((state : RootState) => state.auth.username)
  const isAuthenticated = useSelector((state : RootState) => state.auth.isAuthenticated)
  // const token = useSelector((state : RootState) => state.auth.token)
  
    return (
      <>{isAuthenticated ? (<div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 text-gray-800">
          
        <header className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/architectural-pattern.svg')] bg-cover opacity-5 animate-spin-slow z-0"></div>
          <div className="max-w-7xl mx-auto px-8 py-24 lg:py-32 relative z-10 text-center">
            <h1 className="text-6xl md:text-7xl font-extrabold leading-tight text-gray-900 drop-shadow-md animate-fade-in">
              Welcome to <span className="text-amber-500">ArchiStudio</span>
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              <em>Designing spaces that inspire. Building dreams that last.</em>
            </p>
            
          </div>
        </header>
  
        {/* Feature Highlights */}
        <section className="py-24 bg-white relative">
          <div className="absolute inset-0 bg-[url('/blueprint-bg.svg')] bg-no-repeat bg-center opacity-5 pointer-events-none"></div>
          <div className="max-w-6xl mx-auto px-8 relative z-10">
            <h2 className="text-5xl font-extrabold text-center mb-12 text-gray-900">
              What We Offer
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              <div className="bg-gradient-to-br from-amber-100 to-white p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:scale-105 transition-transform">
                <h3 className="text-3xl font-bold mb-4 text-gray-900">Modern Architecture</h3>
                <p className="text-gray-600 leading-relaxed">
                  Elegant, functional, and sustainable designs tailored to your vision.
                </p>
              </div>
              <div className="bg-gradient-to-br from-amber-100 to-white p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:scale-105 transition-transform">
                <h3 className="text-3xl font-bold mb-4 text-gray-900">Quality Construction</h3>
                <p className="text-gray-600 leading-relaxed">
                  Built with precision and care using top-grade materials and techniques.
                </p>
              </div>
              <div className="bg-gradient-to-br from-amber-100 to-white p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:scale-105 transition-transform">
                <h3 className="text-3xl font-bold mb-4 text-gray-900">Design Consultation</h3>
                <p className="text-gray-600 leading-relaxed">
                  Collaborate with our experts to bring your dream project to life.
                </p>
              </div>
            </div>
          </div>
        </section>
  
        {/* Why Choose Us */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-6xl mx-auto px-8">
            <h2 className="text-5xl font-extrabold text-center mb-12 text-gray-900">
              Why Choose Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
              <div>
          
                <Image src="/quality-icon.jpeg" 
                layout="intrinsic"
                width={100}
                height={100}
                alt="Quality Icon" className="mx-auto mb-6"/>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Unparalleled Quality</h3>
                <p className="text-gray-600">Delivering exceptional designs and constructions.</p>
              </div>
              <div>
                <Image src="/eco-friendly-icon.png" layout="intrinsic"
                    width={100}
                    height={100}
                  alt="Eco-Friendly Icon" className="mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Sustainability</h3>
                <p className="text-gray-600">Eco-friendly solutions for a greener tomorrow.</p>
              </div>
              <div>
                <Image src="/support-icon.png"
                layout="intrinsic"
                width={100}
                height={100}
                 alt="Support Icon" className="mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">24/7 Support</h3>
                <p className="text-gray-600">Ensuring your satisfaction at every step.</p>
              </div>
            </div>
          </div>
        </section>
  
        {/* Testimonials */}
        <section className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-8">
            <h2 className="text-5xl font-extrabold text-center mb-12 text-gray-900">
              What Our Clients Say
            </h2>
            <div className="space-y-8">
              <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
                <p className="text-lg italic text-gray-700">
                  `ArchiStudio turned our dream home into a reality with their innovative designs and quality construction!`
                </p>
                <p className="mt-4 text-right font-semibold text-gray-900">- Rohan Sharma</p>
              </div>
              <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
                <p className="text-lg italic text-gray-700">
                  `Fantastic team! Their attention to detail and commitment to excellence are unmatched.`
                </p>
                <p className="mt-4 text-right font-semibold text-gray-900">- Anita Kapoor</p>
              </div>
            </div>
          </div>
        </section>
  
        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-6xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div>
              <p className="text-sm">&copy; 2025 ArchiStudio. All rights reserved.</p>
              <a href="/privacy" className="text-amber-400 hover:underline text-sm">Privacy Policy</a>
            </div>
            <div className="space-y-4">
              <form>
                <label htmlFor="email" className="text-sm">Subscribe to our newsletter</label>
                <div className="flex mt-2">
                  <input
                    type="email"
                    id="email"
                    placeholder="Your email address"
                    className="px-4 py-2 rounded-l-lg bg-gray-800 text-white outline-none"
                  />
                  <button type="submit" className="px-4 py-2 bg-amber-500 hover:bg-amber-600 rounded-r-lg text-white">
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </footer>
      </div>) : <></>}
      </>
      );
}