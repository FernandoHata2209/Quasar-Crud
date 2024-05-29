<template>
  <q-layout view="lHh Lpr lFf" class="">
    <q-header >
      <div class=" q-px-lg q-pt-xl q-mb-md f flex flex-center">
        <div class="text-center">
          <div class="col-12 text-h3 q-pb-sm">Quasar Estoque</div>
          <div class="col-12 text-subtitle1">{{ todaysDate }}</div>
        </div>
      </div>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { date } from 'quasar'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
  },

  computed: {
    todaysDate() {
      const timeStamp = Date.now()
      return date.formatDate(timeStamp, 'hh:mm dddd DD MMM')
    }
  },
})
</script>
