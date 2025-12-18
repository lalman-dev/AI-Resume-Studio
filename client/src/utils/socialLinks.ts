import { Github, Linkedin, Mail } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";

export interface SocialLink {
  id: string;
  href: string;
  icon: string;
  label: string;
}
export const socialLinks = [
  {
    id: "github",
    href: "https://github.com/lalman-dv",
    icon: Github,
    label: "GitHub",
  },
  {
    id: "linkedin",
    href: "https://www.linkedin.com/in/lalman-lalman-34490a163/",
    icon: Linkedin,
    label: "LinkedIn",
  },
  {
    id: "mail",
    href: "mailto:lalman.dev7@gmail.com",
    icon: Mail,
    label: "Email",
  },
  {
    id: "X(twitter)",
    href: "https://x.com/imchaudhary2",
    icon: FaXTwitter,
    label: "Twitter",
  },
];
