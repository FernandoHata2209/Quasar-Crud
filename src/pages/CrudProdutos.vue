<template>
  <q-page padding class="flex justify-center">
    <q-card class="my-class" style="width: 80%">
      <div>
        <q-list-components />
      </div>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { dados } from "src/dados/dados";
import QListComponents from "components/compProdutos/QListComponents.vue";

export default defineComponent({
  components: { QListComponents },
  setup() {},
  data() {
    return {
      dados,
      formProduct: [
        {
          codigo: "",
          descricao: "",
        },
      ],
      currentProduct: [
        {
          codigo: "",
          observacao: "",
        },
      ],
      selectedProducts: [],
      dialog: false,
      removeDialog: false,
      editDialog: false,
    };
  },
  methods: {},
});
</script>
