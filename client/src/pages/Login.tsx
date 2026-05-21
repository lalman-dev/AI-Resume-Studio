import { Lock, Mail, User2Icon } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import api from "../configs/api";
import { useDispatch } from "react-redux";
import { login } from "../app/features/authSlice";
import toast from "react-hot-toast";

interface FormData {
  name: string;
  email: string;
  password: string;
}

const Login = () => {
  const dispatch = useDispatch();
  const query = new URLSearchParams(window.location.search);
  const urlState = query.get("state");
  const [state, setState] = useState<"login" | "register">(
    urlState === "register" ? "register" : "login",
  );

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await api.post(`/api/users/${state}`, formData);
      dispatch(login(data));
      localStorage.setItem("token", data.token);
      toast.success(data.message);
    } catch (err: unknown) {
      if (err && typeof err === "object" && "response" in err) {
        const axiosError = err as {
          response?: { data?: { message?: string } };
        };
        toast.error(
          axiosError.response?.data?.message || "Something went wrong",
        );
      } else if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Unexpected error occurred");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div
      className="relative flex justify-center items-center min-h-screen"
      style={{
        backgroundColor: "#F5F7FA",
        backgroundImage: `
        linear-gradient(to right, #dde3ec 1px, transparent 1px),
        linear-gradient(to bottom, #dde3ec 1px, transparent 1px)
      `,
        backgroundSize: "28px 28px",
      }}
    >
      {/* Centre vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 65% at 50% 25%, rgba(245,247,250,0.93) 0%, transparent 100%)",
        }}
      />

      {/* Bottom fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-0 h-48"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, #F5F7FA 100%)",
        }}
      />

      {/* Form sits above overlays */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 sm:w-[350px] w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white shadow-lg"
      >
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-blue-500 text-3xl mt-10 font-medium"
        >
          {state === "login" ? "Login" : "Sign up"}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-gray-500 text-sm mt-2"
        >
          Please {state} to continue
        </motion.p>

        {/* Name field (only for signup) */}
        {/* Name field */}
        {state !== "login" && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center mt-6 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2"
          >
            <label htmlFor="name" className="sr-only">
              Full name
            </label>
            <User2Icon size={16} color="#6B7280" aria-hidden="true" />
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Name"
              autoComplete="name"
              aria-required="true"
              className="border-none outline-none ring-0 w-full"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </motion.div>
        )}

        {/* Email field */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2"
        >
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <Mail size={13} color="#6B7280" aria-hidden="true" />
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email id"
            autoComplete="email"
            aria-required="true"
            className="border-none outline-none ring-0 w-full"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </motion.div>

        {/* Password field */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2"
        >
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <Lock size={13} color="#6B7280" aria-hidden="true" />
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            autoComplete={
              state === "login" ? "current-password" : "new-password"
            }
            aria-required="true"
            className="border-none outline-none ring-0 w-full"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </motion.div>

        {/* Forget password */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-4 text-left text-purple-500"
        >
          <button
            className="text-blue-500 font-medium hover:underline"
            type="reset"
          >
            Forget password?
          </button>
        </motion.div>

        {/* Submit button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="mt-2 w-full h-11 rounded-full text-white bg-[#1a1a18] hover:bg-[#2d2d2b] active:scale-95 transition-all duration-200"
        >
          {state === "login" ? "Login" : "Sign up"}
        </motion.button>

        {/* Toggle login/register */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          onClick={() =>
            setState((prev) => (prev === "login" ? "register" : "login"))
          }
          className="text-gray-500 text-sm mt-3 mb-11 cursor-pointer"
        >
          {state === "login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <span className="text-blue-500 font-medium hover:underline">
            click here
          </span>
        </motion.p>
      </motion.form>
    </div>
  );
};

export default Login;
