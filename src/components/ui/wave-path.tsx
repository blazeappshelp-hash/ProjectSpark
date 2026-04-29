"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

type WWavePathProps = React.ComponentProps<"div">;

export function WavePath({ className, ...props }: WWavePathProps) {
  const path = useRef<SVGPathElement>(null);
  const progressRef = useRef(0);
  const xRef = useRef(0.2);
  const timeRef = useRef(Math.PI / 2);
  const reqIdRef = useRef<number | null>(null);

  const setPath = (prog: number) => {
    const width = window.innerWidth * 0.7;
    if (path.current) {
      path.current.setAttributeNS(
        null,
        "d",
        `M0 100 Q${width * xRef.current} ${100 + prog * 0.6}, ${width} 100`,
      );
    }
  };

  useEffect(() => {
    const width = window.innerWidth * 0.7;
    if (path.current) {
      path.current.setAttributeNS(
        null,
        "d",
        `M0 100 Q${width * xRef.current} ${100 + progressRef.current * 0.6}, ${width} 100`,
      );
    }
    // runs once on mount — no deps needed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lerp = (a: number, b: number, t: number) => a * (1 - t) + b * t;

  const resetAnimation = () => {
    timeRef.current = Math.PI / 2;
    progressRef.current = 0;
  };

  const animateOut = () => {
    const newProgress = progressRef.current * Math.sin(timeRef.current);
    progressRef.current = lerp(progressRef.current, 0, 0.025);
    timeRef.current += 0.2;
    setPath(newProgress);
    if (Math.abs(progressRef.current) > 0.75) {
      reqIdRef.current = requestAnimationFrame(animateOut);
    } else {
      resetAnimation();
    }
  };

  const manageMouseEnter = () => {
    if (reqIdRef.current) {
      cancelAnimationFrame(reqIdRef.current);
      resetAnimation();
    }
  };

  const manageMouseMove = (e: React.MouseEvent) => {
    const { movementY, clientX } = e;
    if (path.current) {
      const pathBound = path.current.getBoundingClientRect();
      xRef.current = (clientX - pathBound.left) / pathBound.width;
      progressRef.current += movementY;
      setPath(progressRef.current);
    }
  };

  const manageMouseLeave = () => {
    animateOut();
  };

  return (
    <div className={cn("relative h-px w-[70vw]", className)} {...props}>
      <div
        onMouseEnter={manageMouseEnter}
        onMouseMove={manageMouseMove}
        onMouseLeave={manageMouseLeave}
        className="relative -top-5 z-10 h-10 w-full hover:-top-[150px] hover:h-[300px]"
      />
      <svg
        className="absolute -top-[100px] h-[300px] w-full"
        aria-hidden="true"
      >
        <path ref={path} className="fill-none stroke-current" strokeWidth={2} />
      </svg>
    </div>
  );
}
