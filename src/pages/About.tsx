import SparkFooter from "@/components/ui/spark-footer";
import { ArrowRight, Mail, Phone, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { InteractiveTravelCard } from "../components/ui/3d-card";
import { BreakableCard } from "../components/ui/kinetic-shatter-box-section";
import { GlowCard } from "../components/ui/spotlight-card";
import { Link } from "react-router-dom";

// ── Count-Up Hook ─────────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1.5) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStarted(true);
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let startTime = 0;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);

  return { count, ref };
}

function ImpactStatCounter({
  value,
  label,
  index,
}: {
  value: string;
  label: string;
  index: number;
}) {
  const match = value.match(/^([₹]?)(\d[\d,]*)([+%]?)$/);
  const isNumeric = !!match;
  const numericTarget = isNumeric
    ? Number.parseInt(match[2].replace(/,/g, ""), 10)
    : 0;
  const prefix = isNumeric ? match[1] : "";
  const suffix = isNumeric ? match[3] : "";

  const { count, ref } = useCountUp(numericTarget, 1.5);

  const displayValue = isNumeric
    ? `${prefix}${count.toLocaleString()}${suffix}`
    : value;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:border-blue-500/50 transition-all duration-500"
    >
      <div className="font-bricolage font-extrabold text-4xl text-white tracking-tighter mb-1">
        {displayValue}
      </div>
      <div className="text-xs uppercase tracking-widest text-white/50">{label}</div>
    </motion.div>
  );
}

const VALUES = [
  {
    title: "Vision",
    description: "By 2030, a student from a school with no expression platform will speak publicly with the same confidence as a student from an elite private school.",
    glowColor: "blue" as const,
  },
  {
    title: "Mission",
    description: "Eliminating fear-based silence through Club-in-a-Box digital toolkits and seed grants.",
    glowColor: "blue" as const,
  },
  {
    title: "Real Impact",
    description: "Beyond events, we raise funds for social causes and build a generation of confident leaders.",
    glowColor: "blue" as const,
  },
  {
    title: "Community",
    description: "A movement of driven minds united by purpose, curiosity, and a passion for impact.",
    glowColor: "blue" as const,
  },
];

const IMPACT_STATS = [
  { value: "300+", label: "Global Delegates" },
  { value: "15+", label: "Events Hosted" },
  { value: "15+", label: "Countries Represented" },
  { value: "5+", label: "Institutional Events" },
  { value: "100+", label: "Offline Participants" },
  { value: "₹25,000+", label: "Raised" },
];

const FOUNDING_TEAM = [
  { id: "1", title: "Hashwin Madhav G S", subtitle: "Co-founder and CEO", imageUrl: "/public/vels_global_haswin_photo-019d6e87-dfc6-704f-9140-70922ec1ccfe.jpeg", href: "https://www.linkedin.com/in/hashwings/", socialType: "linkedin" as const, bio: "Co founder and CEO at Spark. An experienced debater with strong leadership skills, he drives Spark's vision and manages local outreach initiatives in Chennai, building meaningful connections and communities." },
  { id: "2", title: "Adithya K", subtitle: "Co-founder and Tech Lead", imageUrl: "/public/aditya.png", href: "https://www.linkedin.com/in/adithya---k/", socialType: "linkedin" as const, bio: "Co founder and Tech Lead at Spark. He leads the technical backbone of the organization, building systems, automations, and scalable solutions that power Spark's operations and growth." },
  { id: "3", title: "T S Vedha Narayanan", subtitle: "Co-founder, Head of Internal Affairs", imageUrl: "/public/tsvedh.png", href: "https://www.linkedin.com/in/t-s-vedhanarayanan/", socialType: "linkedin" as const, bio: "Co founder and Head of Internal Affairs at Spark. He manages the team and oversees internal operations, ensuring smooth coordination and well structured documentation across the organization" },
  { id: "4", title: "Jigisha Madhan", subtitle: "Creative Strategist", imageUrl: "/public/jigisha.png", href: "https://www.linkedin.com/in/jigisha-madhan/", socialType: "linkedin" as const, bio: "Creative Strategist at Spark. An experienced debater and member of VME's editorial team, she combines creativity with communication and is an active Rotary Interact Club member." },
  { id: "5", title: "Sudharshan", subtitle: "Editor", imageUrl: "/public/sudharshan.png", href: "https://www.instagram.com/zenmotion_deep/", socialType: "instagram" as const, bio: "Editor at Spark. A results driven creator whose work has reached close to 100K views, known for impactful editing and visual storytelling." },
  { id: "6", title: "Dheena Dhayalan", subtitle: "Madurai Lead", imageUrl: "/public/dheena.png", href: "https://www.linkedin.com/in/dheena-dhayalan-b694b2395/", socialType: "linkedin" as const, bio: "Madurai Lead at Spark. Focused on growth and execution, he builds leverage, stacks skills, and delivers results while consistently pushing towards a bigger vision." },
];

const PARTNERS = ["Dr Nalli Kuppuswami Vivekananda Vidyalaya", "Vels Global School", "Sairam Institutions", "Sairam Engineering College", "Sairam Vidyalaya"];

const WHATS_NEXT = [
  { title: "Ideathons & Hackathons", desc: "Innovation challenges for student problem-solvers" },
  { title: "Global Events", desc: "Multi-country conferences with hundreds of delegates" },
  { title: "Event Management", desc: "End-to-end tools for student-led event organizers" },
  { title: "Collaboration", desc: "Platforms connecting students across disciplines" },
];

