<script setup>
import { ref, computed, onMounted } from 'vue';
import { TresCanvas, useRenderLoop } from '@tresjs/core';
import { OrbitControls, Text3D } from '@tresjs/cientos';
import GeometryControl from '@/components/GeometryControl.vue';
import { useGeometryData } from './stores/geometryData';
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'
import { storeToRefs } from 'pinia';
const geometry = ref('BoxGeometry');
const geoMetryProps= ref({width:1,height:2,depth:5});
const selectedGeometry = computed(()=>`Tres${geometry.value}`)
const changeGeometry = ( type) => {
  geometry.value = type;
}
const { geometryFormData } = storeToRefs(useGeometryData());

const objectRef = ref();
 
// const {onLoop} = useRenderLoop()
// onLoop(({delta}) => {
//   if(objectRef.value){
//     objectRef.value.rotation.y += delta;
//   }
// })
onMounted(()=>{
  if(objectRef.value){
    objectRef.value.material.side = 1
}})

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}


</script>

<template>
  <TresCanvas
    v-bind="gl"
    window-size
  >
  <TresPerspectiveCamera :position="[5, 7.5, 7.5]" :fov="45" :aspect="1" :near="0.1" :far="1000" />
    <OrbitControls/>
    <!-- position[x,y,z] -->
    <Suspense>
      <Text3D
        text="HI THERE!"
        font="https://raw.githubusercontent.com/Tresjs/assets/main/fonts/FiraCodeRegular.json"
        :position="[0, 4, 0]"
      >
        <TresMeshNormalMaterial />
      </Text3D>
    </Suspense>
    <TresMesh :position="[0,0,0]" cast-shadow ref="objectRef">
      <component :is="selectedGeometry" :args="Object.values(geometryFormData)" ref="" />
      <TresMeshToonMaterial :color="geometryFormData.color || '#254586'"/>
    </TresMesh>
    <TresMesh receive-shadow :position="[0, -3, 0]" :rotation="[-Math.PI / 2, 0, 0]">
      <TresPlaneGeometry :args="[10, 10, 10, 10]" />
      <TresMeshStandardMaterial color="#f7f7f7" />
    </TresMesh>
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight cast-shadow :position="[0, 2, 0]" :intensity="1" />
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