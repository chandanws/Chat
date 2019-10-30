<template>
  <div
    class="conversation-list-item-container"
    @click="conversationPage()"
  >
    <img
      :src="conversationListItemInner.avatar"
      style="width: 42px; height: 42px; border-radius: 50px; margin-left: 1rem;"
    >
    <div class="content">
      <span>{{ conversationListItemInner.account }}</span>
      <span>{{ conversationListItemInner.content }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    conversationListItem: {
      type: Object
    }
  },
  data () {
    return {
      conversationListItemInner: this.conversationListItem
    }
  },
  methods: {
    conversationPage () {
      // 打开会话框发送会话
      this.$router.push({
        name: 'chatRoom',
        params: {
          conversationData: this.conversationListItemInner
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import 'src/assets/scss/index.scss';

.conversation-list-item-container {
  @include wh(100%, 70px);
  display: flex;
  align-items: center;
  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 65%;
    @include wh(calc(100% - 42px - 3rem), 65%);
    margin-left: 1rem;
    :last-child {
      color: #959595;
    }
    span {
      display: block;
      @include wh(100%, 20px);
      white-space: nowrap;
      overflow: hidden;
    }
  }
}

.conversation-list-item-container:hover {
  background-color: #ebebec;
}

.conversation-list-item-container:active {
  background-color: #ebebec;
}
</style>

