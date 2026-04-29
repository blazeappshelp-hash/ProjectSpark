import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const IMPACT_STATS = [
  { value: "300+", label: "Global Delegates" },
  { value: "15+", label: "Events Hosted" },
  { value: "15+", label: "Countries" },
  { value: "5+", label: "Institutional Events We've Held" },
  { value: "100+", label: "Offline Participants" },
  { value: "₹25,000+", label: "Raised for Causes" },
];

export default function WhoAreWeSection() {
  return (
    // Background changed to black to match the reference image
    <section className="relative z-10 px-4 py-20 overflow-hidden md:px-8 bg-black text-white">
      <div className="max-w-5xl mx-auto">

        {/* DESKTOP */}
        <div className="hidden md:flex relative items-stretch w-full min-h-[520px]">

          {/* IMAGE */}
<div className="w-[340px] flex-shrink-0 rounded-3xl overflow-hidden border border-white/5 self-stretch">
  <img
    src="/whatwedo.png"
    alt="Spark team"
    className="object-cover w-full h-full transition-all duration-700 ease-out 
               brightness-90 hover:brightness-100 
               scale-100 hover:scale-105"
    style={{ minHeight: "520px" }}
  />
</div>


          {/* CONTENT CARD */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            // Background matches the "Engineering Intelligence" card style (true black/darkest grey)
            className="bg-[#050505] rounded-3xl shadow-[0_0_50px_rgba(37,99,235,0.1)] p-12 ml-[-30px] z-10 flex-1 border border-white/10 flex flex-col justify-center"
          >
            <div className="mb-5">
              {/* Gradient text matching the "Intelligence" part of the image */}
              <h2 className="mb-2 text-4xl font-extrabold tracking-tighter font-bricolage bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                Who Are We
              </h2>
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-blue-500">
                SPARK: Student Communication & Leadership Platform
              </p>
            </div>

            <p className="mb-8 text-base leading-relaxed text-zinc-400 max-w-md">
              Spark is a student led events organizing organization. We are not
              just a MUN club, not just a debate society, and not locked into
              any single format. We solve the complaints students actually voice
              by designing accessible platforms.
            </p>

            {/* IMPACT STATS GRID */}
            <div className="grid grid-cols-3 gap-8 mb-10 border-t border-white/5 pt-8">
              {IMPACT_STATS.map((stat, i) => (
                <div key={i} className="text-left">
                  <div className="text-2xl font-black text-white tracking-tighter">
                    {stat.value}
                  </div>
                  <div className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Button matching "Early Access" style */}
            <a
              href="/about"
              className="inline-flex items-center self-start gap-2 px-8 py-3 text-xs font-bold tracking-widest uppercase transition-all rounded-full bg-[#2563EB] text-white hover:bg-blue-500 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(37,99,235,0.4)]"
            >
              Explore Vision
              <ArrowRight size={14} />
            </a>
          </motion.div>
        </div>

        {/* MOBILE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-6 md:hidden"
        >
          <div className="w-full overflow-hidden border aspect-square rounded-3xl border-white/10">
            <img
              src="/whatwedo.png"
              alt="Spark team"
              className="object-cover w-full h-full"
            />
          </div>

          <div className="bg-[#050505] rounded-3xl p-8 border border-white/10">
            <h2 className="mb-2 text-3xl font-extrabold tracking-tighter text-white">
              Who Are We
            </h2>

            <p className="mb-6 text-[10px] font-bold tracking-widest uppercase text-blue-500">
              SPARK: Student Platform
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              {IMPACT_STATS.slice(0, 4).map((stat, i) => (
                <div key={i}>
                  <div className="text-xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-[9px] uppercase tracking-widest text-zinc-500">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <a
              href="/about"
              className="inline-flex items-center justify-center w-full gap-2 px-5 py-4 rounded-full bg-[#2563EB] text-white text-xs font-bold tracking-widest uppercase"
            >
              Explore Vision
              <ArrowRight size={13} />
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}