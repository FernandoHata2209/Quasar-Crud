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
