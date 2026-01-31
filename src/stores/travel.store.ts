import { defineStore } from "pinia";
import { fetchTravels, fetchTravel } from "../../services/travels.service";

export const useTravelStore = defineStore("travel", {
  state: () => ({
    travels: [] as any[],
    current: null as any | null,
    loading: false,
  }),

  actions: {
    async loadTravels() {
      this.loading = true;
      try {
        this.travels = await fetchTravels();
      } finally {
        this.loading = false;
      }
    },

    async loadTravel(id: number | string) {
      this.loading = true;
      try {
        this.current = await fetchTravel(id);
      } finally {
        this.loading = false;
      }
    },
  },
});
