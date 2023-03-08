<script setup lang="ts">
import { useCardStore } from '@/stores/card';
import { useRoute } from 'vue-router'

const route = useRoute();
const store = useCardStore();

function findCard () {
    return store.getCard(route.params.id.toString())
}

const card = findCard();

function pool() {
      const poolRus: Record <number, string> = {
        0: 'Стартовый пул',
        1: '1-14 уровни',
        2: '1 пул',
        3: '2 пул',
        4: '3 пул',
        5: '4 пул',
        6: '5 пул',
        7: '6 пул'
      }
      if(card) return poolRus[card.pool];
      return undefined;
}

function release () {
    return card?.release ? "Выпущена" : "Не выпущена";
}

function getImageUrl (name: string | undefined) {
      return new URL(`../assets/cards/${name}.webp`, import.meta.url).href
}

</script>

<template>
   <div class="container-card">
    <div class="card">
      <div class="img-container">
        <img :src="getImageUrl(card?.name)" alt="card" />
        <div class="border-hover"></div>
      </div>
      <div class="info">
        <div class="card-desc">
          <span>Описание:</span>
          <p class="pb-2">{{ card?.description }}</p>
        </div>
        <div class="stats">
          <span>Характеристики:</span>
          <div class="cost">{{ card?.cost }}</div>
          <div class="power">{{ card?.power }}</div>
        </div>
        <div>
          Статус:
          {{ release() }}
        </div>
        <div>
          Источник: {{ pool() }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container-card {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex: 1;
  margin-top: 2rem;

  .card {
    display: flex;
    align-items: flex-start;
    flex-direction: row;

      .img-container {
        display: flex;
        align-items: center;
        justify-content: center;

          .border-hover {
            position: fixed;
            padding: 220px 159px;
            transition: all 0.5s ease-out;
            &:hover{
              box-shadow: inset 0px 0px 17px 2px rgba(255, 255, 255, 0.5),
                          0px 0px 49px 6px rgba(255, 255, 255, 0.5);
            }
          }

        }

    .info {
      .card-desc{
        display: flex;
        text-align: center;
        flex-direction: column;
        span {
          margin-bottom: 0.25rem;
          font-size: 24px;
          font-weight: 900;
        }
      }
      gap: 20px;
      margin-top: 1rem;
      flex-direction: column;
      width: 20rem;
      border-radius: 10px;
      padding: 2rem;
      background: rgb(48, 47, 63);
      color: white;
      transition: all 0.5s ease-out;
      &:hover{
        //  box-shadow: inset 0px 0px 17px 2px rgba(255, 255, 255, 0.5),
        // 0px 0px 49px 6px rgba(255, 255, 255, 0.5);
      }
      .stats {
        display: flex;
        flex-direction: row;
        align-items: center;
        span{
          margin-right: 1rem;
        }
        .power {
          display: flex;
          position: relative;
          width: 34px;
          height: 34px;
          font-weight: 900;
          padding: 6px;
          display: -webkit-box;
          display: -ms-flexbox;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          background-color: #fe6b26;
          -webkit-clip-path: polygon(
            50% 0%,
            95% 25%,
            95% 75%,
            50% 100%,
            5% 75%,
            5% 25%
          );
          clip-path: polygon(
            50% 0%,
            95% 25%,
            95% 75%,
            50% 100%,
            5% 75%,
            5% 25%
          );
          -webkit-box-shadow: inset 4px -2px 1px #fff6bb;
          box-shadow: inset 7px 0px 1px #fff6bb;
          text-shadow: -2px 0 #712401, 0 2px #712401, 1px 0 #712401,
            0 -2px #712401;
        }
        .cost {
          display: flex;
          margin-right: 12px;
          width: 32px;
          height: 31px;
          font-weight: 900;
          padding: 6px;
          border-radius: 50%;
          background-color: #3561fd;
          display: -webkit-box;
          display: -ms-flexbox;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          border: solid 1px #64a4ef;
          background-image: linear-gradient(
              137deg,
              #fdfdfd 16%,
              rgba(41, 150, 164, 0) 25%,
              rgba(41, 150, 164, 0) 104%,
              #fff 82%
            ),
            radial-gradient(
              circle at 50% 50%,
              #2f4f8f,
              #3561fd 44%,
              #097f95 73%,
              #2da5b7 76%
            );
          -webkit-box-shadow: inset 0px 0px 3px #fff;
          box-shadow: inset 0px 0px 3px #fff;
          text-shadow: -2px 0 #011d7e, 0 2px #011d7e, 1px 0 #011d7e,
            0 -2px #011d7e;
        }
      }
    }
    img {
      width: 550px;
      transition: all 0.5s ease-out;
    }
  }
}

</style>
