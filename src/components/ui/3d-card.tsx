import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import * as React from "react";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";

export interface InteractiveTravelCardProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  actionText: string;
  href: string;
  onActionClick: () => void;
  bio?: string;
  socialType?: "linkedin" | "instagram";
  className?: string;
  /** CSS object-position for the photo, e.g. "center 15%" */
  imageObjectPosition?: string;
  /** Scale factor applied to the photo, e.g. 0.85 to zoom out */
  imageScale?: number;
  /** CSS object-fit override — use "contain" to show the full image without cropping */
  imageObjectFit?: "cover" | "contain";
}

export const InteractiveTravelCard = React.forwardRef<
  HTMLDivElement,
  InteractiveTravelCardProps
>(
  (
    {
      title,
      subtitle,
      imageUrl,
      href,
      onActionClick,
      bio,
      socialType = "linkedin",
      className,
      imageObjectPosition,
      imageScale,
      imageObjectFit,
    },
    ref,
  ) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const rotateX = useTransform(springY, [-0.5, 0.5], ["10.5deg", "-10.5deg"]);
    const rotateY = useTransform(springX, [-0.5, 0.5], ["-10.5deg", "10.5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const { width, height, left, top } = rect;
      const xPct = (e.clientX - left) / width - 0.5;
      const yPct = (e.clientY - top) / height - 0.5;
      mouseX.set(xPct);
      mouseY.set(yPct);
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    const SocialIcon = socialType === "instagram" ? FaInstagram : FaLinkedinIn;

    return (
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={cn(
          "relative w-full rounded-2xl bg-transparent shadow-2xl border border-cyan-500/20 hover:border-cyan-400/40 transition-colors duration-300",
          className,
        )}
      >
        {/* Inner content pushed forward in 3D space */}
        <div
          className="absolute rounded-xl shadow-lg overflow-hidden flex flex-col"
          style={{
            transform: "translateZ(50px)",
            transformStyle: "preserve-3d",
            inset: "0.75rem",
          }}
        >
          {/* Photo area — top 58% */}
          <div
            className="relative flex-shrink-0 overflow-hidden bg-[#0a1628]"
            style={{ height: "58%" }}
          >
            <img
              src={imageUrl}
              alt={title}
              className={`w-full h-full ${imageObjectFit === "contain" ? "object-contain" : "object-cover"}`}
              style={{
                objectPosition: imageObjectPosition ?? "center top",
                transform: imageScale ? `scale(${imageScale})` : undefined,
                transformOrigin: "center top",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />
          </div>

          {/* Info area — remaining height */}
          <div className="flex flex-col flex-1 bg-[#0a1628] border-t border-cyan-500/10 px-4 py-3 overflow-hidden">
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <div className="min-w-0">
                <h3 className="font-bold text-white text-sm leading-tight">
                  {title}
                </h3>
                <p className="text-cyan-400/80 text-xs mt-0.5 leading-snug line-clamp-1">
                  {subtitle}
                </p>
              </div>
              {href && (
                <motion.a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Visit ${title} profile`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onActionClick?.();
                  }}
                  className="flex-shrink-0 flex h-7 w-7 items-center justify-center rounded-full bg-white/10 ring-1 ring-inset ring-white/20 hover:bg-cyan-400/20 hover:ring-cyan-400/50 transition-colors"
                >
                  <SocialIcon className="w-3.5 h-3.5 text-white" />
                </motion.a>
              )}
            </div>

            {bio && (
              <p className="text-white/60 text-[0.72rem] leading-relaxed line-clamp-4 flex-1">
                {bio}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    );
  },
);
InteractiveTravelCard.displayName = "InteractiveTravelCard";
