import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";
import { Catalog } from "@/components/sections/Catalog";
import { Gallery } from "@/components/sections/Gallery";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { Helmet } from "react-helmet-async";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>NC Cabinet Source | Kitchen, Bath & Outdoor Cabinets</title>
        <meta name="description" content="Quality Solid Maple Doors, industry leading 3/4 box frame boxes. High Quality, All wood cabinets with Fast Delivery Times." />
      </Helmet>
      
      <main className="min-h-screen font-sans">
        <Navbar />
        <Hero />
        <Services />
        <Catalog />
        <Gallery />
        <About />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
