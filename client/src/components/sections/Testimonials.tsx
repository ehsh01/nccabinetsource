import { Star } from "lucide-react";

const reviews = [
  {
    name: "Keith and Paula Matlock",
    location: "Newton, NC",
    text: "We got the exact kitchen we wanted. He listened to what we were looking for, added his expert suggestions that we really benefited from, and it came out perfect. The project we were dreading went smooth and outcome turned out great.",
    rating: 5
  },
  {
    name: "Sev and Tina",
    location: "Mars Hill, NC",
    text: "A+ Quality Cabinets and workmanship at fair prices. Reliable. Honest. Responsive.",
    rating: 5
  },
  {
    name: "John Reyes",
    location: "Hickory, NC",
    text: "Quality Outdoor Cabinets. Love my Outdoor Kitchen now. Easy to Maintain and Clean. Great communication left us at ease when order was running late due to supply delays.",
    rating: 5
  }
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 -skew-x-12 translate-x-1/2 -z-0" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">What Our Clients Say</h2>
          <p className="text-gray-600">Don't just take our word for it.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-shadow flex flex-col h-full">
              <div className="flex gap-1 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-gray-700 italic mb-6 flex-grow leading-relaxed">"{review.text}"</p>
              <div className="mt-auto pt-6 border-t border-gray-100">
                <p className="font-heading font-bold text-gray-900">{review.name}</p>
                <p className="text-sm text-gray-500">{review.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
