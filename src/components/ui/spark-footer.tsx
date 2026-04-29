import { Link } from "react-router-dom";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa";

export default function FooterSection() {
  return (
    <footer className="relative z-10 px-6 py-16 border-t border-white/10 bg-[#030308]">
      <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-3">

        {/* LEFT — BRAND */}
        <div>
          <h2 className="text-2xl font-extrabold text-white font-bricolage">
            Spark
          </h2>
          <p className="mt-3 text-sm text-white/60 max-w-sm">
            Empowering students to speak, debate, lead & create impact
          </p>

          {/* SOCIALS */}
          <div className="flex gap-4 mt-6">
            <a 
  href="https://www.linkedin.com/company/project%E2%80%8E%E2%80%8E-spark/" 
  target="_blank" 
  rel="noopener noreferrer"
  className="text-white/50 hover:text-white transition"
>
  <FaLinkedinIn />
</a>

<a 
  href="https://www.instagram.com/spark.offl/" 
  target="_blank" 
  rel="noopener noreferrer"
  className="text-white/50 hover:text-white transition"
>
  <FaInstagram />
</a>

          </div>

          {/* EMAIL */}
          <p className="mt-4 text-sm text-white/50">
            spark.official.spark@gmail.com
          </p>
        </div>

        {/* CENTER — NAVIGATION */}
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold tracking-widest uppercase text-white/50">
            Navigation
          </h3>

          <Link to="/" className="text-white/80 hover:text-white transition">
            Home
          </Link>
          <Link to="/events" className="text-white/80 hover:text-white transition">
            Events
          </Link>
          <Link to="/about" className="text-white/80 hover:text-white transition">
            About
          </Link>
          <Link to="/joinus" className="text-white/80 hover:text-white transition">
            Join Us
          </Link>
        </div>

        {/* RIGHT — EMPTY / FUTURE USE */}
        <div className="text-white/40 text-sm flex items-end md:justify-end">
          © {new Date().getFullYear()} Spark. All rights reserved.
        </div>

      </div>
    </footer>
  );
}