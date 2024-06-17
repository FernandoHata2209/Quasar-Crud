<template>
  <div>
    <q-layout view="hHh Lpr lff">
      <q-header>
        <div class="q-px-md q-pt-lg q-mb-sm f flex flex-center">
          <div class="text-center">
            <div class="col-12 text-h3 q-pb-sm">Quasar Estoque</div>
            <div class="col-12 text-subtitle1">{{ todaysDate }}</div>
          </div>
        </div>
        <q-toolbar>
          <q-btn
            flat
            @click="drawerUpdate = !drawerUpdate"
            round
            dense
            icon="menu"
          />
          <q-toolbar-title>Cruds Onboarding Estágio</q-toolbar-title>
        </q-toolbar>
      </q-header>
      <q-drawer
        v-model="drawerUpdate"
        show-if-above
        :mini="miniState"
        @mouseover="miniState = false"
        @mouseout="miniState = true"
        mini-to-overlay
        :width="200"
        :breakpoint="500"
        bordered
        :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
      >
        <q-scroll-area class="fit">
          <q-list padding class="menu-list">
            <q-item clickable v-ripple to="/Produtos">
              <q-item-section avatar>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="black"
                >
                  <path
                    d="M160-160v-516L82-846l72-34 94 202h464l94-202 72 34-78 170v516H160Zm240-280h160q17 0 28.5-11.5T600-480q0-17-11.5-28.5T560-520H400q-17 0-28.5 11.5T360-480q0 17 11.5 28.5T400-440ZM240-240h480v-358H240v358Zm0 0v-358 358Z"
                  />
                </svg>
              </q-item-section>
              <q-item-section> Crud Produtos </q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/Pedidos">
              <q-item-section avatar>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="black"
                >
                  <path
                    d="M160-160v-516L82-846l72-34 94 202h464l94-202 72 34-78 170v516H160Zm240-280h160q17 0 28.5-11.5T600-480q0-17-11.5-28.5T560-520H400q-17 0-28.5 11.5T360-480q0 17 11.5 28.5T400-440ZM240-240h480v-358H240v358Zm0 0v-358 358Z"
                  />
                </svg>
              </q-item-section>

              <q-item-section> Crud Pedidos </q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/BaterPonto">
              <q-item-section avatar>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="black"
                >
                  <path
                    d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z"
                  />
                </svg>
              </q-item-section>

              <q-item-section> Bater Ponto </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { date } from "quasar";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",
  data() {
    return {
      drawerUpdate: false,
      miniState: true,
    };
  },
  components: {},

  computed: {
    todaysDate() {
      const timeStamp = Date.now();
      return date.formatDate(timeStamp, "hh:mm dddd DD MMM");
    },
  },
});
</script>
