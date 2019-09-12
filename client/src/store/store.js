import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

const endpoint = "http://localhost:3000/data";

export const store = new Vuex.Store({
  state: {
    data: []
  },
  mutations: {
    setData(state, data) {
      state.data = data;
    }
  },
  actions: {
    async getData({ commit }) {
      const { data } = await axios({
        method: "get",
        url: endpoint
      });
      console.log("get-from-store");
      commit("setData", data.map(data => data));
    }
  }
});
