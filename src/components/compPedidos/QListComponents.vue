<template>
  <q-card class="my-card" style="width: 80%">
    <div>
      <div class="row flex flex-center">
        <q-table
          title="Pedidos"
          :rows="dados.pedidos"
          :columns="dados.colunasPedidos"
          row-key="id"
          class="no-shadow col-11 q-my-xl"
          bordered
          selection="multiple"
          v-model:selected="dados.pedidoSelecionado"
          separator="cell"
          key="id"
          :filter="busca"
          table-header-style="font-size: 1.2em"
          :visible-columns="[
            'codigo',
            'cliente',
            'entrega',
            'observacao',
            'pedidos',
          ]"
          @remove-product="removeProduct"
        >
          <template v-slot:top>
            <p class="text-h5 q-ma-md">Pedidos</p>
            <q-space></q-space>
            <q-input outlined label="Pesquisar" v-model="busca">
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
                  @click="props.selected = !props.selected"
                  style="border: 2px solid gray; border-radius: 3px"
                  padding="none"
                  size="10px"
                >
                </q-btn>
              </q-td>
              <q-td :props="props" key="codigo">{{ props.row.codigo }}</q-td>
              <q-td :props="props" key="cliente">{{ props.row.cliente }}</q-td>
              <q-td :props="props" key="entrega">{{ props.row.entrega }}</q-td>
              <q-td :props="props" key="observacao">
                {{ props.row.observacao }}
                <span v-show="props.selected" class="q-ml-md">
                  <q-dialog-edit-components
                    ref="QDialogEditarRef"
                    @editarPedido="pedidoEditado"
                  />
                  <q-btn
                    push
                    color="primary"
                    icon="edit"
                    class="q-mr-sm"
                    @click="AbrirEditarDialog(props.row)"
                  />
                  <q-btn
                    push
                    color="red-9"
                    icon="delete"
                    @click="removeProduct(props.row)"
                  ></q-btn>
                </span>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
    <q-dialog-components
      @AdicionarPedidoLista="AdicionarPedidoLista"
      @click="console.log(dados.pedidos)"
    />
  </q-card>
</template>

<script>
import { defineComponent } from "vue";
import QDialogComponents from "../compPedidos/QDialogComponents.vue";
import { dados } from "src/dados/dados";
import QDialogEditComponents from "../compPedidos/QDialogEditComponents.vue";

export default defineComponent({
  components: { QDialogComponents, QDialogEditComponents },
  name: "QTableComponents",
  props: [],
  data() {
    return {
      dados,
      products: [],
      currentProduct: null,
      pedidoEditar: dados.pedidoSelecionado,
      dialog: false,
      busca: "",
    };
  },
  methods: {
    AdicionarPedidoLista(pedido, produtoSelecionado) {
      console.log(produtoSelecionado);
      pedido.id = this.dados.pedidos.length + 1;

      pedido.produto = produtoSelecionado;

      this.dados.pedidos.push(pedido);
      console.log(this.dados.pedidos);
    },

    AbrirEditarDialog(props) {
      console.log(props);
      this.$refs.QDialogEditarRef.abrirEditarDialog(props);
    },

    pedidoEditado(pedidoEditado, produtoEditado) {
      console.log(pedidoEditado, produtoEditado);
      const index = this.dados.pedidos.findIndex(
        (p) => p.id === pedidoEditado.id
      );
      pedidoEditado.produto = produtoEditado;
      if (index !== -1) {
        this.dados.pedidos[index] = { ...pedidoEditado };
      }
    },

    removeProduct(props) {
      const index = this.dados.pedidos.findIndex((p) => p.id === props.id);
      console.log(index);

      if (index !== -1) {
        this.dados.pedidos.splice(index, 1);
        this.pedidoExcluido();
        this.dados.pedidoSelecionado = [];
      }
    },
    pedidoExcluido() {
      this.$q.notify({
        message: "Pedido excluido com sucesso",
        color: "red-9",
        position: "top",
        timeout: 2000,
        icon: "delete",
      });
    },
  },
});
</script>
