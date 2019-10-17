<template>
  <div class="header-container">
    <p>{{ msg }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'header'
    }
  }
}
</script>

<style lang="scss">
@import 'src/assets/scss/index.scss';

.header-container {
  @include wh(100%, 10vh);
  background-color: $--color-primary;
}
</style>

