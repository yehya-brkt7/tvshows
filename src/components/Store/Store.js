import React from "react";
import create from "zustand";
import axios from "axios";

const useStore = create((set) => ({
  shows: [],

  fetch: async (url) => {
    const response = await axios.get(url);
    set({ shows: await response.data });
  },
}));

export default useStore;
