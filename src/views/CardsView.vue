<script setup lang="ts">
import CardComponent from '@/components/CardComponent.vue';
import { ref, reactive, watch } from 'vue';
import type { Ref } from 'vue';
import { useCardStore } from '@/stores/card';
import type { Card } from '@/interfaces/Card';

const store = useCardStore(); 

interface filter {
  power: string,
  cost: string,
  pool: string,
  onReveal: boolean | string,
  ongoing: boolean | string,
  move: boolean | string,
  destroy: boolean | string,
  noAbility: boolean | string,
  draw: boolean | string,
  discard: boolean | string,
  release: boolean | string,
}

const filters: filter = reactive({
  power: '',
  cost: '',
  pool: '',
  onReveal: false,
  ongoing: false,
  move: false,
  destroy: false,
  noAbility: false,
  draw: false,
  discard: false,
  release: true,
});

const selectedAbility = ref('');
const filteredCardArray: Ref<Card[]> = ref([]);

const pools = [
  {
    value: 'first'
  },
  {
    value: 'second'
  },
  {
    value: 'third'
  },
  {
    value: 'fourth'
  },
  {
    value: 'fifth'
  },
  {
    value: 'sixth'
  },
  {
    value: 'seventh'
  },
  {
    value: 'eighth'
  }
]

const powers = [
  {
    value: 'first'
  },
  {
    value: 'second'
  },
  {
    value: 'third'
  },
  {
    value: 'fourth'
  },
  {
    value: 'fifth'
  },
  {
    value: 'sixth'
  },
  {
    value: 'seventh'
  },
  {
    value: 'eighth'
  }
]

const costs = [
  {
    value: 'first'
  },
  {
    value: 'second'
  },
  {
    value: 'third'
  },
  {
    value: 'fourth'
  },
  {
    value: 'fifth'
  },
  {
    value: 'sixth'
  },
  {
    value: 'seventh'
  },
  {
    value: 'eighth'
  }
]

const abilityFilters = [
  {
    text: 'Move', value: 'move'
  },
  {
    text: 'Destroy', value: 'destroy'
  },
  {
    text: 'No Ability', value: 'noAbility'
  },
  {
    text: 'Draw', value: 'draw'
  },
  {
    text: 'Discard', value: 'discard'
  }
]

watch(selectedAbility, (newSelectedAbility) => {
    (filters as any)[newSelectedAbility] = true;

    for (let index = 0; index < abilityFilters.length; index++) {
      const filterKey = abilityFilters[index];
      if(filterKey.value != newSelectedAbility) {
        (filters as any)[filterKey.value] = false;
      }
    }

});


watch(filters, (newFilters) => {
  filteredCardArray.value = store.cards.filter(function(item) {
    for(const key in newFilters) {
      if((newFilters as any)[key] === (item as any)[key]) {
        return filteredCardArray.value
      }
    }
  })
});


</script>

<template>
  <div class="filters-container">
    <div class="filter-item-container">
      <label for="">Сила</label>
      <input
        v-for="item in powers"
        type="radio"
        v-model="filters.power"
        :value="item.value"
      >
    </div>

    <div class="filter-item-container">
      <label for="">Стоимость</label>
     <input
        v-for="item in costs"
        type="radio"
        v-model="filters.cost"
        :value="item.value"
      >
    </div>

    <div class="filter-item-container">
      <label for="">Пул</label>
      <input
        v-for="item in pools"
        type="radio"
        v-model="filters.pool"
        :value="item.value"
      >
    </div>

    <div class="filter-item-container">
      <label for="">Абилки</label>
      <select v-model="selectedAbility">
        <option v-for="option in abilityFilters" :value="option.value">
          {{ option.text }}
        </option>
      </select>
    </div>

    <div class="filter-item-container text-checkbox">
      <div>
        <label for="">При раскрытии</label>
        <input type="checkbox" v-model="filters.onReveal">
      </div>

      <div>
        <label for="">Продолжительный эффект</label>
        <input type="checkbox" v-model="filters.ongoing">
      </div>

      <div>
        <label for="">В игре:</label>
        <input type="checkbox" v-model="filters.release">
      </div>
    </div>
  </div>
  <div class="container-cards">
      <CardComponent 
        v-if="filteredCardArray.length"
        v-for="card in filteredCardArray"
        :key="card.name"
        :card="card"
      />
      <!-- <CardComponent
        v-if="!filteredCardArray.length"
        v-for="card in store.cards"
        :key="card.name"
        :card="card"
      /> -->
  </div>
</template>

<style lang="scss" scoped>

.filters-container{
  min-height: 100px;
  border-radius: 4px;
  background-color: rgb(48, 47, 63);
  min-width: 300px;
  align-self: flex-start;
  margin: 20px 20px;
  padding: 10px;
  display: flex;
  flex-direction: column;

  & .text-checkbox{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  & .filter-item-container{
    display: flex;
  }
}
.container-cards {
  display: flex;
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
