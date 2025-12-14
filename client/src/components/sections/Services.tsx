import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import bathBg from "@assets/generated_images/modern_luxury_bathroom_vanity.png";
import outdoorBg from "@assets/generated_images/outdoor_kitchen_with_cabinets.png";
import kitchenBg from "@assets/generated_images/modern_luxury_kitchen_interior.png"; // Reusing for consistency, or ideally a different kitchen shot

interface ServiceSectionProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  image: string;
  reversed?: boolean;
}

function ServiceSection({ id, title, subtitle, description, features, image, reversed }: ServiceSectionProps) {
  return (
    <section id={id} className="py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className={`flex flex-col ${reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16`}>
          {/* Image Side */}
          <motion.div 
            className="w-full lg:w-1/2 relative"
            initial={{ opacity: 0, x: reversed ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group">
              <img 
                src={image} 
                alt={title} 
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
            </div>
            {/* Decorative Element */}
            <div className={`absolute -bottom-8 ${reversed ? '-right-8' : '-left-8'} w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10`} />
          </motion.div>

          {/* Content Side */}
          <div className="w-full lg:w-1/2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">{subtitle}</span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6 leading-tight">{title}</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {description}
              </p>

              <ul className="space-y-4 mb-10">
                {features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="bg-primary/10 p-1 rounded-full text-primary mt-1">
                      <Check className="w-4 h-4" />
                    </div>
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className="group bg-slate-900 text-white hover:bg-slate-800 rounded-full px-8 py-6"
                onClick={() => {
                  const element = document.querySelector("#contact");
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Explore Options
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <div className="bg-white">
      <ServiceSection 
        id="kitchens"
        subtitle="The Heart of the Home"
        title="Cabinets for Your Kitchen"
        description="High Quality, All wood cabinets with Fast Delivery Times, Free Layouts, and Superior Customer Service. We offer industry leading 3/4' box frame boxes at prices you can afford."
        features={[
          "Quality Solid Maple Doors",
          "Industry leading 3/4\" box frame boxes",
          "Free Layouts & Design Consulting",
          "Fast Delivery Times"
        ]}
        image={kitchenBg}
      />
      
      <ServiceSection 
        id="bathrooms"
        reversed
        subtitle="Serenity & Style"
        title="For Your Bathrooms"
        description="Transform your bathroom into a personal spa. Our cabinets combine durability with elegant design to maximize storage and style in any space."
        features={[
          "Custom fit for any vanity size",
          "Moisture resistant finishes",
          "Elegant hardware options",
          "Soft-close doors and drawers"
        ]}
        image={bathBg}
      />

      <ServiceSection 
        id="outdoors"
        subtitle="Alfresco Living"
        title="For Your Outdoors"
        description="Quality Outdoor Kitchen Cabinets fabricated out of HDPE (High Density Polyethylene). MADE IN USA. 100% Waterproof cabinets are made from Marine Grade Polymer Plastics."
        features={[
          "100% Waterproof HDPE Material",
          "Marine Grade Polymer Plastics",
          "Made in USA",
          "Weather & UV Resistant"
        ]}
        image={outdoorBg}
      />
    </div>
  );
}
