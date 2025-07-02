import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useCompanyStore = create(
  persist(
    (set) => ({
      company: null,
      setCompany: (data) => {
        set({ company: data });
      },
    }),
    {
      name: "companyStore",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCompanyStore;
