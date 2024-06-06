<template>
  <q-card>
    <q-table
      title="Pedidos"
      :rows="rowProducts"
      :columns="columnsProducts"
      row-key="id"
      class="no-shadow col-10 q-mt-lg"
      bordered
      selection="single"
      v-model:selected="optionsProducts"
      updated:selected="formAddProducts"
      separator="cell"
      table-header-style="font-size: 1.1em"
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
        <q-btn round color="blue-5" class="q-ma-md" @click="dialog = true">
          <q-icon src="ListToDo/src/assets/add.svg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#fffff"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            </svg>
          </q-icon>
        </q-btn>
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
  <div class="q-mt-lg col-12" style="border-top: 1px solid grey">
    <q-card-actions align="right" class="q-py-lg">
      <q-btn
        icon="save"
        label="Salvar"
        color="green-5"
        @click="addFormProduct"
      ></q-btn>
    </q-card-actions>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    selectedEditProducts: {
      type: Array,
      default: () => [],
    },
    formAddProduct: {
      type: Object,
      default: () => {},
    },
    columns: {
      type: Array,
      default: () => [
        { name: "codigo", label: "Código", align: "left" },
        { name: "cliente", label: "Cliente", align: "left" },
        { name: "entrega", label: "Entrega", align: "center" },
        { name: "observacao", label: "Observação", align: "left" },
      ],
    },
    products: {
      type: Array,
      default: () => [
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
    },
  },
  data() {
    return {
      optionsProducts: this.selectedEditProducts,
      columnsProducts: this.columns,
      rowProducts: this.products,
    };
  },
  methods: {
    handleClick(props) {
      props.selected = !props.selected;
      this.updateFormAddProduct();
    },
    updateFormAddProduct() {
      this.$emit("updateformAddProduct", { ...this.optionsProducts[0] });
      console.log(this.formAddProduct);
    },
    addFormProduct() {
      this.$emit("addProduct", { ...this.rowProducts });
      console.log(this.rowProducts);
    },
  },
});
</script>
