interface LogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md";
}

const Logo = ({ variant = "dark", size = "md" }: LogoProps) => {
  const isLight = variant === "light";
  const isLg = size === "md";

  return (
    <div className="flex items-center gap-2.5">
      {/* Box */}
      <div
        className={`
          flex items-center justify-center rounded-lg flex-shrink-0 border
          ${isLg ? "w-11 h-11" : "w-9 h-9"}
          ${
            isLight
              ? "bg-white border-white/20"
              : "bg-[#1a1a18] border-[#1a1a18]"
          }
        `}
      >
        <span
          className={`
            font-serif font-bold tracking-tight
            ${isLg ? "text-[17px]" : "text-[14px]"}
            ${isLight ? "text-[#1a1a18]" : "text-white"}
          `}
        >
          AI
        </span>
      </div>

      {/* Text */}
      <div className="flex flex-col gap-px leading-none">
        <span
          className={`
            font-serif font-semibold tracking-tight
            ${isLg ? "text-[17px]" : "text-[14px]"}
            ${isLight ? "text-white" : "text-[#1a1a18]"}
          `}
        >
          Resume Studio
        </span>
        <span
          className={`
            text-[9px] uppercase tracking-widest font-sans
            ${isLight ? "text-white/50" : "text-black/40"}
          `}
        >
          Powered by AI
        </span>
      </div>
    </div>
  );
};

export default Logo;
