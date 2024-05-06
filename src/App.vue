<script setup lang="ts">
import { ref, computed } from 'vue';
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos';
import GeometryControl from '@/components/GeometryControl.vue';
const geometry = ref('BoxGeometry');
const geoMetryProps= ref({width:1,height:2,depth:5});
const selectedGeometry = computed(()=>`Tres${geometry.value}`)
const changeGeometry = ( type) => {
  geometry.value = type;
}
</script>

<template>
  <TresCanvas
    clear-color="#82DBC5"
    window-size
  >
    <TresPerspectiveCamera
      :look-at="[0, 0, 0]"
    />
    <OrbitControls/>
    <!-- position[x,y,z] -->
    <TresMesh :position="[0,0,0]">
      <!-- <TresBoxGeometry :args="[geoMetryProps.width*1, geoMetryProps.height*1, geoMetryProps.depth*1]"/>     -->
      <component :is="selectedGeometry" :args="[geoMetryProps.width*1, geoMetryProps.height*1, geoMetryProps.depth*1]" />
      <TresMeshNormalMaterial />
    </TresMesh>
    <TresAxesHelper/>
  </TresCanvas>
  <GeometryControl @change-geometry="changeGeometry" v-model:width="geoMetryProps.width" v-model:height="geoMetryProps.height" v-model:depth="geoMetryProps.depth" />
</template>

<style>
.tres-canvas {
  width: 100%;
  height: 90vh;
  position: relative;
}

</style>