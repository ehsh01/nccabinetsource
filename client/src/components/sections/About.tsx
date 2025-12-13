import { Crown, Heart, Lightbulb, Ruler, Users, Zap } from "lucide-react";

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
