<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
</script>

<template>
  <div class="tres-canvas">
  <TresCanvas
    clear-color="#82DBC5"
  >
    <TresPerspectiveCamera
      :look-at="[0, 0, 0]"
    />
    <!-- position[x,y,z] -->
    <TresMesh :position="[0,0,0]" :scale="[1,2,0.5]">    
      <TresBoxGeometry/>
      <TresMeshNormalMaterial />
    </TresMesh>
    <TresAxesHelper/>
  </TresCanvas>
</div>
  <button>Click me</button>
</template>


<style>
.tres-canvas {
  width: 100%;
  height: 90vh;
  position: relative;
}

</style>