<script setup lang="ts">
import { RouterLink } from "vue-router"
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import ModalSearch from "@/components/ModalSearch.vue"


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
            <div class="item">
              <RouterLink to="/">Главная</RouterLink>
            </div>
            <div class="item">
              <RouterLink to="/cards">Карты</RouterLink>
            </div>
            <div class="item">
              <RouterLink to="/locations">Локации</RouterLink>
            </div>
            <div class="item">
              <RouterLink to="/about">О нас</RouterLink>
            </div>
            <div class="item" @click="modal = true">
              <span>Поиск</span>
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

      &.router-link-exact-active {
        color: #ffffff;
      }
    }
    .logo-img {
      position: absolute;
      cursor: pointer;
      top: 5px;
      left: 14px;
      height: 5rem;
      img {
        width: 80%;
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
      .item {
        display: flex;
        padding: 0 0 0 0.3rem;
        height: 100%;
        height: 5rem;
        align-items: center;
        font-size: 18px;
        a, span {
          cursor: pointer;
          text-decoration: none;
          padding: 2.5rem 1rem 2.5rem 0;
        }
        &:hover {
          background: linear-gradient(
                        180deg,
                        rgba(128, 70, 222, 0.9),
                        rgb(35, 14, 83)
                    );
          background-size: 200% 200%;
        }
      }

      .modal{
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 420px;
        max-width: 100%;
        z-index: 10;
        color: black;
      }
    }
  }
  .br {
  height: 0.7rem;
  background: linear-gradient(-45deg, #ed193b, #a98055, #f286e2, #681d7a);
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
