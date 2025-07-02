import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useLangStore = create(
  persist(
    (set) => ({
      lang: "uz",
      setLang: (lang) => {
        set({ lang });
      },
    }),
    {
      name: "langStore",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useLangStore;
