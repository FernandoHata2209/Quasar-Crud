<template>
  <q-dialog v-model="abrirDialog" persistent>
    <q-card>
      <q-card-section class="row">
        <div class="col-12 full-width justify-start">
          <span style="font-weight: 500; font-size: 23px"
            >Apontamento manual</span
          >
        </div>
        <div class="col-12 row full-width">
          <q-form class="col full-width">
            <div class="col full-width q-ma-xl">
              <q-input label="Data" v-model="ponto.data" outlined filled>
                <template v-slot:append>
                  <q-icon name="event"></q-icon>
                  <q-icon name="check_circle_outline"></q-icon>
                </template>
              </q-input>
            </div>
            <div class="col full-width q-ma-xl">
              <q-input label="Hora" v-model="ponto.hora" outlined filled>
                <template v-slot:append>
                  <q-icon name="access_time"></q-icon>
                </template>
              </q-input>
            </div>
            <div class="col full-width flex justify-end q-ma-xl">
              <q-btn
                color="primary"
                label="agora"
                @click="configurarHorario()"
              />
            </div>
            <div class="col full-width q-ma-lg">
              <q-input
                label="Observação"
                filled
                outlined
                v-model="ponto.observacao"
              />
            </div>
          </q-form>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="flex justify-end">
          <q-btn
            label="cancelar"
            class="q-mr-sm"
            flat
            color="primary"
            @click="fecharDialog"
          />
          <q-btn label="salvar" flat color="primary" @click="criarPonto" />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <q-btn
    label="apontamento manual"
    color="primary"
    class="q-ml-md q-mt-md q-mb-xm"
    @click="abrirDialogAdicionar"
  />
</template>

<script>
import { dados } from "src/dados/dados";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      abrirDialog: false,
      dados,
      ponto: [
        {
          data: "",
          hora: "",
          observacao: "",
        },
      ],
    };
  },

  emits: ["criarPonto"],

  methods: {
    abrirDialogAdicionar() {
      this.abrirDialog = true;
    },
    adicionarPonto() {
      this.$emit();
    },
    configurarHorario() {
      this.ponto.hora = new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      });
      this.ponto.data = new Date().toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    },
    fecharDialog() {
      this.abrirDialog = false;
    },
    criarPonto() {
      this.$emit("criarPonto", this.ponto);
    },
  },
});
</script>
