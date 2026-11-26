"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Sparkles } from "lucide-react";
import contentData from "@/data/content.json";
import { FAQVariant } from "@/data/type";

interface FAQProps {
  data?: FAQVariant;
}

export default function FAQ({ data }: FAQProps) {
  const faqData: FAQVariant =
    data || (contentData.UnipixUniversity.sections as any).FAQ.variants.UnipixFAQ1;

  const sectionRef = useRef<HTMLElement>(null);
  const settleRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [openId, setOpenId] = useState<string | null>(faqData.items[0]?.id || "1");
  const [isVisible, setIsVisible] = useState(false);
  const [isSettled, setIsSettled] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          settleRef.current = setTimeout(() => setIsSettled(true), 2400);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (settleRef.current) clearTimeout(settleRef.current);
    };
  }, []);

  const delay = (ms: number) => (isVisible && !isSettled ? `${ms}ms` : "0ms");

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="py-18 bg-white overflow-hidden border-t border-gray-100"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          {faqData.tagline && (
            <div className="inline-flex items-center gap-2 text-[#7a102f] text-xs sm:text-sm font-semibold tracking-wide mb-2.5">
              <Sparkles
                size={14}
                className={`text-[#7a102f] transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none ${
                  isVisible ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-0 -rotate-90"
                }`}
              />
              <span
                className={`lowercase tracking-wider transition-all duration-1000 ease-out motion-reduce:transition-none ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"
                }`}
                style={{ transitionDelay: delay(150) }}
              >
                {faqData.tagline}
              </span>
            </div>
          )}

          <h2
            className={`font-serif text-3xl sm:text-4xl md:text-[44px] font-normal text-gray-900 leading-tight tracking-tight transition-all duration-1000 ease-out motion-reduce:transition-none ${
              isVisible ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-4 blur-sm"
            }`}
            style={{ transitionDelay: delay(200) }}
          >
            {faqData.heading}
          </h2>

          {faqData.description && (
            <p
              className={`mt-3 text-sm sm:text-base text-gray-500 font-light leading-relaxed transition-all duration-1000 ease-out motion-reduce:transition-none ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
              style={{ transitionDelay: delay(350) }}
            >
              {faqData.description}
            </p>
          )}
        </div>

        <div className="relative">
          <span
            className={`absolute top-0 left-0 h-px w-full bg-gray-200 origin-left transition-transform duration-1000 ease-out motion-reduce:transition-none ${
              isVisible ? "scale-x-100" : "scale-x-0"
            }`}
            style={{ transitionDelay: delay(300) }}
          />

          {faqData.items.map((item, index) => {
            const isOpen = openId === item.id;
            const base = 400 + index * 130;

            return (
              <div key={item.id} className="relative group">
                <span
                  className={`absolute bottom-0 left-0 h-px w-full bg-gray-200 origin-left transition-transform duration-1000 ease-out motion-reduce:transition-none ${
                    isVisible ? "scale-x-100" : "scale-x-0"
                  }`}
                  style={{ transitionDelay: delay(base + 200) }}
                />

                <span
                  className={`absolute -inset-x-4 inset-y-0 bg-rose-50/60 origin-left pointer-events-none transition-transform duration-500 ease-out motion-reduce:transition-none ${
                    isOpen ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />

                <span
                  className={`absolute -left-4 top-0 h-full w-0.5 bg-[#7a102f] origin-top pointer-events-none transition-transform duration-500 ease-out motion-reduce:transition-none ${
                    isOpen ? "scale-y-100" : "scale-y-0"
                  }`}
                />

                <div
                  className={`relative py-5 sm:py-6 transition-[opacity,transform,filter] duration-900 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                    isVisible ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-8 blur-sm"
                  }`}
                  style={{ transitionDelay: delay(base) }}
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${item.id}`}
                    className="w-full text-left flex items-start justify-between gap-4 sm:gap-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7a102f]/30 focus-visible:ring-offset-4 rounded-xs"
                  >
                    <div className="flex items-start gap-4 sm:gap-6">
                      <span
                        className={`font-serif text-2xl sm:text-3xl flex-shrink-0 w-8 sm:w-10 transition-all duration-500 ease-out motion-reduce:transition-none ${
                          isVisible ? "opacity-100" : "opacity-0 -translate-x-4"
                        } ${
                          isOpen
                            ? "text-[#7a102f] translate-x-1.5"
                            : "text-gray-300 group-hover:text-[#7a102f]"
                        } ${isVisible && !isOpen ? "translate-x-0" : ""}`}
                        style={{ transitionDelay: delay(base + 150) }}
                      >
                        {item.number}
                      </span>

                      <div className="space-y-2">
                        <h3 className="font-serif text-base sm:text-lg md:text-xl font-normal text-[#7a102f] leading-snug">
                          {item.question}
                        </h3>

                        {item.category && (
                          <span
                            className={`inline-block text-[11px] font-medium text-[#7a102f] px-2 py-0.5 rounded-xs tracking-wide transition-colors duration-500 ${
                              isOpen ? "bg-white" : "bg-rose-50 group-hover:bg-white"
                            }`}
                          >
                            {item.category}
                          </span>
                        )}
                      </div>
                    </div>

                    <div
                      className={`w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 mt-1 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none ${
                        isOpen
                          ? "bg-[#7a102f] text-white border-[#7a102f] rotate-180"
                          : "bg-white text-gray-500 border-gray-200 group-hover:border-[#7a102f] group-hover:text-[#7a102f]"
                      }`}
                    >
                      <ChevronDown size={16} />
                    </div>
                  </button>

                  <div
                    id={`faq-panel-${item.id}`}
                    role="region"
                    aria-hidden={!isOpen}
                    className={`grid transition-[grid-template-rows,opacity,margin] duration-500 ease-in-out motion-reduce:transition-none ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100 mt-3 sm:mt-4"
                        : "grid-rows-[0fr] opacity-0 mt-0"
                    }`}
                  >
                    <div className="overflow-hidden min-h-0 pl-12 sm:pl-16">
                      <p
                        className={`text-xs sm:text-sm text-gray-600 font-light leading-relaxed pr-6 transition-all duration-700 ease-out motion-reduce:transition-none ${
                          isOpen ? "translate-y-0 blur-0 delay-150" : "translate-y-3 blur-xs"
                        }`}
                      >
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
