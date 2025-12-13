import { Link } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Kitchens", href: "#kitchens" },
    { name: "Bathrooms", href: "#bathrooms" },
    { name: "Outdoors", href: "#outdoors" },
    { name: "About", href: "#about" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-4"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <a className="flex items-center gap-2 group">
            <div className="bg-primary text-white p-2 rounded-sm font-bold text-xl tracking-tighter group-hover:bg-primary/90 transition-colors">
              CS
            </div>
            <div className={cn("flex flex-col leading-none", isScrolled ? "text-foreground" : "text-white")}>
              <span className="font-heading font-bold text-lg uppercase tracking-wide">Cabinet</span>
              <span className="font-heading font-light text-sm uppercase tracking-widest">Source</span>
            </div>
          </a>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-medium uppercase tracking-wide hover:text-primary transition-colors",
                isScrolled ? "text-gray-700" : "text-white/90 hover:text-white"
              )}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Button className="hidden md:flex bg-primary hover:bg-primary/90 text-white rounded-full px-6">
            Get a Free Layout
          </Button>
          
          <button
            className={cn("md:hidden", isScrolled ? "text-foreground" : "text-white")}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-t border-gray-100 p-4 md:hidden shadow-xl animate-in slide-in-from-top-5">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-lg font-medium text-gray-800 py-2 border-b border-gray-50 hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <Button className="w-full mt-4">Get a Free Layout</Button>
          </div>
        </div>
      )}
    </nav>
  );
}
