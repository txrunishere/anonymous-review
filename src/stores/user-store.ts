import { IUserResponse } from "@/types";
import axios from "axios";
import { create } from "zustand";

type UserState = {
  user: IUserResponse | null;
  fetchUser: () => Promise<void>;
};

export const useUserStore = create<UserState>((set) => ({
  user: null,
  fetchUser: async () => {
    try {
      const res = await axios.post("/api/message");
      set({ user: res.data.user });
    } catch (error) {
      console.error(error);
    }
  },
}));
