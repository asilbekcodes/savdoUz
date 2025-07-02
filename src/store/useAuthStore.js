import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      setAccessToken: (accessToken) => {
        set({ accessToken });
      },
      setRefreshToken: (refreshToken) => {
        set({ refreshToken });
      },
      clearAccessToken: () => {
        set({ accessToken: null });
      },
    }),
    {
      name: "authStore",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
