<template>
  <q-dialog v-model="editarDialog" persistent>
    <q-card class="row">
      <q-card-section class="full-width">
        <div class="flex justify-between">
          <p class="text-h5">Editar Pedido</p>
          <div class="">
            <q-btn icon="close" v-close-popup round push></q-btn>
          </div>
        </div>
      </q-card-section>
      <q-card-section class="full-width">
        <q-card-actions class="flex justify-end full-width">
          <q-btn label="Cancelar" color="negative" icon="delete" push />
          <q-btn label="Editar" color="primary" icon="edit" push />
        </q-card-actions>
      </q-card-section>
    </q-card>
  </q-dialog>
  <q-btn
    class="q-mr-sm"
    push
    icon="edit"
    color="primary"
    @click="abrirEditarDialog"
  ></q-btn>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  setup() {},

  data() {
    return {
      editarDialog: false,
    };
  },
  methods: {
    abrirEditarDialog() {
      this.editarDialog = true;
    },
  },
});
</script>


