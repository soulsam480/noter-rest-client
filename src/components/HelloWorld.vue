<template>
  <label for="email">Email</label>
  <input type="email" name="email" id="email" v-model="user.email" />
  <br />
  <br />
  <label for="passd">Password</label>
  <input
    type="password"
    name="password"
    id="passd"
    v-model="user.password"
  /><br />
  <br />
  <button @click="login">Login</button>

  <br />
  <br />

  <button @click="newToken">Request for new token</button>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import axios from "axios";
export default defineComponent({
  setup() {
    const user = reactive({
      email: "" as string,
      password: "" as string,
    });
    const login = () => {
      axios({
        method: "post",
        url: "http://localhost:4000/login",
        data: {
          email: user.email,
          password: user.password,
        },
      }).then((res) => {
        console.log(res);
      });
    };

    const newToken = () => {
      axios({
        method: "post",
        url: "http://localhost:4000/token",
        withCredentials: true,
        xsrfCookieName: 'refreshToken',
        
      }).then((res) => {
        console.log(res);
      });
    };
    return { user, login, newToken };
  },
});
</script>

<style lang="scss" scoped></style>
