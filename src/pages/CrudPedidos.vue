<template>
  <q-page padding class="flex justify-center">
    <div class="flex justify-center full-width">
      <q-table-components class="" />
    </div>
    <q-dialog v-model="showEdit" persistent>
      <q-card>
        <q-card-section
          class="flex flex-center justify-between col-11 q-mb-md"
          style="border-bottom: 1px solid grey"
        >
          <p class="text-h4 q-ma-sm">Editar Pedido</p>
          <q-btn round class="q-ma-sm" v-close-popup>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#5f6368"
            >
              <path
                d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
              />
            </svg>
          </q-btn>
        </q-card-section>
        <q-card-section>
          <q-form @submit.prevent="updateProduct">
            <div class="row">
              <div class="col">
                <q-input
                  v-model="formProduct.codigo"
                  outlined
                  label="Codigo"
                  class="q-ma-md"
                  required
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'Por favor preencher dados',
                  ]"
                ></q-input>
                <q-input
                  v-model="formProduct.cliente"
                  outlined
                  label="Cliente"
                  class="q-ma-md"
                  required
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'Por favor preencher dados',
                  ]"
                ></q-input>
              </div>
              <div class="col">
                <q-input
                  v-model="formProduct.entrega"
                  outlined
                  label="Data de Entrega"
                  class="q-ma-md"
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'Por favor preencher dados',
                  ]"
                  required
                ></q-input>
                <q-input
                  v-model="formProduct.observacao"
                  outlined
                  label="Observação"
                  class="q-ma-md"
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'Por favor preencher dados',
                  ]"
                  required
                ></q-input>
              </div>
            </div>
            <div class="flex justify-end q-mt-lg q-mb-sm">
              <q-btn
                type="submit"
                icon="check"
                push
                color="primary"
                outlined
              ></q-btn>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import QTableComponents from "../components/QListComponents.vue";

export default defineComponent({
  components: { QTableComponents },

  props: [],

  name: "crudPedidos",

  data() {
    return {
      showEdit: false,
    };
  },
  methods: {
    updateProduct() {
      const index = this.products.findIndex(
        (a) => a.id === this.currentProduct.id
      );

      if (index !== -1) {
        this.products[index] = { ...this.formProduct };
      }

      this.resetForm();
      this.showEdit = false;
    },
  },
});
</script>

<style lang="scss"></style>
