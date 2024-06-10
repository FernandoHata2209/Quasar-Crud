<template>
  <q-card class="my-card" style="width: 80%">
    <div>
      <div class="row flex flex-center">
        <q-table
          title="Pedidos"
          :rows="products"
          :columns="columns"
          row-key="id"
          class="no-shadow col-11 q-my-xl"
          bordered
          selection="multiple"
          v-model:selected="selectedProducts"
          separator="cell"
          key="id"
          
          :visible-columns="['codigo', 'cliente', 'entrega', 'observacao']"
          @edit-product="openEditDialog"
          @remove-product="removeProduct"
        >
          <template v-slot:top>
            <p class="text-h5 q-ma-md">Pedidos</p>
            <q-space></q-space>
            <q-input outlined label="Pesquisar">
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
                  <q-btn
                    class="q-mr-sm"
                    push
                    icon="edit"
                    color="primary"
                    @click="openEditDialog(props.row)"
                  ></q-btn>
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
    <q-dialog-components />
  </q-card>
</template>

<script>
import { defineComponent } from "vue";
import QDialogComponents from "./QDialogComponents.vue";

export default defineComponent({
  components: { QDialogComponents },
  name: "QTableComponents",
  props: [],
  data() {
    return {
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
      selectedProducts: [],
      currentProduct: null,
      dialog: false,
    };
  },
  methods: {
    openEditDialog(product) {
      this.currentProduct = product;
      this.formProduct = { ...product };
      this.showEdit = true;
    },
    removeProduct(product) {
      const index = this.products.findIndex((p) => p.id === product.id);

      if (index !== -1) {
        this.products.splice(index, 1);
      }
    },
  },
});
</script>
