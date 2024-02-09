// @ts-ignore
import { defineStore } from "pinia";

const useStore = defineStore('main', {
    state: () => {
        return {
            minutes: 1,
            seconds: 0,
            timerDuration: 60,
            timerRunning: false,
        }
    },
    persist: true,
})

export default useStore;