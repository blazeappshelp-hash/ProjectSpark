import { motion } from "motion/react";
import { ArrowRight, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import MagneticButton from "./MagneticButton";
import { Boxes } from "../components/ui/background-boxes";

export default function CTASection() {
  return (
    <section className="relative z-10 px-4 py-20 md:px-8 bg-black">
      <div className="max-w-3xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          // Background changed to deep black with a subtle blue outer glow
          className="relative px-10 overflow-hidden text-center bg-[#050505] border border-white/10 rounded-3xl py-14 shadow-[0_0_50px_rgba(37,99,235,0.05)]"
        >
          {/* animated background - keeping boxes but they will render over the dark bg */}
          <Boxes />

          {/* mask overlay - updated slate-900 to black for seamless blending */}
          <div className="absolute inset-0 w-full h-full bg-black z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

          {/* content */}
          <div className="relative z-30 pointer-events-none">

            {/* icon with electric blue glow */}
            <div className="flex items-center justify-center w-14 h-14 mx-auto mb-8 rounded-2xl bg-blue-600/10 border border-blue-500/20 shadow-[0_0_20px_rgba(37,99,235,0.2)]">
              <Zap size={24} strokeWidth={1.5} className="text-[#2563EB]" />
            </div>

            {/* heading with gradient similar to "Engineering Intelligence" */}
            <h2 className="mb-4 text-4xl md:text-5xl font-extrabold tracking-tighter bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent font-bricolage">
              Ready to find your voice?
            </h2>

            {/* subtext in zinc for that "vision.exe" tech feel */}
            <p className="max-w-sm mx-auto mb-10 text-base md:text-lg text-zinc-500 font-medium tracking-tight">
              Join 300+ delegates already debating, leading, and creating
              impact with Spark.
            </p>

            {/* button - switched to electric blue with glow */}
            <div className="inline-block pointer-events-auto">
              <MagneticButton>
                <Link
                  to="/joinus"
                  className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-[#2563EB] text-white text-xs font-bold tracking-[0.1em] uppercase hover:bg-blue-500 transition-all shadow-[0_0_25px_rgba(37,99,235,0.4)] hover:scale-105 active:scale-95"
                >
                  Join the Movement
                  <ArrowRight size={16} />
                </Link>
              </MagneticButton>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}