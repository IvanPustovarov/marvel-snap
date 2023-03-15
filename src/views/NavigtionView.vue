<script setup lang="ts">
import { RouterLink, useRoute, useRouter } from "vue-router"
import { ref, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'
import ModalSearch from "@/components/ModalSearch.vue"
import IconSearch from '@/components/icons/IconSearch.vue';


const route = useRoute();
const router = useRouter();

const paths = ref([
  {
    link: '/',
    text: 'Главная',
    isActive: false
  },
  {
    link: '/cards',
    text: 'Карты',
    isActive: false
  },
  {
    link: '/locations',
    text: 'Локации',
    isActive: false
  },
  {
    link: '/about',
    text: 'О нас',
    isActive: false
  },

])

watch(route, (newRoute) => {
  if(newRoute) {
    paths.value.map(item=> item.link === newRoute.path ? item.isActive = true : item.isActive = false);
  }
});

const modal = ref(false);
const modalRef = ref(null);
onClickOutside(
  modalRef,
  (event) => {
    modal.value = false
  },
)

function changeShow () {
  modal.value = false;
};

function goToPage (path: string) {
  return router.push(`${path}`)
}

</script>

<template>
   <div class="nav-panel">
    <nav>
        <div class="logo-img">
          <RouterLink to="/">
            <img src="@/assets/img/logo.png" alt="" />
          </RouterLink>
        </div>
      <div class="links">
            <div
              v-for="item in paths"
              :key="item.link"
              class="item"
              :class="item.isActive ? 'active-item': ''"
              @click="goToPage(item.link)"
            >
              {{ item.text }}
            </div>
            <div class="search" @click="modal = true">
              <span>Поиск</span>
              <IconSearch />
            </div>
            <div v-if="modal" ref="modalRef" class="modal">
                <ModalSearch @show='changeShow' />
            </div>
      </div>
    </nav>
    <div class="br"></div>
  </div>
</template>

<style scoped lang="scss">
.nav-panel {
  width: 100%;
  min-height: 5rem;
  nav {
    background-color: rgb(27, 30, 41);
    display: flex;
    flex-direction: row;
    position: relative;
    a, span {
      font-style: italic;
      font-weight: 600;
      color: #ffffff;
      text-decoration: none;
    }
    .logo-img {
      position: absolute;
      cursor: pointer;
      top: 5px;
      left: 14px;
      height: 5rem;
      img {
        width: 80%;
        transition: all 0.3s ease-out;
        &:hover {
          transform: perspective(1000px) rotateX(0deg) rotateY(0deg)
            scale3d(1.035, 1.035, 1.035);
          transition: all 0.5s ease-out;
        }
      }
    }
    .links {
      display: flex;
      padding: 0 0 0 10rem;
      align-items: center;
      width: 100%;

      div:last-of-type{
        margin-left: auto;
      }

        .active-item{
          background: linear-gradient(
                          180deg,
                          rgb(133, 96, 185),
                          rgb(38, 24, 70)
                      );
          background-size: 200% 200%;
          color: rgb(28, 9, 54) !important;
        }
        .item {
          display: flex;
          padding: 0 0 0 0.3rem;
          height: 5rem;
          align-items: center;
          font-size: 18px;
          cursor: pointer;
          font-style: italic;
          font-weight: 600;
          color: #ffffff;
          padding-right: 1rem;
          &:hover {
            color: rgb(133, 96, 185);
          }
        }

        .search{
          margin-left: auto;
          margin-right: 20px;
          background-color: rgb(133, 96, 185);
          border-radius: 5px;
          min-height: 50px;
          min-width: 200px;
          padding: 0 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;

          & span {
            font-style: normal
          }
          transition: all 0.5s ease-in-out;
          &:hover{
            background-color: #681d7a;
            svg {
              transform: rotate(90deg);
            }
          }

          svg{
            fill: white;
            margin-left: 10px;
            transition: all 0.5s ease-in-out;
          }
        }

        .modal{
          position: fixed;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 420px;
          max-width: 500px;
          max-width: 100%;
          z-index: 10;
        }
    }
  }
  .br {
    height: 0.5rem;
    background: linear-gradient(-45deg, #b819ed, #555ca9, #f286e2, #681d7a);
    background-size: 400% 400%;
    animation: gradient 10s ease infinite;
  }
}


@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

</style>
