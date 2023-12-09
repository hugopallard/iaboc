import { Movie } from "@prisma/client";
import { create } from "zustand";
import { FullShowing } from "./types";

type Store = {
  currentHall: number;
  setCurrentHall: (to: number) => void;

  currentMovie: Movie | {};
  setCurrentMovie: (to: Movie) => void;

  showings: FullShowing[] | [];
  setShowings: (newShowings: FullShowing[]) => void;

  newShowing: FullShowing;
  setNewShowing: (newShowing: FullShowing) => void;
};

export const useStore = create<Store>()((set) => ({
  currentHall: 0,
  setCurrentHall: (to) => set({ currentHall: to }),

  currentMovie: {},
  setCurrentMovie: (to) => set({ currentMovie: to }),

  showings: [],
  setShowings: (newShowings: FullShowing[]) =>
    set({
      showings: newShowings,
    }),

  newShowing: {
    id: -1,
    date: new Date(),
    movie: { id: -1, title: "", duration: "" },
    hall: { id: -1, capacity: 0, spectators: 0 },
  },
  setNewShowing: (newShowing: FullShowing) =>
    set(({
      newShowing: newShowing,
    })),
}));
