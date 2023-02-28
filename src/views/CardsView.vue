<script setup lang="ts">
import CardComponent from '@/components/CardComponent.vue';
import { useCardStore } from '@/stores/card';

const store = useCardStore();
</script>

<template>
    <div class="container-cards">
        <CardComponent
          v-for="card in store.cards"
          :key="card.name"
          :card="card"
        />
    </div>
</template>

<style lang="scss" scoped>
.container-cards {
  display: flex;
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 2rem;
  justify-content: center;
}
</style>
