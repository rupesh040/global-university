"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import contentData from "@/data/content.json";
import { HeaderVariant, NavLinkItem } from "@/data/type";

interface NavbarProps {
  data?: HeaderVariant;
}

const EASE = "ease-[cubic-bezier(0.76,0,0.24,1)]";

export default function Navbar({ data }: NavbarProps) {
  const headerData: HeaderVariant =
    data || contentData.UnipixUniversity.sections.Header.variants.UnipixHeader1;

  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(
    headerData.links[0]?.href || "#home"
  );
  const progressRef = useRef<HTMLSpanElement>(null);
  const visitingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isVisitingRef = useRef(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    let frame = 0;
    const sectionHrefs = [
      ...headerData.links.map((l) => l.href),
      headerData.buttonHref || "#contact"
    ].filter((href, idx, arr) => href.startsWith("#") && arr.indexOf(href) === idx);

    const update = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setIsScrolled(y > 20);
      if (progressRef.current) {
        const ratio = max > 0 ? Math.min(y / max, 1) : 0;
        progressRef.current.style.transform = `scaleX(${ratio})`;
      }

      if (!isVisitingRef.current) {
        const footerEl = document.querySelector("footer");
        if (footerEl) {
          const footerRect = footerEl.getBoundingClientRect();
          if (footerRect.top <= window.innerHeight * 0.55) {
            setActiveHref(null);
            frame = 0;
            return;
          }
        }

        const triggerY = 140;
        let current: string | null = sectionHrefs[0] || null;
        for (const href of sectionHrefs) {
          const el = document.getElementById(href.slice(1));
          if (el && el.getBoundingClientRect().top <= triggerY) {
            current = href;
          }
        }
        setActiveHref(current);
      }

      frame = 0;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const cancelVisiting = () => {
      isVisitingRef.current = false;
      if (visitingTimerRef.current) {
        clearTimeout(visitingTimerRef.current);
        visitingTimerRef.current = null;
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("wheel", cancelVisiting, { passive: true });
    window.addEventListener("touchstart", cancelVisiting, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("wheel", cancelVisiting);
      window.removeEventListener("touchstart", cancelVisiting);
      if (frame) cancelAnimationFrame(frame);
      if (visitingTimerRef.current) clearTimeout(visitingTimerRef.current);
    };
  }, [headerData.links, headerData.buttonHref]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const closeMenu = () => setIsOpen(false);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    closeMenu();
    if (!href.startsWith("#")) return;
    const target = document.getElementById(href.slice(1));
    if (!target) return;
    e.preventDefault();
    setActiveHref(href);
    isVisitingRef.current = true;
    if (visitingTimerRef.current) clearTimeout(visitingTimerRef.current);
    visitingTimerRef.current = setTimeout(() => {
      isVisitingRef.current = false;
    }, 850);
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.pushState(null, "", href);
  };

  const surface = isOpen
    ? "border-transparent bg-white"
    : isScrolled
    ? "border-transparent bg-white/80 shadow-[0_10px_30px_-15px_rgba(122,16,47,0.25)] backdrop-blur-xl"
    : "border-gray-100 bg-white";

  const lineBase =
    "absolute right-2 top-1/2 -mt-px h-0.5 rounded-full transition-all duration-500 motion-reduce:transition-none";

  return (
    <>
      <header
        className={`sticky top-0 z-[70] w-full transition-[padding] duration-500 motion-reduce:transition-none ${EASE} ${
          isScrolled ? "py-2.5" : "py-4"
        }`}
      >
        <span
          aria-hidden="true"
          className={`absolute inset-0 -z-10 border-b transition-all duration-500 motion-reduce:transition-none ${surface}`}
        />
        <span
          ref={progressRef}
          aria-hidden="true"
          className={`absolute bottom-0 left-0 h-[2px] w-full origin-left bg-[#7a102f] [transform:scaleX(0)] transition-opacity duration-500 ${
            isScrolled && !isOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:px-8">
          <Link
            href={headerData.links[0]?.href || "#home"}
            onClick={(e) =>
              handleLinkClick(e, headerData.links[0]?.href || "#home")
            }
            aria-label={headerData.logoAlt}
            className={`relative block h-11 w-44 justify-self-start transition-all duration-700 motion-reduce:transition-none sm:h-12 sm:w-48 ${EASE} ${
              mounted ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
            }`}
          >
            <Image
              src={headerData.logo}
              alt={headerData.logoAlt}
              fill
              sizes="(max-width: 768px) 180px, 200px"
              className="object-contain object-left"
              priority
            />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex xl:gap-2">
            {headerData.links.map((link: NavLinkItem, i: number) => {
              const isActive = activeHref === link.href;
              return (
                <div
                  key={link.name}
                  className={`transition-all duration-700 motion-reduce:transition-none ${EASE} ${
                    mounted ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
                  }`}
                  style={{ transitionDelay: mounted ? `${180 + i * 70}ms` : "0ms" }}
                >
                  <Link
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    aria-current={isActive ? "page" : undefined}
                    className="group relative block px-3.5 py-2 text-[15px] font-medium tracking-wide whitespace-nowrap"
                  >
                    <span className="relative block overflow-hidden leading-[1.7]">
                      <span
                        className={`block transition-transform duration-500 motion-reduce:transition-none ${EASE} group-hover:-translate-y-full group-focus-visible:-translate-y-full ${
                          isActive ? "text-[#7a102f]" : "text-gray-700"
                        }`}
                      >
                        {link.name}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`absolute inset-0 block translate-y-full text-[#7a102f] transition-transform duration-500 motion-reduce:transition-none ${EASE} group-hover:translate-y-0 group-focus-visible:translate-y-0`}
                      >
                        {link.name}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className={`absolute bottom-1.5 left-3.5 right-3.5 h-[2px] rounded-full bg-[#7a102f] transition-transform duration-500 motion-reduce:transition-none ${EASE} ${
                        isActive
                          ? "origin-left scale-x-100"
                          : "origin-right scale-x-0 group-hover:origin-left group-hover:scale-x-100 group-focus-visible:origin-left group-focus-visible:scale-x-100"
                      }`}
                    />
                  </Link>
                </div>
              );
            })}
          </nav>

          <div
            className={`hidden justify-self-end transition-all duration-700 motion-reduce:transition-none lg:block ${EASE} ${
              mounted ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
            }`}
            style={{
              transitionDelay: mounted ? `${180 + headerData.links.length * 70}ms` : "0ms",
            }}
          >
            <Link
              href={headerData.buttonHref || "#contact"}
              onClick={(e) =>
                handleLinkClick(e, headerData.buttonHref || "#contact")
              }
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[#7a102f] px-6 py-2.5 text-[15px] font-medium tracking-wide text-white shadow-sm transition-[transform,box-shadow] duration-300 hover:shadow-lg hover:shadow-[#7a102f]/25 active:scale-[0.97] motion-reduce:transition-none"
            >
              <span
                aria-hidden="true"
                className={`absolute inset-0 -translate-x-full bg-[#4f0a1f] transition-transform duration-500 motion-reduce:transition-none ${EASE} group-hover:translate-x-0 group-focus-visible:translate-x-0`}
              />
              <span className="relative">{headerData.button || "Contact Us"}</span>
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            className={`relative h-10 w-10 rounded-lg transition-opacity duration-700 motion-reduce:transition-none lg:hidden ${EASE} ${
              mounted ? "opacity-100" : "opacity-0"
            }`}
          >
            <span
              className={`${lineBase} bg-[#7a102f] ${
                isOpen ? "w-6 translate-y-0 rotate-45" : "w-6 -translate-y-[7px] rotate-0"
              }`}
            />
            <span
              className={`${lineBase} ${
                isOpen ? "w-0 bg-[#7a102f] opacity-0" : "w-4 bg-gray-800 opacity-100"
              }`}
            />
            <span
              className={`${lineBase} bg-[#7a102f] ${
                isOpen ? "w-6 translate-y-0 -rotate-45" : "w-5 translate-y-[7px] rotate-0"
              }`}
            />
          </button>
        </div>
      </header>

      <div
        aria-hidden={!isOpen}
        className={`fixed inset-0 z-[60] bg-white transition-[clip-path] duration-700 motion-reduce:transition-none lg:hidden ${EASE} ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        style={{
          clipPath: isOpen
            ? "circle(150vmax at calc(100% - 2.5rem) 2.4rem)"
            : "circle(0px at calc(100% - 2.5rem) 2.4rem)",
        }}
      >
        <div className="mx-auto flex h-full w-full max-w-[1280px] flex-col justify-between overflow-y-auto px-4 pb-10 pt-28 sm:px-6">
          <ul>
            {headerData.links.map((link: NavLinkItem, i: number) => {
              const isActive = activeHref === link.href;
              return (
                <li key={link.name} className="overflow-hidden border-b border-gray-100">
                  <Link
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    tabIndex={isOpen ? 0 : -1}
                    className={`group block py-4 transition-transform duration-700 motion-reduce:transition-none ${EASE} ${
                      isOpen ? "translate-y-0" : "translate-y-full"
                    }`}
                    style={{ transitionDelay: isOpen ? `${280 + i * 70}ms` : "0ms" }}
                  >
                    <span
                      className={`block text-2xl sm:text-3xl font-semibold tracking-tight transition-all duration-500 motion-reduce:transition-none group-hover:translate-x-2 ${
                        isActive
                          ? "text-[#7a102f]"
                          : "text-gray-900 group-hover:text-[#7a102f]"
                      }`}
                    >
                      {link.name}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div
            className={`pt-6 transition-all duration-700 motion-reduce:transition-none ${EASE} ${
              isOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
            style={{
              transitionDelay: isOpen ? `${280 + headerData.links.length * 70}ms` : "0ms",
            }}
          >
            <Link
              href={headerData.buttonHref || "#contact"}
              onClick={(e) =>
                handleLinkClick(e, headerData.buttonHref || "#contact")
              }
              tabIndex={isOpen ? 0 : -1}
              className="flex w-full items-center justify-center rounded-xl bg-[#7a102f] px-5 py-3.5 font-medium text-white shadow-md transition-all duration-200 hover:bg-[#630b24] hover:shadow-lg active:scale-[0.98]"
            >
              {headerData.button || "Contact Us"}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
