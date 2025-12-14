import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
              onClick={() => setSelectedImage(image.src)}
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
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-8 right-8 text-white hover:text-primary transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-10 h-10" />
          </button>
          <img 
            src={selectedImage} 
            alt="Gallery Fullscreen" 
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
