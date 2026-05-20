import { AxiosError } from "axios";
import toast from "react-hot-toast";

export const handleAxiosError = (
  err: unknown,
  fallback = "Something went wrong",
): void => {
  if (err instanceof AxiosError) {
    toast.error(err.response?.data?.message || fallback);
  } else if (err instanceof Error) {
    toast.error(err.message);
  } else {
    toast.error(fallback);
  }
};
