import { useEffect, useState, useRef } from "react";
// 1. Import the Footer component
import Footer from "@/components/footer";

/**
 * Animated Counter Component
 */
function CountUp({ end, duration = 2000, suffix = "", prefix = "" }) {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const numericEnd = parseInt(end.replace(/[^0-9]/g, ""), 10);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) observer.observe(countRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      setCount(Math.floor(progress * numericEnd));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, numericEnd, duration]);

  return (
    <span ref={countRef}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

export default function CombinedPage() {
  const [activeTab, setActiveTab] = useState("offline");

  useEffect(() => {
    document.body.style.background = "#000000";
    document.body.style.color = "#ffffff";
  }, []);

  return (
    <div className="text-white bg-black font-sans selection:bg-blue-500/30 pt-24 md:pt-28">
      
      {/* ===== SECTION 1: EVENTS ===== */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-16 py-20 relative overflow-hidden">
        
        {/* Ambient background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(37,99,235,0.05)_0%,_transparent_70%)] pointer-events-none" />

        <div className="text-center mb-24 relative z-10">
          <div className="inline-block px-4 py-1.5 border border-blue-500/20 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase text-blue-500 mb-8 bg-blue-500/5">
            <CountUp end="15" suffix="+" /> Events ·{" "}
            <CountUp end="300" suffix="+" /> Delegates ·{" "}
            <CountUp end="15" suffix="+" /> Countries
          </div>

          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter bg-gradient-to-b from-white via-white to-white/20 bg-clip-text text-transparent">
            Our Events
          </h1>

          <p className="text-zinc-500 max-w-2xl mx-auto text-lg font-medium tracking-tight">
            From global online MUNs and DISCOMs to offline leadership workshops across institutions.
          </p>

          {/* ===== TOGGLE SLIDER ===== */}
          <div className="flex justify-center mt-10">
            <div className="relative flex bg-white/5 border border-white/10 rounded-full p-1 w-[260px]">
              
              {/* Sliding Background */}
              <div
                className={`absolute top-1 bottom-1 w-1/2 rounded-full bg-blue-600 transition-all duration-300 ${
                  activeTab === "offline" ? "left-1" : "left-1/2"
                }`}
              />

              {/* Buttons */}
              <button
                onClick={() => setActiveTab("offline")}
                className={`w-1/2 z-10 text-xs font-bold tracking-widest uppercase py-2 transition-colors ${
                  activeTab === "offline" ? "text-white" : "text-zinc-500"
                }`}
              >
                Offline
              </button>

              <button
                onClick={() => setActiveTab("online")}
                className={`w-1/2 z-10 text-xs font-bold tracking-widest uppercase py-2 transition-colors ${
                  activeTab === "online" ? "text-white" : "text-zinc-500"
                }`}
              >
                Online
              </button>
            </div>
          </div>
        </div>

        {/* ===== CONDITIONAL EVENTS ===== */}
        {activeTab === "offline" ? (
          <>
            {/* ===== EVENT 1 ===== */}
            <div className="grid md:grid-cols-3 gap-12 items-center max-w-7xl mx-auto w-full group">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-600/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <img
                  src="/leadershipconclave.png"
                  className="rounded-2xl w-full h-[320px] object-cover transition-all duration-700 border border-white/10 relative z-10"
                  alt="Event 1"
                />
              </div>

              <div className="px-4">
                <div className="flex flex-wrap gap-2 text-[9px] font-bold tracking-widest uppercase mb-6">
                  <span className="border border-white/10 px-3 py-1 rounded-full text-zinc-500">Archived</span>
                  <span className="bg-blue-600/10 text-blue-500 px-3 py-1 rounded-full border border-blue-500/20">Offline</span>
                  <span className="text-zinc-600 py-1">February 20, 2026</span>
                </div>

                <h2 className="text-3xl font-extrabold mb-4 tracking-tight">
                  Leo Leadership Conclave
                </h2>

                <p className="text-zinc-500 mb-8 leading-relaxed">
                  Spark's landmark offline event, 100+ students from multiple institutions came together.
                </p>

                {/* Button */}
<button
  onClick={() => document.getElementById("leoModal").classList.remove("hidden")}
  className="px-4 py-2 bg-blue-600 rounded-lg"
>
  View Event
</button>

{/* Modal (Popup) */}
<div
  id="leoModal"
  className="hidden fixed inset-0 bg-black/70 flex items-center justify-center z-50"
>
  <div className="bg-zinc-900 p-6 rounded-xl max-w-2xl text-white relative">
    
    {/* Close Button */}
    <button
      onClick={() => document.getElementById("leoModal").classList.add("hidden")}
      className="absolute top-2 right-3 text-xl"
    >
      ✕
    </button>

    <h2 className="text-2xl font-bold mb-4">
      Leo Leadership Conclave
    </h2>

    <p className="mb-3">
      The Leo Leadership Conclave was Spark's proudest moment. Held on February 20, 2026, it brought together over 100 students from institutions across Chennai for a full-day event centered on leadership, communication, and social impact.
    </p>

    <p className="mb-3">
      Participants engaged in structured workshops, debate rounds, and collaborative activities — all designed to build the skills that matter beyond academics. The event also featured a fundraising campaign for child cancer awareness and treatment, collectively raising over ₹25,000.
    </p>

    <p className="mb-3">
      The Conclave was a testament to what student-led initiatives can achieve when vision meets execution. It strengthened Spark's ties with partner institutions and set a new benchmark for offline events in our community.
    </p>

    <div className="mt-3">
      <h3 className="font-semibold">Highlights</h3>
      <ul className="list-disc ml-5">
        <li>100+ students from multiple institutions</li>
        <li>₹25,000+ raised for child cancer awareness</li>
        <li>Full-day leadership and debate workshops</li>
        <li>Multi-institution collaboration</li>
      </ul>
    </div>

  </div>
</div>

              </div>

              <div className="space-y-12 text-right">
                <div>
                  <h3 className="text-5xl font-black tracking-tighter text-white">
                    <CountUp end="100" suffix="+" />
                  </h3>
                  <p className="text-blue-500 text-[10px] font-bold uppercase tracking-[0.3em] mt-2">Students</p>
                </div>
                <div>
                  <h3 className="text-5xl font-black tracking-tighter text-white">
                    <CountUp end="25" suffix="k+" prefix="₹" />
                  </h3>
                  <p className="text-blue-500 text-[10px] font-bold uppercase tracking-[0.3em] mt-2">₹ Raised</p>
                </div>
              </div>
            </div>

            {/* ===== EVENT 2 ===== */}
            <div className="grid md:grid-cols-3 gap-12 items-center mt-32 max-w-7xl mx-auto w-full group">
              <div className="px-4 order-2 md:order-1">
                <div className="flex flex-wrap gap-2 text-[9px] font-bold tracking-widest uppercase mb-6">
                  <span className="border border-white/10 px-3 py-1 rounded-full text-zinc-500">Archived</span>
                  <span className="bg-blue-600/10 text-blue-500 px-3 py-1 rounded-full border border-blue-500/20">Offline</span>
                  <span className="text-zinc-600 py-1">Dec 2024</span>
                </div>

                <h2 className="text-3xl font-extrabold mb-4 tracking-tight">
                  Vels Global School
                </h2>

                <p className="text-zinc-500 mb-8 leading-relaxed">
                  A hands-on training event focused on confidence building and debate skills.
                </p>

                {/* Button */}
<button
  onClick={() => document.getElementById("velsModal").classList.remove("hidden")}
  className="px-4 py-2 bg-blue-600 rounded-lg"
>
  View Event
</button>

{/* Modal (Popup) */}
<div
  id="velsModal"
  className="hidden fixed inset-0 bg-black/70 flex items-center justify-center z-50"
>
  <div className="bg-zinc-900 p-6 rounded-xl max-w-2xl text-white relative">
    
    {/* Close Button */}
    <button
      onClick={() => document.getElementById("velsModal").classList.add("hidden")}
      className="absolute top-2 right-3 text-xl"
    >
      ✕
    </button>

    <h2 className="text-2xl font-bold mb-4">
      Vels Global School Event
    </h2>

    <p className="mb-3">
      The Vels Global School event brought Spark's training programs to a new audience just before the year's end. With 40+ students attending, it was our most attended school-level event at that point — and one of the most energetic.
    </p>

    <p className="mb-3">
      Students participated in guided speaking exercises, impromptu debate rounds, and group activities designed to build stage confidence and articulate expression. The workshop format was interactive and encouraging, creating a safe space for students to step outside their comfort zones.
    </p>

    <p className="mb-3">
      The feedback was overwhelmingly positive, with students requesting follow-up sessions — validating Spark's impact at the grassroots level.
    </p>

    <div className="mt-3">
      <h3 className="font-semibold">Highlights</h3>
      <ul className="list-disc ml-5">
        <li>40+ students attended</li>
        <li>Confidence-building exercises and impromptu rounds</li>
        <li>Interactive workshop format</li>
        <li>Students requested follow-up sessions</li>
      </ul>
    </div>

  </div>
</div>

              </div>

              <div className="space-y-12 text-center md:text-right order-3 md:order-2">
                <div>
                  <h3 className="text-5xl font-black tracking-tighter text-white">
                    <CountUp end="40" suffix="+" />
                  </h3>
                  <p className="text-blue-500 text-[10px] font-bold uppercase tracking-[0.3em] mt-2">Students</p>
                </div>
                <div>
                  <h3 className="text-5xl font-black tracking-tighter text-white">
                    <CountUp end="90" suffix="%" />
                  </h3>
                  <p className="text-blue-500 text-[10px] font-bold uppercase tracking-[0.3em] mt-2">Success Rate</p>
                </div>
              </div>

              <div className="relative order-1 md:order-3">
                <div className="absolute inset-0 bg-blue-600/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <img
                  src="/velsglobal.png"
                  className="rounded-2xl w-full h-[320px] object-cover transition-all duration-700 border border-white/10 relative z-10"
                  alt="Event 2"
                />
              </div>
            </div>
          </>
        ) : (
  <>
    {/* ===== ONLINE EVENT 1 ===== */}
    <div className="grid md:grid-cols-3 gap-12 items-center max-w-7xl mx-auto w-full group mt-20">
      
      <div className="relative">
        <div className="absolute inset-0 bg-blue-600/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <img
          src="/spr1.png"
          className="rounded-2xl w-full h-[320px] object-cover border border-white/10 relative z-10"
          alt="SPRMUN"
        />
      </div>

      <div className="px-4">
        <div className="flex flex-wrap gap-2 text-[9px] font-bold tracking-widest uppercase mb-6">
          <span className="border border-white/10 px-3 py-1 rounded-full text-zinc-500">Archived</span>
          <span className="bg-blue-600/10 text-blue-500 px-3 py-1 rounded-full border border-blue-500/20">Online</span>
          <span className="text-zinc-600 py-1">August 15, 2025</span>
        </div>

        <h2 className="text-3xl font-extrabold mb-4 tracking-tight">
          SPRMUN 1.0
        </h2>

        <p className="text-zinc-500 mb-8 leading-relaxed">
          Spark's first Model UN conference, a landmark moment that brought together international delegates for formal committee debate and diplomacy on August 15, 2025.
        </p>

        {/* Button */}
<button
  onClick={() => document.getElementById("sprmunModal").classList.remove("hidden")}
  className="px-8 py-3 bg-white text-black rounded-full text-xs font-black tracking-widest uppercase hover:bg-zinc-200 transition-all"
>
  Read more
</button>

{/* Modal (Popup) */}
<div
  id="sprmunModal"
  className="hidden fixed inset-0 bg-black/70 flex items-center justify-center z-50"
>
  <div className="bg-zinc-900 p-6 rounded-xl max-w-2xl text-white relative">
    
    {/* Close Button */}
    <button
      onClick={() => document.getElementById("sprmunModal").classList.add("hidden")}
      className="absolute top-2 right-3 text-xl"
    >
      ✕
    </button>

    <h2 className="text-2xl font-bold mb-4">
      SPRMUN 1.0
    </h2>

    <p className="mb-3">
      SPRMUN 1.0 was a defining chapter in Spark's journey. Held on India's Independence Day, it symbolized our own independence as an organization, now capable of running a full-scale international Model UN conference.
    </p>

    <p className="mb-3">
      Delegates from multiple countries joined formal committee sessions, debating real-world resolutions with procedural discipline. The event introduced Spark to the global MUN circuit and demonstrated that a student-led organization could deliver a conference of this caliber.
    </p>

    <p className="mb-3">
      Every aspect, from opening ceremonies to resolution drafting, was handled entirely by the Spark team, setting a new standard for student-led MUN events in India.
    </p>

    <div className="mt-3">
      <h3 className="font-semibold">Highlights</h3>
      <ul className="list-disc ml-5">
        <li>First-ever MUN organized by Spark</li>
        <li>International delegates from multiple countries</li>
        <li>Formal committee sessions with diplomatic procedure</li>
        <li>Held on India's Independence Day (August 15)</li>
      </ul>
    </div>

  </div>
</div>

      </div>

      <div className="space-y-12 text-right">
        <div>
          <h3 className="text-5xl font-black tracking-tighter text-white">
            1st
          </h3>
          <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.3em] mt-2">
            Global MUN
          </p>
        </div>
        <div>
          <h3 className="text-5xl font-black tracking-tighter text-white">
            10+
          </h3>
          <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.3em] mt-2">
            Countries
          </p>
        </div>
      </div>
    </div>

    {/* ===== ONLINE EVENT 2 ===== */}
    <div className="grid md:grid-cols-3 gap-12 items-center mt-32 max-w-7xl mx-auto w-full group">
      
      <div className="px-4 order-2 md:order-1">
        <div className="flex flex-wrap gap-2 text-[9px] font-bold tracking-widest uppercase mb-6">
          <span className="border border-white/10 px-3 py-1 rounded-full text-zinc-500">Archived</span>
          <span className="bg-blue-600/10 text-blue-500 px-3 py-1 rounded-full border border-blue-500/20">Online</span>
          <span className="text-zinc-600 py-1">2025</span>
        </div>

        <h2 className="text-3xl font-extrabold mb-4 tracking-tight">
          Global DISCOM & MUN Series
        </h2>

        <p className="text-zinc-500 mb-4">
          300+ Delegates. 15+ Countries. One Platform.
        </p>

        <p className="text-zinc-500 mb-8 leading-relaxed">
          A series of global online events, DISCOMs and MUNs, that collectively brought together 300+ delegates from 15+ countries for cross-cultural dialogue and formal debate.
        </p>

        {/* Button */}
<button
  onClick={() => document.getElementById("sprmunModal").classList.remove("hidden")}
  className="px-8 py-3 bg-white text-black rounded-full text-xs font-black tracking-widest uppercase hover:bg-zinc-200 transition-all"
>
  Read more
</button>

{/* Modal (Popup) */}
<div
  id="sprmunModal"
  className="hidden fixed inset-0 bg-black/70 flex items-center justify-center z-50"
>
  <div className="bg-zinc-900 p-6 rounded-xl max-w-2xl text-white relative">
    
    {/* Close Button */}
    <button
      onClick={() => document.getElementById("sprmunModal").classList.add("hidden")}
      className="absolute top-2 right-3 text-xl"
    >
      ✕
    </button>

    <h2 className="text-2xl font-bold mb-4">
      Global DISCOM & MUN Series
    </h2>

    <p className="mb-3">
      The Global DISCOM & MUN Series marked Spark's evolution from a local platform to a truly international one. Across multiple events in 2025, we hosted delegates from over 15 countries, each bringing unique perspectives, cultural context, and debate styles.
    </p>

    <p className="mb-3">
      The series blended DISCOM's open discussion energy with MUN's formal structure, creating a hybrid format that appealed to both casual participants and competitive delegates. Every event strengthened our international networks and reinforced Spark's identity as a global student platform.
    </p>

    <div className="mt-3">
      <h3 className="font-semibold">Highlights</h3>
      <ul className="list-disc ml-5">
        <li>300+ delegates across the series</li>
        <li>15+ countries represented</li>
        <li>Multiple collaborations with international organizations</li>
        <li>Hybrid DISCOM and MUN formats</li>
      </ul>
    </div>

  </div>
</div>

      </div>

      <div className="space-y-12 text-center md:text-right order-3 md:order-2">
        <div>
          <h3 className="text-5xl font-black tracking-tighter text-white">
            300+
          </h3>
          <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.3em] mt-2">
            Global Delegates
          </p>
        </div>
        <div>
          <h3 className="text-5xl font-black tracking-tighter text-white">
            15+
          </h3>
          <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.3em] mt-2">
            Countries
          </p>
        </div>
      </div>

      <div className="relative order-1 md:order-3">
        <div className="absolute inset-0 bg-blue-600/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <img
          src="/discom.png"
          className="rounded-2xl w-full h-[320px] object-cover border border-white/10 relative z-10"
          alt="Global Series"
        />
      </div>
    </div>
    {/* ===== ONLINE EVENT 3 ===== */}
<div className="grid md:grid-cols-3 gap-12 items-center mt-32 max-w-7xl mx-auto w-full group">
  
  {/* IMAGE */}
  <div className="relative">
    <div className="absolute inset-0 bg-blue-600/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    <img
      src="/spr2.png"
      className="rounded-2xl w-full h-[320px] object-cover border border-white/10 relative z-10"
      alt="SPRMUN 2.0"
    />
  </div>

  {/* CONTENT */}
  <div className="px-4">
    <div className="flex flex-wrap gap-2 text-[9px] font-bold tracking-widest uppercase mb-6">
      <span className="border border-white/10 px-3 py-1 rounded-full text-zinc-500">Archived</span>
      <span className="bg-blue-600/10 text-blue-500 px-3 py-1 rounded-full border border-blue-500/20">Online</span>
      <span className="text-zinc-600 py-1">October 1, 2025</span>
    </div>

    <h2 className="text-3xl font-extrabold mb-4 tracking-tight">
      SPRMUN 2.0
    </h2>

    <p className="text-zinc-500 mb-8 leading-relaxed">
      Spark's largest online event, a multi-committee MUN with UNSC and DISEC sessions, advanced procedural debate, and delegates from across the globe.
    </p>

    {/* Button */}
<button
  onClick={() => document.getElementById("sprmunModal").classList.remove("hidden")}
  className="px-8 py-3 bg-white text-black rounded-full text-xs font-black tracking-widest uppercase hover:bg-zinc-200 transition-all"
>
  Read more
</button>

{/* Modal (Popup) */}
<div
  id="sprmunModal"
  className="hidden fixed inset-0 bg-black/70 flex items-center justify-center z-50"
>
  <div className="bg-zinc-900 p-6 rounded-xl max-w-2xl text-white relative">
    
    {/* Close Button */}
    <button
      onClick={() => document.getElementById("sprmunModal").classList.add("hidden")}
      className="absolute top-2 right-3 text-xl"
    >
      ✕
    </button>

    <h2 className="text-2xl font-bold mb-4">
      SPRMUN 2.0
    </h2>

    <p className="mb-3">
      SPRMUN 2.0 was the culmination of everything we had learned. Bigger, bolder, and more ambitious than anything we had done before, it featured two simultaneous committees: the UN Security Council (UNSC) and the Disarmament and International Security Committee (DISEC).
    </p>

    <p className="mb-3">
      Delegates tackled complex geopolitical resolutions, navigating bloc politics, amendments, and moderated caucuses with sophistication. The event attracted our most experienced participants and positioned Spark as a serious, credible MUN organizer on the international stage.
    </p>

    <p className="mb-3">
      Running two committees in parallel required precise coordination and advanced logistics, and our team delivered.
    </p>

    <div className="mt-3">
      <h3 className="font-semibold">Highlights</h3>
      <ul className="list-disc ml-5">
        <li>Multi-committee format (UNSC + DISEC)</li>
        <li>Largest online event in Spark history</li>
        <li>Advanced procedural debate</li>
        <li>Positioned Spark as a serious international MUN organizer</li>
      </ul>
    </div>

  </div>
</div>

  </div>

  {/* STATS */}
  <div className="space-y-12 text-right">
    <div>
      <h3 className="text-5xl font-black tracking-tighter text-white">
        2
      </h3>
      <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.3em] mt-2">
        Committees
      </p>
      <p className="text-zinc-600 text-[10px] mt-1">
        UNSC + DISEC
      </p>
    </div>

    <div>
      <h3 className="text-5xl font-black tracking-tighter text-white">
        150+
      </h3>
      <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.3em] mt-2">
        Delegates
      </p>
      <p className="text-zinc-600 text-[10px] mt-1">
        Spark's largest online event
      </p>
    </div>
  </div>
