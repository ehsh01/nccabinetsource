import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Info, X, ChevronLeft, ChevronRight } from "lucide-react";

// Fallback images when catalog images aren't loaded yet
import placeholderKitchen from "@assets/generated_images/modern_luxury_kitchen_interior.png";

export interface Finish {
  id: string;
  name: string;
  color: string;
  /** Paths in public/catalog/ - use multiple for collage + lightbox */
  imagePaths: string[];
}

export interface Collection {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  finishes: Finish[];
}

/**
 * KCD Premier Series data from https://www.kcdus.com/cabinets/
 * Add images to client/public/catalog/{series}/{color-slug}.jpg
 * See client/public/catalog/README.md for exact filenames
 */
const collections: Collection[] = [
  {
    id: "brooklyn",
    name: "Brooklyn",
    tagline: "Transitional, distinctive, chic",
    description:
      "This transitional door complements a range of styles from modern to vintage to traditional. The color options within the Brooklyn line offer a solution for many design needs. Find modern charm in Brooklyn Gray, or install a Slate island for the perfect kitchen accent. Discover inspiration in our rich and bold Brooklyn Midnight.",
    features: [
      "Full overlay doors provide a seamless aesthetic",
      "Soft-close doors and drawers prevent slamming",
      "Dovetail drawer craftsman construction",
      "Full extension drawers ensure easy access",
      "Solid wood cabinet box and drawers",
      "Premium Sherwin-Williams® finish",
    ],
    finishes: [
      { id: "bright-white", name: "Bright White", color: "#F8F8F8", imagePaths: ["brooklyn/bright-white-1.jpg", "brooklyn/bright-white-2.jpg", "brooklyn/bright-white-3.jpg", "brooklyn/bright-white-4.jpg", "brooklyn/bright-white-5.jpg", "brooklyn/bright-white-6.jpg", "brooklyn/bright-white-7.jpg"] },
      { id: "midnight", name: "Midnight", color: "#1a1a2e", imagePaths: ["brooklyn/midnight-1.jpg", "brooklyn/midnight-2.jpg", "brooklyn/midnight-3.jpg"] },
      { id: "modern-gray", name: "Modern Gray", color: "#9CA3AF", imagePaths: ["brooklyn/modern-gray-1.jpg", "brooklyn/modern-gray-2.jpg", "brooklyn/modern-gray-3.jpg", "brooklyn/modern-gray-4.jpg", "brooklyn/modern-gray-5.jpg", "brooklyn/modern-gray-6.jpg"] },
      { id: "slate", name: "Slate", color: "#475569", imagePaths: ["brooklyn/slate-1.jpg", "brooklyn/slate-2.jpg", "brooklyn/slate-3.jpg"] },
      { id: "fawn", name: "Fawn", color: "#C4A77D", imagePaths: ["brooklyn/Fawn-1.jpg", "brooklyn/Fawn-2.jpg", "brooklyn/Fawn-3.jpg", "brooklyn/Fawn-4.jpg", "brooklyn/Fawn-5.jpg"] },
    ],
  },
  {
    id: "shaker",
    name: "Shaker",
    tagline: "Crisp, classic, versatile",
    description:
      "This cabinet offers a uniquely versatile appeal. The design incorporates the architectural shaker style with pleasing proportions. Shaker White is available with a slab or 5-piece drawer front yielding a contemporary or classic display.",
    features: [
      "Full overlay doors provide a seamless aesthetic",
      "Soft-close doors and drawers prevent slamming",
      "Dovetail drawer craftsman construction",
      "Full extension drawers ensure easy access",
      "Durable solid wood cabinet box and drawers",
      "Premium Sherwin-Williams® finish",
    ],
    finishes: [
      { id: "designer-white", name: "Designer White", color: "#F5F5F5", imagePaths: ["shaker/designer-white-1.jpg", "shaker/designer-white-2.jpg", "shaker/designer-white-3.jpg", "shaker/designer-white-4.jpg", "shaker/designer-white-5.jpg"] },
      { id: "designer-white-slab", name: "Designer White, Slab", color: "#FAFAFA", imagePaths: ["shaker/designer-white-slab-1.jpg", "shaker/designer-white-slab-2.jpg"] },
      { id: "sand", name: "Sand", color: "#C4B896", imagePaths: ["shaker/sand-1.jpg", "shaker/sand-2.jpg", "shaker/sand-3.jpg"] },
      { id: "espresso", name: "Espresso", color: "#3d2817", imagePaths: ["shaker/Espresso-1.jpg", "shaker/Espresso-2.jpg", "shaker/Espresso-3.jpg"] },
      { id: "kodiak", name: "Kodiak", color: "#5c4033", imagePaths: ["shaker/Kodiak-1.jpg", "shaker/Kodiak-2.jpg", "shaker/Kodiak-3.jpg", "shaker/Kodiak-4.jpg", "shaker/Kodiak-5.jpg"] },
      { id: "moss", name: "Moss", color: "#5a6b4a", imagePaths: ["shaker/Moss-1.jpg", "shaker/Moss-2.jpg", "shaker/Moss-3.jpg"] },
    ],
  },
  {
    id: "oslo",
    name: "Oslo",
    tagline: "Modern. Minimal. Elegant.",
    description:
      "This modern, minimalist design is characterized by simplicity, functionality and refinement. Our Oslo series presents a slim profile and is ideal for contemporary design. Available in stained rift white oak and bright white, the finishes can be used together to create a two-toned design or stand alone for a dramatic look.",
    features: [
      "Full overlay doors provide a seamless aesthetic",
      "Soft-close doors and drawers prevent slamming",
      "Dovetail drawer craftsman construction",
      "Full extension drawers ensure easy access",
      "Solid wood cabinet box and drawers",
      "Premium Sherwin-Williams® finish",
    ],
    finishes: [
      {
        id: "white",
        name: "White",
        color: "#FFFFFF",
        imagePaths: ["oslo/white-1.jpg", "oslo/white-2.jpg", "oslo/white-3.jpg"],
      },
      { id: "oak", name: "Oak", color: "#D4A574", imagePaths: ["oslo/oak-1.jpg", "oslo/oak-2.jpg", "oslo/oak-3.jpg"] },
      { id: "walnut", name: "Walnut", color: "#5C4033", imagePaths: ["oslo/walnut-1.png", "oslo/walnut-2.png", "oslo/walnut-3.png"] },
    ],
  },
];

