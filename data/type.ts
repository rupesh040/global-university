export interface SubMenuItem {
  name: string;
  href: string;
  description?: string;
}

export interface NavLinkItem {
  name: string;
  href: string;
  active?: boolean;
  submenu?: SubMenuItem[];
}

export interface LanguageOption {
  code: string;
  name: string;
  active?: boolean;
}

export interface HeaderContactInfo {
  phone: string;
  email: string;
  address?: string;
  officeHours?: string;
}

export interface HeaderVariant {
  logo: string;
  logoAlt: string;
  links: NavLinkItem[];
  searchPlaceholder?: string;
  language?: {
    current: string;
    options: string[];
  };
  contact?: HeaderContactInfo;
  button?: string;
  buttonHref?: string;
}

export interface DegreeLink {
  id: string;
  title: string;
  description: string;
  href: string;
}

export interface HeroVariant {
  tagline: string;
  taglineIcon?: string;
  heading: string;
  headingLines: string[];
  description?: string;
  backgroundImage: string;
  backgroundImageAlt?: string;
  ctaButton: {
    text: string;
    href: string;
  };
  degreeLinks?: DegreeLink[];
  secondaryButton?: {
    text: string;
    href: string;
  };
}

export interface StatItem {
  value: string;
  label: string;
}

export interface AboutFeatureCard {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  href?: string;
}

export interface AboutBadge {
  text: string;
  year?: string;
  href: string;
}

export interface AboutVariant {
  tagline: string;
  taglineIcon?: string;
  heading: string;
  headingPart1?: string;
  headingPart2?: string;
  description?: string;
  paragraphs: string[];
  primaryImage: string;
  primaryImageAlt: string;
  secondaryImage: string;
  secondaryImageAlt: string;
  badge: AboutBadge;
  features: AboutFeatureCard[];
  ctaButton: {
    text: string;
    href: string;
  };
  stats?: StatItem[];
  image?: string;
}

export interface AcademicProgramItem {
  id: string;
  name: string;
  href: string;
}

export interface AcademicCategory {
  id: string;
  title: string;
  isFeatured?: boolean;
  programs: AcademicProgramItem[];
}

export interface AcademicItem {
  id: string;
  title: string;
  image: string;
  href: string;
  isFeatured?: boolean;
  category?: string;
  duration?: string;
}

export interface AcademicsVariant {
  tagline?: string;
  taglinePrefix?: string;
  heading: string;
  headingPart1?: string;
  headingPart2?: string;
  headingHighlight?: string;
  description?: string;
  categories: AcademicCategory[];
  items?: AcademicItem[];
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: string;
}

export interface WhyChooseUsVariant {
  tagline: string;
  headingPart1: string;
  headingPart2: string;
  headingHighlight: string;
  description: string;
  image: string;
  features: FeatureItem[];
  overlayCard?: {
    title: string;
    description: string;
  };
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company?: string;
  image: string;
  imageAlt?: string;
  quote: string;
  rating: number;
}

export interface TestimonialVariant {
  tagline?: string;
  heading: string;
  headingPart1?: string;
  headingHighlight?: string;
  description: string;
  backgroundImage?: string;
  items: TestimonialItem[];
}

export interface ContactInfoItem {
  icon: string;
  title: string;
  detail: string;
  href: string;
}

export interface ContactFormFields {
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  inquiryLabel: string;
  messageLabel: string;
  messagePlaceholder: string;
}

export interface ContactSuccessState {
  title: string;
  message: string;
  resetButtonText: string;
}

export interface ContactVariant {
  tagline: string;
  heading: string;
  description: string;
  cardTitle: string;
  cardDescription: string;
  campusImage: string;
  campusImageAlt: string;
  officeHoursLabel: string;
  officeHours: string;
  infoItems: ContactInfoItem[];
  formTitle: string;
  formSubtitle: string;
  formButtonText: string;
  formFields: ContactFormFields;
  inquiryOptions: string[];
  successState: ContactSuccessState;
}

export interface SocialLink {
  name: string;
  icon: string;
  href: string;
}

export interface FooterQuickLink {
  name: string;
  href: string;
}

export interface FooterNewsletter {
  title: string;
  placeholder: string;
  buttonText: string;
  successMessage: string;
}

export interface FooterLinkColumn {
  id: string;
  title: string;
  links: FooterQuickLink[];
}

export interface FooterRecentPost {
  id: string;
  title: string;
  date: string;
  image: string;
  imageAlt: string;
  href: string;
}

export interface FooterVariant {
  logo: string;
  logoAlt: string;
  backgroundImage?: string;
  description: string;
  newsletter: FooterNewsletter;
  columns: FooterLinkColumn[];
  recentPostsTitle?: string;
  recentPosts?: FooterRecentPost[];
  quickLinks?: FooterQuickLink[];
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  socialLinks: SocialLink[];
  copyrightPrefix: string;
  copyrightBrand: string;
  copyright: string;
  scrollToTopLabel: string;
}

export interface PageComponentItem {
  key: string;
  component: string;
}

export interface TemplatePageConfig {
  components: PageComponentItem[];
}

export interface TemplateConfig {
  shared: {
    Header: string;
    Footer: string;
  };
  pages: Record<string, TemplatePageConfig>;
}

export interface StatMetricItem {
  id: string;
  value: string;
  lines: string[];
}

export interface StatsVariant {
  items: StatMetricItem[];
}

export interface CampusLifeCard {
  id: string;
  title: string;
  image: string;
  imageAlt: string;
  href: string;
}

export interface CampusLifeVariant {
  headingLines: string[];
  description: string;
  cards: CampusLifeCard[];
}

export interface FAQItem {
  id: string;
  number: string;
  question: string;
  answer: string;
  category?: string;
}

export interface FAQContactSupport {
  title: string;
  description: string;
  phone: string;
  email: string;
  buttonText: string;
  buttonHref: string;
}

export interface FAQVariant {
  tagline?: string;
  heading: string;
  description: string;
  contactSupport?: FAQContactSupport;
  items: FAQItem[];
}

export interface UniversityContent {
  templateComponents: {
    [templateId: string]: TemplateConfig;
  };
  sections: {
    Header: {
      variants: Record<string, HeaderVariant>;
    };
    Hero: {
      variants: Record<string, HeroVariant>;
    };
    About: {
      variants: Record<string, AboutVariant>;
    };
    Stats?: {
      variants: Record<string, StatsVariant>;
    };
    Academics: {
      variants: Record<string, AcademicsVariant>;
    };
    CampusLife?: {
      variants: Record<string, CampusLifeVariant>;
    };
    FAQ?: {
      variants: Record<string, FAQVariant>;
    };
    WhyChooseUs: {
      variants: Record<string, WhyChooseUsVariant>;
    };
    Testimonial: {
      variants: Record<string, TestimonialVariant>;
    };
    Contact: {
      variants: Record<string, ContactVariant>;
    };
    Footer: {
      variants: Record<string, FooterVariant>;
    };
  };
}

export interface RootContentData {
  UnipixUniversity: UniversityContent;
}
