<template>
  <q-page>
    <div class="q-mt-lg q-ml-sm">
      <p class="no-margin" style="font-size: 12px; color: gray">Funcionario:</p>
      <p>Fernando</p>
    </div>
    <div class="">
      <q-dialog-component @criarPonto="criarPonto" />
      <q-card class="row flex flex-center q-mx-md q-mt-md no-wrap">
        <div class="fit">
          <q-input
            mask="##/##/####"
            ref="entregaRef"
            :format24h="true"
            mode="dateTime"
            clearable
            label="Inicio"
            class="col-5 q-ml-sm q-pa-sm"
            dense
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date mask="DD/MM/YYYY">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <hr
          class="q-separator q-separator--inset q-separator--vertical self-stretch"
        />
        <div class="fit">
          <q-input
            mask="##/##/####"
            ref="entregaRef"
            :format24h="true"
            mode="dateTime"
            clearable
            dense
            class="col-5 q-mr-sm q-pa-sm text-none"
          >
            <template v-slot:append>
              <div class="q-mr-sm">
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date mask="DD/MM/YYYY">
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
              </div>

              <hr
                class="q-separator q-separator--inset q-separator--vertical self-stretch"
              />
              <div class="">
                <q-icon name="search" color="primary"></q-icon>
              </div>
            </template>
          </q-input>
        </div>
      </q-card>
    </div>

    <div class="q-ma-sm">
      <q-table
        :columns="dados.colunas"
        :rows="dados.horas"
        title="Horas"
        :visible-columns="['dia', 'previstas', 'realizadas', 'resultado']"
        v-model:selected="teste"
        selection="single"
        no-data-label="Nenhum ponto marcado!"
      >
        <template #body="props">
          <q-tr :props="props">
            <q-td class="q-mr-xl">
              <q-dialog-resumo-component />
            </q-td>
            <q-td :props="props" key="dia">
              {{ props.row.horario[0].dia }}
            </q-td>
            <q-td :props="props" key="previstas">
              {{ props.row.previstas }}
            </q-td>
            <q-td :props="props" key="realizadas">
              {{ props.row.realizadas }}
            </q-td>
            <q-td :props="props" key="resultado">
              <span class="bg-blue-13 text-white q-px-sm rounded-borders">
                {{ props.row.resultado }}
              </span>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>

    <div class="col">
      <div class="row q-mt-sm justify-start">
        <span class="q-mx-sm">Legenda:</span>
      </div>
      <div class="row q-mt-sm justify-start">
        <div class="col-auto q-mx-sm">
          <q-icon name="event" size="17pt" color="green-5"></q-icon>
        </div>
        <div class="col-auto">
          <span class="caption">Feriado.</span>
        </div>
      </div>
      <div class="row q-mt-sm justify-start">
        <div class="col-auto q-mx-sm">
          <q-icon name="weekend" size="17pt" color="green-5"></q-icon>
        </div>
        <div class="col-auto">
          <span class="">Final de semana.</span>
        </div>
      </div>
      <div class="row q-mt-sm justify-start">
        <div class="col-auto q-mx-sm">
          <q-icon name="alarm" size="17pt" color="yellow-9"></q-icon>
        </div>
        <div class="col-auto">
          <span>Abono de horas.</span>
        </div>
      </div>
      <div class="row q-mt-sm justify-start">
        <div class="col-auto q-mx-sm">
          <q-icon name="cancel" size="17pt" color="red-5"></q-icon>
        </div>
        <div class="col-auto">
          <span>Erro de ponto.</span>
        </div>
      </div>
    </div>

    <div class="row flex flex-center q-mt-md">
      <q-card class="col q-mx-sm bg-orange-6" square>
        <div class="q-ma-md">
          <span style="color: white">Saldo de horas do mês anterior:</span>
          <span style="color: white"> 0 Dia(s)e 00:00:00</span>
        </div>
      </q-card>
      <q-card class="col q-mx-sm bg-green-6" square>
        <div class="q-ma-md">
          <span style="color: white">Saldo de horas do mês anterior:</span>
          <span style="color: white"> 0 Dia(s)e 00:00:00</span>
        </div>
      </q-card>
      <q-card class="col q-mx-sm bg-blue-5" square>
        <div class="q-ma-md">
          <div class="">
            <span style="color: white">Saldo de horas do mês anterior:</span>
            <span style="color: white"> 0 Dia(s)e 00:00:00</span>
          </div>
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { dados } from "src/dados/dados";
import QDialogComponent from "./QDialogComponent.vue";
import QDialogResumoComponent from "./QDialogResumoComponent.vue";

export default defineComponent({
  components: { QDialogComponent, QDialogResumoComponent },

  setup() {},

  data() {
    return {
      dados,
      ponto: [],
      hora: "",
      dialog: false,
      horario: 0,
    };
  },

  methods: {
    abrirDialog() {
      this.dialog = true;
    },
    criarPonto(ponto) {
      this.ponto = ponto;
    },
  },
});
</script>
