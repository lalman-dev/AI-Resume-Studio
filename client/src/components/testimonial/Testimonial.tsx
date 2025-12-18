import { BookUserIcon } from "lucide-react";
import Title from "../feature/Title";
import { motion } from "framer-motion";

const Testimonial = () => {
  return (
    <>
      {/* Badge + Title */}
      <motion.div
        id="feature"
        className="flex flex-col items-center my-20"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {/* Animated badge with infinite spring float */}
        <motion.div
          initial={{ opacity: 1, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 2,
            ease: "easeInOut",
          }}
          className="flex items-center gap-2 text-sm text-blue-500 bg-blue-400/10 border border-indigo-200 rounded-full px-6 py-1 mb-10"
        >
          <BookUserIcon className="size-5 stroke-blue-500" />
          <span>Testimonials</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Title
            title="Success Stories That Speak for Themselves"
            description="Learn how professionals achieved career breakthroughs with the help of our AI‑driven resume builder."
          />
        </motion.div>
      </motion.div>

      {/* Testimonial Cards */}
      <motion.div
        className="flex flex-wrap items-center justify-center gap-6 my-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Card 1 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-80 bg-black text-white rounded-2xl"
        >
          <div className="relative -mt-px overflow-hidden rounded-2xl">
            <motion.img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=600"
              alt=""
              className="h-[270px] w-full rounded-2xl object-cover object-top"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
            <div className="absolute bottom-0 z-10 h-60 w-full bg-linear-to-t from-black to-transparent pointer-events-none"></div>
          </div>
          <div className="px-4 pb-4">
            <p className="font-medium border-b border-gray-600 pb-5">
              "Applying for my first job felt daunting, but this builder
              simplified everything. AI suggestions highlighted my strengths,
              and I landed interviews fast!"
            </p>
            <p className="mt-4">— John Peterson</p>
            <p className="text-sm font-medium bg-linear-to-r from-[#8B5CF6] via-[#E0724A] to-[#9938CA] text-transparent bg-clip-text">
              Junior Content Marketing
            </p>
          </div>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-80 bg-black text-white rounded-2xl"
        >
          <div className="relative -mt-px overflow-hidden rounded-2xl">
            <motion.img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=600"
              alt=""
              className="h-[270px] w-full rounded-2xl object-cover object-top"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
            <div className="absolute bottom-0 z-10 h-60 w-full bg-linear-to-t from-black to-transparent pointer-events-none"></div>
          </div>
          <div className="px-4 pb-4">
            <p className="font-medium border-b border-gray-600 pb-5">
              "Updating my resume was overwhelming, but this tool polished it in
              minutes. Recruiters noticed, and I secured a new role quickly."
            </p>
            <p className="mt-4">— Alex Stokes</p>
            <p className="text-sm font-medium bg-linear-to-r from-[#8B5CF6] via-[#E0724A] to-[#9938CA] text-transparent bg-clip-text">
              Senior Manager
            </p>
          </div>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-80 bg-black text-white rounded-2xl"
        >
          <div className="relative -mt-px overflow-hidden rounded-2xl">
            <motion.img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=600&h=600&auto=format&fit=crop"
              alt=""
              className="h-[270px] w-full rounded-2xl object-cover object-top"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
            <div className="absolute bottom-0 z-10 h-60 w-full bg-linear-to-t from-black to-transparent pointer-events-none"></div>
          </div>
          <div className="px-4 pb-4">
            <p className="font-medium border-b border-gray-600 pb-5">
              "I wanted to move into tech but struggled. The AI builder shaped
              my background into a strong story — now I’m a front‑end
              developer!"
            </p>
            <p className="mt-4">— Elizabeth Russell</p>
            <p className="text-sm font-medium bg-linear-to-r from-[#8B5CF6] via-[#E0724A] to-[#9938CA] text-transparent bg-clip-text">
              Former Teacher, now Developer
            </p>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Testimonial;
