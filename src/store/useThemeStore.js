import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useThemeStore = create(
  persist(
    (set) => ({
      mode: "light",
      setTheme: (mode) => {
        set({ mode });
      },
    }),
    {
      name: "themeStore",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useThemeStore;
