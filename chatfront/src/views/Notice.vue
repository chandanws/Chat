<template>
  <div class="notice-container">
    <p>{{ msg }}</p>
  </div>
</template>

<script>
import { getUser } from '../api/user.js';
export default {
  data() {
    return {
      msg: 'notice'
    }
  },
  mounted() {
    getUser().then(res => {
      console.log('test success!')
    })
  }
}
</script>

