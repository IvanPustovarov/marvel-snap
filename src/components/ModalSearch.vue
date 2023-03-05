<script setup lang="ts">
const emit = defineEmits<{
  (e: 'show', isShow: boolean): void
}>()
</script>

<template>
  <div class="inner">
    <button @click="emit('show', false)">
      X
    </button>
    <p class="heading">
      Demo Modal
    </p>
    <p>Click outside of the modal to close it.</p>
  </div>
</template>

<style scoped lang="scss">
 .inner {
    background-color: white;
    padding: 0.4em 2em;
    border-radius: 5px;
    border: 1px solid black;
    box-shadow: 2px 2px 10px rgba(10, 10, 10, 0.1);
  }
</style>
