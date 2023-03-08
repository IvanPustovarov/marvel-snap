<script setup lang="ts">
import { ref, watch } from 'vue';
import IconClose from './icons/IconClose.vue';

const emit = defineEmits<{
  (e: 'show', isShow: boolean): void
}>();

const userSearch = ref('');

watch(userSearch, (newUserSearch) => {
  console.log(`newUserSearch is ${newUserSearch}`)
});

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
        {{ userSearch ? userSearch : 'История поиска пуста' }}
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
        display: flex;
        justify-content: center;
        padding-top: 1rem;
        min-height: 80px;
        max-height: 500px;
      }
    }

  }
</style>
