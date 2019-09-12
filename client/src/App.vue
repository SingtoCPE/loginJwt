<template>
  <div class="app">
    <div class="login">
      <login-app />
    </div>

    <div class="getdata">
      <button @click="getData">Get Data</button>
      <table>
        <tr>
          <th>ID</th>
        </tr>
        <tr v-for="item in data" :key="item.id">
          <td>{{item.id}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { store } from "./store/store";
import { mapState } from "vuex";
import loginApp from "./components/loginApp";

export default {
  name: "app",
  store,
  components: {
    loginApp
  },
  computed: mapState({
    data: state => state.data
  }),
  methods: {
    getData() {
      this.$store.dispatch("getData");
    }
  }
};
</script>

<style>
.getdata {
  margin: 10px 10px 10px 10px;
}
</style>
