<template>
  <q-dialog v-model="dialog">
    <q-card style="width: 500px">
      <q-card-section>
        <div class="">
          <p class="text-h6">Resumo pontos</p>
        </div>
      </q-card-section>
      <div class="row q-pa-md">
        <div class="col text-blue-7 text-weight-bold">Inicio</div>
        <div class="col text-weight-bold">03/06/2024</div>
        <div class="col text-weight-bold text-grey-8">08:01</div>
      </div>
      <div class="q-pa-md row">
        <div class="col text-blue-7 text-weight-bold">Final</div>
        <div class="col text-weight-bold">03/06/2024</div>
        <div class="col text-weight-bold text-grey-8">14:08</div>
      </div>
      <q-separator></q-separator>
      <div class="row q-pa-md">
        <div class="col text-purple-9 text-weight-bold">Total saldo</div>
        <div class="col text-weight-bold text-grey-8 i">00:07:11</div>
        <div class="col"></div>
      </div>
      <div class="q-pa-md">
        <div class="">
          <q-input label="Observações dia" filled />
        </div>
      </div>
      <q-card-actions class="">
        <div class="row full-width">
          <div class="col q-ma-lg flex justify-end">
            <q-btn label="fazer apontamento" flat color="primary" />
            <q-btn label="salvar observação" flat color="primary" />
          </div>
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>

  <div @click="abrirDialog" class="q-mx-xl cursor-pointer">
    <q-icon name="mdi-timetable" color="primary" size="20px"></q-icon>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "QDialogResumoComponent",
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    abrirDialog() {
      this.dialog = true;
    },
  },
});
</script>
