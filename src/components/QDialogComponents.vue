<template>
  <div class="">
    <q-dialog v-model="dialog" persistent>
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
            <div class="full-width">
              <q-table-mini-components @AddFormProduct="addProduct" />
            </div>

            <div class="full-width flex justify-end q-my-md">
              <q-btn
                icon="save"
                label="Salvar"
                color="green-5"
                @click="addProduct"
              ></q-btn>
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>
    <div class="">
      <div class="full-width flex justify-end q-mr-sm">
        <q-btn
          round
          color="blue-5"
          class="q-ma-lg"
          @click="openAddDialog"
          icon="add"
        >
        </q-btn>
      </div>
    </div>
    <div class=""></div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import QTableMiniComponents from "./QTableMiniComponents.vue";

export default defineComponent({
  name: "QDialogComponents",
  components: {
    QTableMiniComponents,
  },
  data() {
    return {
      dialog: false,
      columns: [
        { name: "codigo", label: "Código", align: "left" },
        { name: "cliente", label: "Cliente", align: "left" },
        { name: "entrega", label: "Entrega", align: "center" },
        { name: "observacao", label: "Observação", align: "left" },
      ],
      products: [
        {
          codigo: "1",
          cliente: "Fernando",
          entrega: "06/06/2024",
          observacao: "Perigo, tomar cuidado!",
        },
        {
          id: 2,
          codigo: "2",
          cliente: "Henrique",
          entrega: "20/10/2024",
          observacao: "Cuidado, produto muito perigoso!",
        },
      ],
      formAddProduct: {},
      selectedProducts: [],
      currentProduct: null,
      selectedEditProducts: [],
      formProduct: {
        codigo: "",
        cliente: "",
        entrega: "",
        observacao: "",
      },
    };
  },
  methods: {
    addProduct(newProducts) {
      this.products.push(newProducts);
    },

    openAddDialog() {
      this.dialog = true;
    },

    resetPopUp() {
      this.selectedProducts = [];
      this.selectedEditProducts = [];
      this.formAddProduct = {
        codigo: "",
        observacao: "",
      };
    },
  },
});
</script>


<style></style>
