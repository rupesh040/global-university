"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import contentData from "@/data/content.json";
import { HeroVariant } from "@/data/type";

interface HeroProps {
  data?: HeroVariant;
}

const OUT = "ease-[cubic-bezier(0.22,1,0.36,1)]";
const IO = "ease-[cubic-bezier(0.76,0,0.24,1)]";

export default function Hero({ data }: HeroProps) {
  const heroData: HeroVariant =
    data || contentData.UnipixUniversity.sections.Hero.variants.UnipixHero1;

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setIsLoaded(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const lines =
    heroData.headingLines && heroData.headingLines.length > 0
      ? heroData.headingLines
      : [heroData.heading];

  const degreeLinks = heroData.degreeLinks ?? [];
  const buttonDelay = 300 + lines.length * 130 + 100;

  return (
    <section
      id="home"
      className="relative flex min-h-[max(560px,78svh)] w-full items-end overflow-hidden bg-slate-950 sm:min-h-[620px] md:min-h-[680px] lg:min-h-[720px]"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={heroData.backgroundImage}
          alt={heroData.backgroundImageAlt || heroData.heading}
          fill
          priority
          sizes="100vw"
          className={`object-cover object-center transition-transform duration-[1800ms] motion-reduce:transition-none ${OUT} ${
            isLoaded ? "scale-100" : "scale-110"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/10 sm:from-black/75 sm:via-black/25 sm:to-transparent lg:from-black/65 lg:via-black/15" />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-5 pb-10 pt-24 sm:px-8 sm:py-18 lg:px-10">
        <div className="flex flex-col justify-between gap-8 sm:gap-10 lg:flex-row lg:items-end lg:gap-16">
          <div className="max-w-2xl space-y-4 sm:space-y-6">
            {heroData.tagline && (
              <div
                className={`inline-flex items-center gap-2 text-xs font-medium tracking-wide text-white/90 transition-all duration-1000 motion-reduce:transition-none sm:text-sm ${OUT} ${
                  isLoaded ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                }`}
                style={{ transitionDelay: "150ms" }}
              >
                <Sparkles size={14} className="text-white/80" />
                <span className="font-light lowercase tracking-wider">
                  {heroData.tagline}
                </span>
              </div>
            )}

            <h1 className="text-balance font-serif text-[2rem] font-normal leading-[1.12] tracking-tight text-white min-[400px]:text-4xl sm:text-5xl md:text-6xl lg:text-[64px]">
              {lines.map((line, idx) => (
                <span
                  key={idx}
                  className="-mb-[0.12em] block overflow-hidden pb-[0.12em]"
                >
                  <span
                    className={`block transition-transform duration-1000 motion-reduce:transition-none ${OUT} ${
                      isLoaded ? "translate-y-0" : "translate-y-full"
                    }`}
                    style={{ transitionDelay: `${300 + idx * 130}ms` }}
                  >
                    {line}
                  </span>
                </span>
              ))}
            </h1>

            <div
              className={`pt-1 transition-all duration-1000 motion-reduce:transition-none sm:pt-2 ${OUT} ${
                isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: `${buttonDelay}ms` }}
            >
              <Link
                href={heroData.ctaButton.href}
                className="group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-sm bg-[#800020] px-6 py-3.5 text-sm font-medium text-white shadow-lg transition-[transform,box-shadow] duration-300 hover:shadow-2xl active:scale-[0.98] motion-reduce:transition-none sm:inline-flex sm:w-auto sm:text-base"
              >
                <span
                  aria-hidden="true"
                  className={`absolute inset-0 -translate-x-full bg-[#5c0016] transition-transform duration-500 motion-reduce:transition-none ${IO} group-hover:translate-x-0 group-focus-visible:translate-x-0`}
                />
                <span className="relative">{heroData.ctaButton.text}</span>
                <ArrowRight
                  size={16}
                  className="relative transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>

          {degreeLinks.length > 0 && (
            <div
              className={`w-full flex-shrink-0 rounded-sm border border-white/15 bg-black/30 p-4 backdrop-blur-sm transition-all duration-1000 motion-reduce:transition-none sm:p-5 lg:w-72 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none ${OUT} ${
                isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: `${buttonDelay + 100}ms` }}
            >
              {degreeLinks.map((link, index) => (
                <React.Fragment key={link.id}>
                  {index > 0 && (
                    <span
                      aria-hidden="true"
                      className={`my-3 block h-px w-full origin-left bg-white/20 transition-transform duration-1000 motion-reduce:transition-none sm:my-4 ${OUT} ${
                        isLoaded ? "scale-x-100" : "scale-x-0"
                      }`}
                      style={{ transitionDelay: `${650 + index * 120}ms` }}
                    />
                  )}
                  <div
                    className={`transition-all duration-1000 motion-reduce:transition-none ${OUT} ${
                      isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                    }`}
                    style={{ transitionDelay: `${700 + index * 120}ms` }}
                  >
                    <Link href={link.href} className="group block py-1.5">
                      <div className="flex items-center justify-between gap-3">
                        <span className="relative inline-block text-base font-medium text-white transition-colors duration-300 group-hover:text-rose-200 sm:text-xl">
                          {link.title}
                          <span
                            aria-hidden="true"
                            className={`absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-rose-200 transition-transform duration-500 motion-reduce:transition-none ${IO} group-hover:origin-left group-hover:scale-x-100`}
                          />
                        </span>
                        <ArrowRight
                          size={16}
                          aria-hidden="true"
                          className="flex-shrink-0 text-white/60 transition-all duration-300 group-hover:translate-x-1 group-hover:text-rose-200 group-active:translate-x-1 lg:hidden"
                        />
                      </div>
                      <p className="mt-1 text-xs font-light leading-relaxed tracking-wide text-white/75 transition-colors duration-300 group-hover:text-white sm:text-sm">
                        {link.description}
                      </p>
                    </Link>
                  </div>
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
