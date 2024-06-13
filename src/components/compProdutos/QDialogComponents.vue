<template>
  <!-- Dialog do Adicionar -->
  <q-dialog v-model="adicionarDialog" persistent>
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
            v-model.trim="produtoAdicionar.codigo"
            :rules="[
              (val) => (val && val.length > 0) || 'Por favor preencher dados',
            ]"
          ></q-input>
          <q-space></q-space>
          <q-input
            label="Descrição"
            outlined
            class="q-ma-md col-5"
            v-model.trim="produtoAdicionar.descricao"
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
            @click="adicionarProduto"
          >
            <q-icon name="save" />
          </q-btn>
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
  <!-- Dialog de Editar -->
  <q-dialog v-model="editarDialog" persistent>
    <q-card>
      <q-card-section class="flex justify-between">
        <p class="text-h5 no-margin">Produto</p>
        <q-space></q-space>
        <q-btn v-close-popup icon="close" round class="no-margin"></q-btn>
      </q-card-section>
      <q-form @submit.prevent="editarProduto">
        <q-card-section>
          <q-input
            v-model="produtoEditar.codigo"
            label="Editar Código"
            :rules="[
              (val) => (val && val.length > 0) || 'Por favor preencher dados',
            ]"
          />
          <q-input
            v-model="produtoEditar.descricao"
            label="Editar Observação"
            :rules="[
              (val) => (val && val.length > 0) || 'Por favor preencher dados',
            ]"
          />
        </q-card-section>
        <q-card-actions class="flex justify-end">
          <q-btn label="Salvar" icon="save" type="submit"></q-btn>
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
  <!-- Dialog de Excluir -->
  <q-dialog v-model="excluirDialog" persistent>
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
          @click="removerProduto"
          class="q-mr-md"
        ></q-btn>
        <q-btn push label="Cancelar" color="primary" v-close-popup />
      </q-card-section>
    </q-card>
  </q-dialog>
  <div class="flex justify-end q-ma-lg">
    <q-btn
      color="blue-5"
      round
      icon="add"
      push
      @click="abrirDialogAdicionar"
    ></q-btn>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { dados } from "src/dados/dados";

export default defineComponent({
  setup() {},
  props: {
    produto: {
      type: Object,
      default: () => ({
        codigo: "",
        descricao: "",
      }),
    },
  },
  data() {
    return {
      dados,
      adicionarDialog: false,
      editarDialog: false,
      excluirDialog: false,

      produtoAdicionar: this.produto,
      produtoEditar: {},
      produtoExcluir: {},
    };
  },
  emits: ["adicionarProduto", "produtoEditado", "produtoExcluido"],

  methods: {
    abrirDialogAdicionar() {
      this.resetarPopup();
      this.adicionarDialog = true;
    },
    adicionarProduto() {
      const valido =
        this.produtoAdicionar.codigo.length > 0 &&
        this.produtoAdicionar.descricao.length > 0;

      if (valido) {
        this.$emit("adicionarProduto", this.produtoAdicionar);
        this.produtoAdicionadoNotify();
        this.resetarPopup();
        this.adicionarDialog = false;
      } else {
        this.produtoRejeitadoNotify();
      }
    },

    resetarPopup() {
      this.produtoAdicionar = {
        codigo: "",
        descricao: "",
      };
    },
    // Seção Editar
    abrirDialogEditar(produto) {
      this.produtoEditar = { ...produto };
      this.editarDialog = true;
    },

    editarProduto() {
      this.$emit("produtoEditado", this.produtoEditar);
      this.produtoEditadoNotify();
      this.editarDialog = false;
    },

    // Seção Excluir
    abrirDialogExcluir(produto) {
      this.produtoExcluir = { ...produto };
      this.excluirDialog = true;
    },

    removerProduto() {
      this.$emit("produtoExcluido", this.produtoExcluir);
      this.produtoExcluidoNotify();
      this.excluirDialog = false;
    },
    // Seção Notify
    produtoAdicionadoNotify() {
      this.$q.notify({
        message: "Produto adicionado com sucesso!",
        color: "green-5",
        icon: "check",
        position: "top",
        timeout: 1000,
      });
    },
    produtoRejeitadoNotify() {
      this.$q.notify({
        message: "Produto não adicionado!",
        color: "red-9",
        icon: "close",
        position: "top",
        timeout: 2000,
      });
    },
    produtoEditadoNotify() {
      this.$q.notify({
        message: "Produto editado com sucesso!",
        color: "green-5",
        icon: "check",
        position: "top",
        timeout: 2000,
      });
    },
    produtoExcluidoNotify() {
      this.$q.notify({
        message: "Produto excluido com sucesso!",
        color: "red-9",
        icon: "check",
        position: "top",
        timeout: 2000,
      });
    },
  },
});
</script>
