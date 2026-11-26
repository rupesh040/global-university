"use client";

import React, { useState, useEffect, useRef } from "react";
import contentData from "@/data/content.json";
import { StatsVariant } from "@/data/type";

interface StatsProps {
  data?: StatsVariant;
}

interface CounterProps {
  value: string;
  start: boolean;
  delay: number;
}

const OUT = "ease-[cubic-bezier(0.22,1,0.36,1)]";
const IO = "ease-[cubic-bezier(0.76,0,0.24,1)]";

const rise = (on: boolean) =>
  `transition-all duration-1000 motion-reduce:transition-none ${OUT} ${
    on ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
  }`;

const wait = (on: boolean, ms: number) => ({
  transitionDelay: on ? `${ms}ms` : "0ms",
});

function Counter({ value, start, delay }: CounterProps) {
  const match = value.match(/^(\D*)(\d[\d,]*(?:\.\d+)?)(.*)$/);
  const raw = match ? match[2] : "0";
  const target = parseFloat(raw.replace(/,/g, ""));
  const decimals = (raw.split(".")[1] || "").length;
  const grouped = raw.includes(",");
  const animate = !!match && target > 1;
  const [current, setCurrent] = useState(animate ? 0 : target);

  useEffect(() => {
    if (!animate || !start) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCurrent(target);
      return;
    }
    let frame = 0;
    let begin = 0;
    const timer = window.setTimeout(() => {
      const tick = (now: number) => {
        if (!begin) begin = now;
        const progress = Math.min((now - begin) / 1600, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        setCurrent(target * eased);
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, delay);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [animate, start, target, delay]);

  if (!match) return <>{value}</>;

  const formatted = current.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: grouped,
  });

  return (
    <>
      {match[1]}
      {formatted}
      {match[3]}
    </>
  );
}

export default function Stats({ data }: StatsProps) {
  const statsData: StatsVariant =
    data || (contentData.UnipixUniversity.sections as any).Stats.variants.UnipixStats1;

  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

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
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full overflow-hidden bg-white py-18">
      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-10">
        <div
          className={`relative grid grid-cols-1 bg-[#7a102f] text-white transition-[clip-path] duration-[1400ms] motion-reduce:transition-none md:grid-cols-3 ${IO}`}
          style={{
            clipPath: inView ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
          }}
        >
          {statsData.items.map((item, index) => {
            const base = 500 + index * 150;
            return (
              <div
                key={item.id}
                className="group relative overflow-hidden px-6 py-8 sm:px-10 md:py-10 lg:pl-28 lg:pr-8"
              >
                <span
                  aria-hidden="true"
                  className={`absolute inset-0 origin-bottom scale-y-0 bg-white/[0.05] transition-transform duration-700 motion-reduce:transition-none ${IO} group-hover:scale-y-100`}
                />

                {index > 0 && (
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 top-0 h-px w-full origin-left bg-white/15 transition-transform duration-1000 motion-reduce:transition-none md:h-full md:w-px md:origin-top ${OUT} ${
                      inView
                        ? "scale-x-100 md:scale-y-100"
                        : "scale-x-0 md:scale-x-100 md:scale-y-0"
                    }`}
                    style={wait(inView, base)}
                  />
                )}

                <div className="relative">
                  <span className="sr-only">{item.value}</span>
                  <div
                    aria-hidden="true"
                    className="-mb-[0.1em] block overflow-hidden pb-[0.1em] font-serif text-4xl font-normal leading-tight tracking-tight sm:text-5xl lg:text-[58px]"
                  >
                    <span
                      className={`block transition-transform duration-1000 motion-reduce:transition-none ${OUT} ${
                        inView ? "translate-y-0" : "translate-y-full"
                      }`}
                      style={wait(inView, base)}
                    >
                      <Counter
                        value={item.value}
                        start={inView}
                        delay={base + 150}
                      />
                    </span>
                  </div>
                </div>

                <div className="relative mt-3 space-y-2">
                  {item.lines.map((line, idx) => (
                    <p
                      key={idx}
                      className={`text-xs font-light leading-relaxed tracking-wide text-white/90 sm:text-sm md:text-[15px] ${rise(
                        inView
                      )}`}
                      style={wait(inView, base + 300 + idx * 90)}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
