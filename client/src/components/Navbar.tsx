import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout } from "../app/features/authSlice";
import { LogOut } from "lucide-react";
import Logo from "./logo";

const Navbar = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutUser = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-100">
      <nav
        className="flex items-center justify-between max-w-7xl mx-auto px-6 h-14"
        aria-label="App navigation"
      >
        {/* Logo */}
        <Link to="/" aria-label="AI Resume Studio home">
          <Logo variant="dark" size="sm" />
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Welcome message */}
          {user && (
            <span className="hidden sm:block text-sm text-gray-500">
              Welcome,{" "}
              <span className="font-medium text-[#1a1a18]">{user.name}</span>
            </span>
          )}

          {/* Logout */}
          <button
            onClick={logoutUser}
            aria-label="Log out"
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white text-sm font-medium text-gray-600 hover:border-gray-400 hover:text-gray-900 active:scale-95 transition-all duration-200"
          >
            <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
