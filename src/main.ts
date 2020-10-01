import { User } from './entities/models';
import { createApp } from 'vue'
import App from './App.vue'
import axios from "axios";
import store from './store';

(async () => {
    const loggedIn = document.cookie.split('; ')
        .find(row => row.startsWith('loggedIn'))?.split('=')[1]
    if (loggedIn === "true") {

        try {
            axios({
                method: "post",
                url: "http://localhost:4000/getuserdata",
                withCredentials: true,
            }).then((res) => {
                console.log(res);
                store.commit("addUser", {
                    name: res.data.name,
                    email: res.data.email,
                    userId: res.data.userId,
                } as User);
                store.commit("addToken", res.data.accesToken)
            });
        } catch (error) {

            store.commit("adduser", null)
            store.commit("addToken", null)
        }

        setTimeout(async () => {
            try {
                axios({
                    method: "post",
                    url: "http://localhost:4000/token",
                    withCredentials: true,
                }).then((res) => {
                    console.log(res);
                    store.commit("addToken", res.data.accesToken)
                });
            } catch (err) {
                store.commit("adduser", null)
                store.commit("addToken", null)
            }
        }, 840000)
    }
})()


createApp(App).use(store).mount('#app')
