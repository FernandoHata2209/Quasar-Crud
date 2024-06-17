<template>
  <q-card class="full-width no-shadow">
    <!-- Seção Q-Form -->

    <q-card-section>
      <q-form @submit.prevent="salvarPedido" class="col-12">
        <div class="flex col-12 row justify-between wrap">
          <div class="col full-width">
            <q-input
              v-model.trim="novoPedido.codigo"
              label="Código"
              outlined
              ref="codRef"
              :rules="[
                (val) => (val && val.length > 0) || 'Por favor preencher dados',
              ]"
              class="q-ma-sm"
            ></q-input>
          </div>
          <div class="col full-width">
            <q-input
              v-model.trim="novoPedido.cliente"
              label="Cliente"
              :rules="[
                (val) => (val && val.length > 0) || 'Por favor preencher dados',
              ]"
              ref="clientRef"
              outlined
              class="q-ma-sm"
            ></q-input>
          </div>
        </div>
        <div class="flex col-12 justify-between row">
          <div class="col full-width">
            <q-input
              v-model.trim="novoPedido.entrega"
              mask="##/##/####"
              label="Data de Entrega"
              ref="entregaRef"
              :format24h="true"
              mode="dateTime"
              clearable
              outlined
              class="q-ma-sm"
              :rules="[
                (val) => (val && val.length > 0) || 'Por favor preencher dados',
              ]"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model.trim="novoPedido.entrega" mask="DD/MM/YYYY">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="col full-width">
            <q-input
              v-model.trim="novoPedido.observacao"
              ref="obsRef"
              label="Observação"
              outlined
              class="q-ma-sm"
              :rules="[
                (val) => (val && val.length > 0) || 'Por favor preencher dados',
              ]"
            ></q-input>
          </div>
        </div>
      </q-form>
    </q-card-section>

    <!-- Seção Q-List -->

    <q-card-section>
      <q-table
        title="Pedidos"
        :rows="dados.produtos"
        :columns="dados.colunasProdutos"
        row-key="id"
        class="no-shadow col-10 q-mt-lg"
        bordered
        separator="cell"
      >
        <template v-slot:top>
          <p class="text-h4 q-ma-md">Adicionar Produtos</p>
          <q-space></q-space>
          <q-dialog-pedidos @salvarProduto="salvarProduto" />
        </template>
        <template v-slot:header></template>
        <template v-slot:body> </template>
        <template v-slot:bottom> </template>
      </q-table>
    </q-card-section>
    <div style="border-bottom: 1px solid grey"></div>
    <div class="full-width flex justify-end q-my-md">
      <q-btn
        @click="salvarPedido"
        icon="save"
        label="Salvar"
        push
        color="green-5"
      />
    </div>
  </q-card>
</template>

<script>
import { defineComponent } from "vue";
import { dados } from "src/dados/dados";
import QDialogPedidos from "src/components/compPedidos/QDialogPedidos.vue";

export default defineComponent({
  name: "QFormComponents",
  components: { QDialogPedidos },
  props: {
    formProduct: {
      type: Object,
      default: () => ({
        codigo: "",
        cliente: "",
        entrega: "",
        observacao: "",
      }),
    },
  },
  data() {
    return {
      dados,
      novoPedido: this.formProduct,
      novoProduto: [],
      busca: "",
    };
  },
  emits: ["ResetarFormulario", "formSubmissionFailed"],
  computed: {},
  methods: {
    salvarPedido() {
      console.log(this.novoProduto);
      const isValid =
        this.$refs.codRef.validate() &&
        this.$refs.clientRef.validate() &&
        this.$refs.entregaRef.validate() &&
        this.$refs.obsRef.validate();

      if (isValid) {
        if (this.novoProduto.length === 0) {
          this.$q.notify({
            message: "Selecione um Produto",
            color: "red",
            position: "bottom",
            timeout: 1000,
          });
        } else {
          console.log(this.novoPedido);
          this.$emit("AdicionarPedido", this.novoPedido, this.novoProduto);
          this.notificacaoAdicionado();
          this.novoProduto = [];
        }
      } else {
        this.$emit("formSubmissionFailed");
      }
    },

    salvarProduto(produtoAdicionado) {
      this.novoProduto = produtoAdicionado;
    },

    resetarFormulario() {
      this.novoPedido = {
        codigo: "",
        cliente: "",
        entrega: "",
        observacao: "",
      };
    },

    notificacaoAdicionado() {
      this.$q.notify({
        message: "Pedido realizado com Sucesso",
        color: "green",
        position: "bottom",
        timeout: 1000,
      });
    },

    metodoBusca() {
      this.dados.produtoSelecionadoAdicionar = this.dados.produtos.filter(
        (item) => {
          return (
            item.codigo.toLowerCase().includes(this.busca.toLowerCase()) ||
            item.descricao.toLowerCase().includes(this.busca.toLowerCase())
          );
        }
      );
    },
  },
});
</script>

