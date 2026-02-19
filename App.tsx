import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Droplets, 
  Thermometer, 
  Wind, 
  Shield, 
  Star, 
  Award, 
  Clock, 
  MapPin, 
  ArrowRight,
  Menu, 
  X,
  Sparkles,
  ChevronDown,
  Hammer,
  Waves,
  Maximize2
} from 'lucide-react';
import { getDiagnosticAdvice } from './services/geminiService.ts';
import { ServiceCardProps, Testimonial } from './types.ts';

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-700 ease-in-out ${isScrolled ? 'bg-linen/95 border-b border-champagne/20 py-4 shadow-sm backdrop-blur-md' : 'bg-transparent py-8'}`}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex justify-between items-center">
        <div className="flex flex-col cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <span className={`text-2xl font-serif tracking-[0.15em] transition-colors duration-500 leading-none ${isScrolled ? 'text-onyx' : 'text-white'}`}>PRECISION</span>
          <span className={`text-[9px] uppercase tracking-[0.25em] font-sans font-bold transition-colors duration-500 mt-1.5 ${isScrolled ? 'text-slate' : 'text-white/60'}`}>Kelowna • West Kelowna</span>
        </div>

        <div className="hidden lg:flex items-center space-x-12">
          {['Services', 'About', 'Gallery', 'Reviews'].map((item) => (
            <button 
              key={item}
              onClick={() => scrollTo(item.toLowerCase())}
              className={`text-[11px] uppercase tracking-[0.2em] font-semibold transition-all hover:text-champagne ${isScrolled ? 'text-onyx' : 'text-white'}`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-8">
          <a 
            href="tel:2505550123" 
            className={`hidden sm:flex items-center gap-2 text-[11px] uppercase tracking-widest font-bold transition-colors ${isScrolled ? 'text-onyx' : 'text-white'}`}
          >
            <Phone size={14} className="text-champagne" /> 250.555.0123
          </a>
          <button 
            onClick={() => scrollTo('contact')}
            className={`px-8 py-3.5 text-[10px] uppercase tracking-[0.2em] font-bold border transition-all duration-500 ${
              isScrolled 
              ? 'bg-onyx text-linen border-onyx hover:bg-transparent hover:text-onyx' 
              : 'bg-white text-onyx border-white hover:bg-transparent hover:text-white'
            }`}
          >
            Book Now
          </button>
          <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className={isScrolled ? 'text-onyx' : 'text-white'} /> : <Menu className={isScrolled ? 'text-onyx' : 'text-white'} />}
          </button>
        </div>
      </div>

      <div className={`fixed inset-0 bg-onyx z-[90] transition-transform duration-700 ease-in-out lg:hidden flex flex-col justify-center items-center px-12 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
         <div className="flex flex-col space-y-8 text-center">
            {['Services', 'About', 'Gallery', 'Reviews', 'Contact'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className="text-4xl font-serif text-linen hover:text-champagne transition-colors"
              >
                {item}
              </button>
            ))}
            <a href="tel:2505550123" className="text-champagne text-xl pt-8 font-sans tracking-widest font-light">250.555.0123</a>
         </div>
      </div>
    </nav>
  );
};

