"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  GraduationCap,
  Landmark,
  type LucideIcon,
} from "lucide-react";
import contentData from "@/data/content.json";
import { AboutVariant } from "@/data/type";

interface AboutProps {
  data?: AboutVariant;
}

const OUT = "ease-[cubic-bezier(0.22,1,0.36,1)]";
const IO = "ease-[cubic-bezier(0.76,0,0.24,1)]";

const icons: Record<string, LucideIcon> = {
  "graduation-cap": GraduationCap,
  landmark: Landmark,
};

const rise = (on: boolean) =>
  `transition-all duration-1000 motion-reduce:transition-none ${OUT} ${
    on ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
  }`;

const wait = (on: boolean, ms: number) => ({
  transitionDelay: on ? `${ms}ms` : "0ms",
});

export default function About({ data }: AboutProps) {
  const aboutData: AboutVariant =
    data || contentData.UnipixUniversity.sections.About.variants.UnipixAbout1;

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

  const images = [
    {
      src: aboutData.primaryImage,
      alt: aboutData.primaryImageAlt || aboutData.heading,
      offset: "mt-6 sm:mt-8 lg:mt-10",
      hidden: "inset(0 0 100% 0)",
      delay: 0,
    },
    {
      src: aboutData.secondaryImage,
      alt: aboutData.secondaryImageAlt || aboutData.heading,
      offset: "",
      hidden: "inset(100% 0 0 0)",
      delay: 150,
    },
  ];

  const features = aboutData.features ?? [];
  const buttonDelay = 600 + features.length * 120 + 120;

  return (
    <section id="about" ref={sectionRef} className="overflow-hidden bg-white py-18">
      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="relative lg:col-span-5">
            <div className="relative grid grid-cols-[1.2fr_1fr] items-start gap-3 sm:gap-4">
              {images.map((image) => (
                <div
                  key={image.src}
                  className={`group relative h-[320px] overflow-hidden transition-[clip-path] duration-[1400ms] motion-reduce:transition-none sm:h-[400px] lg:h-[430px] ${OUT} ${image.offset}`}
                  style={{
                    clipPath: inView ? "inset(0 0 0 0)" : image.hidden,
                    ...wait(inView, image.delay),
                  }}
                >
                  <div
                    className={`absolute inset-0 transition-transform duration-[1800ms] motion-reduce:transition-none ${OUT} ${
                      inView ? "scale-100" : "scale-125"
                    }`}
                    style={wait(inView, image.delay)}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 50vw, 20vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                </div>
              ))}

              {aboutData.badge && (
                <div className="absolute left-[54.5%] top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
                  <div
                    className={`transition-all duration-1000 motion-reduce:transition-none ${OUT} ${
                      inView
                        ? "rotate-0 scale-100 opacity-100"
                        : "-rotate-90 scale-50 opacity-0"
                    }`}
                    style={wait(inView, 900)}
                  >
                    <Link
                      href={aboutData.badge.href}
                      aria-label={aboutData.badge.text}
                      className="group relative flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-[#7a102f] shadow-xl transition-transform duration-300 hover:scale-105 sm:h-32 sm:w-32 lg:h-36 lg:w-36"
                    >
                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                        <svg
                          viewBox="0 0 100 100"
                          className="h-full w-full animate-[spin_14s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none"
                        >
                          <path
                            id="aboutBadgePath"
                            d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                            fill="none"
                          />
                          <text className="fill-white text-[8.5px] font-medium tracking-[0.12em]">
                            <textPath href="#aboutBadgePath" startOffset="0%">
                              {aboutData.badge.text}
                            </textPath>
                          </text>
                        </svg>
                      </div>
                      <div className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-transform duration-300 group-hover:scale-110 sm:h-11 sm:w-11">
                        <ArrowUpRight
                          size={20}
                          className="text-white transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6 lg:col-span-6 lg:col-start-7">
            {aboutData.tagline && (
              <div
                className={`inline-flex items-center gap-2 text-xs font-medium tracking-wide text-[#7a102f] sm:text-sm ${rise(
                  inView
                )}`}
                style={wait(inView, 200)}
              >
                <GraduationCap size={16} className="text-[#7a102f]" />
                <span className="lowercase tracking-wider">
                  {aboutData.tagline}
                </span>
              </div>
            )}

            <h2 className="font-serif text-3xl font-normal leading-[1.15] tracking-tight text-gray-900 sm:text-4xl lg:text-[44px]">
              <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
                <span
                  className={`block transition-transform duration-1000 motion-reduce:transition-none ${OUT} ${
                    inView ? "translate-y-0" : "translate-y-full"
                  }`}
                  style={wait(inView, 300)}
                >
                  {aboutData.heading}
                </span>
              </span>
            </h2>

            <div
              className={`space-y-4 text-sm leading-relaxed text-gray-600 sm:text-[15px] ${rise(
                inView
              )}`}
              style={wait(inView, 450)}
            >
              {aboutData.paragraphs && aboutData.paragraphs.length > 0 ? (
                aboutData.paragraphs.map((p, idx) => <p key={idx}>{p}</p>)
              ) : (
                <p>{aboutData.description}</p>
              )}
            </div>

            {features.length > 0 && (
              <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2 sm:gap-4">
                {features.map((feature, idx) => {
                  const Icon = icons[feature.icon] ?? GraduationCap;
                  return (
                    <div
                      key={feature.id}
                      className={rise(inView)}
                      style={wait(inView, 600 + idx * 120)}
                    >
                      <div className="group relative flex items-center gap-4 overflow-hidden border border-[#7a102f]/30 bg-white p-4 transition-colors duration-500 hover:border-[#7a102f] sm:p-5">
                        <span
                          aria-hidden="true"
                          className={`absolute inset-0 origin-bottom scale-y-0 bg-[#7a102f] transition-transform duration-500 motion-reduce:transition-none ${IO} group-hover:scale-y-100`}
                        />
                        <span className="relative flex-shrink-0 text-[#7a102f] transition-colors duration-500 group-hover:text-white">
                          <Icon size={30} className="stroke-[1.5]" />
                        </span>
                        <h3 className="relative text-[13px] font-medium leading-snug text-gray-800 transition-colors duration-500 group-hover:text-white sm:text-sm">
                          <span className="block">{feature.title}</span>
                          {feature.subtitle && (
                            <span className="block">{feature.subtitle}</span>
                          )}
                        </h3>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className={`pt-2 ${rise(inView)}`} style={wait(inView, buttonDelay)}>
              <Link
                href={aboutData.ctaButton.href}
                className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-xs bg-[#7a102f] px-6 py-3.5 text-sm font-medium text-white shadow-md transition-[transform,box-shadow] duration-300 hover:shadow-xl active:scale-[0.98] motion-reduce:transition-none sm:text-base"
              >
                <span
                  aria-hidden="true"
                  className={`absolute inset-0 -translate-x-full bg-[#4f0a1f] transition-transform duration-500 motion-reduce:transition-none ${IO} group-hover:translate-x-0 group-focus-visible:translate-x-0`}
                />
                <span className="relative">{aboutData.ctaButton.text}</span>
                <ArrowUpRight
                  size={16}
                  className="relative transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
