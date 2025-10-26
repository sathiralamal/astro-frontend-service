import Astrostore from "@/app/types/astrostore";
import Predication from "@/app/types/predication";
import { create } from "zustand";

export const astroStore = create<Astrostore>()((set) => ({
  predictions: [],

  addToPredictions: (newPrediction: Predication) =>
    set((state) => ({
      predictions: [...state.predictions, newPrediction],
    })),

  clearPredictions: () =>
    set(() => ({
      predictions: [],
    })),
}));
