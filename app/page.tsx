import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Stats from "@/components/Stats";
import Academics from "@/components/Academics";
import CampusLife from "@/components/CampusLife";
import Testimonial from "@/components/Testimonial";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased">
      <Navbar />
      <Hero />
      <About />
      <Stats />
      <Academics />
      <CampusLife />
      <Testimonial />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}
