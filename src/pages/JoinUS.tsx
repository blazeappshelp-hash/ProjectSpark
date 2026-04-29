import { Warp } from "@paper-design/shaders-react";
import {
  Code2,
  Globe,
  GraduationCap,
  Lightbulb,
  Megaphone,
  Mic2,
  PenTool,
  Settings2,
  Users,
  Video,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import type React from "react";
import MagneticButton from "../components/MagneticButton";
import { Boxes } from "../components/ui/background-boxes";
import DotPattern from "../components/ui/dot-pattern-1";
import { GLSLHills } from "../components/ui/glsl-hills";
import SparkFooter from "../components/ui/spark-footer";
import { useTheme } from "../context/ThemeContext";

const NOTION_FORM_URL =
  "https://elegant-crown-783.notion.site/33e5376479958088b8f9db0a975febd0?pvs=105";

function openForm() {
  window.open(NOTION_FORM_URL, "_blank", "noopener,noreferrer");
}

// ─── Constants & Configurations ──────────────────────────────────────────────

interface WhyCard {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const WHY_CARDS: WhyCard[] = [
  {
    title: "Speak & Lead",
    description:
      "Develop public speaking, debate, and leadership skills through real events with real audiences.",
    icon: <Mic2 className="w-10 h-10 text-white" />,
  },
  {
    title: "Global Community",
    description:
      "Connect with students across 15+ countries, build lasting friendships, and gain international exposure.",
    icon: <Globe className="w-10 h-10 text-white" />,
  },
  {
    title: "Real Impact",
    description:
      "Drive change — from raising funds for child cancer to shaping public discourse on important issues.",
    icon: <Zap className="w-10 h-10 text-white" />,
  },
  {
    title: "Grow Together",
    description:
      "Whether you're a first-time speaker or a seasoned debater, Spark mentors and grows every member.",
    icon: <Users className="w-10 h-10 text-white" />,
  },
];

const WHY_SHADER_CONFIGS = [
  {
    proportion: 0.32,
    softness: 0.9,
    distortion: 0.16,
    swirl: 0.7,
    swirlIterations: 10,
    shape: "checks" as const,
    shapeScale: 0.09,
    colors: [
      "hsl(260, 100%, 28%)",
      "hsl(290, 100%, 58%)",
      "hsl(310, 90%, 38%)",
      "hsl(275, 100%, 68%)",
    ],
  },
  {
    proportion: 0.38,
    softness: 1.1,
    distortion: 0.19,
    swirl: 0.85,
    swirlIterations: 12,
    shape: "stripes" as const,
    shapeScale: 0.11,
    colors: [
      "hsl(175, 100%, 22%)",
      "hsl(185, 100%, 58%)",
      "hsl(155, 90%, 32%)",
      "hsl(180, 100%, 70%)",
    ],
  },
  {
    proportion: 0.42,
    softness: 0.95,
    distortion: 0.2,
    swirl: 0.75,
    swirlIterations: 9,
    shape: "checks" as const,
    shapeScale: 0.1,
    colors: [
      "hsl(30, 100%, 33%)",
      "hsl(48, 100%, 62%)",
      "hsl(38, 90%, 40%)",
      "hsl(43, 100%, 74%)",
    ],
  },
  {
    proportion: 0.35,
    softness: 1.0,
    distortion: 0.17,
    swirl: 0.8,
    swirlIterations: 11,
    shape: "stripes" as const,
    shapeScale: 0.08,
    colors: [
      "hsl(215, 100%, 28%)",
      "hsl(200, 100%, 60%)",
      "hsl(230, 90%, 35%)",
      "hsl(210, 100%, 72%)",
    ],
  },
];

const WHO_CARDS = [
  {
    title: "Delegates & Speakers",
    description: "Students who want to debate, discuss, and participate in events — from local workshops to international MUNs.",
    icon: Megaphone,
    accentColor: "bg-blue-600",
    borderColor: "border-blue-600/30",
  },
  {
    title: "Event Organizers",
    description: "Students with a flair for planning, coordination, and running high-energy events.",
    icon: GraduationCap,
    accentColor: "bg-blue-800",
    borderColor: "border-blue-800/30",
  },
  {
    title: "Core Team Members",
    description: "Students ready to take on leadership roles within the organization and shape Spark's direction.",
    icon: Lightbulb,
    accentColor: "bg-blue-400",
    borderColor: "border-blue-400/30",
  },
  {
    title: "Technical & Creative",
    description: "Video editors, developers, designers, and creators are welcome to join Spark.",
    icon: Code2,
    accentColor: "bg-blue-500",
    borderColor: "border-blue-500/30",
  },
];

const STATS = [
  { value: "15+", label: "Events" },
  { value: "300+", label: "Delegates" },
  { value: "15+", label: "Countries" },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function JoinUs() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div
      className="relative min-h-screen bg-[#000000] overflow-x-hidden text-white"
      data-ocid="join.page"
    >
      {/* Background Hills tuned for high-contrast dark mode */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        <GLSLHills
          width="100%"
          height="100%"
          cameraZ={125}
          speed={0.3}
          grayLevel={0.05} 
        />
      </div>

      {/* ── Hero Section ──────────────────────────────────────────────────────── */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 py-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            Applications Open
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-bricolage font-extrabold text-6xl md:text-8xl tracking-tighter leading-[0.95] mb-6"
          >
            Join the{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(to bottom, #FFFFFF 40%, #3b82f6 100%)",
              }}
            >
              Movement
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Spark is more than a platform, it's a community of students who dare to speak, debate, lead, and create real impact.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center"
          >
            <MagneticButton onClick={openForm}>
              <span className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-[#0070f3] text-white text-sm font-bold hover:bg-[#0060df] transition-all shadow-[0_0_20px_rgba(0,112,243,0.4)] cursor-pointer">
                Apply Now
                <Zap size={16} fill="currentColor" />
              </span>
            </MagneticButton>

            <button
              type="button"
              onClick={() => scrollToSection("why-spark")}
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full border border-white/10 text-white text-sm font-semibold hover:bg-white/5 transition-colors"
            >
              Learn More
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── About Section ─────────────────────────────────────────────── */}
      <section id="why-spark" className="relative z-10 py-28 px-4 bg-black/40 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-500 mb-4">About Spark</p>
          <h2 className="font-bricolage font-bold text-4xl md:text-5xl tracking-tighter mb-10">What is Spark?</h2>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-16">
            Spark is a student led events organizing organization. We are not just a MUN club, not just a debate society, and not locked into any single format. We solve the complaints students actually voice by designing accessible, multi-dimensional, experiential platforms that prioritize growth over performance and inclusion over exclusion.
            </p>

          <div className="grid grid-cols-3 gap-4 md:gap-8">
            {STATS.map((s, i) => (
              <div key={i} className="text-center p-8 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md">
                <div className="font-bricolage font-extrabold text-3xl md:text-4xl text-blue-500">{s.value}</div>
                <div className="text-[10px] uppercase tracking-widest text-gray-500 mt-2">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Join Section (Shader Cards) ──────────────────────────────────── */}
      <section
        className="relative z-10 px-4 py-28"
        data-ocid="join.why_join.section"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16 text-center"
          >
            <p className="mb-4 text-xs font-semibold tracking-widest uppercase text-muted-foreground">
              The Spark Advantage
            </p>
            <h2 className="mb-4 text-4xl font-bold tracking-tighter font-bricolage md:text-5xl text-foreground">
              Why Join Spark?
            </h2>
            <p className="max-w-xl mx-auto text-lg text-muted-foreground">
              More than events, a launchpad for leaders, speakers, and
              changemakers.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {WHY_CARDS.map((card, index) => {
              const cfg = WHY_SHADER_CONFIGS[index];
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative min-h-[22rem]"
                  data-ocid={`join.why_card.${index + 1}`}
                >
                  <div className="absolute inset-0 overflow-hidden rounded-3xl">
                    <Warp
                      style={{ height: "100%", width: "100%" }}
                      proportion={cfg.proportion}
                      softness={cfg.softness}
                      distortion={cfg.distortion}
                      swirl={cfg.swirl}
                      swirlIterations={cfg.swirlIterations}
                      shape={cfg.shape}
                      shapeScale={cfg.shapeScale}
                      scale={1}
                      rotation={0}
                      speed={0.7}
                      colors={cfg.colors}
                    />
                  </div>
                  <div className="relative z-10 flex flex-col h-full p-8 border rounded-3xl bg-black/80 border-white/20">
                    <div className="mb-5 filter drop-shadow-lg">
                      {card.icon}
                    </div>
                    <h3 className="mb-3 text-xl font-bold leading-snug text-white">
                      {card.title}
                    </h3>
                    <p className="flex-grow text-sm font-medium leading-relaxed text-gray-100">
                      {card.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Who Should Apply ──────────────────────────────────────────── */}
      <section className="relative z-10 py-28 px-4 bg-black/40 border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-bricolage font-bold text-4xl md:text-5xl tracking-tighter">Who Should Apply?</h2>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
                  
            </p>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
              We welcome students who are passionate about communication,
              leadership, and making a difference.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHO_CARDS.map((card, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className={`relative group rounded-3xl bg-[#030712] border ${card.borderColor} p-8 overflow-hidden`}
              >
                <DotPattern width={5} height={5} className="fill-white/[0.03]" />
                <div className={`absolute top-0 left-0 w-1 h-full ${card.accentColor}`} />
                <card.icon size={22} className="text-blue-500 mb-5" />
                <h3 className="font-bold text-xl mb-3">{card.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
        {/* Role pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <p className="mb-5 text-xs font-semibold tracking-widest uppercase text-muted-foreground">
              Skills & Roles We Welcome
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { label: "Video Editor", icon: Video },
                { label: "Web Developer", icon: Code2 },
                { label: "Automation Specialist", icon: Settings2 },
                { label: "Graphic Designer", icon: PenTool },
                { label: "Content Creator", icon: PenTool },
                { label: "Public Speaker", icon: Mic2 },
                { label: "Event Planner", icon: GraduationCap },
                { label: "Any Creative Skill", icon: Lightbulb },
              ].map((role) => (
                <span
                  key={role.label}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors border rounded-pill border-border bg-background/70 backdrop-blur-sm text-foreground/80 hover:border-accent/50 hover:text-foreground"
                >
                  <role.icon
                    size={13}
                    strokeWidth={1.5}
                    className="text-accent"
                  />
                  {role.label}
                </span>
              ))}
            </div>
          </motion.div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────── */}
      <section className="relative z-10 py-32 px-4 bg-black">
  <div className="max-w-3xl mx-auto">
    <div className="relative overflow-hidden bg-[#050505] border border-white/10 rounded-[2.5rem] px-10 py-24 text-center shadow-[0_0_60px_rgba(37,99,235,0.07)]">
      
      {/* Background Boxes - ensure container is relative/overflow-hidden */}
      <Boxes />

      {/* Radial Mask to focus light in the center, matching the 'Intelligence' text depth */}
      <div className="absolute inset-0 w-full h-full bg-black z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <div className="relative z-30">
        {/* Heading: Gradient matches the SalvaZer 'Intelligence' blue-to-white feel */}
        <h2 className="font-bricolage font-extrabold text-5xl md:text-7xl tracking-tighter mb-10 bg-gradient-to-b from-white via-white to-white/30 bg-clip-text text-transparent leading-tight">
          Ready to Scale?
        </h2>

        {/* Button: Switched to SalvaZer Electric Blue with a distinct glow */}
        <MagneticButton onClick={openForm}>
          <span className="inline-flex items-center gap-2 px-14 py-5 rounded-full bg-[#2563EB] text-white text-sm font-black tracking-[0.15em] uppercase hover:bg-blue-500 transition-all cursor-pointer shadow-[0_0_30px_rgba(37,99,235,0.45)] active:scale-95">
            Join Early Access
          </span>
        </MagneticButton>

        {/* Subtle detail: Small caption matching the 'Vision.exe' style */}
        <p className="mt-8 text-[10px] uppercase tracking-[0.3em] text-zinc-600 font-bold">
          Autonomy / Scale / Impact
        </p>
      </div>
    </div>
  </div>
</section>

      <SparkFooter />
    </div>
  );
}