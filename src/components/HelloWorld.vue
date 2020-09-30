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
    const login = async () => {
      await axios({
        method: "post",
        url: "http://localhost:4000/login",
        data: {
          email: user.email,
          password: user.password,
        },
        withCredentials: true,
      })
        .then((res) => {
          console.log(res);
          localStorage.setItem("userId", res.data.userId);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const newToken = async () => {
      axios({
        method: "post",
        url: "http://localhost:4000/token",
        withCredentials: true,
      }).then((res) => {
        console.log(res);
      });
    };

    const logOut = async () => {
      await axios({
        method: "post",
        url: "http://localhost:4000/logout",
        data: {
          userId: localStorage.getItem("userId"),
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    return { user, login, newToken };
  },
});
</script>

<style lang="scss" scoped></style>
