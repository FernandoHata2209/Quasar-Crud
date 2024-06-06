<template>
  <div class="">
    <q-dialog v-model="dialog" persistent ref="AddDialog">
      <q-card class="row col flex flex-center">
        <q-card-section
          class="flex flex-center justify-between col-11 q-mb-md"
          style="border-bottom: 1px solid grey"
        >
          <p class="text-h4 q-ma-sm">Pedido</p>
          <q-btn
            icon="close"
            round
            class="q-ma-sm"
            v-close-popup
            @click="resetPopUp"
          >
          </q-btn>
        </q-card-section>

        <div class="row col-12 flex flex-center">
          <div class="col-11 row">
            <q-form-components />
          </div>
        </div>
      </q-card>
    </q-dialog>
    <div class="">
      <div class="full-width flex justify-end q-mr-sm">
        <q-btn round color="blue-5" class="q-ma-lg" @click="openAddDialog">
          <q-icon src="ListToDo/src/assets/add.svg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#fffff"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            </svg>
          </q-icon>
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import QFormComponents from "./QFormComponents.vue";

export default defineComponent({
  components: {
    QFormComponents,
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    openAddDialog(product) {
      this.selectedProducts = [];
      this.currentProduct = product;
      this.dialog = true;
      console.log(this.products);
    },

    resetPopUp() {
      this.selectedProducts = [];
      this.selectedEditProducts = [];
      this.formAddProduct = {
        codigo: "",
        observacao: "",
      };
      this.verificar = false;
    },
  },
});
</script>


<style></style>
