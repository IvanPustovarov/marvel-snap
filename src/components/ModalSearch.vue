<script lang="ts" setup>
import { ref, watch } from 'vue';
import type { Ref } from 'vue'
import IconClose from './icons/IconClose.vue';
import { useCardStore } from '@/stores/card';
import type { Card } from '@/interfaces/Card';
import { useRouter, useRoute } from 'vue-router'

const store = useCardStore();
const router = useRouter();
const route = useRoute();

console.log(route);

const emit = defineEmits<{
  (e: 'show', isShow: boolean): void
}>();

const userSearch = ref('');
const coincidenceArray: Ref<Card[]> = ref([]);

watch(userSearch, (newUserSearch) => {
  if(newUserSearch) {
    coincidenceArray.value = store.cards.filter(item=> item.description.includes(newUserSearch));
  } else {
    coincidenceArray.value = [];
  }
});

function goToCard (name: string) {
  return router.push({ name: "card", params: { id: `${name}` } });
}

</script>

<template>
  <div class="inner">
    <div class="button-container">
      <span class="button-close" @click="emit('show', false)">
        <IconClose />
      </span>
    </div>
    <div class="search-input-container">
      <input
        type="text"
        v-model="userSearch"
        class="search-input"
        placeholder="Введите название карты или локации"
      >
      <div class="search-result">
            <div
              v-if="!coincidenceArray.length"
              class="no-coincidence"
              >
                Совпадений не найдено
              </div>
            <div
              v-for="item in coincidenceArray"
              @click="goToCard(item.name)"
              class="search-item"
            >
            {{ item.name }}
            </div>
      </div>
    </div>

  </div>
</template>

<style scoped lang="scss">
 .inner {
    color: white;
    display: flex;
    flex-direction: column;
    background: linear-gradient(
                    180deg,
                    rgba(128, 70, 222),
                    rgb(35, 14, 83)
                );
    background-size: 200% 200%;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: 1px solid black;
    box-shadow: 2px 2px 10px rgba(10, 10, 10, 0.1);

    & .button-container{
      display: flex;
      justify-content: flex-end;
      padding-bottom: 0.5rem;
      & .button-close{
        cursor: pointer;
        & svg{
          fill: white;
        }
      }
    }

    & .search-input-container{
      display: flex;
      flex-direction: column;
      & .search-input{
        margin-bottom: 1rem;
        height: 30px;
        font-size: 20px;
        padding: 4px;
        outline: 2px solid rgb(65, 31, 112);
        border-radius: 5px;

        &::placeholder{
          font-size: 14px;
        }

        &:focus{
          outline: 2px solid rgb(65, 31, 112);
        }
      }

      & .search-result{
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        padding-top: 14px;
        min-height: 80px;
        max-height: 500px;

        & .no-coincidence{
          display: flex;
          justify-content: center;
        }

        & .search-item{
          cursor: pointer;
          border: 1px solid white;
          margin: 0 10px 10px 0;
          padding: 8px;
          border-radius: 3px;

          &:hover{
            background: linear-gradient(
                    180deg,
                    rgb(76, 47, 123),
                    rgb(24, 6, 66)
                );
            background-size: 400% 400%;
          }
        }

        &::-webkit-scrollbar-track {
          border-radius: 6px;
        }
      }
    }

  }
</style>
