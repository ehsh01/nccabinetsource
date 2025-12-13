import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import logoImg from "@assets/image_1765650186926.png";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img 
                src={logoImg} 
                alt="Cabinet Source" 
                className="h-12 w-auto object-contain" 
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Manufacturing, selling, and installing high-quality cabinetry for over 25 years. 
              We bring your dream kitchen, bathroom, and outdoor spaces to life.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-6 text-primary">Explore</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#kitchens" className="hover:text-white transition-colors">Kitchen Cabinets</a></li>
              <li><a href="#bathrooms" className="hover:text-white transition-colors">Bathroom Vanities</a></li>
              <li><a href="#outdoors" className="hover:text-white transition-colors">Outdoor Kitchens</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#testimonials" className="hover:text-white transition-colors">Reviews</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-6 text-primary">Contact Us</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>(828) 123-4567</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>sales@nccabinetsource.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>Serving North Carolina<br/>Hickory, Newton, Mars Hill & surrounding areas</span>
              </li>
            </ul>
          </div>

          {/* Social / Hours */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-6 text-primary">Stay Connected</h4>
            <div className="flex gap-4 mb-6">
              <a href="https://www.facebook.com/daymiandpaulo" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 rounded-full hover:bg-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/cabinet_source_nc/" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 rounded-full hover:bg-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
            <div className="text-gray-400 text-sm">
              <p>Mon - Fri: 8:00 AM - 5:00 PM</p>
              <p>Sat: By Appointment</p>
              <p>Sun: Closed</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} NC Cabinet Source. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
