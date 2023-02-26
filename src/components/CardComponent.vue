<script setup lang="ts">
import type { Card } from '@/interfaces/Card';
import CardView from '@/views/CardView.vue';

const props = defineProps<{
  card: Card
}>()

function editDescription(text: string): string | null {
      // const revealRegexp = /При раскрытии:/gi;
      // const ongoingRegexp = /Продолжительный эффект:/gi;
      // '<span class="span-ability">При раскрытии:</span>'
      //  '<span class="span-ability">Продолжительный эффект:</span>'

      function replacer(match: string, p1: string, p2: string) {
      // p1 is non-digits, p2 digits, and p3 non-alphanumerics
      console.log("p1: ", p1, "p2: ", p2);
      return ``;
    }
      if(text.length) {
        let newDescription = text.replace(/([При раскрытии:])([Продолжительный эффект:])/, replacer);
      }
      return null;
  }

  function goToCard () {

  }

  function mouseEnter () {

  }

  function mouseMove () {

  }

  function mouseLeave () {

  }

    function getImageUrl (name: string) {
        return new URL(`../assets/cards/${name}.webp`, import.meta.url).href
    }

</script>

<template>
     <div class="container-of-card" @click="goToCard">
        <div class="card">
          <img
            :src="getImageUrl(card.name)"
            alt="card"
            @mouseenter="mouseEnter"
            @mousemove="mouseMove"
            @mouseleave="mouseLeave"
          />
          <div v-html="editDescription(card.description)" class="description"></div>
        </div>
      </div>
</template>

<style lang="scss" scoped>
.container-of-card {
  display: flex;
  cursor: pointer;
  height: 24rem;
  flex-direction: row;
  justify-content: space-between;
  align-content: flex-start;
  margin: 1rem;
  .card {
    display: flex;
    align-items: center;
    flex-direction: column;
    .description {
      display: flex;
      flex-direction: column;
      color: white;
      font-weight: 500;
      font-size: 14px;
      width: 15rem;
      text-align: center;
      background: rgb(0, 0, 0);
      padding:  5px;
      border-radius: 10px;
      span {
        font-size: 17px;
        font-weight: 600;
      }
      &:hover {
        color: black;
        background: white;
        outline: 4px solid black;
        transition:  all 0.5s ease-out;
      }
    }
    img {
      width: 300px;
    }
  }
}


.description :deep(.span-ability) {
  font-size: 17px;
  font-weight: 600;
}


</style>
