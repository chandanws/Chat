<template>
  <div class="default-page">
    <img src="../assets/image/default-bg.png">
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style lang="scss">
@import 'src/assets/scss/index.scss';

.default-page {
  @include wh(100%, 100%);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

