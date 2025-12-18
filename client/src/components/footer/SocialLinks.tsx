import { motion } from "framer-motion";
import { socialLinks } from "../../utils/socialLinks";

const SocialLinks = () => {
  return (
    <motion.div
      className="flex items-center justify-center gap-6 mt-5 pb-5"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { staggerChildren: 0.2 },
        },
      }}
    >
      {socialLinks.map(({ id, href, icon: Icon, label }) => (
        <motion.a
          key={id}
          href={href}
          aria-label={label}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          whileHover={{ scale: 1.2, rotate: 5, y: -5 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <Icon className="size-6 stroke-gray-800" />
        </motion.a>
      ))}
    </motion.div>
  );
};

export default SocialLinks;
