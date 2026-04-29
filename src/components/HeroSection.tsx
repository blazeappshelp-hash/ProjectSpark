import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { EventModalData } from "./EventDetailModal";

type HeroSlide = {
  id: number;
  title: string;
  subtitle: string;
  date: string;
  tagline: string;
  background: string;
  type: string;
  modal: EventModalData;
};

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    title: "Leadership",
    subtitle: "Conclave",
    date: "February 20, 2026",
    tagline:
      "India's path to autonomous leadership starts here. Solving real-world problems at scale.",
    background: "/leadershipconclave.png",
    type: "Offline",
    modal: {
      title: "Leo Leadership Conclave",
      date: "February 20, 2026",
      status: "Completed",
      description: "Spark's flagship offline leadership event focused on leadership, communication, and social impact. Conducted in partnership with Sairam Institute of Technology and Sairam Engineering College, where Spark served as Executive Partner.",
    },
  },
  {
    id: 2,
    title: "Vels Global",
    subtitle: "Education",
    date: "December 23, 2024",
    tagline:
      "Building structured MUN participation frameworks for the next generation of leaders.",
    background: "/velsglobal.png",
    type: "Offline",
    modal: {
      title: "Vels Global School Event",
      date: "December 23, 2024",
      status: "Completed",
      description: "Spark conducted an offline event at Vels Global School, focusing on preparing students for structured communication platforms like MUNs. Multiple training workshops were conducted beforehand to build confidenc",
    },
  },
  {
    id: 3,
    title: "Global Discom",
    subtitle: "Network",
    date: "2025",
    tagline:
      "Connecting 300+ delegates across 15+ countries through autonomous infrastructure.",
    background: "/globaldiscom.png",
    type: "Online",
    modal: {
      title: "Global DISCOM Series",
      date: "2025",
      status: "Completed",
      description: "After SPRMUN 1.0, Spark scaled globally by hosting multiple DISCOMs and MUNs through platforms like MyMUN, expanding participation across continents. Delegates joined from 16+ countries.",
    },
  },
];

export default function HeroSection({
  onLearnMore,
}: {
  onLearnMore: (modal: EventModalData) => void;
}) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = HERO_SLIDES.length;

  // 🔥 seamless loop
  const extendedSlides = [...HERO_SLIDES, HERO_SLIDES[0]];
  const slide = extendedSlides[current];

  // ✅ auto-slide
  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setCurrent((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [paused]);

  // ✅ reset loop
  useEffect(() => {
    if (current === total) {
      const timeout = setTimeout(() => {
        setCurrent(0);
      }, 600);

      return () => clearTimeout(timeout);
    }
  }, [current, total]);

  const prev = () =>
    setCurrent((c) => (c - 1 < 0 ? total - 1 : c - 1));

  const next = () =>
    setCurrent((c) => (c + 1) % total);

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center px-4 sm:px-6 py-10 md:py-12 bg-black"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(0,102,255,0.08),transparent_60%)]" />

      <div className="relative z-10 grid w-full max-w-7xl grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        
        {/* LEFT PANEL */}
        <div className="rounded-3xl bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl border border-white/10 p-6 md:p-12 flex flex-col justify-between">
          <div>
            <motion.span
              key={`tag-${slide.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[10px] tracking-[0.4em] font-bold text-blue-500 uppercase"
            >
              Spark | {slide.type}
            </motion.span>

            <motion.h1
              key={`title-${slide.id}`}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="mt-6 text-5xl md:text-7xl font-black text-white leading-[0.85] tracking-tighter uppercase"
            >
              {slide.title} <br />
              <span className="bg-gradient-to-b from-blue-400 to-blue-700 bg-clip-text text-transparent">
                {slide.subtitle}
              </span>
            </motion.h1>

            <p className="mt-4 text-blue-200/40 font-mono text-xs uppercase tracking-[0.2em]">
              {slide.date}
            </p>

            <p className="mt-6 text-gray-400 max-w-md text-lg leading-relaxed">
              {slide.tagline}
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <button
                onClick={() => onLearnMore(slide.modal)}
                className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-500 transition-all rounded-full text-white font-bold uppercase text-[10px] tracking-widest shadow-[0_0_20px_rgba(37,99,235,0.3)]"
              >
                View Details <ArrowRight size={14} />
              </button>

              <Link
                to="/events"
                className="px-8 py-3 rounded-full border border-white/20 text-white font-bold uppercase text-[10px] tracking-widest hover:bg-white hover:text-black transition-all"
              >
                Explore Vision
              </Link>
            </div>
          </div>

          {/* CONTROLS */}
          <div className="flex items-center gap-4 mt-10">
            <button onClick={prev} className="p-3 bg-white/5 hover:bg-blue-600/20 border border-white/10 rounded-full">
              <ChevronLeft className="text-white" size={20} />
            </button>

            <div className="flex gap-2">
              {HERO_SLIDES.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    current % total === i ? "w-8 bg-blue-600" : "w-2 bg-white/10"
                  }`}
                />
              ))}
            </div>

            <button onClick={next} className="p-3 bg-white/5 hover:bg-blue-600/20 border border-white/10 rounded-full">
              <ChevronRight className="text-white" size={20} />
            </button>
          </div>
        </div>

        {/* RIGHT PANEL */}
<motion.div 
  layout // This allows the box to animate its size change
  className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl h-fit self-center"
>
  <AnimatePresence mode="wait">
    <motion.div
      key={current}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="w-full h-full"
    >
      {/* Using <img> instead of <iframe> is crucial for "auto resolution". 
         The 'block w-full' ensures it fills the container width-wise, 
         and 'h-auto' ensures the height follows the image's aspect ratio.
      */}
      <img
        src={slide.background}
        alt={slide.title}
        className="w-full h-auto block grayscale-[0.2] contrast-[1.1]"
      />
    </motion.div>
  </AnimatePresence>

  {/* Overlays */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

  <div className="absolute bottom-8 left-8 right-8">
    <div className="inline-block px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/20 mb-3">
      <span className="text-[10px] font-bold text-blue-400 uppercase">
        Vision.exe // Active
      </span>
    </div>

    <h2 className="text-2xl font-bold text-white uppercase">
      {slide.title}{" "}
      <span className="text-blue-500">{slide.subtitle}</span>
    </h2>
  </div>
</motion.div>
      </div>
    </section>
  );
}
