"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import contentData from "@/data/content.json";

export interface GalleryItem {
  id: string;
  image: string;
  imageAlt?: string;
  title: string;
}

export interface GalleryData {
  headingLines?: string[];
  description?: string;
  items: GalleryItem[];
}

interface GalleryProps {
  data?: GalleryData;
}

const OUT = "ease-[cubic-bezier(0.22,1,0.36,1)]";
const IO = "ease-[cubic-bezier(0.76,0,0.24,1)]";

const rays = [
  { x1: 8, y1: 20, x2: 2, y2: 18 },
  { x1: 12, y1: 12, x2: 8, y2: 6 },
  { x1: 20, y1: 8, x2: 20, y2: 2 },
];

const wait = (on: boolean, ms: number) => ({
  transitionDelay: on ? `${ms}ms` : "0ms",
});

const pad = (n: number) => String(n).padStart(2, "0");

const getDefaultData = (): GalleryData => {
  const campus = (contentData.UnipixUniversity.sections as any).CampusLife.variants
    .UnipixCampusLife1;
  return {
    headingLines: ["Our Gallery"],
    description: campus.description,
    items: campus.cards.map((card: any) => ({
      id: card.id,
      image: card.image,
      imageAlt: card.imageAlt,
      title: card.title,
    })),
  };
};

