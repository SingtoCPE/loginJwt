<template>
  <form>
    <div class="user">
      <label>User: </label>
      <input placeholder="user..." />
    </div>

    <div class="pass">
      <label>Password: </label>
      <input placeholder="password..." />
    </div>

     <div class="button">
      <button @click.prevent="logID">Login</button>
    </div>
  </form>
</template>
<script>
export default {
  name: "loginApp",
  methods:{
    logID(){
      console.log('log');
    }
  }
};
</script>
<style scoped>
.user{
  margin: 10px 10px 10px 10px;
}
.pass{
  margin: 10px 10px 10px 10px;
}
</style>