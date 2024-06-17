<template>
  <q-dialog v-model="editarDialog" persistent>
    <q-card class="row full-width" style="width: 80%">
      <q-card-section class="full-width">
        <div class="flex justify-between">
          <p class="text-h5">Editar Pedido</p>
          <div class="">
            <q-btn icon="close" v-close-popup round push></q-btn>
          </div>
        </div>
      </q-card-section>
      <q-card-section class="full-width">
        <!-- Formulario Edição Produto -->

        <q-form class="row full-width q-mb-lg" @submit-prevent="editarPedido">
          <div class="full-width q-mb-sm">
            <q-input type="text" v-model.trim="pedido.cliente" outlined />
          </div>
          <div class="row full-width flex justify-between q-ma-sm">
            <q-input
              v-model.trim="pedido.entrega"
              mask
              label="Data de Entrega"
              ref="entregaRef"
              :format24h="true"
              mode="dateTime"
              clearable
              outlined
              class="full-width"
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
                    <q-date v-model.trim="pedido.entrega" mask="DD/MM/YYYY">
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
            <q-input
              type="text"
              class="full-width"
              v-model.trim="pedido.observacao"
              outlined
            />
          </div>
        </q-form>
        <!-- List Edição Pedido -->

        <q-table
          :rows="dados.produtos"
          row-key="id"
          :columns="dados.colunasProdutos"
          selection="multiple"
          :filter="busca"
          v-model:selected="dados.produtoSelecionadoEditar"
        >
          <template v-slot:top>
            <p class="text-h5">Produtos</p>
            <q-space></q-space>
            <q-input outlined label="Pesquisar" v-model="busca" icon="search">
              <template v-slot:append>
                <q-icon name="search"></q-icon>
              </template>
            </q-input>
          </template>
        </q-table>
      </q-card-section>
      <q-card-section class="full-width">
        <q-card-actions class="flex justify-end full-width">
          <q-btn
            label="Cancelar"
            color="negative"
            icon="cancel"
            push
            v-close-popup
          />
          <q-btn
            label="Editar"
            color="primary"
            icon="edit"
            push
            @click="editarPedido"
          />
        </q-card-actions>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from "vue";
import { dados } from "src/dados/dados";

export default defineComponent({
  setup() {},

  data() {
    return {
      dados,
      editarDialog: false,
      pedido: {},
      validacaoPedido: null,
      teste: [],
      busca: "",
    };
  },

  emits: ["editarPedido"],

  methods: {
    abrirEditarDialog(pedido) {
      console.log(pedido);
      this.pedido = { ...pedido };
      this.validacaoPedido = { ...pedido };

      const index = this.dados.pedidos.findIndex((a) => a.id === pedido.id);
      this.dados.produtoSelecionadoEditar = this.dados.pedidos[index].produto;

      this.editarDialog = true;
    },

    editarPedido() {
      console.log(this.dados.pedidos);
      if (
        JSON.stringify(this.dados.produtoSelecionadoEditar) !==
        JSON.stringify(this.pedido.produto)
      ) {
        this.pedidoAlterado();
        this.$emit(
          "editarPedido",
          this.pedido,
          this.dados.produtoSelecionadoEditar
        );
        this.editarDialog = false;
      } else if (
        JSON.stringify(this.pedido) === JSON.stringify(this.validacaoPedido)
      ) {
        this.pedidoInalterado();

        this.editarDialog = false;
      } else {
        this.pedidoAlterado();
        this.$emit(
          "editarPedido",
          this.pedido,
          this.dados.produtoSelecionadoEditar
        );
        this.editarDialog = false;
      }
    },

    pedidoInalterado() {
      this.$q.notify({
        type: "negative",
        message: "Pedido não teve mudanças!",
        position: "bottom",
        timeout: 2000,
      });
    },
    pedidoAlterado() {
      const notit = this.$q.notify({
        type: "ongoing",
        message: "Realizando alterações",
      });
      setTimeout(() => {
        notit({
          type: "positive",
          message: "Pedido alterado com sucesso!",
          position: "bottom",
          timeout: 2000,
        });
      }, 3000);
    },
  },
});
</script>


