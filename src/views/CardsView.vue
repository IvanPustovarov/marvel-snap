<script setup lang="ts">
import CardComponent from '@/components/CardComponent.vue';
import { ref, reactive, watch } from 'vue';
import type { Ref } from 'vue';
import { useCardStore } from '@/stores/card';
import type { Card } from '@/interfaces/Card';
import { title } from 'process';

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

const filtersAbility = reactive([
  {
    move: filters.move,
    title: 'move',
    text: "Движение"
  },
  {
    destroy: filters.destroy,
    title: 'destroy',
    text: "Уничтожение"
  },
  {
    noAbility: filters.noAbility,
    title: 'noAbility',
    text: "Нет свойств"
  },
  {
    draw: filters.draw,
    title: 'draw',
    text: "Добор"
  },
  {
    discard: filters.discard,
    title: 'discard',
    text: "Сброс"
  },
  {
    onReveal: filters.onReveal,
    title: 'onReveal',
    text: "При раскрытии"
  },
  {
    ongoing: filters.ongoing,
    title: 'ongoing',
    text: "Продолжительный эффект"
  },
  {
    release: filters.release,
    title: 'release',
    text: "В игре"
  }
])

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
    if(name === (filters as any)[filterName]?.toString()) {
        return new URL(`../assets/img/active-${filterName}-icon.webp`, import.meta.url).href
      } else {
          return new URL(`../assets/img/not-active-${filterName}-icon.webp`, import.meta.url).href
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

  for (let index = 0; index < filtersAbility.length; index++) {
    let element = filtersAbility[index];
    (element as any)[element.title] = false;
  }
  const releaseAbility = filtersAbility.find((item)=> item.title === 'release');
  (releaseAbility as any).release = true;
  filters.release = true;

  filteredCardArray.value = store.cards;
}

function renderCards () {
  return filteredCardArray.value;
}

function setCheckAbility (item: any) {
  item[item.title] = !item[item.title];
  (filters as any)[item.title] = item[item.title];
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

    <div class="filter-item-container">
      <div class="property-name">Пул</div>
      <label class="filter-item-container-radio" v-for="item in pools" :key="item.value">
        <div class="input-pool-container">
          <input
            type="radio"
            v-model="filters.pool"
            :value="item.value"
            class="input-pool"
          >
          <span class="filter-value__pool">{{ item.value }}</span>
        </div>
      </label>
    </div>

    <div class="filter-item-container">
      <div
        class="ability-item"
        v-for="item in filtersAbility"
        :key="item.text"
        :class="(item as any)[item.title] ? 'ability-item__checked' : ''"
        @click="setCheckAbility(item)"
        >
        {{ item.text }}
      </div>
    </div>

    <div class="filter-item-container">
      <button @click="resetFiltes" class="reset-button">Сбросить фильтры</button>
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
  background-color: rgba(48, 47, 63, 0.5);
  max-width: 475px;
  align-self: flex-start;
  margin: 20px 20px;
  padding: 10px;
  display: flex;
  flex-direction: column;

  & .filter-item-container{
    display: flex;
    gap: 5px;
    margin-bottom: 5px;
    flex-wrap: wrap;
    & .property-name{
      display: flex;
      align-items: center;
    }

    & .ability-item{
      display: flex;
      cursor: pointer;
      color: black;
      align-items: center;
      justify-content: center;
      border-radius: 3px;
      padding: 10px 15px;
      background-color: rgb(255, 255, 255);
       box-shadow: -2px -2px 4px rgba(255,255,255,0.5),
            3px 2px 2px rgba(0, 0, 0, 0.5);

      &__checked{
        background-color: rgba(180, 180, 180, 0.9);
         box-shadow: inset -2px -2px 4px rgba(255,255,255,0.5),
           inset 3px 2px 2px rgba(70,70,70, 0.5);
      }
    }

    & .reset-button{
      border: none;
      cursor: pointer;
      padding: 10px;
      border-radius: 3px;
      font-size: 18px;
      background-color: rgb(155, 90, 199);
      color: rgb(0, 0, 0);
      margin-top: 10px;
      transition: all ease 0.2s;
      &:hover{
        color: white;
        background-color: rgb(100, 36, 142);
      }
    }
  }

  & .filter-item-container-radio{
    display: flex;

    .icon-filter{
      max-width: 35px;
        &__cost{
          max-width: 40px;
        }

        &__pool{
          width: 30px;
          height: 30px;
        }
    }

    input {
      display: none;
    }

    .input-pool-container{
      position: relative;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all ease 0.2s;
      .filter-value__pool{
          position: absolute;
          color: black;
          padding: 5px;
      }
      .input-pool{
        display: block !important;
        appearance: none;
        width: 2rem;
        height: 2rem;
        background-color: rgb(255, 255, 255);
        border-radius: 3px;
        box-shadow: -2px -2px 4px rgba(255,255,255,0.5),
            3px 2px 2px rgba(0, 0, 0, 0.5);


        &:checked{
           background-color: rgba(180, 180, 180, 0.9);
           box-shadow: inset -2px -2px 4px rgba(255,255,255,0.5),
           inset 3px 2px 2px rgba(70,70,70, 0.5);

        }
      }
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
