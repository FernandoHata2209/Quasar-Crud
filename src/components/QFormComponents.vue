<template>
  <q-form @submit.prevent="addProduct" class="col-12">
    <div class="flex col-12 row justify-between wrap">
      <div class="col full-width">
        <q-input
          v-model.trim="formAddProduct.codigo"
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
          v-model.trim="formProduct.cliente"
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
          v-model.trim="formProduct.entrega"
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
                <q-date v-model.trim="formProduct.entrega" mask="DD/MM/YYYY">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div class="col full-width">
        <q-input
          v-model.trim="formAddProduct.observacao"
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
    <div class="col-12 q-mt-md">
      <q-table-mini-components
        :selectedEditProducts="selectedEditProducts"
        :formAddProduct="formAddProduct"
        @updateformAddProduct="updateFormAddProduct"
        @addProduct="addProduct"
      />
    </div>
  </q-form>
</template>

<script>
import { defineComponent } from "vue";
import QTableMiniComponents from "./QTableMiniComponents.vue";

export default defineComponent({
  components: { QTableMiniComponents },
  data() {
    return {};
  },
});
</script>
