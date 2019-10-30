<template>
  <div class="friend-list-item-container" @click="queryPersonalPage()">
    <img
      :src="friendListItemInner.avatar ? (BASE_URL + friendListItemInner.avatar) : 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'"
      style="width: 42px; height: 42px; border-radius: 50px; margin-left: 1rem;"
    >
    <div class="content">
      <span>{{ friendListItemInner.account }}</span>
      <span>{{ friendListItemInner.signature }}</span>
    </div>
  </div>
</template>

<script>
import { IMG_URL } from '@/config/index.js'

export default {
  props: {
    friendListItem: {
      type: Object
    }
  },
  data () {
    return {
      BASE_URL: IMG_URL,
      friendListItemInner: this.friendListItem,
    }
  },
  methods: {
    queryPersonalPage () {
      // 进入用户信息详情页
      console.log('进入详情页')
      this.$router.push({
        name: 'personalInfoPage',
        params: {
          userData: this.friendListItemInner
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import 'src/assets/scss/index.scss';

.friend-list-item-container {
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

.friend-list-item-container:hover {
  background-color: #ebebec;
}

.friend-list-item-container:active {
  background-color: #ebebec;
}
</style>

