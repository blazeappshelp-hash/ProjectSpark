import { motion } from "motion/react";
import { Mic2, Globe2, Star, Lightbulb, Users, CalendarDays } from "lucide-react";
import { FeatureCard } from "../components/ui/grid-feature-cards";
import { WavePath } from "../components/ui/wave-path";
import { StaggerTestimonials } from "../components/ui/stagger-testimonials";

// ── COLOR PALETTE MAPPING ──
// Background: #000000 (Pure Black)
// Accent Blue: #0066FF to #3B82F6
// Border/Dashed: rgba(59, 130, 246, 0.2)

const FEATURES = [
  {
    icon: Mic2,
    title: "Public Speaking & Oratory",
    description: "Develop powerful communication skills through structured debates and presentations on global issues.",
  },
  {
    icon: Globe2,
    title: "Model UN Simulations",
    description: "Immersive simulations of UN committees where students represent countries and negotiate challenges.",
  },
  {
    icon: Star,
    title: "Leadership Development",
    description: "Build executive presence and strategic thinking through mentorship and real responsibility.",
  },
  {
    icon: Lightbulb,
    title: "Debate & Critical Thinking",
    description: "Sharpen analytical reasoning and argumentation through competitive debate formats.",
  },
  {
    icon: Users,
    title: "Global Community",
    description: "Connect with driven students across schools worldwide, building a network of future leaders.",
  },
  {
    icon: CalendarDays,
    title: "Event Organization",
    description: "Plan and execute high-stakes conferences, from venue logistics to delegate management.",
  },
];

export default function WhatWeDoSection() {
  return (
    <div className="bg-black text-white selection:bg-blue-500/30">
      {/* ── WHAT WE DO ── */}
      <section className="relative z-10 px-6 py-28 md:px-8">
        <div className="mx-auto space-y-12 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            {/* Blue Subheading Style */}
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-blue-500 mb-4 block">
              Spark | Leadership & Diplomacy
            </span>
            
            {/* Gradient Heading like "Engineering Intelligence" */}
            <h2 className="mb-6 text-5xl md:text-7xl font-bold tracking-tighter font-bricolage leading-none">
              What <br />
              <span className="bg-gradient-to-b from-white via-blue-400 to-blue-600 bg-clip-text text-transparent">
                We Do?
              </span>
            </h2>
            
            <p className="max-w-xl mx-auto text-lg text-zinc-400">
              From global MUNs to local leadership workshops, Spark creates high-intensity environments where students speak, debate, and lead.
            </p>
          </motion.div>

          {/* Grid with SalvaZer's Dashed Style */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 border border-dashed divide-x divide-y divide-dashed border-blue-500/20 sm:grid-cols-2 md:grid-cols-3"
          >
            {FEATURES.map((feature) => (
              <FeatureCard
                key={feature.title}
                feature={feature}
                // Customizing card background to be dark/translucent
                className="bg-zinc-950/50 hover:bg-blue-950/10 transition-colors duration-500"
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── WAVE TRANSITION ── */}
      <section className="relative flex flex-col items-center justify-center py-24 overflow-hidden border-t border-white/5">
        <div className="w-[80vw] flex flex-col items-end mx-auto">
          {/* Blue-tinted Wave */}
          <WavePath className="mb-10 text-blue-500/30" />

          <div className="flex flex-col items-end w-full">
            <div className="flex flex-col md:flex-row justify-end gap-8">
              <p className="mt-2 text-xs font-bold tracking-widest text-blue-500 uppercase">
                FROM SPARK
              </p>

              <p className="w-full md:w-3/4 text-2xl text-zinc-100 md:text-4xl font-light leading-tight">
                Every session, every debate, every moment on stage, our
                  delegates carry these experiences with them <span className="text-blue-400">long after the gavel falls.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="relative z-10 py-24 bg-gradient-to-b from-black to-blue-950/20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="px-4 mb-12 text-center"
        >
          <h2 className="text-4xl font-bold tracking-tighter font-bricolage text-white">
            Community Impact
          </h2>
          <div className="h-1 w-12 bg-blue-600 mx-auto mt-4 rounded-full shadow-[0_0_10px_#2563eb]" />
        </motion.div>

        <StaggerTestimonials />
      </section>
    </div>
  );
}