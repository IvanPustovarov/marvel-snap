<script setup lang="ts">
import CardComponent from '@/components/CardComponent.vue';
import { ref, reactive, watch } from 'vue';
import type { Ref } from 'vue';
import { useCardStore } from '@/stores/card';
import type { Card } from '@/interfaces/Card';

const store = useCardStore();

interface filter {
  power?: number,
  cost?: number,
  pool?: number,
  onReveal?: boolean,
  ongoing?: boolean,
  move?: boolean,
  destroy?: boolean,
  noAbility?: boolean,
  draw?: boolean,
  discard?: boolean,
  release?: boolean,
}

const filters: filter = reactive({
  power: undefined,
  cost: undefined,
  pool: undefined,
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
const filteredCardArray: Ref<Card[]> = ref(store.cards);


const pools = [
  {
    value: 1
  },
  {
    value: 2
  },
  {
    value: 3
  },
  {
    value: 4
  },
  {
    value: 5
  },
  {
    value: 6
  },
  {
    value: 7
  },
  {
    value: 8
  }
]

const powers = [
  {
    value: 0
  },
  {
    value: 1
  },
  {
    value: 2
  },
  {
    value: 3
  },
  {
    value: 4
  },
  {
    value: 5
  },
  {
    value: 6
  },
  {
    value: 7
  },
  {
    value: 8
  }
]

const costs = [
  {
    value: 0
  },
  {
    value: 1
  },
  {
    value: 2
  },
  {
    value: 3
  },
  {
    value: 4
  },
  {
    value: 5
  },
  {
    value: 6
  },
  {
    value: 7
  },
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
  acceptFilters(newFilters);
});

function acceptFilters (filtersObj: filter) {
  function callBack (item: Card) {
    return (item.release === filtersObj.release &&
          item.power === filtersObj.power &&
          item.cost === filtersObj.cost &&
          item.pool === filtersObj.pool &&
            (item.move === filtersObj.move && item.move != false ||
            item.destroy === filtersObj.destroy && item.destroy != false  ||
            item.noAbility === filtersObj.noAbility && item.noAbility != false ||
            item.draw === filtersObj.draw && item.draw != false ||
            item.discard === filtersObj.discard && item.discard != false) &&
          item.onReveal === filtersObj.onReveal &&
          item.ongoing === filtersObj.ongoing);
   }

   for (const [key, value] of Object.entries(filtersObj)) {
      if(value && key !== 'release') {
        filteredCardArray.value = store.cards.filter(callBack);
      }
   }
}

function getImageUrl (name: string, filterName: string) {
  if(filterName === 'power') {
    if(name === filters.power?.toString()) {
        return new URL(`../assets/img/active-power-icon.webp`, import.meta.url).href
      } else {
          return new URL(`../assets/img/not-active-power-icon.webp`, import.meta.url).href
        }
  }
  if(filterName === 'cost') {
    if(name === filters.cost?.toString()) {
        return new URL(`../assets/img/active-cost-icon.webp`, import.meta.url).href
      } else {
          return new URL(`../assets/img/not-active-cost-icon.webp`, import.meta.url).href
        }
  }
}

function resetFiltes() {
  filters.power = undefined;
  filters.cost = undefined;
  filters.pool = undefined;
  filters.onReveal = false;
  filters.ongoing = false;
  filters.move = false;
  filters.destroy = false;
  filters.noAbility = false;
  filters.draw = false;
  filters.discard = false;
  filters.release = true;

  filteredCardArray.value = store.cards;
}

function renderCards () {
  return filteredCardArray.value;
}

</script>

<template>
  <div class="filters-container">
    <div class="filter-item-container">
      <div class="property-name">Сила</div>
      <label class="filter-item-container-radio" v-for="item in powers" :key="item.value">
          <input
            type="radio"
            v-model="filters.power"
            :value="item.value"
          >
          <div class="filter-icon-container">
            <span v-if="item.value === 0" class="filter-value">&#x3c;0</span>
            <span v-if="item.value != 0" class="filter-value">{{ item.value }}</span>
            <img
              :src="getImageUrl(item.value.toString(), 'power')"
              class="icon-filter"
              alt="power"
            >
          </div>
      </label>
    </div>

    <div class="filter-item-container">
      <div class="property-name">Стоимость</div>
      <label class="filter-item-container-radio" v-for="item in costs" :key="item.value">
          <input
            type="radio"
            v-model="filters.cost"
            :value="item.value"
          >
            <div class="filter-icon-container">
            <span class="filter-value">{{ item.value }}</span>
            <img
              :src="getImageUrl(item.value.toString(), 'cost')"
              class="icon-filter__cost"
              alt="power"
            >
          </div>
      </label>
    </div>

    <div class="filter-item-container-radio">
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
        <option v-for="option in abilityFilters" :value="option.value" >
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
        <input
          type="checkbox"
          v-model="filters.ongoing"
          >
      </div>

      <div>
        <label for="">В игре:</label>
        <input type="checkbox" v-model="filters.release">
      </div>

      <button @click="resetFiltes">Сбросить фильтры</button>
    </div>
  </div>
  <div class="container-cards">
      <CardComponent
        v-for="card in renderCards()"
        :key="card.name"
        :card="card"
      />
      <div v-if="!renderCards().length">Нет совпадений с фильтрами :(</div>
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
    gap: 5px;
    & .property-name{
      display: flex;
      align-items: center;
    }
  }

  & .filter-item-container-radio{
    display: flex;

    .icon-filter{
      max-width: 35px;
        &__cost{
          max-width: 40px;
        }
    }

    input {
      display: none;
    }


  }

  & .filter-icon-container{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    .filter-value{
      position: absolute;
      font-weight: bold;
      color: rgb(255, 255, 255);
      font-size: 22px;
      -webkit-text-stroke: 0.1px rgb(180, 124, 61);
    }
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
