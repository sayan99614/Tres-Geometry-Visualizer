import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useGeometryData = defineStore('geometryData', () => {
  const geometryFormData = ref({})

  return { geometryFormData }
})
