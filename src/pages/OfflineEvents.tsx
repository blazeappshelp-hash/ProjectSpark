import SparkFooter from "@/components/ui/spark-footer";
import { MapPin, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

/* ---------------- Count Hook ---------------- */
function useCountUp(target: number, duration = 1.6) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setStarted(true);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = (t: number) => {
      if (!start) start = t;
      const p = Math.min((t - start) / (duration * 1000), 1);
      setCount(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);

  return { count, ref };
}

/* ---------------- Types ---------------- */
type Metric = {
  value: number;
  suffix: string;
  label: string;
  sub?: string;
};

type EventData = {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  format: string;
  status: string;
  photos: string[];
  shortDescription: string;
  fullDescription: string;
  highlights: string[];
  metrics: Metric[];
};

/* ---------------- OFFLINE DATA ---------------- */
const OFFLINE_EVENTS: EventData[] = [
  {
    id: "leo-leadership-conclave",
    title: "Leo Leadership Conclave",
    subtitle: "Flagship Offline Event: Leadership, Impact and Community",
    date: "February 20, 2026",
    format: "Offline",
    status: "Archived",
    photos: [
      "https://drive.google.com/file/d/1yGd73nqVUQVrSZcbmTUhnS2UnNvzM12R/preview",
      "https://drive.google.com/file/d/1qUnY6kyQZ495svh95Y4dPFFfKcSjy2ry/preview",
      "https://drive.google.com/file/d/1caj1aDRDxsm-rZWReanLK4yeMGr3f6mM/preview",
      "https://drive.google.com/file/d/1ccsxMMozOAz5zaaBBbws0QgHjc4IX2QE/preview",
    ],
    shortDescription:
      "Spark's landmark offline event, 100+ students from multiple institutions came together for leadership workshops, debates, and to raise Rs.25,000+ for child cancer.",
    fullDescription:
      "The Leo Leadership Conclave was Spark's proudest moment. Held on February 20, 2026, it brought together over 100 students...",
    highlights: [
      "100+ students from multiple institutions",
      "₹25,000+ raised for child cancer awareness",
      "Full-day leadership and debate workshops",
      "Multi-institution collaboration",
    ],
    metrics: [
      { value: 100, suffix: "+", label: "Students" },
      { value: 25000, suffix: "+", label: "₹ Raised" },
    ],
  },
  {
    id: "vels-global-school",
    title: "Vels Global School Event",
    subtitle: "40+ Students. Workshops. Confidence Building.",
    date: "December 23, 2024",
    format: "Offline",
    status: "Archived",
    photos: [
      "https://drive.google.com/file/d/1JicPjMkZ_Ie7GhFZHaRbpMKHASDncqvA/preview",
      "https://drive.google.com/file/d/1o3aK4HEGNMkAFjJGH41Qiat2jyC_Y3Wl/preview",
      "https://drive.google.com/file/d/1YMfpxEMI4e9xPuyzBd1y0VUDhcudUrp1/preview",
    ],
    shortDescription:
      "A hands-on training event at Vels Global School with 40+ students.",
    fullDescription:
      "The Vels Global School event brought Spark's training programs...",
    highlights: [
      "40+ students attended",
      "Confidence-building exercises",
      "Interactive workshop format",
    ],
    metrics: [
      { value: 40, suffix: "+", label: "Students" },
      { value: 90, suffix: "%", label: "Positive Feedback" },
    ],
  },
];

/* ---------------- Metric ---------------- */
function MetricStat({ metric }: { metric: Metric }) {
  const { count, ref } = useCountUp(metric.value);

  return (
    <div ref={ref} className="py-5">
      <p className="text-3xl font-semibold">
        {count}
        {metric.suffix}
      </p>
      <p className="text-sm">{metric.label}</p>
    </div>
  );
}

/* ---------------- Modal ---------------- */
function ReadMoreModal({
  event,
  onClose,
}: {
  event: EventData | null;
  onClose: () => void;
}) {
  if (!event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white p-6 rounded-xl max-w-xl w-full">
        <h2 className="text-xl font-bold">{event.title}</h2>
        <p className="text-sm mt-2">{event.fullDescription}</p>

        <button onClick={onClose} className="mt-4">
          <X />
        </button>
      </div>
    </div>
  );
}

/* ---------------- Row ---------------- */
function EventRow({
  event,
  onReadMore,
}: {
  event: EventData;
  onReadMore: (e: EventData) => void;
}) {
  return (
    <div className="border-b pb-10 mb-10">
      <h3 className="text-2xl font-bold">{event.title}</h3>
      <p className="text-sm text-muted-foreground">{event.subtitle}</p>

      <p className="mt-3">{event.shortDescription}</p>

      <button
        onClick={() => onReadMore(event)}
        className="mt-4 px-4 py-2 bg-black text-white rounded-lg"
      >
        Read more
      </button>

      <div className="mt-4">
        {event.metrics.map((m, i) => (
          <MetricStat key={i} metric={m} />
        ))}
      </div>
    </div>
  );
}

/* ---------------- PAGE ---------------- */
export default function OfflineEvents() {
  const [modal, setModal] = useState<EventData | null>(null);

  return (
    <div className="bg-background min-h-screen">
      

      <ReadMoreModal event={modal} onClose={() => setModal(null)} />

      {/* Hero */}
      <div className="pt-28 text-center">
        <h1 className="text-5xl font-bold">Offline Events</h1>
        <p className="text-muted-foreground mt-2">
          Leadership workshops, school events & real-world impact.
        </p>
      </div>

      {/* Events */}
      <div className="px-6 mt-16">
        {OFFLINE_EVENTS.map((event) => (
          <EventRow
            key={event.id}
            event={event}
            onReadMore={setModal}
          />
        ))}
      </div>

      <SparkFooter />
    </div>
  );
}
