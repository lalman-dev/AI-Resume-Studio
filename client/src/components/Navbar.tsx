import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout } from "../app/features/authSlice";

const Navbar = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logoutUser = () => {
    navigate("/");
    dispatch(logout());
  };
  return (
    <div className="shadow bg-white">
      <nav className="flex items-center justify-between max-w-7xl h-15 md:h-20 mx-auto px-4 text-slate-800 transition-all">
        <Link to="/">
          <img src="/logo.png" alt="Ai-builder Logo" className="w-20 md:w-30" />
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <p className="max-sm:hidden">
            Welcome,{" "}
            <span className="bg-linear-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent font-medium text-lg">
              {user?.name}
            </span>{" "}
          </p>
          <button
            onClick={logoutUser}
            className="bg-white hover:bg-slate-50 border border-gray-300 px-7 py-2 rounded-full active:scale-95 transition-all"
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
