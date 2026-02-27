import { defineStore } from 'pinia'

export const useGroupStore = defineStore('group', {
  state: () => ({
    name: 'sk的朋友圈',
  }),
  actions: {
    setName(name) {
      this.theme = name
    },
  },
})
