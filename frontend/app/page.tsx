import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="min-h-screen relative bg-gradient-to-br from-stone-50 via-stone-100 to-amber-50">
      {/* Global background patterns */}
      <div className="fixed inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-[0.015] pointer-events-none"></div>
      
      <header className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Header specific patterns */}
        <div className="absolute inset-0 bg-[url('/architectural-pattern.svg')] bg-cover opacity-10 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-stone-50/30 to-stone-50/80"></div>
        <div className="max-w-7xl mx-auto px-8 py-24 lg:py-32 relative z-10 text-center">
          <h1 className="text-7xl md:text-8xl font-extrabold leading-tight text-stone-800 drop-shadow-xl animate-fade-in">
            Welcome to <span className="bg-gradient-to-r from-amber-600 to-amber-700 text-transparent bg-clip-text">ArchiStudio</span>
          </h1>
          <p className="mt-8 text-2xl md:text-3xl text-stone-600 max-w-4xl mx-auto leading-relaxed font-light">
            <em>Designing spaces that inspire. Building dreams that last.</em>
          </p>
          <div className="mt-12 flex justify-center space-x-8">
            <a
              href="/signup"
              className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-10 py-5 rounded-xl text-lg font-medium shadow-2xl transition-all duration-300 hover:shadow-amber-200 hover:-translate-y-1"
            >
              Sign Up
            </a>
            <a
              href="/signin"
              className="border-2 border-amber-600 text-amber-700 hover:bg-amber-50 px-10 py-5 rounded-xl text-lg font-medium transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              Sign In
            </a>
          </div>
        </div>
      </header>

      {/* Feature Highlights */}
      <section className="py-32 bg-white/80 backdrop-blur-sm relative">
        <div className="absolute inset-0 bg-[url('/blueprint-texture.svg')] bg-repeat opacity-[0.03]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-white/90"></div>
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <h2 className="text-5xl font-bold text-center mb-20 text-stone-800">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Modern Architecture",
                desc: "Elegant, functional, and sustainable designs tailored to your vision."
              },
              {
                title: "Quality Construction",
                desc: "Built with precision and care using top-grade materials and techniques."
              },
              {
                title: "Design Consultation",
                desc: "Collaborate with our experts to bring your dream project to life."
              }
            ].map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-stone-50 p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-stone-100">
                  <h3 className="text-2xl font-bold mb-6 text-stone-800 group-hover:text-amber-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-stone-600 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 relative bg-stone-50/90 backdrop-blur-sm">
        <div className="absolute inset-0 bg-[url('/dots-pattern.svg')] bg-repeat opacity-[0.04]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-stone-50/90 to-transparent"></div>
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

      <section className="py-32 bg-white/90 backdrop-blur-sm relative">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-[0.02]"></div>
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-5xl font-bold text-center mb-20 text-stone-800">
            What Our Clients Say
          </h2>
          <div className="space-y-8">
            <div className="bg-stone-50 p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
              <p className="text-xl italic text-stone-600 leading-relaxed">
                `ArchiStudio turned our dream home into a reality with their innovative designs and quality construction!`
              </p>
              <p className="mt-6 text-right font-medium text-stone-800">- Rohan Sharma</p>
            </div>
            <div className="bg-stone-50 p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
              <p className="text-xl italic text-stone-600 leading-relaxed">
                `Fantastic team! Their attention to detail and commitment to excellence are unmatched.`
              </p>
              <p className="mt-6 text-right font-medium text-stone-800">- Anita Kapoor</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative bg-stone-900 text-stone-200 py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-[0.03]"></div>
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          <div>
            <p className="text-sm">&copy; 2025 ArchiStudio. All rights reserved.</p>
            <a href="/privacy" className="text-amber-400 hover:text-amber-300 transition-colors text-sm">
              Privacy Policy
            </a>
          </div>
          <div className="space-y-4">
            <form>
              <label htmlFor="email" className="text-sm font-medium">Subscribe to our newsletter</label>
              <div className="flex mt-3">
                <input
                  type="email"
                  id="email"
                  placeholder="Your email address"
                  className="px-4 py-3 rounded-l-lg bg-stone-800 text-white outline-none focus:ring-2 focus:ring-amber-400"
                />
                <button type="submit" className="px-6 py-3 bg-amber-600 hover:bg-amber-700 rounded-r-lg text-white transition-colors">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </footer>
    </div>
  );
}