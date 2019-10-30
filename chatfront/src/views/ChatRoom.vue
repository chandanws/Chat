<template>
  <div class="chat-room-container">
    <div class="chat-room-account">
      <span>{{ conversationData.account }}</span>
    </div>
    <div class="chat-room-body">
      <!-- content of chat-->
    </div>
    <div class="chat-room-output">
      <div class="tools">
        <svg-icon icon="expression" style="width: 1.5rem; height: 1.5rem; margin-right: 1rem;"></svg-icon>
        <svg-icon icon="picture" style="width: 1.5rem; height: 1.5rem; margin-right: 1rem;"></svg-icon>
        <svg-icon icon="file" style="width: 1.5rem; height: 1.5rem; margin-right: 1rem;"></svg-icon>
        <svg-icon icon="record" style="width: 1.5rem; height: 1.5rem; margin-right: 1rem;"></svg-icon>
      </div>
      <textarea class="output-textarea" v-model="textarea"></textarea>
      <button @click="sendMessage()" class="sent-msg-botton">发送</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      conversationData: '',
      textarea: ''
    }
  },
  methods: {
    sendMessage () {
      // 点击发送消息的动作
    }
  },
  // beforeRouteUpdate (to, from, next) {
  //   console.log('chat-room')
  //   this.conversationData = this.$route.params.conversationData
  //   console.log(this.conversationData)
  //   next()
  // },
  mounted () {
    this.conversationData = this.$route.params.conversationData
    // console.log(this.$route.params)
  },
  watch: {
    $route () {
      console.log('route改变')
      this.conversationData = this.$route.params.conversationData
      console.log(this.conversationData)
    },
    conversationData () {
      console.log('conversationData发生改变')
      if (this.$route.params.conversationData) {
        this.conversationData = this.$route.params.conversationData
      }
    }
  }
}
</script>

<style lang="scss">
@import 'src/assets/scss/index.scss';

.chat-room-container {
  @include wh(100%, 100%);
  display: flex;
  flex-direction: column;
  .chat-room-account {
    @include wh(100%, 40px);
    display: flex;
    align-items: center;
    span {
      font-size: 16px;
      margin-left: 0.5rem;
    }
    span:hover {
      cursor: pointer;
      border-bottom: 1px solid black;
    }
  }
  .chat-room-body {
    @include wh(100%, calc(100% - 170px));
    border-top: 1px solid#EAEAEA;
    border-bottom: 1px solid#EAEAEA;
  }
  .chat-room-output {
    @include wh(100%, 130px);
    .tools {
      padding: 0.5rem;
      @include wh(100%, 20px);
    }
    .output-textarea {
      @include wh(calc(100% - 1rem), 60px);
      resize: none;
      border: none;
      outline: none;
      padding-inline-start: 0.5rem;
    }
    .output-textarea::-webkit-scrollbar {
      width: 0 !important;
    }
    .sent-msg-botton {
      position: absolute;
      bottom: 3px;
      right: 10px;
    }
  }
}
</style>

