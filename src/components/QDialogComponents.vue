<template>
  <div>
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
            push
            @click="resetPopUp"
          ></q-btn>
        </q-card-section>

        <div class="row col-12 flex flex-center">
          <div class="col-11 row">
            <q-form-components
              :formProduct="formProduct"
              @AdicionarPedido="AdicionarPedido"
              @formSubmissionFailed="formSubmissionFailed"
              ref="QFormRef"
            />
          </div>
        </div>
      </q-card>
    </q-dialog>
    <div class="full-width flex justify-end q-mr-sm">
      <q-btn
        round
        color="blue-5"
        class="q-ma-lg"
        push
        @click="openAddDialog"
        icon="add"
      ></q-btn>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import QFormComponents from "./QFormComponents.vue";

export default defineComponent({
  name: "QDialogComponents",
  components: {
    QFormComponents,
  },
  data() {
    return {
      dialog: false,
      formProduct: {
        codigo: "",
        cliente: "",
        entrega: "",
        observacao: "",
      },
    };
  },
  methods: {
    AdicionarPedido(pedido, produtoSelecionado) {
      console.log(pedido, produtoSelecionado);
      this.$emit("AdicionarPedidoLista", pedido, produtoSelecionado);
      this.$refs.QFormRef.resetarFormulario(); // Reseta o formulário
    },

    handleProductSelected(product) {
      this.formProduct = { ...product };
    },

    formSubmissionFailed() {
      this.erroPreenchimentoFormulario();
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

    erroPreenchimentoFormulario() {
      this.$q.notify({
        message: "Erro no preenchimento do formulário",
        color: "negative",
        position: "top",
        timeout: 3000,
        icon: "close",
      });
    },
  },
});
</script>
