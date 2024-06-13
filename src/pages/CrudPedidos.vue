<template>
  <q-page padding class="flex justify-center">
    <div class="flex justify-center full-width">
      <q-table-components class="" />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import QTableComponents from "../components/compPedidos/QListComponents.vue";

export default defineComponent({
  components: { QTableComponents },
  name: "crudPedidos",
});
</script>

<style lang="scss"></style>
