<script setup lang="ts">
    // defineProps<{
    // text: string;
    // }>();
</script>

<template>
  <div class="polygon-container">
    <div class="first-polygon polygon"></div>
    <div class="second-polygon polygon"></div>
    <div class="third-polygon polygon"></div>
    <div class="fourth-polygon polygon"></div>
  </div>
</template>

<style scoped lang="scss">
.polygon-container{
    .polygon{
      background: linear-gradient(90deg, #000000, #78687c);
      background-size: $full-percent $full-percent;
      position: absolute;
    }
    .fourth-polygon{
      top: -21px;
      left: 672px;
      width: 113px;
      height: 97px;
      -webkit-clip-path: polygon(0% 15%, 100% 100%, 39% 82%, 0% 99%);
      clip-path: polygon(0% 15%, 100% 100%, 39% 82%, 0% 99%);
    }
    .fifth-polygon{
      top: 181px;
      left: 672px;
      width: 113px;
      height: 149px;
      -webkit-clip-path: polygon(0% 15%, 100% 100%, 39% 82%, 0% 99%);
      clip-path: polygon(0% 15%, 100% 51%, 28% 100%, 0% 99%);
    }
    .sixth-polygon{
      top: 64px;
      left: 672px;
      width: 113px;
      height: 120px;
      -webkit-clip-path: polygon(0% 15%, 100% 100%, 39% 82%, 0% 99%);
      clip-path: polygon(0% 24%, 31% 6%, 76% 100%, 0% 99%);
    }
    .seventh-polygon{
      top: 371px;
      left: 672px;
      width: 113px;
      height: 54px;
      -webkit-clip-path: polygon(0% 15%, 100% 100%, 39% 82%, 0% 99%);
      clip-path: polygon(0% 24%, 106% -14%, 22% 100%, 0% 99%);
    }
}
</style>

