<template>
  <q-card class="full-width no-shadow">
    <!-- Seção Q-Form -->

    <q-card-section>
      <q-form @submit.prevent="AdicionarPedidoNovo" class="col-12">
        <div class="flex col-12 row justify-between wrap">
          <div class="col full-width">
            <q-input
              v-model.trim="novoPedido.codigo"
              label="Código"
              outlined
              ref="codRef"
              :rules="[
                (val) => (val && val.length > 0) || 'Por favor preencher dados',
              ]"
              class="q-ma-sm"
            ></q-input>
          </div>
          <div class="col full-width">
            <q-input
              v-model.trim="novoPedido.cliente"
              label="Cliente"
              :rules="[
                (val) => (val && val.length > 0) || 'Por favor preencher dados',
              ]"
              ref="clientRef"
              outlined
              class="q-ma-sm"
            ></q-input>
          </div>
        </div>
        <div class="flex col-12 justify-between row">
          <div class="col full-width">
            <q-input
              v-model.trim="novoPedido.entrega"
              mask
              label="Data de Entrega"
              ref="entregaRef"
              :format24h="true"
              mode="dateTime"
              clearable
              outlined
              class="q-ma-sm"
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
                    <q-date v-model.trim="novoPedido.entrega" mask="DD/MM/YYYY">
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
          </div>
          <div class="col full-width">
            <q-input
              v-model.trim="novoPedido.observacao"
              ref="obsRef"
              label="Observação"
              outlined
              class="q-ma-sm"
              :rules="[
                (val) => (val && val.length > 0) || 'Por favor preencher dados',
              ]"
            ></q-input>
          </div>
        </div>
      </q-form>
    </q-card-section>

    <!-- Seção Q-List -->

    <q-card-section>
      <q-table
        title="Pedidos"
        :rows="dados.produtos"
        :columns="dados.colunasProdutos"
        row-key="id"
        class="no-shadow col-10 q-mt-lg"
        bordered
        selection="multiple"
        v-model:selected="dados.produtoSelecionadoAdicionar"
        separator="cell"
        table-header-style="font-size: 1.2em"
        :visible-columns="['codigo', 'descricao']"
      >
        <template v-slot:top>
          <p class="text-h4 q-ma-md">Produtos</p>
          <q-space></q-space>
          <q-input
            outlined
            label="Pesquisar"
            v-model="realizarBusca"
            icon="search"
          >
            <template v-slot:append>
              <q-icon name="search"></q-icon>
            </template>
          </q-input>
          <q-btn
            round
            color="blue-5"
            class="q-ma-md"
            push
            icon="add"
            @click="AdicionarProduto()"
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
    <div style="border-bottom: 1px solid grey"></div>
    <div class="full-width flex justify-end q-my-md">
      <q-btn
        @click="AdicionarPedidoNovo"
        icon="save"
        label="Salvar"
        push
        color="green-5"
      />
    </div>
  </q-card>
</template>

<script>
import { defineComponent } from "vue";
import { dados } from "src/dados/dados";

export default defineComponent({
  name: "QFormComponents",
  props: {
    formProduct: {
      type: Object,
      default: () => ({
        codigo: "",
        cliente: "",
        entrega: "",
        observacao: "",
      }),
    },
  },
  data() {
    return {
      dados,
      novoPedido: this.formProduct,
      realizarBusca: "",
    };
  },
  emits: ["ResetarFormulario", "formSubmissionFailed"],
  computed: {
    filteredItems() {
      return this.dados.produtos.filter((item) => {
        return item.descricao
          .toLowerCase()
          .includes(this.realizarBusca.toLowerCase());
      });
    },
  },
  methods: {
    AdicionarPedidoNovo() {
      const isValid =
        this.$refs.codRef.validate() &&
        this.$refs.clientRef.validate() &&
        this.$refs.entregaRef.validate() &&
        this.$refs.obsRef.validate();

      if (isValid) {
        if (this.dados.produtoSelecionadoAdicionar.length === 0) {
          this.$q.notify({
            message: "Selecione um Produto",
            color: "red",
            position: "bottom",
            timeout: 1000,
          });
        } else {
          console.log(this.novoPedido);
          this.$emit(
            "AdicionarPedido",
            this.novoPedido,
            this.dados.produtoSelecionadoAdicionar
          );
          this.notificacaoAdicionado();
          this.dados.produtoSelecionadoAdicionar = [];
        }
      } else {
        this.$emit("formSubmissionFailed");
      }
    },

    resetarFormulario() {
      this.novoPedido = {
        codigo: "",
        cliente: "",
        entrega: "",
        observacao: "",
      };
    },

    AdicionarProduto() {
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
        return this.dados.produtoSelecionadoAdicionar;
      }
    },

    notificacaoAdicionado() {
      this.$q.notify({
        message: "Pedido realizado com Sucesso",
        color: "green",
        position: "bottom",
        timeout: 1000,
      });
    },

    handleClick(props) {
      props.selected = !props.selected;
      console.log(this.dados.produtoSelecionadoAdicionar);
    },
  },
});
</script>

