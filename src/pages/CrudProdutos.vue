<template>
  <q-page padding class="flex justify-center">
    <q-card class="my-class" style="width: 80%">
      <div>
        <q-table
          flat
          bordered
          title="Produtos"
          :rows="dados.produtos"
          :columns="dados.colunasProdutos"
          row-key="id"
          separator="cell"
          selection="multiple"
          v-model:selected="selectedProducts"
          table-header-style="font-size: 1.2em"
          class="q-mx-xl q-my-lg"
        >
          <template v-slot:top>
            <p class="text-h5 q-ma-md">Produtos</p>
            <q-space />
            <q-input outlined label="Pesquisar">
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
                    color="blue-5"
                    icon="edit"
                    class="q-mx-sm"
                    @click="openEdit(props.row)"
                  ></q-btn>
                  <q-btn
                    push
                    color="red-5"
                    icon="delete"
                    @click="removeDialog = !removeDialog"
                  ></q-btn>
                </span>
              </q-td>
            </q-tr>

            <q-dialog v-model="editDialog" persistent>
              <q-card>
                <q-card-section class="flex justify-between">
                  <p class="text-h5 no-margin">Produto</p>
                  <q-space></q-space>
                  <q-btn
                    v-close-popup
                    icon="close"
                    round
                    class="no-margin"
                  ></q-btn>
                </q-card-section>
                <q-form @submit.prevent="editProduto">
                  <q-card-section>
                    <q-input
                      v-model="formProduct.codigo"
                      label="Editar Código"
                      :rules="[
                        (val) =>
                          (val && val.length > 0) ||
                          'Por favor preencher dados',
                      ]"
                    />
                    <q-input
                      v-model="formProduct.observacao"
                      label="Editar Observação"
                      :rules="[
                        (val) =>
                          (val && val.length > 0) ||
                          'Por favor preencher dados',
                      ]"
                    />
                  </q-card-section>
                  <q-card-actions class="flex justify-end">
                    <q-btn label="Salvar" icon="save" type="submit"></q-btn>
                  </q-card-actions>
                </q-form>
              </q-card>
            </q-dialog>

            <!-- Dialog Excluir Produto -->
            <q-dialog v-model="removeDialog" persistent>
              <q-card>
                <q-card-section class="flex flex-center row">
                  <p class="text-h5 text-center full-width">
                    Tem certeza que deseja excluir?
                  </p>
                  <q-space></q-space>
                  <q-btn
                    push
                    icon="delete"
                    color="red-5"
                    @click="removeProduto(props.row)"
                    class="q-mr-md"
                  ></q-btn>
                  <q-btn push label="Cancelar" color="primary" v-close-popup />
                </q-card-section>
              </q-card>
            </q-dialog>
          </template>
        </q-table>
        <div class="flex justify-end q-ma-lg">
          <q-btn color="blue-5" round icon="add" @click="dialog = !dialog">
          </q-btn>
        </div>
      </div>
    </q-card>

    <!-- Dialog Adicionar Produtos -->
    <q-dialog v-model="dialog" persistent>
      <q-card style="width: 80%">
        <q-card-section
          class="row items-center"
          style="border-bottom: 1px solid grey"
        >
          <p class="text-h5 q-ma-none">Produto</p>
          <q-space></q-space>
          <q-btn icon="close" round v-close-popup class="q-ma-none"></q-btn>
        </q-card-section>

        <q-form @submit.prevent="adicionarProduto">
          <q-card-section class="row items-center q-mb-xl row">
            <q-input
              label="Código"
              outlined
              class="q-ma-md col-5"
              v-model.trim="formProduct.codigo"
              :rules="[
                (val) => (val && val.length > 0) || 'Por favor preencher dados',
              ]"
            ></q-input>
            <q-space></q-space>
            <q-input
              label="Descrição"
              outlined
              class="q-ma-md col-5"
              v-model.trim="formProduct.descricao"
              :rules="[
                (val) => (val && val.length > 0) || 'Por favor preencher dados',
              ]"
            ></q-input>
          </q-card-section>

          <q-card-actions align="right" style="border-top: 1px solid grey">
            <q-btn
              label="Salvar"
              class="q-ma-sm"
              color="blue-7"
              outline
              type="submit"
            >
              <q-icon name="save" />
            </q-btn>
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { dados } from "src/dados/dados";
import { useQuasar } from "quasar";

export default defineComponent({
  setup() {
    const $q = useQuasar();
  },
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
  methods: {
    adicionarProduto() {
      console.log(this.dados.produtos);
      this.dados.produtos.push({
        id: this.dados.produtos.length + 1,
        codigo: this.formProduct.codigo,
        descricao: this.formProduct.descricao,
      });
      this.notificacaoAdicionado();
      this.dialog = false;
      this.selectedProducts = [];
      this.resetarFormulario();
    },

    openRemove() {
      this.removeDialog = true;
      this.selectedProducts = [];
    },

    removeProduto(product) {
      const index = this.dados.produtos.findIndex((a) => a.id === product.id);
      if (index !== -1) {
        this.dados.produtos.splice(index, 1);
      }
      this.removeDialog = false;
    },

    openEdit(product) {
      this.currentProduct = product;
      this.formProduct = { ...product };
      this.editDialog = true;
    },

    editProduto() {
      const index = this.dados.produtos.findIndex(
        (a) => a.id === this.currentProduct.id
      );
      if (index !== -1) {
        this.dados.produtos[index] = { ...this.formProduct };
      }
      this.selectedProducts = [];
      this.editDialog = false;
    },

    resetarFormulario() {
      this.formProduct = {
        codigo: "",
        observacao: "",
      };
    },

    handleClick() {
      props.selectedProducts = !props.selectedProducts;
    },

    notificacaoAdicionado() {
      this.$q.notify({
        message: "Produto Adicionado com Sucesso",
        color: "green",
        position: "bottom",
        timeout: 1000,
      });
    },
  },
});
</script>
