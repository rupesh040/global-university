"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  ChevronDown
} from "lucide-react";
import contentData from "@/data/content.json";
import { ContactVariant } from "@/data/type";

interface ContactProps {
  data?: ContactVariant;
}

interface FieldShellProps {
  label: string;
  htmlFor: string;
  isVisible: boolean;
  delay: string;
  children: React.ReactNode;
}

const inputClass =
  "w-full px-4 py-3 text-sm bg-gray-50/70 border border-gray-200 rounded-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-gray-300 transition-all duration-300";

function FieldShell({ label, htmlFor, isVisible, delay, children }: FieldShellProps) {
  return (
    <div
      className={`group/field space-y-1.5 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
      style={{ transitionDelay: delay }}
    >
      <label
        htmlFor={htmlFor}
        className="block text-xs font-semibold uppercase tracking-wider text-gray-700 transition-colors duration-300 group-focus-within/field:text-[#7a102f]"
      >
        {label}
      </label>
      <div className="relative">
        {children}
        <span className="pointer-events-none absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-[#7a102f] transition-transform duration-500 ease-out group-focus-within/field:scale-x-100 motion-reduce:transition-none" />
      </div>
    </div>
  );
}

export default function Contact({ data }: ContactProps) {
  const contactData: ContactVariant =
    data || contentData.UnipixUniversity.sections.Contact.variants.UnipixContact1;

  const [isVisible, setIsVisible] = useState(false);
  const [isSettled, setIsSettled] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [successIn, setSuccessIn] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: contactData.inquiryOptions[0] || "",
    message: ""
  });

  const sectionRef = useRef<HTMLElement>(null);
  const settleRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const target = sectionRef.current;

    const reveal = () => {
      setIsVisible(true);
      settleRef.current = setTimeout(() => setIsSettled(true), 2800);
    };

    if (!target || typeof IntersectionObserver === "undefined") {
      reveal();
      return () => {
        if (settleRef.current) clearTimeout(settleRef.current);
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(target);
    return () => {
      observer.disconnect();
      if (settleRef.current) clearTimeout(settleRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isSubmitted) {
      setSuccessIn(false);
      return;
    }
    const timer = setTimeout(() => setSuccessIn(true), 30);
    return () => clearTimeout(timer);
  }, [isSubmitted]);

  const delay = (ms: number) => (isVisible && !isSettled ? `${ms}ms` : "0ms");

  const rise = isVisible
    ? "opacity-100 translate-y-0 blur-none"
    : "opacity-0 translate-y-4 blur-sm";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormValues({
      name: "",
      email: "",
      phone: "",
      inquiryType: contactData.inquiryOptions[0] || "",
      message: ""
    });
    setIsSubmitted(false);
  };

  const infoCount = contactData.infoItems.length;

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-18 bg-[#fafafa] border-t border-gray-100 overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          {contactData.tagline && (
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
                {contactData.tagline}
              </span>
            </div>
          )}

          <h2
            className={`font-serif text-3xl sm:text-4xl md:text-[44px] font-normal text-gray-900 leading-tight tracking-tight transition-[opacity,transform,filter] duration-1000 ease-out motion-reduce:transition-none ${rise}`}
            style={{ transitionDelay: delay(200) }}
          >
            {contactData.heading}
          </h2>

          {contactData.description && (
            <p
              className={`mt-3 text-sm sm:text-base text-gray-500 font-light leading-relaxed transition-[opacity,transform] duration-1000 ease-out motion-reduce:transition-none ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
              style={{ transitionDelay: delay(350) }}
            >
              {contactData.description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          <div
            className={`group/card lg:col-span-5 flex flex-col justify-between bg-[#7a102f] text-white p-7 sm:p-9 rounded-xs shadow-xl relative overflow-hidden transition-[opacity,transform,filter] duration-900 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
              isVisible
                ? "opacity-100 translate-x-0 blur-none"
                : "opacity-0 -translate-x-10 blur-sm"
            }`}
            style={{ transitionDelay: delay(150) }}
          >
            <div
              className={`absolute -top-12 -right-12 w-44 h-44 bg-white/5 rounded-full pointer-events-none transition-transform duration-1500 ease-out group-hover/card:scale-125 motion-reduce:transition-none ${
                isVisible ? "scale-100" : "scale-0"
              }`}
              style={{ transitionDelay: delay(500) }}
            />
            <div
              className={`absolute -bottom-16 -left-16 w-48 h-48 bg-white/5 rounded-full pointer-events-none transition-transform duration-1500 ease-out group-hover/card:scale-125 motion-reduce:transition-none ${
                isVisible ? "scale-100" : "scale-0"
              }`}
              style={{ transitionDelay: delay(650) }}
            />

            <div className="relative z-10 space-y-6">
              <div
                className={`transition-[opacity,transform] duration-1000 ease-out motion-reduce:transition-none ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: delay(400) }}
              >
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white leading-snug">
                  {contactData.cardTitle}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                  {contactData.cardDescription}
                </p>
              </div>

              {contactData.campusImage && (
                <div
                  className={`relative h-44 sm:h-48 w-full rounded-xs overflow-hidden border border-white/15 group shadow-md transition-[clip-path] duration-1200 ease-[cubic-bezier(0.77,0,0.175,1)] motion-reduce:transition-none ${
                    isVisible
                      ? "[clip-path:inset(0_0_0%_0)]"
                      : "[clip-path:inset(0_0_100%_0)]"
                  }`}
                  style={{ transitionDelay: delay(550) }}
                >
                  <Image
                    src={contactData.campusImage}
                    alt={contactData.campusImageAlt || contactData.cardTitle}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className={`object-cover object-center transition-transform duration-1500 ease-out motion-reduce:transition-none ${
                      isVisible ? "scale-100 group-hover:scale-105" : "scale-125"
                    }`}
                    style={{ transitionDelay: delay(550) }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>
              )}

              <div className="space-y-4 pt-2">
                {contactData.infoItems.map((item, idx) => (
                  <div
                    key={idx}
                    className={`transition-[opacity,transform] duration-800 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                      isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
                    }`}
                    style={{ transitionDelay: delay(800 + idx * 130) }}
                  >
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        item.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="group relative overflow-hidden flex items-start justify-between gap-3 p-3.5 rounded-xs bg-white/5 border border-white/10 hover:border-white/25 transition-colors duration-300"
                    >
                      <span className="absolute inset-0 bg-white/10 origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100 motion-reduce:transition-none" />

                      <div className="relative z-10 flex items-start gap-3.5">
                        <div className="w-10 h-10 rounded-xs bg-white/10 flex items-center justify-center text-white flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                          {item.icon === "phone" && <Phone size={18} />}
                          {item.icon === "mail" && <Mail size={18} />}
                          {item.icon === "map-pin" && <MapPin size={18} />}
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-rose-200">
                            {item.title}
                          </h4>
                          <p className="text-sm font-normal text-white mt-0.5">
                            {item.detail}
                          </p>
                        </div>
                      </div>
                      <ArrowUpRight
                        size={16}
                        className="relative z-10 text-white/50 group-hover:text-white transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-shrink-0 mt-1"
                      />
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {contactData.officeHours && (
              <div className="relative z-10 mt-6 pt-5 flex items-center gap-3 text-xs sm:text-sm text-white/85">
                <span
                  className={`absolute top-0 left-0 h-px w-full bg-white/15 origin-left transition-transform duration-1000 ease-out motion-reduce:transition-none ${
                    isVisible ? "scale-x-100" : "scale-x-0"
                  }`}
                  style={{ transitionDelay: delay(900 + infoCount * 130) }}
                />
                <div
                  className={`flex items-center gap-3 transition-[opacity,transform] duration-1000 ease-out motion-reduce:transition-none ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                  }`}
                  style={{ transitionDelay: delay(1000 + infoCount * 130) }}
                >
                  <Clock size={16} className="text-rose-200 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-white">
                      {contactData.officeHoursLabel}:{" "}
                    </span>
                    <span className="font-light">{contactData.officeHours}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div
            className={`lg:col-span-7 bg-white p-7 sm:p-10 rounded-xs border border-gray-100 shadow-sm hover:shadow-md flex flex-col justify-center transition-[opacity,transform,filter,box-shadow] duration-900 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
              isVisible
                ? "opacity-100 translate-x-0 blur-none"
                : "opacity-0 translate-x-10 blur-sm"
            }`}
            style={{ transitionDelay: delay(300) }}
          >
            {isSubmitted ? (
              <div className="py-12 px-4 text-center space-y-5">
                <div className="relative w-16 h-16 mx-auto">
                  <span
                    className={`absolute inset-0 rounded-full border border-[#7a102f]/30 transition-all duration-1000 ease-out motion-reduce:transition-none ${
                      successIn ? "scale-[2] opacity-0" : "scale-100 opacity-100"
                    }`}
                  />
                  <div
                    className={`relative w-16 h-16 rounded-full bg-rose-50 text-[#7a102f] flex items-center justify-center shadow-xs transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none ${
                      successIn ? "scale-100 opacity-100 rotate-0" : "scale-0 opacity-0 -rotate-45"
                    }`}
                  >
                    <CheckCircle2 size={34} />
                  </div>
                </div>

                <div
                  className={`transition-[opacity,transform] duration-700 delay-200 ease-out motion-reduce:transition-none ${
                    successIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                >
                  <h3 className="font-serif text-2xl sm:text-3xl font-normal text-gray-900">
                    {contactData.successState.title}
                  </h3>
                </div>

                <div
                  className={`transition-[opacity,transform] duration-700 delay-300 ease-out motion-reduce:transition-none ${
                    successIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                >
                  <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto font-light leading-relaxed">
                    {contactData.successState.message}
                  </p>
                </div>

                <div
                  className={`pt-2 transition-[opacity,transform] duration-700 delay-400 ease-out motion-reduce:transition-none ${
                    successIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                >
                  <button
                    type="button"
                    onClick={handleReset}
                    className="group relative overflow-hidden inline-flex items-center gap-2.5 px-6 py-3 bg-[#7a102f] text-white text-sm font-medium rounded-xs shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <span className="absolute inset-0 bg-[#620c24] origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100 motion-reduce:transition-none" />
                    <span className="relative">{contactData.successState.resetButtonText}</span>
                    <ArrowRight
                      size={16}
                      className="relative transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div
                  className={`mb-7 transition-[opacity,transform] duration-1000 ease-out motion-reduce:transition-none ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: delay(500) }}
                >
                  <h3 className="font-serif text-2xl sm:text-3xl font-normal text-gray-900">
                    {contactData.formTitle}
                  </h3>
                  {contactData.formSubtitle && (
                    <p className="mt-1.5 text-xs sm:text-sm text-gray-500 font-light">
                      {contactData.formSubtitle}
                    </p>
                  )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FieldShell
                      label={contactData.formFields.nameLabel}
                      htmlFor="contact-name"
                      isVisible={isVisible}
                      delay={delay(650)}
                    >
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formValues.name}
                        onChange={(e) =>
                          setFormValues({ ...formValues, name: e.target.value })
                        }
                        placeholder={contactData.formFields.namePlaceholder}
                        className={inputClass}
                      />
                    </FieldShell>

                    <FieldShell
                      label={contactData.formFields.emailLabel}
                      htmlFor="contact-email"
                      isVisible={isVisible}
                      delay={delay(750)}
                    >
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formValues.email}
                        onChange={(e) =>
                          setFormValues({ ...formValues, email: e.target.value })
                        }
                        placeholder={contactData.formFields.emailPlaceholder}
                        className={inputClass}
                      />
                    </FieldShell>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FieldShell
                      label={contactData.formFields.phoneLabel}
                      htmlFor="contact-phone"
                      isVisible={isVisible}
                      delay={delay(850)}
                    >
                      <input
                        id="contact-phone"
                        type="tel"
                        required
                        value={formValues.phone}
                        onChange={(e) =>
                          setFormValues({ ...formValues, phone: e.target.value })
                        }
                        placeholder={contactData.formFields.phonePlaceholder}
                        className={inputClass}
                      />
                    </FieldShell>

                    <FieldShell
                      label={contactData.formFields.inquiryLabel}
                      htmlFor="contact-inquiry"
                      isVisible={isVisible}
                      delay={delay(950)}
                    >
                      <select
                        id="contact-inquiry"
                        value={formValues.inquiryType}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            inquiryType: e.target.value
                          })
                        }
                        className={`${inputClass} appearance-none pr-10`}
                      >
                        {contactData.inquiryOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={16}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none transition-all duration-300 group-focus-within/field:rotate-180 group-focus-within/field:text-[#7a102f]"
                      />
                    </FieldShell>
                  </div>

                  <FieldShell
                    label={contactData.formFields.messageLabel}
                    htmlFor="contact-message"
                    isVisible={isVisible}
                    delay={delay(1050)}
                  >
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      value={formValues.message}
                      onChange={(e) =>
                        setFormValues({ ...formValues, message: e.target.value })
                      }
                      placeholder={contactData.formFields.messagePlaceholder}
                      className={`${inputClass} resize-none block`}
                    />
                  </FieldShell>

                  <div
                    className={`pt-2 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                    }`}
                    style={{ transitionDelay: delay(1150) }}
                  >
                    <button
                      type="submit"
                      className="group relative overflow-hidden w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#7a102f] text-white text-sm sm:text-base font-medium rounded-xs shadow-md hover:shadow-xl transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 cursor-pointer"
                    >
                      <span className="absolute inset-0 bg-[#620c24] origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100 motion-reduce:transition-none" />
                      <span className="relative">{contactData.formButtonText}</span>
                      <ArrowRight
                        size={16}
                        className="relative transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
