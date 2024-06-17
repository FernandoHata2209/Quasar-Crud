<template>
  <q-page>
    <div>
      <form-component />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import FormComponent from "src/components/compBaterPonto/FormComponent.vue";
import { useQuasar } from "quasar";

export default defineComponent({
  setup() {
    const $q = useQuasar();
  },

  components: { FormComponent },

  data() {
    return {};
  },
});
</script>
