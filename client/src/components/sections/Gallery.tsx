import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

import img1 from "@assets/nc-cabinet-source-custom-cabinetry_1765688562341.jpg";
import img2 from "@assets/custom-cabinet-workshop-nc_1765688562348.jpg";
import img3 from "@assets/modern-custom-cabinetry-home_1765688562348.jpg";
import img4 from "@assets/white-shaker-kitchen-cabinets-nc_1765688562348.jpg";
import img5 from "@assets/modern-kitchen-cabinets-wood-finish_1765688562348.jpg";
import img6 from "@assets/cabinet-design-consultation_1765688562348.jpg";
import img7 from "@assets/cabinet-installation-in-progress-2_1765688562348.jpg";
import img8 from "@assets/white-shaker-kitchen-cabinets_1765688562349.png";
import img9 from "@assets/custom-kitchen-cabinets-north-carolina._1765688562349.jpg";

const galleryImages = [
  { src: img1, alt: "Custom Cabinetry Dark Wood" },
  { src: img2, alt: "Custom Cabinet Workshop" },
  { src: img3, alt: "Modern Custom Cabinetry Home" },
  { src: img4, alt: "White Shaker Kitchen Cabinets" },
  { src: img5, alt: "Modern Kitchen Cabinets Wood Finish" },
  { src: img6, alt: "Cabinet Design Consultation" },
  { src: img7, alt: "Cabinet Installation In Progress" },
  { src: img8, alt: "White Shaker Kitchen Cabinets Detail" },
  { src: img9, alt: "Custom Kitchen Cabinets North Carolina" },
];

export function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handlePrevious = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => 
      prev === null ? null : (prev - 1 + galleryImages.length) % galleryImages.length
    );
  }, []);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => 
      prev === null ? null : (prev + 1) % galleryImages.length
    );
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (selectedIndex === null) return;
    
    if (e.key === "ArrowLeft") handlePrevious();
    if (e.key === "ArrowRight") handleNext();
    if (e.key === "Escape") setSelectedIndex(null);
  }, [selectedIndex, handlePrevious, handleNext]);

  useEffect(() => {
    if (selectedIndex !== null) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [selectedIndex, handleKeyDown]);

  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">Our Work</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">Project Gallery</h2>
          <p className="text-gray-600 text-lg">
            Browse through some of our recent custom cabinetry projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative aspect-[4/3] group cursor-pointer overflow-hidden rounded-xl shadow-md"
              onClick={() => setSelectedIndex(idx)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedIndex(null)}
          >
            {/* Close Button */}
            <button 
              className="absolute top-4 right-4 md:top-8 md:right-8 text-white/70 hover:text-white transition-colors z-50 p-2"
              onClick={() => setSelectedIndex(null)}
            >
              <X className="w-8 h-8 md:w-10 md:h-10" />
            </button>

            {/* Navigation Buttons */}
            <button
              className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-50 p-4 hover:bg-white/10 rounded-full"
              onClick={handlePrevious}
            >
              <ChevronLeft className="w-8 h-8 md:w-12 md:h-12" />
            </button>

            <button
              className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-50 p-4 hover:bg-white/10 rounded-full"
              onClick={handleNext}
            >
              <ChevronRight className="w-8 h-8 md:w-12 md:h-12" />
            </button>

            {/* Image */}
            <motion.img 
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              src={galleryImages[selectedIndex].src} 
              alt={galleryImages[selectedIndex].alt} 
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl select-none"
              onClick={(e) => e.stopPropagation()}
            />
            
            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 font-medium tracking-widest text-sm">
              {selectedIndex + 1} / {galleryImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
