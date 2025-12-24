import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import ResumeBuilder from "./components/resumebuilder/ResumeBuilder";
import Preview from "./pages/Preview";
import { useEffect } from "react";
import api from "./configs/api";
import { login, setLoading } from "./app/features/authSlice";
import { useAppDispatch } from "./app/hooks";
import { Toaster } from "react-hot-toast";

interface User {
  id: string;
  name: string;
  email: string;
}

const App = () => {
  const dispatch = useAppDispatch();

  const getUserData = async (): Promise<void> => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        const { data }: { data: { user?: User } } = await api.get(
          "/api/users/data",
          {
            headers: { Authorization: token },
          }
        );

        if (data.user) {
          dispatch(login({ token, user: data.user }));
        }
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    } catch (error) {
      dispatch(setLoading(false));
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  useEffect(() => {
    void getUserData();
  }, []);

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="app" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="builder/:resumeId" element={<ResumeBuilder />} />
        </Route>
        <Route path="view/:resumeId" element={<Preview />} />
      </Routes>
    </>
  );
};

export default App;
