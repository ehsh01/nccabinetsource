import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

import whiteCabinet from "@assets/generated_images/white_shaker_style_kitchen_cabinets.png";
import modernGrayCabinet from "@assets/generated_images/modern_gray_shaker_style_kitchen_cabinets.png";
import midnightCabinet from "@assets/generated_images/navy_blue_shaker_style_kitchen_cabinets.png"; // Reusing navy for Midnight
import slateCabinet from "@assets/generated_images/slate_shaker_style_kitchen_cabinets.png";
import fawnCabinet from "@assets/generated_images/fawn_shaker_style_kitchen_cabinets.png";
import espressoCabinet from "@assets/generated_images/espresso_shaker_style_kitchen_cabinets.png";

// Mock Data Structure matching the reference site experience
const cabinetSeries = [
  {
    id: "brooklyn",
    name: "Brooklyn Series",
    description: "A modern take on the classic shaker style. The Brooklyn series features wide rails and styles, delivering a transitional look that fits perfectly in both contemporary and traditional homes.",
    features: [
      "Full Overlay Doors",
      "Soft Close Hinges & Glides",
      "Solid Wood Dovetail Drawers",
      "Five-Piece Drawer Fronts"
    ],
    colors: [
      { id: "bright-white", name: "Bright White", hex: "#F5F5F5", image: whiteCabinet },
      { id: "modern-gray", name: "Modern Gray", hex: "#E5E7EB", image: modernGrayCabinet },
      { id: "midnight", name: "Midnight", hex: "#1F2937", image: midnightCabinet },
      { id: "slate", name: "Slate", hex: "#545963", image: slateCabinet },
      { id: "fawn", name: "Fawn", hex: "#D4B996", image: fawnCabinet },
    ]
  },
  {
    id: "shaker-classic",
    name: "Classic Shaker",
    description: "Timeless simplicity. The Classic Shaker series offers the traditional look that has remained popular for decades, featuring clean lines and durable construction.",
    features: [
      "Standard Overlay",
      "Epoxy Glides",
      "Particle Board Box",
      "Veneer Center Panel"
    ],
    // Reusing images for demo purposes since we only generated one set
    colors: [
      { id: "bright-white", name: "Bright White", hex: "#F5F5F5", image: whiteCabinet },
      { id: "espresso", name: "Espresso", hex: "#3E2723", image: espressoCabinet },
    ]
  }
];

export function ProductCatalog() {
  const [selectedSeriesId, setSelectedSeriesId] = useState(cabinetSeries[0].id);
  const [selectedColorId, setSelectedColorId] = useState(cabinetSeries[0].colors[0].id);

  const activeSeries = cabinetSeries.find(s => s.id === selectedSeriesId) || cabinetSeries[0];
  const activeColor = activeSeries.colors.find(c => c.id === selectedColorId) || activeSeries.colors[0];

  // Handle series change: reset color to the first available one for that series
  const handleSeriesChange = (seriesId: string) => {
    setSelectedSeriesId(seriesId);
    const newSeries = cabinetSeries.find(s => s.id === seriesId);
    if (newSeries && newSeries.colors.length > 0) {
      setSelectedColorId(newSeries.colors[0].id);
    }
  };

  return (
    <section id="collections" className="py-24 bg-white scroll-mt-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">Catalog</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">Explore Our Collections</h2>
          <p className="text-gray-600 text-lg">
            Visualize your dream kitchen. Select a series and finish to see how our cabinets can transform your space.
          </p>
        </div>

        {/* Main Interface */}
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Left: Controls & Info */}
          <div className="w-full lg:w-1/3 space-y-10">
            
            {/* Series Selection */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-primary" />
                Select Collection
              </h3>
              <div className="flex flex-col gap-3">
                {cabinetSeries.map((series) => (
                  <button
                    key={series.id}
                    onClick={() => handleSeriesChange(series.id)}
                    className={`text-left px-6 py-4 rounded-xl transition-all duration-300 border-2 ${
                      selectedSeriesId === series.id
                        ? "border-primary bg-primary/5 shadow-md"
                        : "border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className={`font-bold text-lg ${selectedSeriesId === series.id ? "text-primary" : "text-gray-700"}`}>
                        {series.name}
                      </span>
                      {selectedSeriesId === series.id && (
                        <div className="bg-primary text-white rounded-full p-1">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Series Details */}
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
              <h4 className="font-heading font-bold text-xl text-gray-900 mb-3">{activeSeries.name}</h4>
              <p className="text-gray-600 leading-relaxed mb-6">
                {activeSeries.description}
              </p>
              
              <h5 className="font-bold text-sm uppercase tracking-wide text-gray-900 mb-3">Key Features</h5>
              <ul className="grid grid-cols-1 gap-2">
                {activeSeries.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Right: Visualizer */}
          <div className="w-full lg:w-2/3">
            <div className="sticky top-24">
              
              {/* Preview Image */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-gray-100 mb-8 border border-gray-100">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={`${activeSeries.id}-${activeColor.id}`}
                    src={activeColor.image}
                    alt={`${activeSeries.name} in ${activeColor.name}`}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
                
                {/* Overlay Label */}
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-6 py-3 rounded-lg shadow-sm border border-white/50">
                  <span className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Finish Selected</span>
                  <span className="block font-bold text-lg text-gray-900">{activeColor.name}</span>
                </div>
              </div>

              {/* Color Selector */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Available Finishes</h3>
                <div className="flex flex-wrap gap-4">
                  {activeSeries.colors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColorId(color.id)}
                      className={`group relative w-16 h-16 rounded-full focus:outline-none transition-transform hover:scale-105 ${
                        selectedColorId === color.id ? "ring-4 ring-primary ring-offset-2" : ""
                      }`}
                    >
                      <span className="sr-only">{color.name}</span>
                      <div 
                        className="w-full h-full rounded-full border border-black/10 shadow-inner"
                        style={{ backgroundColor: color.hex }}
                      />
                      {/* Tooltip style label on hover */}
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-gray-900 text-white text-xs py-1 px-2 rounded pointer-events-none">
                        {color.name}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-between bg-primary/5 p-6 rounded-xl border border-primary/10">
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Like this combination?</h4>
                  <p className="text-gray-600 text-sm">Get a free layout designed with the {activeSeries.name} in {activeColor.name}.</p>
                </div>
                <Button 
                   onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: 'smooth' })}
                   className="bg-primary hover:bg-primary/90 text-white whitespace-nowrap"
                >
                  Request Quote
                </Button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
