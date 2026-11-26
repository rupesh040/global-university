"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import contentData from "@/data/content.json";
import { TestimonialVariant } from "@/data/type";

interface TestimonialProps {
  data?: TestimonialVariant;
}

const SLIDE_DURATION = 700;
const AUTOPLAY_DELAY = 4000;

export default function Testimonial({ data }: TestimonialProps) {
  const testimonialData: TestimonialVariant =
    data || contentData.UnipixUniversity.sections.Testimonial.variants.UnipixTestimonial1;

  const items = testimonialData.items;
  const total = items.length;

  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const lockRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [width, setWidth] = useState(0);
  const [position, setPosition] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const baseVisible = width > 0 && width < 704 ? 1 : 3;
  const visible = Math.min(baseVisible, total);
  const half = Math.floor(visible / 2);
  const gap = width >= 704 ? 32 : 24;
  const slideWidth = width > 0 ? (width - gap * (visible - 1)) / visible : 0;
  const step = slideWidth + gap;

  const extended = useMemo(
    () => [...items.slice(-visible), ...items, ...items.slice(0, visible)],
    [items, visible]
  );

  const centerIndex = (((position + half - visible) % total) + total) % total;

  const settle = (next: number) => {
    timerRef.current = setTimeout(() => {
      let target = next;
      if (next >= total + visible) target = next - total;
      else if (next < visible) target = next + total;

      if (target !== next) {
        setAnimate(false);
        setPosition(target);
      }
      lockRef.current = false;
    }, SLIDE_DURATION);
  };

  const move = (delta: number) => {
    if (lockRef.current || total < 2) return;
    lockRef.current = true;
    const next = position + delta;
    setAnimate(true);
    setPosition(next);
    settle(next);
  };

  const jumpTo = (idx: number) => {
    if (lockRef.current || total < 2 || idx === centerIndex) return;
    lockRef.current = true;
    const next = idx - half + visible;
    setAnimate(true);
    setPosition(next);
    settle(next);
  };

  const moveRef = useRef(move);
  moveRef.current = move;

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const node = viewportRef.current;
    if (!node) return;

    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    lockRef.current = false;
    setAnimate(false);
    setPosition(visible);
  }, [visible]);

  useEffect(() => {
    if (!isVisible || isPaused || total < 2) return;

    const timer = setInterval(() => moveRef.current(1), AUTOPLAY_DELAY);
    return () => clearInterval(timer);
  }, [isVisible, isPaused, total]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <section id="testimonial" ref={sectionRef} className="py-18 bg-[#fafafa] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="text-center mb-12 sm:mb-16">
          <h2
            className={`font-serif text-3xl sm:text-4xl md:text-[44px] font-normal text-gray-900 leading-tight tracking-tight transition-all duration-1000 ease-out motion-reduce:transition-none ${
              isVisible
                ? "opacity-100 translate-y-0 blur-0"
                : "opacity-0 translate-y-4 blur-sm"
            }`}
          >
            {testimonialData.heading}
          </h2>

          {testimonialData.description && (
            <p
              className={`mt-2.5 text-xs sm:text-sm text-gray-500 font-light max-w-xl mx-auto transition-all duration-1000 delay-200 ease-out motion-reduce:transition-none ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
            >
              {testimonialData.description}
            </p>
          )}

          <span
            className={`block mx-auto mt-5 h-px bg-[#7a102f]/40 transition-all duration-1000 delay-500 ease-out motion-reduce:transition-none ${
              isVisible ? "w-12 opacity-100" : "w-0 opacity-0"
            }`}
          />
        </div>

        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            ref={viewportRef}
            className="relative [clip-path:inset(-24px_0px)]"
          >
            <div
              className={`flex items-stretch will-change-transform ${
                animate
                  ? "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                  : ""
              }`}
              style={{
                gap,
                transform: `translate3d(${-position * step}px, 0, 0)`,
              }}
            >
              {extended.map((item, i) => {
                const isActive = i === position + half;
                const order = Math.min(Math.max(i - visible, 0), 2);
                const isClone = i < visible || i >= visible + total;

                return (
                  <div
                    key={`${item.id}-${i}`}
                    aria-hidden={isClone}
                    className={`flex-shrink-0 transition-[opacity,transform,filter] duration-900 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                      isVisible
                        ? "opacity-100 translate-y-0 blur-0"
                        : "opacity-0 translate-y-10 blur-sm"
                    }`}
                    style={{
                      width: slideWidth,
                      transitionDelay: isVisible ? `${300 + order * 160}ms` : "0ms",
                    }}
                  >
                    <div
                      className={`group relative h-full overflow-hidden bg-white p-6 sm:p-8 rounded-xs border flex flex-col justify-between transition-all duration-500 ease-out motion-reduce:transition-none hover:-translate-y-1.5 hover:shadow-xl ${
                        isActive
                          ? "border-[#7a102f]/15 shadow-lg -translate-y-1"
                          : "border-gray-100 shadow-xs"
                      }`}
                    >
                      <span
                        className={`absolute top-0 left-0 h-0.5 w-full bg-[#7a102f] origin-left transition-transform duration-700 ease-out motion-reduce:transition-none ${
                          isActive ? "scale-x-100" : "scale-x-0"
                        }`}
                      />

                      <div>
                        <div className="flex items-center gap-1 mb-5">
                          {Array.from({ length: item.rating || 5 }).map((_, idx) => (
                            <Star
                              key={idx}
                              size={14}
                              className={`fill-[#7a102f] text-[#7a102f] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none ${
                                isVisible
                                  ? "opacity-100 scale-100 rotate-0"
                                  : "opacity-0 scale-0 -rotate-45"
                              }`}
                              style={{
                                transitionDelay: isVisible
                                  ? `${600 + order * 160 + idx * 80}ms`
                                  : "0ms",
                              }}
                            />
                          ))}
                        </div>

                        <p className="text-xs sm:text-[13px] text-gray-600 font-normal leading-relaxed mb-6">
                          {item.quote}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                        <div className="flex items-center gap-3">
                          <div
                            className={`relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden flex-shrink-0 border shadow-2xs transition-all duration-500 motion-reduce:transition-none ${
                              isActive
                                ? "border-[#7a102f]/40 ring-2 ring-[#7a102f]/10 ring-offset-2"
                                : "border-gray-100"
                            }`}
                          >
                            <Image
                              src={item.image}
                              alt={item.imageAlt || item.name}
                              fill
                              sizes="44px"
                              className={`object-cover transition-transform duration-700 ease-out motion-reduce:transition-none ${
                                isActive ? "scale-110" : "scale-100"
                              }`}
                            />
                          </div>
                          <div>
                            <h3
                              className={`font-serif text-sm sm:text-base font-medium leading-tight transition-colors duration-300 group-hover:text-[#7a102f] ${
                                isActive ? "text-[#7a102f]" : "text-gray-900"
                              }`}
                            >
                              {item.name}
                            </h3>
                            <p className="text-[11px] sm:text-xs text-gray-500 font-light mt-0.5">
                              {item.role}
                            </p>
                          </div>
                        </div>

                        <span
                          className={`font-serif text-4xl sm:text-5xl leading-none select-none -mb-2 transition-all duration-700 ease-out motion-reduce:transition-none ${
                            isActive ? "text-rose-300 -translate-y-1" : "text-rose-200/80"
                          } ${
                            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                          }`}
                          style={{
                            transitionDelay: isVisible ? `${900 + order * 160}ms` : "0ms",
                          }}
                          aria-hidden="true"
                        >
                          &rdquo;
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className={`flex items-center justify-center gap-5 mt-12 sm:mt-14 transition-all duration-1000 delay-1000 ease-out motion-reduce:transition-none ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            <button
              type="button"
              onClick={() => move(-1)}
              aria-label="Previous testimonial"
              className="group/arrow flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-all duration-300 ease-out hover:border-[#7a102f] hover:bg-[#7a102f] hover:text-white active:scale-90 motion-reduce:transition-none"
            >
              <ChevronLeft
                size={16}
                className="transition-transform duration-300 group-hover/arrow:-translate-x-0.5"
              />
            </button>

            <div className="flex items-center gap-2">
              {items.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => jumpTo(idx)}
                  aria-label={`Go to testimonial ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-500 ease-out motion-reduce:transition-none ${
                    centerIndex === idx
                      ? "w-6 bg-[#7a102f]"
                      : "w-1.5 bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => move(1)}
              aria-label="Next testimonial"
              className="group/arrow flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-all duration-300 ease-out hover:border-[#7a102f] hover:bg-[#7a102f] hover:text-white active:scale-90 motion-reduce:transition-none"
            >
              <ChevronRight
                size={16}
                className="transition-transform duration-300 group-hover/arrow:translate-x-0.5"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
