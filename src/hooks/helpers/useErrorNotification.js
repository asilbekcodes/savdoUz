import toast from "@/services/notification/notification";
import { useEffect } from "react";

export function useErrorNotification({ isError, error }) {
  useEffect(() => {
    if (isError) {
      toast
        .setMessage(error.response?.data?.error?.message || "Error")
        .setDesc(error.message)
        .error();
    }
  }, [isError]);
}