function TeamSection() {
  const [spotPos, setSpotPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: ReactMouseEvent<HTMLElement>) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotPos({ x, y });
  }, []);

  return (
    <section
      className="mb-20 border border-white/5 rounded-3xl p-8 md:p-10 relative overflow-hidden transition-all duration-500 bg-black"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: isHovered
          ? `radial-gradient(circle at ${spotPos.x}% ${spotPos.y}%, rgba(37,99,235,0.15) 0%, transparent 60%), #000`
          : "#000",
      }}
    >
      <motion.h2 className="font-bricolage font-extrabold text-6xl tracking-tighter text-white text-center mb-12">
        Founding Team
      </motion.h2>
      <div style={{ perspective: "1200px" }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {FOUNDING_TEAM.map((member, i) => (
          <motion.div key={member.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex justify-center">
            <InteractiveTravelCard {...member} className="w-full max-w-[300px] h-[420px] bg-black border-white/10" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default function About() {
  return (
    <div className="relative min-h-screen bg-black text-white" data-ocid="about.page">
      
      

      <main className="relative z-10 pt-28 pb-24 px-4 md:px-8 w-full max-w-7xl mx-auto">
        <div className="w-full">
          {/* Hero Section styled like SalvaZer */}
          <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-24">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] uppercase tracking-[0.2em] font-bold mb-8">
              <Zap size={10} />
              Est. 2024 • Student-Led · Global
            </div>
            <h1 className="font-bricolage font-extrabold text-6xl lg:text-8xl tracking-tighter mb-8 leading-[0.9]">
              <span className="text-white block">About Spark</span>
              <span className="bg-gradient-to-b from-white via-blue-400 to-blue-600 bg-clip-text text-transparent"></span>
            </h1>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
              Spark is a student-led communication and event platform focused on making elite communication accessible to every student.
              <span className="text-white font-medium"> We believe ideas don't fail because they are weak, they fail because people are afraid to express them.</span>
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <Link to="/joinus">
                <button className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold transition-all text-sm uppercase tracking-wider">
                  Join Early Access
                </button>
              </Link>
              <button
  onClick={() => {
    window.scrollBy({
      top: window.innerHeight / 2,
      behavior: "smooth",
    });
  }}
  className="px-8 py-3 bg-transparent border border-white/20 hover:border-white/50 text-white rounded-full font-bold transition-all text-sm uppercase tracking-wider"
>
  Explore Vision
</button>


            </div>
          </motion.section>

          {/* Mission Statement (Dark Theme) */}
          <motion.section className="bg-white rounded-[2rem] px-10 py-16 mb-24 text-center">
            <p className="font-bricolage font-bold text-3xl md:text-4xl tracking-tight text-black leading-[1.1] max-w-3xl mx-auto">
              “Our goal is to build a self-sustaining network of 100 Spark-powered clubs in under-resourced schools by 2030, enabling 1,000 first-time speakers.”
            </p>
            <div className="h-px w-20 bg-black/10 mx-auto my-8" />
            <p className="text-black text-sm uppercase tracking-widest font-bold">Spark Founding Team</p>
            <p className="text-gray-500 text-sm tracking-widest max-w-xl mx-auto">
                We focus on permanent clubs because one-time events change nothing. 
                70% of clubs continue independently after our first-year backing.
                </p>
          </motion.section>

          {/* Values (Spotlight Style) */}
          <section className="mb-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((value, i) => (
              <GlowCard key={value.title} glowColor="blue" className="bg-black/50 border-white/5">
                <div className="p-8">
                  <h3 className="text-white font-bold text-xl mb-3 tracking-tight">{value.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{value.description}</p>
                </div>
              </GlowCard>
            ))}
          </section>

          {/* Stats (Grid) */}
          <section className="mb-24">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {IMPACT_STATS.map((stat, i) => (
                <ImpactStatCounter key={stat.label} {...stat} index={i} />
              ))}
            </div>
          </section>

          <TeamSection />

          {/* Partners (Glassmorphism tags) */}
          <section className="mb-24 border border-white/5 rounded-3xl p-12 text-center bg-white/[0.02]">
            <h2 className="text-white uppercase tracking-[0.3em] text-[20px] font-bold mb-10">Institutional Events We've Held</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {PARTNERS.map((partner) => (
                <span key={partner} className="bg-white/5 border border-white/10 rounded-full px-5 py-2 text-xs font-semibold text-white/80 hover:bg-white/10 transition-colors">
                  {partner}
                </span>
              ))}
            </div>
          </section>

          {/* Contact (Obsidian Card) */}
          <section className="max-w-2xl mx-auto border border-white/10 bg-gradient-to-b from-white/5 to-transparent rounded-3xl p-12 text-center">
             <h2 className="font-bricolage font-bold text-3xl text-white mb-8 tracking-tighter">Get in Touch</h2>
             <div className="grid gap-6">
                <a href="mailto:spark.team.mun@gmail.com" className="group flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                  <span className="text-white/60 group-hover:text-white transition-colors">spark.team.mun@gmail.com</span>
                  <ArrowRight size={16} className="text-blue-500" />
                </a>
                <a href="mailto:spark.official.spark@gmail.com" className="group flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                  <span className="text-white/60 group-hover:text-white transition-colors">spark.official.spark@gmail.com</span>
                  <ArrowRight size={16} className="text-blue-500" />
                </a>
                <a href="tel:+919884995206" className="group flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                  <span className="text-white/60 group-hover:text-white transition-colors">+91 9884995206</span>
                  <Phone size={16} className="text-blue-500" />
                </a>
                <a href="tel:+918778976349" className="group flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                  <span className="text-white/60 group-hover:text-white transition-colors">+91 8778976349</span>
                  <Phone size={16} className="text-blue-500" />
                </a>
             </div>
          </section>
        </div>
      </main>

      <SparkFooter />
    </div>
  );
}