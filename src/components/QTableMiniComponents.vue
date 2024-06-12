<template>
  <q-card>
    <q-table
      title="Pedidos"
      :rows="products"
      :columns="columns"
      row-key="id"
      class="no-shadow col-10 q-mt-lg"
      bordered
      selection="single"
      v-model:selected="selectedRows"
      separator="cell"
      table-header-style="font-size: 1.3em"
      :visible-columns="['codigo', 'observacao']"
    >
      <template v-slot:top>
        <p class="text-h4 q-ma-md">Produtos</p>
        <q-space></q-space>
        <q-input outlined label="Pesquisar">
          <template v-slot:append>
            <q-icon name="search"></q-icon>
          </template>
        </q-input>
        <q-btn
          round
          color="blue-5"
          class="q-ma-md"
          icon="add"
        />
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
              @click="handleClick(props)"
            >
            </q-btn>
          </q-td>
          <q-td :props="props" key="codigo">{{ props.row.codigo }}</q-td>
          <q-td :props="props" key="observacao">{{
            props.row.observacao
          }}</q-td>
        </q-tr>
      </template>
    </q-table>
  </q-card>
  <div class="q-mt-lg col-12" style="border-top: 1px solid grey"></div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "QTableMiniComponents",
  props: {
    columns: Array,
    products: Array,
  },
  emits: ["productSelected"],
  data() {
    return {
      selectedRows: [],
    };
  },
  methods: {
    handleClick(props) {
      props.selected = !props.selected;
      this.$emit("productSelected", props.row);
    },
  },
});
</script>
