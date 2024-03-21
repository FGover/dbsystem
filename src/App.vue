<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    console.log(process.env.VUE_APP_API_BASE_URL)
  }
}
</script>
<style>
  #app {
    height: 100vh;
  }
</style>
