import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import VisionSection from "@/components/VisionSection";
import BuildingSection from "@/components/BuildingSection";
import WhySection from "@/components/WhySection";
import Footer from "@/components/Footer";
import EventDetailModal from "@/components/EventDetailModal";
import type { EventModalData } from "@/components/EventDetailModal";

const Index = () => {
  const [selectedEvent, setSelectedEvent] = useState<EventModalData | null>(null);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* ✅ Pass the function */}
      <HeroSection onLearnMore={(modal) => setSelectedEvent(modal)} />

      <VisionSection />
      <BuildingSection />
      <WhySection />
      
      <Footer />

      {/* ✅ Modal lives here */}
      <EventDetailModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </div>
  );
};

export default Index;