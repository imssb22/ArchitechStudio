export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 via-zinc-100 to-slate-100 text-slate-800">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/architectural-pattern.svg')] bg-cover opacity-10 z-0"></div>
        <div className="max-w-7xl mx-auto px-6 py-24 lg:py-32 z-10 relative">
          <h1 className="text-5xl md:text-6xl font-extrabold text-center leading-tight">
            Welcome to <span className="text-amber-500">ArchiStudio</span>
          </h1>
          <p className="mt-6 text-lg text-center text-gray-600 max-w-2xl mx-auto">
            `Designing spaces that inspire. Building dreams that last.`
          </p>
          <div className="mt-10 flex justify-center space-x-6">
            <a href="/signup" className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl text-lg font-medium shadow-md transition">
              Sign Up
            </a>
            <a href="/signin" className="border border-amber-500 text-amber-500 hover:bg-amber-100 px-6 py-3 rounded-xl text-lg font-medium transition">
              Sign In
            </a>
          </div>
        </div>
      </header>

      {/* Feature Highlights */}
      <section className="py-20 bg-white relative">
        <div className="absolute inset-0 bg-[url('/blueprint-bg.svg')] bg-no-repeat bg-center opacity-5 pointer-events-none"></div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <h2 className="text-4xl font-bold text-center mb-12 text-slate-800">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-gradient-to-br from-amber-100 via-white to-white p-6 rounded-2xl shadow-xl hover:scale-[1.03] transition-transform">
              <h3 className="text-2xl font-semibold mb-2">Modern Architecture</h3>
              <p className="text-gray-600">Elegant, functional, and sustainable designs tailored to your vision.</p>
            </div>
            <div className="bg-gradient-to-br from-amber-100 via-white to-white p-6 rounded-2xl shadow-xl hover:scale-[1.03] transition-transform">
              <h3 className="text-2xl font-semibold mb-2">Quality Construction</h3>
              <p className="text-gray-600">Built with precision and care using top-grade materials and techniques.</p>
            </div>
            <div className="bg-gradient-to-br from-amber-100 via-white to-white p-6 rounded-2xl shadow-xl hover:scale-[1.03] transition-transform">
              <h3 className="text-2xl font-semibold mb-2">Design Consultation</h3>
              <p className="text-gray-600">Collaborate with our experts to bring your dream project to life.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-8 mt-12 relative">
        <div className="absolute inset-0 bg-[url('/footer-texture.svg')] bg-cover opacity-10 z-0"></div>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center relative z-10">
          <p className="text-sm">&copy; 2025 ArchiStudio. All rights reserved.</p>
          <div className="space-x-4 flex items-center">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition">
              <i className="fab fa-facebook text-xl"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition">
              <i className="fab fa-twitter text-xl"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition">
              <i className="fab fa-instagram text-xl"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition">
              <i className="fab fa-linkedin text-xl"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}