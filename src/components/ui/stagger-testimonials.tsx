"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const SQRT_5000 = Math.sqrt(5000);

const testimonials = [
  {
    tempId: 0,
    testimonial:
      "Spark's MUN training completely changed how I approach public speaking. I walked into my first committee with real confidence.",
    by: "Arjun S., Student Delegate",
  },
  {
    tempId: 1,
    testimonial:
      "As a teacher, I've seen many programs, but Spark's workshops are different. The structured feedback loop is exceptional.",
    by: "Priya M., School Teacher",
  },
  {
    tempId: 2,
    testimonial:
      "Running a committee at SPRMUN 2.0 was the most intense and rewarding experience of my academic year.",
    by: "Rohan K., MUN Director",
  },
  {
    tempId: 3,
    testimonial:
      "I joined Spark not knowing what a resolution was. Three months later I was chairing a committee. That growth is real.",
    by: "Kavya R., Student Delegate",
  },
  {
    tempId: 4,
    testimonial:
      "The Global DISCOM Series brought delegates from 16 countries to one table. Spark made that possible, incredible work.",
    by: "Ishaan P., International Delegate",
  },
  {
    tempId: 5,
    testimonial:
      "Spark taught me that leadership isn't about talking the loudest. It's about listening, synthesising, and building consensus.",
    by: "Nithya V., Leo Club Member",
  },
  {
    tempId: 6,
    testimonial:
      "The Leo Leadership Conclave was phenomenal. 100+ students, live debates, and a cause that actually mattered. Hats off.",
    by: "Aditi B., Event Participant",
  },
  {
    tempId: 7,
    testimonial:
      "I was terrified of public speaking before Spark's training. Now I can hold a room. This program is genuinely transformative.",
    by: "Vikram T., Engineering Student",
  },
  {
    tempId: 8,
    testimonial:
      "My school sent five students to the Vels Global School event. All five came back changed. We're partnering again for sure.",
    by: "Ms. Sudha L., School Coordinator",
  },
  {
    tempId: 9,
    testimonial:
      "The preparation workshops Spark runs before each event are where the real learning happens. The events are just the showcase.",
    by: "Meera J., MUN Trainer",
  },
  {
    tempId: 10,
    testimonial:
      "I debated against delegates from Brazil and South Korea in the same session. Spark made that international exposure accessible to me.",
    by: "Aakash N., Student Delegate",
  },
  {
    tempId: 11,
    testimonial:
      "Spark's team runs events with a professionalism that rivals university-level MUNs. Remarkable for a student-led organisation.",
    by: "Dr. Ramesh C., Academic Advisor",
  },
  {
    tempId: 12,
    testimonial:
      "The UNSC simulation at SPRMUN 2.0 pushed me harder than any exam. Best stress I've ever had.",
    by: "Shreya D., Student Delegate",
  },
  {
    tempId: 13,
    testimonial:
      "I've been a MUN delegate for four years. Spark's online DISCOMs are the most intellectually challenging I've attended.",
    by: "Omar F., International Delegate",
  },
  {
    tempId: 14,
    testimonial:
      "Spark doesn't just train speakers — they train thinkers. The research methodology sessions alone were worth everything.",
    by: "Lakshmi S., College Student",
  },
  {
    tempId: 15,
    testimonial:
      "From 0 to confident delegate in 8 weeks. Spark's curriculum is designed for real results, not just certificates.",
    by: "Sai P., First-Time Delegate",
  },
  {
    tempId: 16,
    testimonial:
      "We raised ₹25,000 for cancer research through the Leo Leadership Conclave. Spark combined purpose with performance beautifully.",
    by: "Leo Club President, Chennai",
  },
  {
    tempId: 17,
    testimonial:
      "As someone who participates in MUNs globally, Spark stands out for how much care goes into delegate preparation.",
    by: "Yuna K., Delegate from South Korea",
  },
  {
    tempId: 18,
    testimonial:
      "The teamwork and cross-cultural dialogue at Spark events is something schools can't manufacture in a classroom.",
    by: "Ravi A., Parent & Observer",
  },
  {
    tempId: 19,
    testimonial:
      "Spark gave me the platform, the training, and the community. Everything else — the confidence, the voice — I built myself.",
    by: "Tanvi R., Student Leader",
  },
];

const TestimonialCard = ({
  position,
  testimonial,
  handleMove,
  cardSize,
}: {
  position: number;
  testimonial: { tempId: number; testimonial: string; by: string };
  handleMove: (steps: number) => void;
  cardSize: number;
}) => {
  const isCenter = position === 0;

  return (
    <button
      type="button"
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-8 transition-all duration-500 ease-in-out text-left",
        isCenter
          ? "z-10 bg-primary text-primary-foreground border-primary"
          : "z-0 bg-card text-card-foreground border-border hover:border-primary/50",
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath:
          "polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)",
        transform: `translate(-50%, -50%) translateX(${(cardSize / 1.5) * position}px) translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px) rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)`,
        boxShadow: isCenter
          ? "0px 8px 0px 4px hsl(var(--border))"
          : "0px 0px 0px 0px transparent",
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45 bg-border"
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2,
        }}
      />
      <h3
        className={cn(
          "text-base sm:text-xl font-medium",
          isCenter ? "text-primary-foreground" : "text-foreground",
        )}
      >
        "{testimonial.testimonial}"
      </h3>
      <p
        className={cn(
          "absolute bottom-8 left-8 right-8 mt-2 text-sm italic",
          isCenter ? "text-primary-foreground/80" : "text-muted-foreground",
        )}
      >
        {testimonial.by}
      </p>
    </button>
  );
};

export const StaggerTestimonials = () => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);
  const [hovered, setHovered] = useState(false);

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  // Autoscroll every 4 seconds; pause on hover
  useEffect(() => {
    if (hovered) return;
    const timer = setInterval(() => {
      setTestimonialsList((prev) => {
        const newList = [...prev];
        const item = newList.shift();
        if (!item) return prev;
        newList.push({ ...item, tempId: Math.random() });
        return newList;
      });
    }, 4000);
    return () => clearInterval(timer);
  }, [hovered]);

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden bg-muted/30"
      style={{ height: 600 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {testimonialsList.map((testimonial, index) => {
        const position =
          testimonialsList.length % 2
            ? index - (testimonialsList.length + 1) / 2
            : index - testimonialsList.length / 2;
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        <button
          type="button"
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
            "bg-background border-2 border-border hover:bg-primary hover:text-primary-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          )}
          aria-label="Previous testimonial"
          data-ocid="testimonials.nav.prev"
        >
          <ChevronLeft />
        </button>
        <button
          type="button"
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
            "bg-background border-2 border-border hover:bg-primary hover:text-primary-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          )}
          aria-label="Next testimonial"
          data-ocid="testimonials.nav.next"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};
