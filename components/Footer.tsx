"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUp,
  MapPin,
  Phone,
  Mail,
  CheckCircle2
} from "lucide-react";
import contentData from "@/data/content.json";
import { FooterVariant } from "@/data/type";

interface FooterProps {
  data?: FooterVariant;
}

const OUT = "ease-[cubic-bezier(0.22,1,0.36,1)]";
const SPRING = "ease-[cubic-bezier(0.34,1.56,0.64,1)]";

const wait = (on: boolean, ms: number) => ({
  transitionDelay: on ? `${ms}ms` : "0ms"
});

export default function Footer({ data }: FooterProps) {
  const footerData: FooterVariant =
    data || contentData.UnipixUniversity.sections.Footer.variants.UnipixFooter1;

  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [subscribedIn, setSubscribedIn] = useState(false);

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
      { threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!subscribed) {
      setSubscribedIn(false);
      return;
    }
    const timer = setTimeout(() => setSubscribedIn(true), 30);
    return () => clearTimeout(timer);
  }, [subscribed]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  const columnSpan =
    footerData.columns.length >= 3 ? "lg:col-span-2" : "lg:col-span-3";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (!href.startsWith("#")) return;
    const target = document.getElementById(href.slice(1));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.pushState(null, "", href);
  };

  const rise = (on: boolean) =>
    `transition-[opacity,transform,filter] duration-1000 motion-reduce:transition-none ${OUT} ${
      on ? "translate-y-0 opacity-100 blur-none" : "translate-y-5 opacity-0 blur-sm"
    }`;

  const slide = (on: boolean) =>
    `transition-[opacity,transform] duration-800 motion-reduce:transition-none ${OUT} ${
      on ? "translate-x-0 opacity-100" : "-translate-x-5 opacity-0"
    }`;

  const draw = (on: boolean) =>
    `origin-left transition-transform duration-1200 ease-out motion-reduce:transition-none ${
      on ? "scale-x-100" : "scale-x-0"
    }`;

  return (
    <footer
      ref={sectionRef}
      className="relative bg-[#181818] text-gray-300 overflow-hidden"
    >
      <div className="relative">
        <span
          className={`absolute bottom-0 left-0 h-px w-full bg-white/10 ${draw(inView)}`}
          style={wait(inView, 200)}
        />

        <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-12 py-10 sm:py-12 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <h2
            className={`font-serif text-2xl sm:text-3xl md:text-[36px] font-normal text-white tracking-tight ${rise(
              inView
            )}`}
            style={wait(inView, 100)}
          >
            {footerData.newsletter.title}
          </h2>

          <div
            className={`w-full lg:w-auto ${rise(inView)}`}
            style={wait(inView, 280)}
          >
            {subscribed ? (
              <div
                className={`flex items-center gap-2.5 text-sm text-rose-200 bg-white/5 border border-white/15 px-5 py-3.5 rounded-xs transition-all duration-700 motion-reduce:transition-none ${OUT} ${
                  subscribedIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                }`}
              >
                <CheckCircle2
                  size={18}
                  className={`text-rose-400 flex-shrink-0 transition-all duration-700 motion-reduce:transition-none ${SPRING} ${
                    subscribedIn ? "scale-100 rotate-0" : "scale-0 -rotate-45"
                  }`}
                />
                <span>{footerData.newsletter.successMessage}</span>
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6"
              >
                <div className="group/field relative sm:w-64 lg:w-72">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={footerData.newsletter.placeholder}
                    className="w-full bg-transparent text-white placeholder:text-gray-400 text-sm py-3 px-1 focus:outline-none"
                  />
                  <span className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-white/20" />
                  <span className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-500 ease-out group-focus-within/field:scale-x-100 motion-reduce:transition-none" />
                </div>

                <button
                  type="submit"
                  className="group relative overflow-hidden inline-flex items-center justify-center gap-2.5 bg-white text-gray-900 hover:text-white px-7 py-3.5 text-sm font-medium rounded-xs shadow-sm hover:shadow-lg transition-[color,box-shadow] duration-300 cursor-pointer"
                >
                  <span className="absolute inset-0 bg-[#7a102f] origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100 motion-reduce:transition-none" />
                  <span className="relative">{footerData.newsletter.buttonText}</span>
                  <ArrowRight
                    size={15}
                    className="relative transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-12 py-18">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          <div className="lg:col-span-6 space-y-5">
            <div className={rise(inView)} style={wait(inView, 150)}>
              <Link
                href="/"
                className="inline-block transition-transform duration-300 hover:scale-[1.02]"
              >
                <div className="relative h-16 w-60 overflow-hidden">
                  <Image
                    src={footerData.logo}
                    alt={footerData.logoAlt}
                    fill
                    sizes="240px"
                    className="object-contain object-left brightness-0 invert"
                  />
                </div>
              </Link>
            </div>

            <p
              className={`text-sm text-gray-400 font-light leading-relaxed max-w-xs ${rise(
                inView
              )}`}
              style={wait(inView, 250)}
            >
              {footerData.description}
            </p>

            <div className="space-y-3 pt-1 text-sm">
              <div className={slide(inView)} style={wait(inView, 350)}>
                <div className="flex items-start gap-2.5 text-gray-400">
                  <MapPin
                    size={16}
                    className="text-gray-300 flex-shrink-0 mt-0.5"
                  />
                  <span className="font-light">{footerData.contact.address}</span>
                </div>
              </div>

              <div className={slide(inView)} style={wait(inView, 440)}>
                <a
                  href={`tel:${footerData.contact.phone}`}
                  className="flex items-center gap-2.5 text-gray-400 hover:text-white transition-colors duration-200 group"
                >
                  <Phone
                    size={15}
                    className="text-gray-300 group-hover:text-rose-300 flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                  />
                  <span className="font-light">{footerData.contact.phone}</span>
                </a>
              </div>

              <div className={slide(inView)} style={wait(inView, 530)}>
                <a
                  href={`mailto:${footerData.contact.email}`}
                  className="flex items-center gap-2.5 text-gray-400 hover:text-white transition-colors duration-200 group"
                >
                  <Mail
                    size={15}
                    className="text-gray-300 group-hover:text-rose-300 flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                  />
                  <span className="font-light">{footerData.contact.email}</span>
                </a>
              </div>
            </div>
          </div>

          {footerData.columns.map((column, colIdx) => {
            const base = 250 + colIdx * 100;

            return (
              <div key={column.id} className={columnSpan}>
                <h3
                  className={`font-serif text-lg sm:text-xl font-normal text-white mb-6 ${rise(
                    inView
                  )}`}
                  style={wait(inView, base)}
                >
                  {column.title}
                </h3>
                <ul className="space-y-3.5">
                  {column.links.map((link, linkIdx) => (
                    <li
                      key={link.name}
                      className={slide(inView)}
                      style={wait(inView, base + 120 + linkIdx * 70)}
                    >
                      <Link
                        href={link.href}
                        onClick={(e) => handleLinkClick(e, link.href)}
                        className="group/link relative text-sm text-gray-400 hover:text-white font-light inline-block transition-all duration-300 hover:translate-x-1"
                      >
                        {link.name}
                        <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-rose-300/70 transition-transform duration-300 ease-out group-hover/link:scale-x-100 motion-reduce:transition-none" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative">
        <span
          className={`absolute top-0 left-0 h-px w-full bg-white/10 ${draw(inView)}`}
          style={wait(inView, 400)}
        />

        <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-12 py-6 flex items-center justify-center relative">
          <p
            className={`text-xs sm:text-sm text-gray-400 font-light text-center ${rise(
              inView
            )}`}
            style={wait(inView, 700)}
          >
            {footerData.copyrightPrefix}{" "}
            <span className="text-white font-normal">
              {footerData.copyrightBrand}
            </span>
          </p>

          <div
            className={`absolute right-5 sm:right-8 lg:right-12 -top-5 sm:top-1/2 sm:-translate-y-1/2 transition-[opacity,scale] duration-700 motion-reduce:transition-none ${SPRING} ${
              inView ? "scale-100 opacity-100" : "scale-0 opacity-0"
            }`}
            style={wait(inView, 850)}
          >
            <button
              type="button"
              onClick={scrollToTop}
              aria-label={footerData.scrollToTopLabel}
              className="group relative overflow-hidden w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#800020] hover:bg-[#9c1637] text-white shadow-lg hover:shadow-xl transition-[background-color,box-shadow,scale] duration-300 hover:scale-110 cursor-pointer"
            >
              <span
                className={`absolute inset-0 flex items-center justify-center transition-transform duration-500 motion-reduce:transition-none ${OUT} group-hover:-translate-y-full`}
              >
                <ArrowUp size={18} />
              </span>
              <span
                aria-hidden="true"
                className={`absolute inset-0 flex items-center justify-center translate-y-full transition-transform duration-500 motion-reduce:transition-none ${OUT} group-hover:translate-y-0`}
              >
                <ArrowUp size={18} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
