import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { accountSlice } from "./slices/accountSlice";


export const useBlogerStore = create()(
  devtools(
    persist(
      (set) => ({
        ...accountSlice(set),

      }),
      {
        name: "bloger-store",
      },
    ),
  ),
);