/** Timestamp cache-bust: each page load fetches fresh images (no stale cache) */
const IMAGE_CACHE_BUST = Date.now();

function getImageSrc(path: string): string {
  return `/catalog/${path}?v=${IMAGE_CACHE_BUST}`;
}

export function Catalog() {
  const [selectedCollection, setSelectedCollection] = useState<Collection>(collections[0]);
  const [selectedFinish, setSelectedFinish] = useState<Finish>(collections[0].finishes[0]);
  const [failedImageIndices, setFailedImageIndices] = useState<Set<number>>(new Set());
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const images = selectedFinish.imagePaths.map((p) => getImageSrc(p));
  const displayImages = images.map((src, i) =>
    failedImageIndices.has(i) ? placeholderKitchen : src
  );

  const handleCollectionSelect = (collection: Collection) => {
    const matchingFinish = collection.finishes.find((f) => f.id === selectedFinish.id);
    setSelectedCollection(collection);
    setSelectedFinish(matchingFinish ?? collection.finishes[0]);
    setFailedImageIndices(new Set());
    setLightboxOpen(false);
  };

  const handleFinishSelect = (finish: Finish) => {
    setSelectedFinish(finish);
    setFailedImageIndices(new Set());
    setLightboxOpen(false);
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleLightboxPrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLightboxIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
  }, [displayImages.length]);

  const handleLightboxNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLightboxIndex((prev) => (prev + 1) % displayImages.length);
  }, [displayImages.length]);

  const handleLightboxKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") handleLightboxPrev();
    if (e.key === "ArrowRight") handleLightboxNext();
    if (e.key === "Escape") setLightboxOpen(false);
  }, [handleLightboxPrev, handleLightboxNext]);

  useEffect(() => {
    if (lightboxOpen) {
      window.addEventListener("keydown", handleLightboxKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      window.removeEventListener("keydown", handleLightboxKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [lightboxOpen, handleLightboxKeyDown]);

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
    <section id="catalog" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">
            Catalog
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
            Premier Series Collections
          </h2>
          <p className="text-gray-600 text-lg">
            Select a collection and color to see how our cabinets can transform your space. Click any
            color swatch to view a kitchen or bathroom in that finish.
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
                  title="Premier Series - KCD Cabinets"
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
              <div>
                <h4 className="font-heading font-semibold text-lg text-gray-900">
                  {selectedCollection.name}
                </h4>
                <p className="text-primary font-medium text-sm mt-0.5">
                  {selectedCollection.tagline}
                </p>
              </div>
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

          {/* Right Panel - Kitchen/Bathroom Preview & Color Selection */}
          <div className="flex-1 min-w-0 space-y-6">
            {/* Image Collage - first image bigger (~2/3), rest stacked on right splitting remaining space */}
            <div className="space-y-2">
              <div className="relative aspect-[4/3] lg:aspect-[16/10] rounded-xl overflow-hidden shadow-xl bg-gray-200 flex gap-1 p-1">
                {displayImages.length === 1 ? (
                  <motion.button
                    key={`${selectedCollection.id}-${selectedFinish.id}`}
                    type="button"
                    className="flex-1 min-w-0 relative overflow-hidden rounded-lg group cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    onClick={() => openLightbox(0)}
                  >
                    <img
                      src={displayImages[0]}
                      alt={`${selectedCollection.name} in ${selectedFinish.name}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={() => setFailedImageIndices((prev) => new Set(prev).add(0))}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </motion.button>
                ) : (
                  <>
                    {/* First image - same size as single-image layout (3/4 width) */}
                    <motion.button
                      key={`${selectedCollection.id}-${selectedFinish.id}-0`}
                      type="button"
                      className="flex-[3] min-w-0 relative overflow-hidden rounded-lg group cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      onClick={() => openLightbox(0)}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        src={displayImages[0]}
                        alt={`${selectedCollection.name} ${selectedFinish.name} - View 1`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={() => setFailedImageIndices((prev) => new Set(prev).add(0))}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    </motion.button>
                    {/* Remaining images - stacked on right, split equally */}
                    <div className="flex-[1] min-w-0 flex flex-col gap-1">
                      {displayImages.slice(1).map((src, idx) => (
                        <motion.button
                          key={`${selectedCollection.id}-${selectedFinish.id}-${idx + 1}`}
                          type="button"
                          className="flex-1 min-h-0 relative overflow-hidden rounded-lg group cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                          onClick={() => openLightbox(idx + 1)}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3, delay: (idx + 1) * 0.05 }}
                        >
                          <img
                            src={src}
                            alt={`${selectedCollection.name} ${selectedFinish.name} - View ${idx + 2}`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            onError={() => setFailedImageIndices((prev) => new Set(prev).add(idx + 1))}
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                        </motion.button>
                      ))}
                    </div>
                  </>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-md inline-block">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Finish Selected</p>
                  <p className="font-semibold text-gray-900">
                    {selectedCollection.name} — {selectedFinish.name}
                  </p>
                </div>
                {failedImageIndices.size > 0 && (
                  <div className="bg-amber-100 text-amber-800 text-xs px-3 py-2 rounded-lg">
                    Add images to catalog/
                  </div>
                )}
              </div>
            </div>

            {/* Lightbox rendered via portal — see bottom of component */}

            {/* Available Finishes - click to see image */}
            <div>
              <h5 className="font-heading font-semibold text-gray-900 mb-4">
                Available Finishes — click to preview
              </h5>
              <div className="flex flex-wrap gap-4">
                {selectedCollection.finishes.map((finish) => {
                  const isSelected = selectedFinish.id === finish.id;
                  return (
                    <button
                      key={finish.id}
                      type="button"
                      onClick={() => handleFinishSelect(finish)}
                      className={`flex flex-col items-center gap-2 group ${
                        isSelected ? "ring-2 ring-primary ring-offset-2 rounded-lg p-1 -m-1" : ""
                      }`}
                      title={`View ${finish.name} in a kitchen or bathroom`}
                    >
                      <span
                        className={`w-12 h-12 rounded-full border-2 transition-all shrink-0 ${
                          isSelected
                            ? "border-primary ring-2 ring-primary/30"
                            : "border-gray-300 group-hover:border-gray-400"
                        }`}
                        style={{ backgroundColor: finish.color }}
                      />
                      <span className="text-xs font-medium text-gray-700 max-w-[4rem] text-center leading-tight">
                        {finish.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4">
              <p className="text-gray-600 text-sm">
                Like this combination? Get a free layout designed with the {selectedCollection.name}{" "}
                series in {selectedFinish.name}.
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

    {/* Lightbox — rendered via portal directly on document.body so no parent layout can constrain it */}
    {createPortal(
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/70 overflow-auto"
            onClick={() => setLightboxOpen(false)}
            style={{ margin: 0, padding: 0 }}
          >
            <div
              className="min-h-full flex items-start justify-center py-8"
              onClick={() => setLightboxOpen(false)}
            >
              <div
                className="relative bg-white rounded-lg shadow-2xl p-2 md:p-4 inline-block"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute -top-3 -right-3 z-10 w-10 h-10 rounded-full bg-gray-800 text-white hover:bg-gray-700 flex items-center justify-center shadow-lg transition-colors"
                  onClick={() => setLightboxOpen(false)}
                >
                  <X className="w-5 h-5" />
                </button>

                {displayImages.length > 1 && (
                  <>
                    <button
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gray-800/90 text-white hover:bg-gray-700 flex items-center justify-center z-10 transition-colors"
                      onClick={handleLightboxPrev}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gray-800/90 text-white hover:bg-gray-700 flex items-center justify-center z-10 transition-colors"
                      onClick={handleLightboxNext}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                <motion.img
                  key={lightboxIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  src={displayImages[lightboxIndex]}
                  alt={`${selectedCollection.name} ${selectedFinish.name} - ${lightboxIndex + 1} of ${displayImages.length}`}
                  className="select-none rounded block"
                  draggable={false}
                  style={{
                    maxWidth: "min(100vw - 2rem, 1800px)",
                    width: "auto",
                    height: "auto",
                    maxHeight: "none",
                  }}
                />

                {displayImages.length > 1 && (
                  <div className="text-center text-gray-500 font-medium text-sm mt-2">
                    {lightboxIndex + 1} / {displayImages.length}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
    )}
    </>
  );
}
