<script setup lang="ts">
import { onMounted, onActivated, onDeactivated } from 'vue';
import AllCard from '@/cards.json';
import CardComponent from '@/components/CardComponent.vue';
import { useCardStore } from '@/stores/card';

const store = useCardStore();


// onMounted(() => {
//   store.setCards(AllCard);
// })

onActivated(() => {
  // called on initial mount
  // and every time it is re-inserted from the cache
  //console.log('active cardsView component')
})

onDeactivated(() => {
  // called when removed from the DOM into the cache
  // and also when unmounted
  //console.log('deactive cardsView component')
})
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
