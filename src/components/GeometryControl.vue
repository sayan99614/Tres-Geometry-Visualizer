<script setup>
import { useGeometryData } from '@/stores/geometryData';
import { storeToRefs } from 'pinia';
import _geometry from '@/geometry/geometryTypes.json'
import { computed, ref, watch } from 'vue'
console.log(_geometry.geometryTypes)
const geometryTypes = computed(() => {
  return _geometry.geometryTypes.map((geo) => geo.name)
})

const { geometryFormData } = storeToRefs(useGeometryData());
const geometryProperties = computed(() => {
  const geoProps = _geometry.geometryTypes.find((geo) => geo.name === selectedGeometry.value);
  const data= geoProps.properties.map((prop)=> ({[prop.name]: eval( prop.default) || 1}));
  geometryFormData.value = Object.assign({}, ...data);
  return geoProps ? geoProps.properties : [];
})
// const height = defineModel('height');
const selectedGeometry = ref('BoxGeometry');
// const width = defineModel('width');
// const depth = defineModel('depth');
const emit = defineEmits(['changeGeometry', 'height', 'width', 'depth']);

watch(()=> geometryFormData.value, (newVal, oldVal) => {
  console.log(newVal)
}, {deep: true})

</script>

<template>
  <div class="relative">
    <div class="absolute card">
      <div>
        <label for="geometry">GeometryTypes</label>
        <select id="geometry" v-model="selectedGeometry" @change="() => emit('change-geometry', selectedGeometry)">
          <option v-for="type in geometryTypes" :key="type" :value="type">{{ type }}</option>
        </select>
      </div>
      <div v-for="property in geometryProperties" :key="property.name">
        <label for="geometry">{{ property.name }}</label>
        <input :type="property.control" v-model="geometryFormData[property.name]" :min="property.min"
          :max="property.max">
      </div>
      <div>
        <label for="geometry">Color</label>
        <input type="color" v-model="geometryFormData['color']">
      </div>
    </div>
  </div>
</template>

<style scoped>
.relative {
  position: relative;
}

.absolute {
  position: absolute;
  top: 0;
  right: 0;
  background-color: #fff;
}

.card {
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  z-index: 100;
  opacity: 50%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: start;
}

/* .card > div{
    margin-bottom: 0.5rem;
} */
</style>