</div>
  </>
)
}
      </section>

      {/* ===== SECTION 2 ===== */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-16 py-32 border-t border-white/5 bg-[#030303]">
        <div className="text-center mb-24">
          <h2 className="text-5xl font-black tracking-tighter mb-4 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
            Combined Event Impact
          </h2>
          <p className="text-zinc-600 uppercase tracking-[0.4em] text-[10px] font-bold">
            Data Engineering / Impact / Scale
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto w-full">
          {[
            { value: "15", suffix: "+", label: "Total Events" },
            { value: "300", suffix: "+", label: "Global Delegates" },
            { value: "100", suffix: "+", label: "Offline Participants" },
            { value: "15", suffix: "+", label: "Countries Represented" },
            { value: "5", suffix: "+", label: "Institutional Events" },
            { value: "25", suffix: "K+", prefix: "₹", label: "Raised for Impact" },
          ].map((item, i) => (
            <div
              key={i}
              className="group border border-white/5 rounded-3xl p-12 text-center bg-black hover:border-blue-500/30 hover:shadow-[0_0_40px_rgba(37,99,235,0.05)] transition-all duration-500"
            >
              <h3 className="text-5xl font-black tracking-tighter mb-4 group-hover:scale-110 transition-transform duration-500">
                <CountUp
                  end={item.value}
                  suffix={item.suffix}
                  prefix={item.prefix || ""}
                />
              </h3>
              <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em]">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
