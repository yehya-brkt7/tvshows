import React from "react";
import create from "zustand";
import axios from "axios";

const useStore = create((set) => ({
  shows: [],

  setShows: (shows) => set([]),

  fetch: async (url) => {
    const response = await axios.get(url);
    set({ shows: await response.data });
  },

  // id: 0,

  // setId: () => set((state) => state.id),

  user: {},

  userid: "",

  token: "",

  userName: "",

  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  setUserid: (userid) => set({ userid }),
  setUserName: (userName) => set({ userName }),

  starrating: 0,
  setRating: (starrating) => set({ starrating }),
}));

export default useStore;
