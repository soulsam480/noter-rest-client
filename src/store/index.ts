import { User } from './../entities/models';
import { createStore } from 'vuex'

export default createStore({
  state: {
    user: {

    } as User | null,

    token: "" as string | null
  },
  mutations: {
    addUser: (state, load: User | null) => {
      state.user = load
    },
    addToken: (state, load) => {
      state.token = load
    }
  },
  actions: {
  },
  getters: {
    giveUser: (state) => {
      return state.user
    }
  },
  modules: {
  }
})
