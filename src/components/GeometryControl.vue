<script setup>
import { ref } from 'vue'
const geometryTypes = ref(['BoxGeometry', 'CircleGeometry', 'ConeGeometry', 'CylinderGeometry', 'DodecahedronGeometry', 'IcosahedronGeometry', 'OctahedronGeometry', 'PlaneGeometry', 'RingGeometry', 'SphereGeometry', 'TetrahedronGeometry', 'TorusGeometry', 'TorusKnotGeometry'])
const height= defineModel('height');
const width= defineModel('width');
const depth= defineModel('depth');
const emit= defineEmits(['changeGeometry']);



</script>

<template>
  <div class="relative">
    <div class="absolute card">
        <div>
            <label for="geometry">GeometryTypes</label>
            <select id="geometry"
                v-model="geometry"
                @change="()=>emit('change-geometry',geometry)"
            >
                <option v-for="type in geometryTypes" :key="type" :value="type">{{ type }}</option>
            </select>    
        </div>
        <div>
          <label for="geometry">Height</label>
          <input type="range" v-model="height" min="1" max="30">
          {{height}}
          </div>

          <div>
            <label for="">Width</label>
            <input type="range" v-model="width" min="1" max="30">
            {{width}}
            </div>

            <div>
            <label for="">Depth</label>
            <input type="range" v-model="depth" min="1" max="30">
            {{depth}}
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
.card{
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
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
