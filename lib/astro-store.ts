import Astrostore from "@/app/types/astrostore";
import Predication from "@/app/types/predication";
import { create } from "zustand";

const x: Predication[] = [
  {
    responseId: "resp_001",
    text: "You will achieve a major career milestone this year.",
    createTime: "2025-10-31T14:25:00Z",
  },
  {
    responseId: "resp_002",
    text: "A close friend will bring unexpected good news soon.",
    createTime: "2025-10-31T14:30:00Z",
  },
  {
    responseId: "resp_003",
    text: "Financial stability is on the horizon; stay consistent.",
    createTime: "2025-10-31T14:35:00Z",
  },
  {
    responseId: "resp_004",
    text: "Travel opportunities will come your way next summer.",
    createTime: "2025-10-31T14:40:00Z",
  },
  {
    responseId: "resp_005",
    text: "You will reconnect with someone important from your past.",
    createTime: "2025-10-31T14:45:00Z",
  },
];

export const astroStore = create<Astrostore>()((set) => ({
  predictions: x,

  addToPredictions: (newPrediction: Predication) =>
    set((state) => ({
      predictions: [...state.predictions, newPrediction],
    })),

  clearPredictions: () =>
    set(() => ({
      predictions: [],
    })),
}));
