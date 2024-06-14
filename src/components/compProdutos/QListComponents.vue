<template>
  <q-table
    flat
    bordered
    title="Produtos"
    :rows="dados.produtos"
    :columns="dados.colunasProdutos"
    row-key="id"
    separator="cell"
    :filter="busca"
    selection="multiple"
    v-model:selected="dados.produtoSelecionado"
    table-header-style="font-size: 1.2em"
    class="q-mx-xl q-my-lg"
  >
    <template v-slot:top>
      <p class="text-h5 q-ma-md">Produtos</p>
      <q-space />
      <q-input outlined label="Pesquisar" v-model="busca">
        <template v-slot:append>
          <q-icon name="search" />
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
            size="10px"
            @click="props.selected = !props.selected"
          >
          </q-btn>
        </q-td>
        <q-td :props="props" key="codigo">{{ props.row.codigo }}</q-td>
        <q-td :props="props" key="descricao"
          >{{ props.row.descricao }}
          <span v-show="props.selected">
            <q-btn
              push
              color="primary"
              icon="edit"
              class="q-mx-sm"
              @click="abrirDialogEditar(props.row)"
            ></q-btn>
            <q-btn
              push
              color="red-9"
              icon="delete"
              @click="abrirDialogExcluir(props.row)"
            ></q-btn>
          </span>
        </q-td>
      </q-tr>
    </template>
  </q-table>
  <q-dialog-components
    @adicionarProduto="adicionarProduto"
    @produtoEditado="produtoEditado"
    @produtoExcluido="produtoExcluido"
    ref="QDialogRef"
  />
</template>

<script>
import { dados } from "src/dados/dados";
import { defineComponent } from "vue";
import QDialogComponents from "./QDialogComponents.vue";

export default defineComponent({
  components: { QDialogComponents },
  setup() {},

  data() {
    return {
      dados,
      busca: "",
    };
  },
  methods: {
    adicionarProduto(produto) {
      produto.id = this.dados.produtos.length + 1;
      this.dados.produtos.push(produto);
    },
    abrirDialogEditar(props) {
      this.$refs.QDialogRef.abrirDialogEditar(props);
    },
    produtoEditado(produtoEditado) {
      const index = this.dados.produtos.findIndex(
        (a) => a.id === produtoEditado.id
      );
      if (index !== -1) {
        this.dados.produtos[index] = { ...produtoEditado };
      }
    },
    abrirDialogExcluir(props) {
      this.$refs.QDialogRef.abrirDialogExcluir(props);
    },
    produtoExcluido(produtoExcluido) {
      const index = this.dados.produtos.findIndex(
        (a) => a.id === produtoExcluido.id
      );

      if (index !== -1) {
        this.dados.produtos.splice(index, 1);
      }
    },
  },
});
</script>
