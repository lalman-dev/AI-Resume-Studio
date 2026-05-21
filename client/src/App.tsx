import { lazy, Suspense, useEffect, useCallback } from "react";
import { Route, Routes } from "react-router-dom";
import { useAppDispatch } from "./app/hooks";
import { login, setLoading } from "./app/features/authSlice";
import { Toaster } from "react-hot-toast";
import api from "./configs/api";

// Early load on first paint
import Home from "./pages/Home";

// Lazy load when user navigates there
const Layout = lazy(() => import("./pages/Layout"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const ResumeBuilder = lazy(
  () => import("./components/resumebuilder/ResumeBuilder"),
);
const Preview = lazy(() => import("./pages/Preview"));

interface User {
  id: string;
  name: string;
  email: string;
}

// Simple full-page loader shown while lazy chunks download
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-[#F5F7FA]">
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 rounded-full border-2 border-[#1a1a18] border-t-transparent animate-spin" />
      <span className="text-xs text-gray-400 tracking-wide">Loading...</span>
    </div>
  </div>
);

const App = () => {
  const dispatch = useAppDispatch();

  const getUserData = useCallback(async (): Promise<void> => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        const { data }: { data: { user?: User } } = await api.get(
          "/api/users/data",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        if (data.user) {
          dispatch(login({ token, user: data.user }));
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    void getUserData();
  }, [getUserData]);

  return (
    <>
      <Toaster />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="app" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="builder/:resumeId" element={<ResumeBuilder />} />
          </Route>
          <Route path="view/:resumeId" element={<Preview />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
