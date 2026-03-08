import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Info } from "lucide-react";

import kitchenGray from "@assets/generated_images/modern_luxury_kitchen_interior.png";
import kitchenWhite from "@assets/white-shaker-kitchen-cabinets-nc_1765688562348.jpg";
import kitchenNavy from "@assets/nc-cabinet-source-custom-cabinetry_1765688562341.jpg";
import kitchenCharcoal from "@assets/modern-kitchen-cabinets-wood-finish_1765688562348.jpg";
import kitchenNatural from "@assets/custom-kitchen-cabinets-north-carolina._1765688562349.jpg";

export interface Finish {
  id: string;
  name: string;
  color: string; // Tailwind/CSS color for swatch
  image: string;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  features: string[];
  finishes: Finish[];
}

const collections: Collection[] = [
  {
    id: "brooklyn",
    name: "Brooklyn Series",
    description:
      "A modern take on the classic shaker style. The Brooklyn series features wide rails and styles, delivering a transitional look that fits perfectly in both contemporary and traditional homes.",
    features: [
      "Full Overlay Doors",
      "Soft Close Hinges & Glides",
      "Solid Wood Dovetail Drawers",
      "Five-Piece Drawer Fronts",
    ],
    finishes: [
      { id: "white", name: "White", color: "#F5F5F5", image: kitchenWhite },
      { id: "modern-gray", name: "Modern Gray", color: "#9CA3AF", image: kitchenGray },
      { id: "navy", name: "Navy", color: "#1E3A5F", image: kitchenNavy },
      { id: "charcoal", name: "Charcoal", color: "#4B5563", image: kitchenCharcoal },
      { id: "natural", name: "Natural", color: "#D4A574", image: kitchenNatural },
    ],
  },
  {
    id: "classic-shaker",
    name: "Classic Shaker",
    description:
      "Timeless elegance with clean lines. Our Classic Shaker collection brings traditional craftsmanship to modern living, featuring the iconic five-piece door design that has defined quality cabinetry for generations.",
    features: [
      "Classic Five-Piece Door Design",
      "Soft Close Hardware",
      "Solid Maple Construction",
      "Multiple Finish Options",
    ],
    finishes: [
      { id: "white", name: "White", color: "#F5F5F5", image: kitchenWhite },
      { id: "modern-gray", name: "Modern Gray", color: "#9CA3AF", image: kitchenGray },
      { id: "navy", name: "Navy", color: "#1E3A5F", image: kitchenNavy },
      { id: "charcoal", name: "Charcoal", color: "#4B5563", image: kitchenCharcoal },
      { id: "natural", name: "Natural", color: "#D4A574", image: kitchenNatural },
    ],
  },
];

export function Catalog() {
  const [selectedCollection, setSelectedCollection] = useState<Collection>(collections[0]);
  const [selectedFinish, setSelectedFinish] = useState<Finish>(collections[0].finishes[1]);

  const handleCollectionSelect = (collection: Collection) => {
    const matchingFinish = collection.finishes.find((f) => f.id === selectedFinish.id);
    setSelectedCollection(collection);
    setSelectedFinish(matchingFinish ?? collection.finishes[1]);
  };

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="catalog" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">
            Catalog
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
            Explore Our Collections
          </h2>
          <p className="text-gray-600 text-lg">
            Visualize your dream kitchen. Select a series and finish to see how our cabinets can
            transform your space.
          </p>
        </div>

        {/* Main Content: Left Panel + Right Panel */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left Panel - Collection Selection & Details */}
          <div className="lg:w-[380px] shrink-0 space-y-8">
            {/* Select Collection */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <h3 className="font-heading font-semibold text-gray-900">Select Collection</h3>
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  title="Learn more about our collections"
                >
                  <Info className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                {collections.map((collection) => {
                  const isSelected = selectedCollection.id === collection.id;
                  return (
                    <button
                      key={collection.id}
                      type="button"
                      onClick={() => handleCollectionSelect(collection)}
                      className={`w-full flex items-center justify-between px-5 py-4 rounded-lg border-2 text-left transition-all ${
                        isSelected
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                    >
                      <span className="font-medium text-gray-900">{collection.name}</span>
                      {isSelected && (
                        <span className="text-primary">
                          <Check className="w-5 h-5" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Collection Description */}
            <motion.div
              key={selectedCollection.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <h4 className="font-heading font-semibold text-lg text-gray-900">
                {selectedCollection.name}
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                {selectedCollection.description}
              </p>
              <div>
                <h5 className="font-heading font-semibold text-gray-900 text-sm mb-3">
                  KEY FEATURES
                </h5>
                <ul className="space-y-2">
                  {selectedCollection.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-700 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Right Panel - Kitchen Preview & Finish Selection */}
          <div className="flex-1 min-w-0 space-y-6">
            {/* Kitchen Image with Finish Overlay */}
            <div className="relative aspect-[4/3] lg:aspect-[16/10] rounded-xl overflow-hidden shadow-xl bg-gray-200">
              <motion.img
                key={selectedFinish.id}
                src={selectedFinish.image}
                alt={`${selectedCollection.name} in ${selectedFinish.name}`}
                className="w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-4 py-3 shadow-md">
                <p className="text-xs text-gray-500 uppercase tracking-wide">Finish Selected</p>
                <p className="font-semibold text-gray-900">{selectedFinish.name}</p>
              </div>
            </div>

            {/* Available Finishes */}
            <div>
              <h5 className="font-heading font-semibold text-gray-900 mb-4">Available Finishes</h5>
              <div className="flex flex-wrap gap-4">
                {selectedCollection.finishes.map((finish) => {
                  const isSelected = selectedFinish.id === finish.id;
                  return (
                    <button
                      key={finish.id}
                      type="button"
                      onClick={() => setSelectedFinish(finish)}
                      className={`w-12 h-12 rounded-full border-2 transition-all shrink-0 ${
                        isSelected ? "border-primary ring-2 ring-primary/30" : "border-gray-300 hover:border-gray-400"
                      }`}
                      style={{ backgroundColor: finish.color }}
                      title={finish.name}
                    />
                  );
                })}
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4">
              <p className="text-gray-600 text-sm">
                Like this combination? Get a free layout designed with the {selectedCollection.name}{" "}
                in {selectedFinish.name}.
              </p>
              <Button
                onClick={scrollToContact}
                className="bg-primary hover:bg-primary/90 text-white rounded-lg px-6 py-3 shrink-0"
              >
                Request Quote
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
