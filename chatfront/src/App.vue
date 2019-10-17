<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      t: 0
    }
  },
  mounted () {
    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "hidden") {
        document.title = '呀，页面崩溃了'
        clearInterval(this.t)
      } else {
        document.title = "哇，又好了"
        this.t = setTimeout(() => {
          document.title = "Vchat"
        }, 2000)
      }
    })
  }
}
</script>
