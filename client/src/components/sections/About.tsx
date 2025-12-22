import { Crown, Heart, Lightbulb, Ruler, Users, Zap } from "lucide-react";
import foundersImg from "@assets/Generated_Image_December_21,_2025_-_7_09PM_1766375055633.jpg";

const features = [
  {
    icon: <Users className="w-6 h-6" />,
    title: "Experience",
    description: "Manufacturing, selling and installing cabinetry for over 25 years. We understand your needs and budget."
  },
  {
    icon: <Crown className="w-6 h-6" />,
    title: "High Quality",
    description: "Using only the best materials like 3/4\" plywood and solid quality maple doors. KCMA Certified."
  },
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: "Creativity",
    description: "Our creative, unique designs will make any kitchen or bathroom look Custom! We can fabricate custom cabinetry if needed."
  },
  {
    icon: <Ruler className="w-6 h-6" />,
    title: "Planning",
    description: "Planning and initial designs are the most essential step. We provide expert layouts to ensure success."
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Consulting",
    description: "Answering questions is always free. Consulting is key to a functioning design that meets expectations."
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Wholesale",
    description: "We consider the needs of professionals and do our best to keep your projects on time and on budget."
  }
];

export function About() {
  return (
    <section id="about" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        {/* Our Story Section */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-24">
          <div className="w-full lg:w-1/2">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img 
                src={foundersImg} 
                alt="Daymi and Paulo - Founders of NC Cabinet Source" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2 space-y-6">
            <span className="text-primary font-bold tracking-wider uppercase text-sm block">About Us</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900">Our Story</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                What began more than 25 years ago in South Florida was built on a simple belief: quality craftsmanship, honesty, and pride in every project matter. From day one, our company focused on delivering beautifully crafted cabinets tailored to each client’s vision, never cutting corners, never compromising on materials, and always treating every home as if it were our own.
              </p>
              <p>
                Over the years, that commitment earned us the trust of homeowners, builders, and designers throughout South Florida. Project after project, our reputation grew, not through advertising, but through word of mouth, long-lasting relationships, and kitchens that stood the test of time.
              </p>
              <p>
                Cabinet making has always been more than a business for us; it’s a passion. It’s the careful selection of materials, the precision in every cut, and the satisfaction of seeing a space transformed into something both functional and beautiful. That passion is what carried us forward for decades, and it’s what inspired our next chapter.
              </p>
              <p>
                Today, we’re proud to bring that same dedication, experience, and craftsmanship to our new Cabinet Source location in Hickory, North Carolina. While our footprint has expanded, our values remain exactly the same. Every cabinet is still designed with care, built with purpose, and finished with pride.
              </p>
              <p className="font-medium text-gray-900 border-l-4 border-primary pl-4 italic">
                "To our new customers in North Carolina: we’re honored to serve you and excited to bring over 25 years of proven craftsmanship, passion, and personal service to your homes. Welcome to Cabinet Source, where experience meets excellence, and every detail matters."
              </p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">Why Choose Us?</h2>
          <p className="text-gray-600 text-lg">
            We only offer Quality Cabinets for all the areas of your home. Here is what sets us apart.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group border border-gray-100"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                {feature.icon}
              </div>
              <h3 className="font-heading font-bold text-xl mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
