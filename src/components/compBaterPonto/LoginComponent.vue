<template>
  <q-card class="q-mt-lg bg-white shadow-14">
    <q-form class="row q-ma-md flex-center">
      <p class="text-h4 text-center q-ma-lg">Login</p>
      <q-input
        label="Login"
        v-model="Login.username"
        class="full-width q-ma-sm"
        outlined
      />
      <q-input
        label="Senha"
        v-model="Login.senha"
        class="full-width q-ma-sm"
        outlined
      />
      <q-btn
        label="Entrar"
        push
        class="full-width q-ma-xl"
        color="primary"
        @click="verificarLogin"
      />
    </q-form>
  </q-card>
</template>

<script>
import { dados } from "src/dados/dados";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      Login: [
        {
          username: "",
          senha: "",
        },
      ],
      dados,
    };
  },

  methods: {
    verificarLogin() {
      if (this.Login.username !== "") {
        for (let i = 0; i < this.dados.login.length; i++) {
          if (this.dados.login[i].username === this.Login.username) {
            if (this.dados.login[i].senha === this.Login.senha) {
              this.$router.push("/BaterPonto");
              this.$q.notify({
                type: "positive",
                message: "Login efetuado com sucesso!",
                timeout: 1000,
                icon: "login",
              });
            }
          }
        }
      }
    },
  },
});
</script>