const ServiceItem: React.FC<ServiceCardProps> = ({ title, description, tags }) => (
  <div className="group py-12 border-b border-champagne/20 transition-all duration-500 hover:pl-4">
    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
      <div className="max-w-xl">
        <h3 className="text-3xl font-serif mb-4 group-hover:text-champagne transition-colors">{title}</h3>
        <p className="text-slate font-light leading-relaxed mb-6">{description}</p>
        <div className="flex flex-wrap gap-4">
          {tags.map(tag => (
            <span key={tag} className="text-[9px] tracking-[0.2em] uppercase text-onyx/40 font-bold">{tag}</span>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4 text-onyx/30 group-hover:text-onyx transition-colors cursor-pointer" onClick={() => document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})}>
        <span className="text-[10px] uppercase tracking-widest font-bold">Request Quote</span>
        <ArrowRight size={20} className="transition-transform duration-500 group-hover:translate-x-2" />
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [diagInput, setDiagInput] = useState('');
  const [diagResponse, setDiagResponse] = useState<string | null>(null);
  const [isDiagLoading, setIsDiagLoading] = useState(false);

  const handleDiagnose = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!diagInput.trim()) return;
    setIsDiagLoading(true);
    const res = await getDiagnosticAdvice(diagInput);
    setDiagResponse(res);
    setIsDiagLoading(false);
  };

  const galleryImages = [
    { url: "https://images.unsplash.com/photo-1584622781564-1d9876a3e740?q=80&w=2070&auto=format&fit=crop", title: "Commercial Plumbing", category: "Installation" },
    { url: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop", title: "Modern Boiler System", category: "Heating" },
    { url: "https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=2070&auto=format&fit=crop", title: "Precision Piping", category: "Service" },
    { url: "https://images.unsplash.com/photo-1613274351662-793575971168?q=80&w=2070&auto=format&fit=crop", title: "Custom Fixture Install", category: "Fixtures" },
    { url: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2074&auto=format&fit=crop", title: "Water Heater Upgrade", category: "Utility" },
    { url: "https://images.unsplash.com/photo-1615873968403-89e068629275?q=80&w=2064&auto=format&fit=crop", title: "Fleet & Logistics", category: "Team" }
  ];

  const testimonials: Testimonial[] = [
    {
      name: "Sarah Jenkins",
      location: "Upper Mission",
      text: "Precision lived up to their name. They arrived on time, were incredibly respectful of our home, and fixed our leak quickly. Truly professional service.",
      rating: 5
    },
    {
      name: "Mark Thompson",
      location: "Lower Mission",
      text: "Expert advice on our water heater replacement. Honest pricing and same-day service. Exactly what you want from a local plumber.",
      rating: 5
    },
    {
      name: "David Ross",
      location: "West Kelowna",
      text: "We had a plumbing emergency on a Sunday and they were here within the hour. Dependable service we can trust for any job.",
      rating: 5
    }
  ];

  return (
    <div className="font-sans">
      <Nav />

      {/* Hero Section */}
      <section className="relative h-screen min-h-[800px] flex items-center overflow-hidden bg-onyx">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop" 
            alt="Reliable Plumbing Service" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-onyx via-transparent to-transparent"></div>
        </div>
        
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 pt-24">
          <div className="max-w-4xl space-y-12">
            <div className="space-y-4">
               <p className="text-champagne text-[11px] uppercase tracking-[0.5em] font-bold">Locally Owned & Operated • Red Seal Certified</p>
               <h1 className="text-6xl md:text-9xl font-serif text-linen leading-[0.9]">
                  Reliable Plumbing <br /> <span className="italic font-light">Solutions.</span>
               </h1>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-12">
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})}
                className="group relative px-12 py-5 bg-white text-onyx font-bold text-[11px] uppercase tracking-[0.3em] overflow-hidden transition-all duration-700 hover:text-white"
              >
                <span className="relative z-10">Get a Free Quote</span>
                <div className="absolute inset-0 bg-onyx translate-y-full transition-transform duration-500 group-hover:translate-y-0"></div>
              </button>
              <div className="flex items-center gap-6">
                <div className="w-12 h-[1px] bg-champagne"></div>
                <p className="text-linen/50 text-[10px] uppercase tracking-widest font-semibold">Same Day Service Whenever Possible</p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-linen/30 animate-bounce cursor-pointer" onClick={() => document.getElementById('services')?.scrollIntoView({behavior:'smooth'})}>
          <span className="text-[9px] uppercase tracking-[0.4em] font-bold">Services</span>
          <ChevronDown size={16} />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-linen relative">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <span className="text-[10px] uppercase tracking-[0.4em] text-champagne font-bold">About Precision</span>
            <h2 className="text-5xl md:text-6xl font-serif text-onyx leading-tight">Dependable service you can trust.</h2>
            <div className="space-y-6">
              <p className="text-onyx text-xl font-medium leading-relaxed">
                Precision Plumbing & Heating Ltd is a locally owned and operated plumbing company serving Kelowna and West Kelowna.
              </p>
              <p className="text-slate text-lg font-light leading-relaxed">
                We specialize in plumbing repairs, drain service, water heaters, fixture installations, emergency plumbing services and poly-B replacements. We are fully licensed and insured, offering honest pricing, fast response times, and same day service whenever possible.
              </p>
              <p className="text-slate text-lg font-light leading-relaxed italic border-l-2 border-champagne pl-6">
                Our goal is to provide reliable, high quality plumbing solutions and dependable service you can trust for any job, large or small.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-12 pt-8">
              <div className="space-y-4">
                <Shield className="text-champagne" size={32} strokeWidth={1} />
                <h4 className="text-xs uppercase tracking-widest font-bold">Fully Licensed</h4>
                <p className="text-slate text-sm font-light">Complete insurance and licensing for your peace of mind.</p>
              </div>
              <div className="space-y-4">
                <Award className="text-champagne" size={32} strokeWidth={1} />
                <h4 className="text-xs uppercase tracking-widest font-bold">Red Seal Quality</h4>
                <p className="text-slate text-sm font-light">Expert workmanship backed by industry-standard certification.</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-sm">
               <img 
                 src="https://images.unsplash.com/photo-1595844730298-b960ff98fee0?q=80&w=2070&auto=format&fit=crop" 
                 alt="Our Professional Plumbers" 
                 className="w-full h-full object-cover"
               />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-onyx p-12 text-linen space-y-2 hidden xl:block shadow-2xl">
               <p className="text-xl font-serif">"Excellent work."</p>
               <p className="text-[9px] uppercase tracking-widest font-bold opacity-50">Local Kelowna Resident</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="space-y-4">
               <span className="text-[10px] uppercase tracking-[0.4em] text-champagne font-bold">Our Specialties</span>
               <h2 className="text-5xl md:text-6xl font-serif text-onyx">Professional Plumbing & Heating.</h2>
            </div>
            <p className="text-slate max-w-sm font-light">Honest pricing and same day service whenever possible for any job, large or small.</p>
          </div>
          
          <div className="flex flex-col">
            <ServiceItem 
              title="Plumbing Repairs & Fixtures"
              description="From leaky faucets to full fixture installations, we handle every repair with precision and care."
              tags={['LEAKS', 'FAUCETS', 'TOILETS', 'INSTALLATION']}
            />
            <ServiceItem 
              title="Water Heaters & Boilers"
              description="Specialized service and replacement for hot water tanks, tankless heaters, and home heating systems."
              tags={['WATER HEATERS', 'TANKLESS', 'BOILERS']}
            />
            <ServiceItem 
              title="Drain Service & Poly-B"
              description="Reliable drain cleaning and expert Poly-B pipe replacement to protect your home from future leaks."
              tags={['DRAIN CLEANING', 'POLY-B REPLACEMENT', 'RE-PIPING']}
            />
            <ServiceItem 
              title="Heating & AC Support"
              description="Keep your home comfortable year-round with our furnace maintenance and cooling system services."
              tags={['FURNACES', 'AC SERVICE', 'MAINTENANCE']}
            />
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-32 bg-linen/30">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="mb-20 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.4em] text-champagne font-bold">Project Portfolio</span>
            <h2 className="text-5xl md:text-6xl font-serif text-onyx">Precision in Action.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((img, i) => (
              <div key={i} className="group relative aspect-square overflow-hidden bg-onyx cursor-pointer">
                <img 
                  src={img.url} 
                  alt={img.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-onyx/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <span className="text-champagne text-[10px] uppercase tracking-widest font-bold mb-2">{img.category}</span>
                  <h4 className="text-white font-serif text-2xl">{img.title}</h4>
                  <div className="mt-4 flex items-center gap-2 text-white/50 text-[9px] uppercase tracking-widest font-bold">
                    <Maximize2 size={12} /> View Details
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Section */}
      <section id="emergency" className="py-32 bg-onyx text-linen relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-2xl">
            <span className="text-[10px] uppercase tracking-[0.4em] text-champagne font-bold">Emergency Support</span>
            <h2 className="text-5xl md:text-7xl font-serif my-8">Need Help Now?</h2>
            <p className="text-linen/60 text-lg font-light mb-12">
              If you have a burst pipe, no heat, or a major leak, use our AI tool for immediate advice or call our priority line directly.
            </p>
            
            <form onSubmit={handleDiagnose} className="space-y-6">
              <div className="relative">
                <textarea 
                  value={diagInput}
                  onChange={(e) => setDiagInput(e.target.value)}
                  placeholder="Describe your issue (e.g., burst pipe under the sink)..."
                  className="w-full bg-transparent border-b border-linen/20 py-6 text-xl font-serif outline-none focus:border-champagne transition-colors placeholder:text-linen/20 resize-none"
                  rows={2}
                />
              </div>
              <button 
                type="submit"
                disabled={isDiagLoading}
                className="flex items-center gap-4 text-xs uppercase tracking-[0.3em] font-bold text-champagne hover:text-linen transition-colors disabled:opacity-50"
              >
                {isDiagLoading ? 'Analyzing Issue...' : 'Get Instant Assessment'} <ArrowRight size={18} />
              </button>
            </form>

            {diagResponse && (
              <div className="mt-16 bg-white/5 border border-white/10 p-10 rounded-sm backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6 text-champagne/60 text-[10px] uppercase tracking-widest font-bold">
                  <Sparkles size={14} /> AI Diagnostic Report
                </div>
                <p className="text-linen font-serif italic text-2xl leading-relaxed">
                  "{diagResponse}"
                </p>
                <div className="mt-8 pt-8 border-t border-white/10 flex gap-12">
                   <a href="tel:2505550123" className="text-linen text-[11px] uppercase tracking-widest font-bold underline decoration-champagne underline-offset-8">Call Dispatch Now</a>
                   <button onClick={() => setDiagResponse(null)} className="text-linen/30 text-[11px] uppercase tracking-widest font-bold">Dismiss</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-32 bg-linen">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="mb-24 text-center space-y-4">
            <span className="text-[10px] uppercase tracking-[0.4em] text-champagne font-bold">Client Feedback</span>
            <h2 className="text-5xl md:text-6xl font-serif text-onyx">Dependable Service You Can Trust.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {testimonials.map((t, idx) => (
              <div key={idx} className="space-y-8 p-8 border border-champagne/10 bg-white shadow-sm">
                <div className="flex gap-1 text-champagne">
                   {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <p className="text-onyx font-serif text-xl italic leading-relaxed">"{t.text}"</p>
                <div>
                   <h4 className="text-[11px] uppercase tracking-widest font-bold text-onyx">{t.name}</h4>
                   <p className="text-[9px] uppercase tracking-[0.2em] text-slate font-medium">{t.location}, BC</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="bg-onyx text-linen pt-32 pb-16 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-32">
          <div className="space-y-16">
             <div className="space-y-6">
                <span className="text-[10px] uppercase tracking-[0.4em] text-champagne font-bold">Contact Us</span>
                <h2 className="text-6xl md:text-8xl font-serif">Get in <br /> Touch.</h2>
                <p className="text-linen/50 text-xl font-light max-w-md">Contact us for any plumbing job, large or small. Same day service available.</p>
             </div>
             
             <div className="space-y-10">
                <div className="flex items-start gap-8 group">
                   <div className="w-12 h-12 flex items-center justify-center border border-white/10 group-hover:border-champagne transition-colors">
                      <Phone size={20} className="text-champagne" />
                   </div>
                   <div>
                      <p className="text-linen/30 text-[9px] uppercase tracking-widest font-bold mb-2">Call for Service</p>
                      <a href="tel:2505550123" className="text-3xl font-serif hover:text-champagne transition-colors">250.555.0123</a>
                   </div>
                </div>
                <div className="flex items-start gap-8 group">
                   <div className="w-12 h-12 flex items-center justify-center border border-white/10 group-hover:border-champagne transition-colors">
                      <MapPin size={20} className="text-champagne" />
                   </div>
                   <div>
                      <p className="text-linen/30 text-[9px] uppercase tracking-widest font-bold mb-2">Location</p>
                      <p className="text-xl font-serif">Serving Kelowna & West Kelowna, BC</p>
                   </div>
                </div>
             </div>
          </div>

          <div className="relative">
            <form className="space-y-12">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-3">
                     <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-linen/40">Name</label>
                     <input type="text" className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-champagne transition-colors" />
                  </div>
                  <div className="space-y-3">
                     <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-linen/40">Phone</label>
                     <input type="tel" className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-champagne transition-colors" />
                  </div>
               </div>
               <div className="space-y-3">
                  <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-linen/40">Service Required</label>
                  <select className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-champagne transition-colors appearance-none">
                     <option className="bg-onyx">Plumbing Repair</option>
                     <option className="bg-onyx">Drain Cleaning</option>
                     <option className="bg-onyx">Water Heater Service</option>
                     <option className="bg-onyx">Poly-B Replacement</option>
                     <option className="bg-onyx">Emergency Service</option>
                  </select>
               </div>
               <div className="space-y-3">
                  <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-linen/40">How can we help?</label>
                  <textarea rows={3} className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-champagne transition-colors resize-none"></textarea>
               </div>
               <button className="w-full py-6 bg-white text-onyx text-[11px] uppercase tracking-[0.4em] font-bold hover:bg-champagne transition-all duration-500 shadow-2xl">
                  Send Request
               </button>
            </form>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-24 mt-24 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] uppercase tracking-[0.2em] font-bold text-linen/20">
          <div className="flex items-center gap-6">
             <span className="text-linen/40">PRECISION PLUMBING & HEATING LTD</span>
             <span>© 2024 Kelowna, BC.</span>
          </div>
          <div className="flex gap-12">
            <a href="#" className="hover:text-champagne transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-champagne transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;