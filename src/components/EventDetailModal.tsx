import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

// The 2nd media item (index 1) for Vels Global School is the video.
const VELS_VIDEO_ID = "1o3aK4HEGNMkAFjJGH41Qiat2jyC_Y3Wl";

function isVideoUrl(url: string) {
  return url.includes(VELS_VIDEO_ID);
}

function isDriveUrl(url: string) {
  return url.includes("drive.google.com");
}

function DriveSlide({ src, alt }: { src: string; alt: string }) {
  const isVideo = isVideoUrl(src);
  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-black">
      {isVideo && (
        <div className="absolute top-2 left-2 z-10 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs font-semibold pointer-events-none">
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="currentColor"
            aria-hidden="true"
          >
            <polygon points="2,1 9,5 2,9" />
          </svg>
          Video
        </div>
      )}
      <iframe
        src={src}
        title={alt}
        allow={
          isVideo
            ? "autoplay; fullscreen; encrypted-media; picture-in-picture; accelerometer; gyroscope"
            : "autoplay"
        }
        allowFullScreen={isVideo}
        style={
          isVideo
            ? {
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: "none",
                pointerEvents: "auto",
              }
            : {
                /* shrink-to-fit: full photo visible, no cropping, no zoom */
                position: "relative",
                width: "100%",
                height: "100%",
                border: "none",
                pointerEvents: "none",
              }
        }
      />
    </div>
  );
}

export type EventModalData = {
  title: string;
  date: string;
  status: string;
  photos?: string[];
  description: string;
  stats?: { label: string; value: string }[];
  bullets?: { label: string; items: string[] }[];
};

interface EventDetailModalProps {
  event: EventModalData | null;
  onClose: () => void;
}

function PhotoCarousel({ photos, title }: { photos: string[]; title: string }) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const currentSrc = photos[photoIndex];

  return (
    <div className="relative aspect-video rounded-t-3xl overflow-hidden bg-secondary">
      <AnimatePresence mode="wait">
        <motion.div
          key={photoIndex}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {isDriveUrl(currentSrc) ? (
            <DriveSlide
              src={currentSrc}
              alt={`${title} — slide ${photoIndex + 1}`}
            />
          ) : (
            <img
              src={currentSrc}
              alt={`${title} — slide ${photoIndex + 1}`}
              className="w-full h-full object-cover"
            />
          )}
        </motion.div>
      </AnimatePresence>
      {photos.length > 1 && (
        <>
          <button
            type="button"
            onClick={() =>
              setPhotoIndex((i) => (i - 1 + photos.length) % photos.length)
            }
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors"
            aria-label="Previous slide"
            data-ocid="event.carousel.pagination_prev"
          >
            <ChevronLeft size={16} strokeWidth={2} className="text-white" />
          </button>
          <button
            type="button"
            onClick={() => setPhotoIndex((i) => (i + 1) % photos.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors"
            aria-label="Next slide"
            data-ocid="event.carousel.pagination_next"
          >
            <ChevronRight size={16} strokeWidth={2} className="text-white" />
          </button>
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
            {photos.map((photo, i) => (
              <button
                key={photo}
                type="button"
                onClick={() => setPhotoIndex(i)}
                className="transition-all"
                aria-label={`Go to slide ${i + 1}`}
                data-ocid={`event.carousel.toggle.${i + 1}`}
                style={{
                  width: i === photoIndex ? 20 : 7,
                  height: 7,
                  borderRadius: 999,
                  background:
                    i === photoIndex ? "#fff" : "rgba(255,255,255,0.45)",
                  transition: "width 0.3s ease",
                }}
              />
            ))}
          </div>
          <div className="absolute top-3 right-12 px-2.5 py-1 rounded-pill bg-black/50 backdrop-blur-sm text-white text-xs font-semibold">
            {photoIndex + 1} / {photos.length}
          </div>
        </>
      )}
    </div>
  );
}

export default function EventDetailModal({
  event,
  onClose,
}: EventDetailModalProps) {
  useEffect(() => {
    if (!event) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [event, onClose]);

  return (
    <AnimatePresence>
      {event && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            onKeyDown={(e) => e.key === "Enter" && onClose()}
            data-ocid="event.modal"
          />
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="bg-card border border-border rounded-3xl shadow-card-hover w-full max-w-2xl max-h-[90vh] overflow-y-auto pointer-events-auto relative"
              data-ocid="event.dialog"
            >
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-border transition-colors"
                aria-label="Close modal"
                data-ocid="event.close_button"
              >
                <X size={15} strokeWidth={2} className="text-foreground" />
              </button>

              {event.photos && event.photos.length > 0 && (
                <PhotoCarousel
                  key={event.title}
                  photos={event.photos}
                  title={event.title}
                />
              )}

              <div className="p-6 md:p-8">
                <div className="flex flex-wrap items-start gap-3 mb-4">
                  <div className="flex-1">
                    <h2 className="font-bricolage font-extrabold text-2xl md:text-3xl text-foreground tracking-tight leading-tight">
                      {event.title}
                    </h2>
                    <p className="text-muted-foreground text-sm mt-1">
                      {event.date}
                    </p>
                  </div>
                  <span className="shrink-0 inline-flex items-center px-3 py-1 rounded-pill bg-secondary text-foreground text-xs font-semibold border border-border">
                    {event.status}
                  </span>
                </div>

                {event.stats && event.stats.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                    {event.stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="bg-secondary/60 rounded-xl p-3 text-center border border-border"
                      >
                        <div className="font-bricolage font-extrabold text-lg text-foreground">
                          {stat.value}
                        </div>
                        <div className="text-muted-foreground text-xs mt-0.5">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <p className="text-foreground/85 leading-relaxed text-sm md:text-base mb-6">
                  {event.description}
                </p>

                {event.bullets?.map((group) => (
                  <div key={group.label} className="mb-4">
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                      {group.label}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="inline-block px-3 py-1 bg-secondary/80 border border-border rounded-lg text-foreground text-xs font-medium"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
