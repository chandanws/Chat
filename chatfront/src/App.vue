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
      time: 0
    }
  },
  mounted () {
    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "hidden") {
        document.title = '呀，页面崩溃了'
        clearInterval(this.time)
      } else {
        document.title = "哇，又好了"
        this.time = setTimeout(() => {
          document.title = "Let's Chat!"
        }, 2000)
      }
    })
  }
}
</script>
