<template>
  <q-page padding class="flex fixed-top flex-center">
    <q-card class="flex flex-center" width="80%">
      <q-card-section class="flex flex-center justify-center">
        <div class="full-width">
          <div class="q-ma-xl">
            <p class="text-h4 text-center">Login!</p>
            <q-form>
              <q-input label="Login" outlined class="q-ma-lg full-width" />
              <q-input
                label="Senha"
                type="password"
                outlined
                class="q-ma-lg full-width"
              />
              <q-btn color="primary" label="Entrar" class="full-width" />
            </q-form>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
  <q-page> </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  setup() {},

  data() {},
});
</script>
