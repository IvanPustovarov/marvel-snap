<script setup lang="ts">
import CardComponent from '@/components/CardComponent.vue';
import { useCardStore } from '@/stores/card';

const store = useCardStore();
</script>

<template>
  <div class="filters-container">
    <div class="filter-item-container">
      <label for="">dsdasd</label>
      <input type="checkbox" name="" id="">
    </div>

    <div class="filter-item-container">
      <label for="">dsdasd</label>
      <input type="checkbox" name="" id="">
    </div>

    <div class="filter-item-container">
      <label for="">dsdasd</label>
      <input type="checkbox" name="" id="">
    </div>
  </div>
    <div class="container-cards">
        <CardComponent
          v-for="card in store.cards"
          :key="card.name"
          :card="card"
        />
    </div>
</template>

<style lang="scss" scoped>

.filters-container{
  min-height: 100px;
  border-radius: 4px;
  background-color: rgb(92, 65, 30);
  min-width: 300px;
  align-self: flex-start;
  margin: 10px 20px;
  padding: 10px;
  display: flex;
  flex-direction: column;

  & .filter-item-container{
    display: flex;
    align-items: center;
  }
}
.container-cards {
  display: flex;
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 2rem;
  justify-content: center;
}
</style>
