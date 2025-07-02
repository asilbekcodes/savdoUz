import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      me: {
        role: "",
        is_client: false,
        is_statistics: false,
        is_storage: false,
        is_trade: false,
      },
      setMe: (data) => {
        set({ me: data });
      },
    }),
    {
      name: "userStore",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUserStore;
