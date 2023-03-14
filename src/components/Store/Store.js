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

  user: {},

  token: "",

  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),

  starrating: 0,
  setRating: (starrating) => set({ starrating }),
}));

export default useStore;
