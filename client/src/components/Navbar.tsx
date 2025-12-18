import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const user = { name: "Alex Stokes" };
  const navigate = useNavigate();
  const logoutUser = () => {
    navigate("/");
  };
  return (
    <div className="shadow bg-white">
      <nav className="flex items-center justify-between max-w-7xl h-15 md:h-20 mx-auto px-4 text-slate-800 transition-all">
        <Link to="/">
          <img src="/logo.png" alt="Ai-builder Logo" className="w-20 md:w-30" />
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <p className="max-sm:hidden">Welcome, {user?.name}</p>
          <button
            onClick={logoutUser}
            className="bg-white hover:bg-slate-50 border border-gray-300 px-7 py2 rounded-full active:scale-95 transition-all"
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
