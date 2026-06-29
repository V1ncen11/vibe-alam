"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function Home() {
  const containerRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax effects for the hero background with Spring for mobile smoothness
  const smoothProgress = useSpring(scrollYProgress, { damping: 30, stiffness: 100, mass: 0.5 });
  const y = useTransform(smoothProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(smoothProgress, [0, 1], [1, 1.1]);
  const opacity = useTransform(smoothProgress, [0, 0.8], [1, 0]);

  // Interactive Sun/Lens Flare tracking mouse
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const flareX = useTransform(mouseX, [-1, 1], ["40px", "-40px"]);
  const flareY = useTransform(mouseY, [-1, 1], ["40px", "-40px"]);

  // Mask reveal variant for text with delayed entrance waiting for Preloader
  const slideUp: any = {
    hidden: { y: "100%", opacity: 0 },
    visible: (custom = 0) => ({
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut", delay: custom + 2.5 }
    })
  };

  const fadeUp: any = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  return (
    <div className="bg-white text-slate-900 selection:bg-black/10 overflow-x-hidden">
      
      {/* Hero Wrapper with Background */}
      <div ref={containerRef} className="relative min-h-screen flex flex-col w-full overflow-hidden">
        {/* Background Image with Overlay - Parallax Applied */}
        <motion.div style={{ y, scale, opacity }} className="absolute inset-0 z-0 transform-gpu">
          {/* Inner motion div for continuous floating effect */}
          <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              y: ["-10px", "10px", "-10px"] 
            }}
            transition={{ 
              scale: { duration: 2.5, delay: 2.0, ease: "easeOut" },
              opacity: { duration: 2.5, delay: 2.0, ease: "easeOut" },
              y: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2.0 }
            }}
            className="w-full h-full relative"
          >
            <Image
              src="/hero.jpg"
              alt="Curug Badak Background"
              fill
              priority
              className="object-cover object-center"
            />
            {/* Interactive Sun Flare effect */}
            <motion.div 
              className="absolute top-1/2 left-1/2 w-[200px] h-[200px] md:w-[350px] md:h-[350px] bg-white/40 blur-[40px] rounded-full pointer-events-none mix-blend-overlay"
              style={{ x: flareX, y: flareY, translateX: "-50%", translateY: "-50%" }}
            />
          </motion.div>
          {/* Smooth fog gradient from top down to blend the image into a white sky for the text */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/45 via-white/15 to-transparent pointer-events-none" />
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col w-full">

          {/* Transparent Navbar */}
          <header className="absolute top-0 w-full z-50 flex items-center justify-between px-8 py-6">
            <div className="flex items-center gap-2 text-2xl font-medium tracking-tight text-slate-900">
              <svg width="34" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" className="text-slate-900">
                {/* Stylized connected 'c' and 'b' (abstract ligature) */}
                <path d="M 14 2 L 14 18 C 14 24 22 24 22 18 C 22 12 14 12 14 12" />
                <path d="M 10 12 C 2 12 2 18 10 18 L 14 18" />
              </svg>
              cuba
            </div>

            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-700">
              <Link href="#home" className="hover:text-black transition-colors">Home</Link>
              <Link href="#about" className="hover:text-black transition-colors">About Us</Link>
              <Link href="#destinations" className="hover:text-black transition-colors">Destinations</Link>
              <Link href="#gallery" className="hover:text-black transition-colors">Gallery</Link>
              <Link href="#contact" className="hover:text-black transition-colors">Contact Us</Link>
            </nav>

            <button className="hidden md:flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-slate-800 transition-colors">
              Contact Us
              <span className="bg-white/20 p-1 rounded-full text-[10px] leading-none">↗</span>
            </button>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden flex items-center justify-center p-2 text-slate-900 z-50 relative"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {isMobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </>
                ) : (
                  <>
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </>
                )}
              </svg>
            </button>
          </header>

          {/* Mobile Menu Overlay */}
          <motion.div
            initial={false}
            animate={{ 
              opacity: isMobileMenuOpen ? 1 : 0, 
              pointerEvents: isMobileMenuOpen ? "auto" : "none" 
            }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            <Link href="#home" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-bold hover:text-slate-500 transition-colors">Home</Link>
            <Link href="#about" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-bold hover:text-slate-500 transition-colors">About Us</Link>
            <Link href="#destinations" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-bold hover:text-slate-500 transition-colors">Destinations</Link>
            <Link href="#gallery" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-bold hover:text-slate-500 transition-colors">Gallery</Link>
            <Link href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-bold hover:text-slate-500 transition-colors">Contact Us</Link>
          </motion.div>

          {/* Hero Section */}
          <main id="home" className="flex-1 flex flex-col items-center justify-center text-center px-6 mt-16 pb-32">
            
            {/* Mask Reveal Title */}
            <div className="overflow-hidden">
              <motion.h1 
                custom={0}
                variants={slideUp}
                initial="hidden"
                animate="visible"
                className="text-4xl md:text-5xl lg:text-6xl leading-[1.15] font-bold tracking-tight text-black max-w-4xl mx-auto drop-shadow-sm"
              >
                Discover Nature,
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1 
                custom={0.1}
                variants={slideUp}
                initial="hidden"
                animate="visible"
                className="text-4xl md:text-5xl lg:text-6xl leading-[1.15] font-bold tracking-tight text-black max-w-4xl mx-auto drop-shadow-sm pb-2"
              >
                Restore the Spirit
              </motion.h1>
            </div>

            <div className="overflow-hidden mt-6">
              <motion.p 
                custom={0.3}
                variants={slideUp}
                initial="hidden"
                animate="visible"
                className="text-base md:text-lg text-slate-800 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-sm"
              >
                Curug Badak offers a breathtaking escape into the heart of Tasikmalaya&apos;s tropical forests.
                Experience the roar of the waterfall and the serenity of untouched nature.
              </motion.p>
            </div>

            <motion.div 
              custom={0.5}
              variants={slideUp}
              initial="hidden"
              animate="visible"
              className="mt-10 flex flex-col sm:flex-row items-center gap-4"
            >
              <Link href="#destinations" className="bg-slate-900 text-white px-8 py-3.5 rounded-full font-medium hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                Plan Your Visit
              </Link>
              <Link href="#gallery" className="bg-white/10 backdrop-blur-md border border-slate-900/20 text-slate-900 px-8 py-3.5 rounded-full font-medium hover:bg-white/20 transition-all">
                View Gallery
              </Link>
            </motion.div>
          </main>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="py-24 px-8 bg-white text-slate-900">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          <motion.div variants={fadeUp} className="aspect-[4/5] bg-slate-100 rounded-3xl overflow-hidden relative shadow-2xl shadow-slate-200/50">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.7 }} className="w-full h-full">
              <Image src="/about.jpg" alt="Curug Badak Waterfall" fill className="object-cover" />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 text-white pointer-events-none">
              <p className="font-bold text-xl">Since 1998</p>
              <p className="text-sm opacity-90">Preserved Natural Heritage</p>
            </div>
          </motion.div>
          
          <motion.div variants={fadeUp}>
            <p className="text-sm font-bold tracking-widest text-slate-500 uppercase mb-4">
              ABOUT THE WATERFALL
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
              A Hidden Sanctuary <br/> in Tasikmalaya
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              Nestled deep within the lush pine forests of Sukamaju, Curug Badak is a hidden gem waiting to be discovered. Known for its distinct rock formations that resemble a rhinoceros horn, this majestic waterfall cascades down naturally terraced cliffs, creating a mesmerizing symphony of water and stone.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed mb-10">
              The area features a unique combination of a towering pine forest and a pristine waterfall, offering visitors a dual experience of tranquil forest walks and the refreshing, raw power of the falls.
            </p>
            
            <div className="grid grid-cols-2 gap-6 border-t border-slate-100 pt-10">
              <div>
                <h4 className="text-3xl font-black text-slate-900 mb-2">40m</h4>
                <p className="text-slate-500 font-medium text-sm uppercase tracking-wider">Waterfall Height</p>
              </div>
              <div>
                <h4 className="text-3xl font-black text-slate-900 mb-2">24°C</h4>
                <p className="text-slate-500 font-medium text-sm uppercase tracking-wider">Average Temp</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Destinations Section */}
      <section id="destinations" className="py-24 px-8 bg-slate-50 text-slate-900 overflow-hidden">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={fadeUp} className="flex justify-between items-end mb-16">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Explore the Area</h2>
              <p className="text-lg text-slate-500">Discover all the natural wonders Curug Badak has to offer. From roaring waterfalls to tranquil pine forests.</p>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <motion.div variants={fadeUp} className="group relative aspect-[3/4] rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500">
              <Image src="/gambar1.jpg" alt="The Great Waterfall" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                <p className="text-sm font-semibold tracking-widest text-white/70 uppercase mb-2">01. GORGE</p>
                <h3 className="text-2xl font-bold mb-3">Hidden Gorge</h3>
                <p className="text-white/80 text-sm leading-relaxed translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  Discover ancient rock formations and ethereal light rays inside the hidden cavern.
                </p>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div variants={fadeUp} className="group relative aspect-[3/4] rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 md:-translate-y-8">
              <Image src="/gambar2.jpg" alt="Pine Forest Trails" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                <p className="text-sm font-semibold tracking-widest text-white/70 uppercase mb-2">02. FOREST</p>
                <h3 className="text-2xl font-bold mb-3">Pine Trails</h3>
                <p className="text-white/80 text-sm leading-relaxed translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  Wander through towering pine trees that provide a perfect natural canopy.
                </p>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div variants={fadeUp} className="group relative aspect-[3/4] rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500">
              <Image src="/gambar3.jpg" alt="Crystal Springs" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                <p className="text-sm font-semibold tracking-widest text-white/70 uppercase mb-2">03. STREAM</p>
                <h3 className="text-2xl font-bold mb-3">Crystal Springs</h3>
                <p className="text-white/80 text-sm leading-relaxed translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  Relax by the tranquil, crystal-clear streams flowing over ancient mossy rocks.
                </p>
              </div>
            </motion.div>

            {/* Card 4 */}
            <motion.div variants={fadeUp} className="group relative aspect-[3/4] rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500">
              <Image src="/gambar4.jpg" alt="New Destination" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                <p className="text-sm font-semibold tracking-widest text-white/70 uppercase mb-2">04. CAFE</p>
                <h3 className="text-2xl font-bold mb-3">Jungle Café</h3>
                <p className="text-white/80 text-sm leading-relaxed translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  Enjoy local coffee and snacks while immersed in the tranquility of the forest.
                </p>
              </div>
            </motion.div>

            {/* Card 5 */}
            <motion.div variants={fadeUp} className="group relative aspect-[3/4] rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 md:-translate-y-8">
              <Image src="/gambar5.jpg" alt="New Destination" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                <p className="text-sm font-semibold tracking-widest text-white/70 uppercase mb-2">05. SWIM</p>
                <h3 className="text-2xl font-bold mb-3">Blue Lagoon</h3>
                <p className="text-white/80 text-sm leading-relaxed translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  Dive into the crystal clear, refreshing turquoise waters beneath the falls.
                </p>
              </div>
            </motion.div>

            {/* Card 6 */}
            <motion.div variants={fadeUp} className="group relative aspect-[3/4] rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500">
              <Image src="/gambar6.jpg" alt="New Destination" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                <p className="text-sm font-semibold tracking-widest text-white/70 uppercase mb-2">06. RELAX</p>
                <h3 className="text-2xl font-bold mb-3">Hammock Deck</h3>
                <p className="text-white/80 text-sm leading-relaxed translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  Unwind in our viewing decks and soak in the breathtaking panoramic valley views.
                </p>
              </div>
            </motion.div>
          </div>
          </motion.div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-32 px-8 bg-white text-slate-900 overflow-hidden">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={fadeUp} className="flex flex-col items-center text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Visual Journey</h2>
            <p className="text-lg text-slate-500 max-w-2xl text-center">
              Take a glimpse into the raw, untamed beauty of Curug Badak through the lens of our visitors.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Standard Image 1 */}
            <motion.div variants={fadeUp} className="aspect-[3/4] bg-slate-100 rounded-3xl overflow-hidden relative group cursor-pointer shadow-sm">
              <Image src="/galery1.png" alt="Gallery image 1" fill unoptimized className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-sm font-medium tracking-widest border border-white/50 rounded-full px-6 py-2 backdrop-blur-sm">VIEW IMAGE</span>
              </div>
            </motion.div>
            
            {/* Standard Image 2 */}
            <motion.div variants={fadeUp} className="aspect-[3/4] bg-slate-100 rounded-3xl overflow-hidden relative group cursor-pointer shadow-sm md:translate-y-8">
              <Image src="/galery2.jpg" alt="Gallery image 2" fill unoptimized className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-sm font-medium tracking-widest border border-white/50 rounded-full px-6 py-2 backdrop-blur-sm">VIEW IMAGE</span>
              </div>
            </motion.div>
            
            {/* Standard Image 3 */}
            <motion.div variants={fadeUp} className="aspect-[3/4] bg-slate-100 rounded-3xl overflow-hidden relative group cursor-pointer shadow-sm">
              <Image src="/galery3.jpg" alt="Gallery image 3" fill unoptimized className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-sm font-medium tracking-widest border border-white/50 rounded-full px-6 py-2 backdrop-blur-sm">VIEW IMAGE</span>
              </div>
            </motion.div>
            
            {/* Standard Image 4 */}
            <motion.div variants={fadeUp} className="aspect-[3/4] bg-slate-100 rounded-3xl overflow-hidden relative group cursor-pointer shadow-sm md:translate-y-8">
              <Image src="/galery4.jpg" alt="Gallery image 4" fill unoptimized className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-sm font-medium tracking-widest border border-white/50 rounded-full px-6 py-2 backdrop-blur-sm">VIEW IMAGE</span>
              </div>
            </motion.div>
          </div>
          
          <div className="mt-16 text-center">
             <button className="bg-white border border-slate-200 text-slate-900 px-8 py-3.5 rounded-full font-medium hover:bg-slate-50 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 inline-flex items-center gap-3">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                Follow our Instagram
             </button>
          </div>
          </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-8 bg-slate-900 text-white relative overflow-hidden">
        {/* Abstract background shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Ready for an Adventure?</h2>
          <p className="text-slate-400 mb-12 max-w-xl mx-auto text-lg leading-relaxed">
            Whether you&apos;re looking for a peaceful weekend retreat or an adventurous trek through the pine forests, Curug Badak awaits.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-12 mb-12">
            <div className="text-center">
              <p className="text-sm text-slate-500 uppercase tracking-widest mb-2 font-semibold">Location</p>
              <p className="text-slate-200 font-medium">Sukamaju, Cisayong, Tasikmalaya</p>
            </div>
            <div className="hidden sm:block w-px h-12 bg-white/10" />
            <div className="text-center">
              <p className="text-sm text-slate-500 uppercase tracking-widest mb-2 font-semibold">Opening Hours</p>
              <p className="text-slate-200 font-medium">Everyday • 08:00 AM - 17:00 PM</p>
            </div>
          </div>
          
          <div className="w-full max-w-3xl mx-auto h-80 bg-slate-800 rounded-3xl overflow-hidden mb-12 relative shadow-2xl">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15830.407765109405!2d108.12574045!3d-7.28601665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6f5195da182363%3A0xbcf2de6e9e4917a1!2sCurug%20Badak%20Batu%20Hanoman!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 grayscale contrast-125 opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
            ></iframe>
          </div>
          
          <button className="bg-white text-slate-900 px-10 py-4 rounded-full font-bold hover:bg-slate-100 transition-all shadow-xl hover:-translate-y-1 hover:shadow-2xl">
            Book Your Ticket
          </button>
        </motion.div>
      </section>

      {/* Footer Section */}
      <footer className="bg-slate-950 text-slate-400 py-12 px-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-xl font-medium tracking-tight text-white">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M 14 2 L 14 18 C 14 24 22 24 22 18 C 22 12 14 12 14 12" />
              <path d="M 10 12 C 2 12 2 18 10 18 L 14 18" />
            </svg>
            cuba
          </div>
          
          <p className="text-sm">© {new Date().getFullYear()} Curug Badak Resort. All rights reserved.</p>
          
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-white transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
