<template>
  <q-page class="flex justify-center q-mt-xl">
    <div>
      <login-component />
    </div>
  </q-page>
</template>

<script>
import LoginComponent from "src/components/compBaterPonto/LoginComponent.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoginPage",
  components: { LoginComponent },
  data() {
    return {};
  },
});
</script>
