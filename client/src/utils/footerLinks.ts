export interface FooterLink {
  label: string;
  href: string;
  badge?: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export const footerSections: FooterSection[] = [
  {
    title: "Product",
    links: [
      { label: "Home", href: "/" },
      { label: "Support", href: "/" },
      { label: "Pricing", href: "/" },
      { label: "Affiliate", href: "/" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Company", href: "/" },
      { label: "Blogs", href: "/" },
      { label: "Community", href: "/" },
      { label: "Careers", href: "/", badge: "We’re hiring!" },
      { label: "About", href: "/" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/" },
      { label: "Terms", href: "/" },
    ],
  },
];
