"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import contentData from "@/data/content.json";
import { AcademicsVariant } from "@/data/type";

interface AcademicsProps {
  data?: AcademicsVariant;
}

const OUT = "ease-[cubic-bezier(0.22,1,0.36,1)]";
const IO = "ease-[cubic-bezier(0.76,0,0.24,1)]";

const wait = (on: boolean, ms: number) => ({
  transitionDelay: on ? `${ms}ms` : "0ms",
});

export default function Academics({ data }: AcademicsProps) {
  const academicsData: AcademicsVariant =
    data || contentData.UnipixUniversity.sections.Academics.variants.UnipixAcademics1;

  const defaultFeaturedId =
    academicsData.categories.find((c) => c.isFeatured)?.id ||
    academicsData.categories[1]?.id ||
    academicsData.categories[0]?.id;

  const [activeCategoryId, setActiveCategoryId] = useState<string>(defaultFeaturedId);
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
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const count = academicsData.categories.length;
  const activeIndex = Math.max(
    academicsData.categories.findIndex((c) => c.id === activeCategoryId),
    0
  );

  return (
    <section id="academics" ref={sectionRef} className="overflow-hidden bg-white py-18">
      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-10">
        <div className="mb-10 text-center sm:mb-14">
          <h2 className="font-serif text-3xl font-normal leading-tight tracking-tight text-gray-900 sm:text-4xl md:text-[44px]">
            <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
              <span
                className={`block transition-transform duration-1000 motion-reduce:transition-none ${OUT} ${
                  inView ? "translate-y-0" : "translate-y-full"
                }`}
              >
                {academicsData.heading}
              </span>
            </span>
          </h2>
          {academicsData.description && (
            <p
              className={`mx-auto mt-3 max-w-2xl text-sm font-light text-gray-500 transition-all duration-1000 motion-reduce:transition-none sm:text-base ${OUT} ${
                inView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              }`}
              style={wait(inView, 200)}
            >
              {academicsData.description}
            </p>
          )}
        </div>

        <div
          className={`relative grid grid-cols-1 bg-[#f5f5f5] transition-opacity duration-1000 motion-reduce:transition-none md:grid-cols-3 ${OUT} ${
            inView ? "opacity-100" : "opacity-0"
          }`}
          style={wait(inView, 150)}
        >
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-y-0 left-0 z-0 hidden transition-transform duration-700 motion-reduce:transition-none md:block ${IO}`}
            style={{
              width: `${100 / count}%`,
              transform: `translateX(${activeIndex * 100}%)`,
            }}
          >
            <div
              className={`h-full w-full bg-[#7a102f] transition-[clip-path] duration-[1200ms] motion-reduce:transition-none ${IO}`}
              style={{
                clipPath: inView ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
                ...wait(inView, 350),
              }}
            />
          </div>

          {academicsData.categories.map((category, catIndex) => {
            const isFeatured = activeCategoryId === category.id;
            const base = 550 + catIndex * 130;

            return (
              <div
                key={category.id}
                onMouseEnter={() => setActiveCategoryId(category.id)}
                onFocus={() => setActiveCategoryId(category.id)}
                className={`relative z-10 flex flex-col p-8 transition-colors duration-700 motion-reduce:transition-none sm:p-10 lg:px-12 lg:py-14 ${IO} ${
                  isFeatured ? "text-white max-md:bg-[#7a102f]" : "text-gray-900"
                }`}
              >
                <h3 className="mb-6 font-serif text-2xl font-normal tracking-tight sm:mb-7 sm:text-3xl">
                  <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
                    <span
                      className={`block transition-transform duration-1000 motion-reduce:transition-none ${OUT} ${
                        inView ? "translate-y-0" : "translate-y-full"
                      }`}
                      style={wait(inView, base)}
                    >
                      {category.title}
                    </span>
                  </span>
                </h3>

                <div className="flex flex-col items-stretch space-y-3.5">
                  {category.programs.map((program, progIndex) => (
                    <div
                      key={program.id}
                      className={`transition-[clip-path] duration-1000 motion-reduce:transition-none ${OUT}`}
                      style={{
                        clipPath: inView
                          ? "inset(-4px -4px -4px -4px)"
                          : "inset(-4px 100% -4px -4px)",
                        ...wait(inView, base + 150 + progIndex * 80),
                      }}
                    >
                      <Link
                        href={program.href}
                        className={`group relative flex min-h-12 w-full items-center justify-between gap-3 overflow-hidden rounded-xs border px-5 py-3 text-xs font-normal transition-colors duration-500 motion-reduce:transition-none sm:text-sm ${
                          isFeatured
                            ? "border-white/40 text-white hover:border-white hover:text-[#7a102f]"
                            : "border-gray-400/80 text-gray-800 hover:border-[#7a102f] hover:text-white"
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className={`absolute inset-0 -translate-x-full transition-transform duration-500 motion-reduce:transition-none ${IO} group-hover:translate-x-0 group-focus-visible:translate-x-0 ${
                            isFeatured ? "bg-white" : "bg-[#7a102f]"
                          }`}
                        />
                        <span className="relative leading-snug">{program.name}</span>
                        <ArrowRight
                          size={14}
                          className="relative flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </Link>
                    </div>
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
