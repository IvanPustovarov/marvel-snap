<script setup lang="ts">
import { RouterView } from "vue-router";
import FooterView from '@/views/FooterView.vue';
import NavigtionView from '@/views/NavigtionView.vue';
</script>

<template>
    <div class="wrapper-app">
      <NavigtionView />
      <RouterView />
      <FooterView />
    </div>
</template>

<style lang="scss">

.wrapper-app{
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  color: white;
}

@font-face {
  font-family: 'Arkhip';
  src: local('Arkhip'), url('./fonts/Arkhip_font.ttf') format('truetype');
}

* {
  font-family: 'Arkhip', Helvetica, Arial;
  padding: 0;
  margin: 0;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  position: relative;
  font-weight: normal;
}

body {
  display: flex;
  justify-content: center;
  background: center repeat url('./assets/img/back.jpg');
  flex-direction: column;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: linear-gradient(180deg, rgba(23, 12, 40, 0.9), rgb(24, 15, 46));
  background-size: 400% 400%;
}
</style>
