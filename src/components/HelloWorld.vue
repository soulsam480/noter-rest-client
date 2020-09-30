<template>
  <div>
    <div v-if="user">
      <p>{{ user.name }}</p>
      <p>{{ user.email }}</p>
      <p>{{ user.userId }}</p>
    </div>
    <div v-else>
      <p>error</p>
    </div>
    <label for="email">Email</label>
    <input type="email" name="email" id="email" v-model="newUser.email" />
    <br />
    <br />
    <label for="passd">Password</label>
    <input
      type="password"
      name="password"
      id="passd"
      v-model="newUser.password"
    /><br />
    <br />
    <button @click="login">Login</button>

    <br />
    <br />

    <button @click="newToken">Request for new token</button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from "vue";
import axios from "axios";
import store from "@/store";
import { User } from "@/entities/models";
export default defineComponent({
  setup() {
    const newUser = reactive({
      email: "" as string,
      password: "" as string,
    });

    const user = computed<User>(() => {
      return store.getters.giveUser;
    });
    const login = async () => {
      await axios({
        method: "post",
        url: "http://localhost:4000/login",
        data: {
          email: newUser.email,
          password: newUser.password, 
        },
        withCredentials: true,
      })
        .then((res) => {
          store.commit("addUser", {
            name: res.data.name,
            email: res.data.email,
            userId: res.data.userId,
          } as User);
          console.log(res);
        })
        .catch((err) => {
          store.commit("addUser", null);
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
    return { user, newUser, login, newToken };
  },
});
</script>

<style lang="scss" scoped></style>
