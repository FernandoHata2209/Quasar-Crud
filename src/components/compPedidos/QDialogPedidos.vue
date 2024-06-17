<template>
  <q-dialog v-model="abrirDialog" class="row">
    <q-card class="col-11 row flex flex-center">
      <div
        class="flex justify-end col-11 q-ma-sm q-mt-md"
        style="border-bottom: 1px solid grey"
      >
        <div class="q-mr-sm q-my-sm">
          <q-btn v-close-popup icon="close" round push />
        </div>
      </div>
      <q-card-section
        class="flex flex-center row q-ma-md col-11"
        style="border-bottom: 1px solid grey"
      >
        <q-table
          title="Pedidos"
          :rows="dados.produtos"
          :columns="dados.colunasProdutos"
          row-key="id"
          class="no-shadow col-10"
          bordered
          selection="multiple"
          v-model:selected="dados.produtoSelecionadoAdicionar"
          separator="cell"
          :filter="busca"
          table-header-style="font-size: 1.2em"
          :visible-columns="['codigo', 'descricao']"
        >
          <template v-slot:top>
            <p class="text-h4 q-ma-md">Produtos</p>
            <q-space></q-space>
            <q-input outlined label="Pesquisar" v-model="busca" icon="search">
              <template v-slot:append>
                <q-icon name="search"></q-icon>
              </template>
            </q-input>
          </template>
          <template #body="props">
            <q-tr :props="props">
              <q-td class="flex flex-center">
                <q-btn
                  flat
                  round
                  :icon="props.selected ? 'check' : ''"
                  style="border: 2px solid gray; border-radius: 3px"
                  padding="none"
                  push
                  size="10px"
                  @click="handleClick(props)"
                >
                </q-btn>
              </q-td>
              <q-td :props="props" key="codigo">{{ props.row.codigo }}</q-td>
              <q-td :props="props" key="descricao">{{
                props.row.descricao
              }}</q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card-section>
      <q-card-section class="col-12">
        <div class="col flex justify-end q-mx-lg q-my-sm">
          <q-btn
            icon="close"
            label="Cancelar"
            color="red-5"
            push
            class="q-mr-sm"
            v-close-popup
          />
          <q-btn
            icon="save"
            label="Salvar"
            color="green-5"
            push
            @click="salvarProdutoPedido"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <q-btn
    round
    color="blue-5"
    class="q-ma-md"
    push
    icon="add"
    @click="abrirDialogPedidos()"
  />
</template>

<script>
import { defineComponent } from "vue";
import { dados } from "src/dados/dados";

export default defineComponent({
  setup() {},
  name: "QDialogPedidos",

  data() {
    return {
      abrirDialog: false,
      dados,
      busca: "",
    };
  },

  emits: ["salvarProduto"],

  methods: {
    abrirDialogPedidos() {
      this.abrirDialog = true;
    },
    handleClick(props) {
      props.selected = !props.selected;
      console.log(this.dados.produtoSelecionadoAdicionar);
    },
    salvarProdutoPedido() {
      if (this.dados.produtoSelecionadoAdicionar.length === 0) {
        this.$q.notify({
          message: "Selecione um Produto",
          color: "red",
          position: "bottom",
          timeout: 1000,
        });
      } else {
        this.$q.notify({
          message: "Produto Adicionado com Sucesso",
          color: "green",
          position: "bottom",
          timeout: 1000,
        });
        this.abrirDialog = false;
        this.$emit("salvarProduto", this.dados.produtoSelecionadoAdicionar);
      }
    },
  },
});
</script>
