<template>
  <div>
    <q-dialog v-model="dialog" persistent>
      <q-card class="row col flex flex-center">
        <q-card-section
          class="flex flex-center justify-between col-11 q-mb-md"
          style="border-bottom: 1px solid grey"
        >
          <p class="text-h4 q-ma-sm">Pedido</p>
          <q-btn icon="close" round class="q-ma-sm" v-close-popup @click="resetPopUp"></q-btn>
        </q-card-section>

        <div class="row col-12 flex flex-center">
          <div class="col-11 row">
            <q-form-components
              :formProduct="formProduct"
              @formSubmitted="handleAddFormProduct"
              @formSubmissionFailed="formSubmissionFailed"
              ref="QFormRef"
            />
            <div class="full-width">
              <q-table-mini-components
              :products="products"
              :columns="columns"
              @productSelected="handleProductSelected"
            />
            </div>
            <div class="full-width flex justify-end q-my-md">
              <q-btn @click="AdicionarProdutoNovo" icon="save" label="Salvar" color="green-5" />
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>
    <div class="full-width flex justify-end q-mr-sm">
      <q-btn round color="blue-5" class="q-ma-lg" @click="openAddDialog" icon="add"></q-btn>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import QTableMiniComponents from "./QTableMiniComponents.vue";
import QFormComponents from "./QFormComponents.vue";

export default defineComponent({
  name: "QDialogComponents",
  components: {
    QTableMiniComponents,
    QFormComponents,
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
        { id: 1, codigo: "1", cliente: "Fernando", entrega: "06/06/2024", observacao: "Perigo, tomar cuidado!" },
        { id: 2, codigo: "2", cliente: "Henrique", entrega: "20/10/2024", observacao: "Cuidado, produto muito perigoso!" },
      ],
      formProduct: {
        codigo: "",
        cliente: "",
        entrega: "",
        observacao: "",
      },
    };
  },
  methods: {
    handleAddFormProduct(product) {
      product.id = this.products.length + 1;
      this.products.push(product);
      this.$refs.QFormRef.resetarFormulario(); // Reseta o formulário
    },
    handleProductSelected(product) {
      this.formProduct = { ...product };
    },
    formSubmissionFailed(){
      this.$q.notify("Erro no preenchimento do Formulario");
    },
    AdicionarProdutoNovo() {
      this.$refs.QFormRef.validateAndSubmitForm();
    },
    openAddDialog() {
      this.dialog = true;
    },
    resetPopUp() {
      this.formProduct = {
        codigo: "",
        cliente: "",
        entrega: "",
        observacao: "",
      };
    },
  },
});
</script>