export default function Gallery({ data }: GalleryProps) {
  const galleryData: GalleryData = data || getDefaultData();
  const items = galleryData.items;
  const count = items.length;

  const sectionRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);
  const timerRef = useRef<number>(0);
  const touchX = useRef<number | null>(null);

  const [inView, setInView] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    return () => window.clearTimeout(timerRef.current);
  }, []);

  const openAt = (index: number, el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    window.clearTimeout(timerRef.current);
    lastFocusRef.current = el;
    setOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    setCurrent(index);
    setIsMounted(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setIsOpen(true)));
  };

  const close = useCallback(() => {
    setIsOpen(false);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setIsMounted(false);
      lastFocusRef.current?.focus();
    }, 900);
  }, []);

  const go = useCallback(
    (step: number) => {
      if (count < 2) return;
      setCurrent((c) => (c + step + count) % count);
    },
    [count]
  );

  useEffect(() => {
    if (!isMounted) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isMounted, close, go]);

  useEffect(() => {
    if (isOpen) closeRef.current?.focus();
  }, [isOpen]);

  const heading = (
    galleryData.headingLines && galleryData.headingLines.length > 0
      ? galleryData.headingLines
      : ["Gallery"]
  ).join(" ");

  return (
    <section
      id="campus-life"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#7a102f] py-18 text-white"
    >
      <div className="pointer-events-none absolute left-10 top-10 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />
      <div className="pointer-events-none absolute bottom-10 right-10 h-36 w-36 translate-x-1/2 translate-y-1/2 rounded-full border border-white/5" />

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-10">
        <div className="mb-12 flex flex-col items-center text-center sm:mb-16">
          <div className="relative inline-block">
            <h2
              aria-label={heading}
              className="font-serif text-4xl font-normal leading-[1.08] tracking-tight sm:text-6xl lg:text-[76px]"
            >
              <span
                aria-hidden="true"
                className="-mb-[0.12em] block overflow-hidden pb-[0.12em]"
              >
                {Array.from(heading).map((char, i) => (
                  <span
                    key={i}
                    className={`inline-block transition-transform duration-1000 motion-reduce:transition-none ${OUT} ${
                      inView ? "translate-y-0" : "translate-y-full"
                    }`}
                    style={wait(inView, 200 + i * 45)}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </span>
            </h2>

            <svg
              aria-hidden="true"
              viewBox="0 0 40 40"
              className="pointer-events-none absolute -right-6 -top-3 h-7 w-7 text-rose-300 sm:h-8 sm:w-8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              {rays.map((ray, i) => (
                <line
                  key={i}
                  {...ray}
                  pathLength={1}
                  className={`transition-[stroke-dashoffset] duration-700 ease-out motion-reduce:transition-none [stroke-dasharray:1] ${
                    inView ? "[stroke-dashoffset:0]" : "[stroke-dashoffset:1]"
                  }`}
                  style={wait(inView, 1000 + i * 140)}
                />
              ))}
            </svg>
          </div>

          {galleryData.description && (
            <p
              className={`mt-5 max-w-xl text-sm font-light leading-relaxed text-white/80 transition-all duration-1000 motion-reduce:transition-none sm:text-[15px] ${OUT} ${
                inView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              }`}
              style={wait(inView, 800)}
            >
              {galleryData.description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
          {items.map((item, i) => {
            const delay = 500 + (i % 3) * 150;
            return (
              <button
                key={item.id}
                type="button"
                onClick={(e) => openAt(i, e.currentTarget)}
                aria-haspopup="dialog"
                aria-label={`View ${item.title}`}
                className="group block w-full text-left outline-offset-4"
              >
                <span
                  className={`relative block h-64 w-full overflow-hidden bg-slate-900 transition-[clip-path] duration-[1300ms] motion-reduce:transition-none sm:h-72 lg:h-[300px] ${OUT}`}
                  style={{
                    clipPath: inView ? "inset(0 0 0 0)" : "inset(100% 0 0 0)",
                    ...wait(inView, delay),
                  }}
                >
                  <span
                    className={`absolute inset-0 block transition-transform duration-[1800ms] motion-reduce:transition-none ${OUT} ${
                      inView ? "scale-100" : "scale-125"
                    }`}
                    style={wait(inView, delay)}
                  >
                    <Image
                      src={item.image}
                      alt={item.imageAlt || item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </span>
                  <span className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-transparent" />
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-3 scale-95 border border-white/70 opacity-0 transition-all duration-500 motion-reduce:transition-none ${OUT} group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100`}
                  />
                </span>

                <span
                  className={`flex items-center gap-2 pt-4 transition-all duration-1000 motion-reduce:transition-none sm:pt-5 ${OUT} ${
                    inView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                  }`}
                  style={wait(inView, delay + 400)}
                >
                  <span className="relative text-sm font-normal text-white transition-colors duration-300 group-hover:text-rose-200 sm:text-base">
                    {item.title}
                    <span
                      aria-hidden="true"
                      className={`absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-rose-200 transition-transform duration-500 motion-reduce:transition-none ${IO} group-hover:origin-left group-hover:scale-x-100`}
                    />
                  </span>
                  <Maximize2
                    size={14}
                    className="text-white transition-all duration-300 group-hover:scale-110 group-hover:text-rose-200"
                  />
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {isMounted && count > 0 && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={galleryData.headingLines?.join(" ") || "Gallery"}
          className={`fixed inset-0 z-[80] bg-[#2b0612] text-white transition-[clip-path] duration-[900ms] motion-reduce:transition-none ${IO}`}
          style={{
            clipPath: isOpen
              ? `circle(150vmax at ${origin.x}px ${origin.y}px)`
              : `circle(0px at ${origin.x}px ${origin.y}px)`,
          }}
        >
          <div className="mx-auto flex h-full w-full max-w-[1280px] flex-col px-5 py-6 sm:px-8 sm:py-8 lg:px-10">
            <div
              className={`flex items-center justify-between transition-all duration-700 motion-reduce:transition-none ${OUT} ${
                isOpen ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
              }`}
              style={wait(isOpen, 450)}
            >
              <span className="font-serif text-lg tabular-nums tracking-wide text-white/90">
                {pad(current + 1)}
                <span className="text-white/40"> / {pad(count)}</span>
              </span>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label="Close gallery"
                className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/25 transition-colors duration-300 hover:border-white hover:bg-white hover:text-[#7a102f]"
              >
                <X
                  size={20}
                  className="transition-transform duration-500 group-hover:rotate-90"
                />
              </button>
            </div>

            <div
              className={`relative my-4 min-h-0 flex-1 transition-all duration-1000 motion-reduce:transition-none sm:my-6 ${OUT} ${
                isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
              }`}
              style={wait(isOpen, 300)}
              onTouchStart={(e) => {
                touchX.current = e.touches[0].clientX;
              }}
              onTouchEnd={(e) => {
                if (touchX.current === null) return;
                const dx = e.changedTouches[0].clientX - touchX.current;
                touchX.current = null;
                if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
              }}
            >
              {items.map((item, idx) => {
                const d = (idx - current + count) % count;
                if (d !== 0 && d !== 1 && d !== count - 1) return null;
                const state =
                  d === 0
                    ? "translate-x-0 opacity-100"
                    : d === 1
                    ? "translate-x-12 opacity-0"
                    : "-translate-x-12 opacity-0";
                return (
                  <div
                    key={item.id}
                    aria-hidden={d !== 0}
                    className={`absolute inset-0 transition-all duration-700 motion-reduce:transition-none ${OUT} ${state}`}
                  >
                    <Image
                      src={item.image}
                      alt={item.imageAlt || item.title}
                      fill
                      sizes="100vw"
                      className="object-contain object-center"
                    />
                  </div>
                );
              })}
            </div>

            <div
              className={`flex items-center justify-between gap-4 transition-all duration-700 motion-reduce:transition-none ${OUT} ${
                isOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              }`}
              style={wait(isOpen, 550)}
            >
              <p className="font-serif text-xl tracking-tight sm:text-2xl">
                {items[current].title}
              </p>
              {count > 1 && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Previous image"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 transition-colors duration-300 hover:border-white hover:bg-white hover:text-[#7a102f]"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Next image"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 transition-colors duration-300 hover:border-white hover:bg-white hover:text-[#7a102f]"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </div>

            <div className="mt-5 h-px w-full bg-white/15">
              <span
                className={`block h-full origin-left bg-white transition-transform duration-700 motion-reduce:transition-none ${IO}`}
                style={{ transform: `scaleX(${(current + 1) / count})` }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
