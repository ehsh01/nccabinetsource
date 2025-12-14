import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroBg from "@assets/generated_images/modern_luxury_kitchen_interior.png";

export function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-black/40" /> {/* Dark overlay for text readability */}
      </div>

      <div className="container relative z-10 px-4 text-center text-white max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-heading font-bold text-lg md:text-xl uppercase tracking-[0.2em] mb-4 text-primary/90">
            Welcome to Cabinet Source
          </h2>
          <h1 className="font-heading font-bold text-5xl md:text-7xl lg:text-8xl leading-tight mb-6 drop-shadow-lg">
            Cabinets for <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
              Your Kitchen
            </span>
          </h1>
          <p className="font-light text-lg md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
            Quality Solid Maple Doors, industry-leading box frames, and superior customer service at prices you can afford.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 text-lg w-full sm:w-auto"
              onClick={() => {
                const element = document.querySelector("#contact");
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Get Started
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-black rounded-full px-8 py-6 text-lg backdrop-blur-sm w-full sm:w-auto"
              onClick={() => {
                const element = document.querySelector("#gallery");
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              View Gallery
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white/50 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
