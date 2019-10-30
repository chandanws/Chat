<template>
  <div class="group-list-item-container" @click="queryGroupPage()">
    <img
      :src="groupListItemInner.groupId.avatar ? (BASE_URL + groupListItemInner.groupId.avatar) : 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'"
      style="width: 42px; height: 42px; border-radius: 50px; margin-left: 1rem;"
    >
    <div class="content">
      <span>{{ groupListItemInner.groupId.account }}</span>
      <span>{{ groupListItemInner.groupId.signature }}</span>
    </div>
  </div>
</template>

<script>
import { IMG_URL } from '@/config/index.js'

export default {
  props: {
    GroupListItem: {
      type: Object
    }
  },
  data () {
    return {
      BASE_URL: IMG_URL,
      groupListItemInner: this.GroupListItem,
    }
  },
  methods: {
    queryGroupPage () {
      /// 进入群信息详情页
      this.$router.push({
        name: 'groupInfoPage',
        params: {
          groupData: this.groupListItemInner
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import 'src/assets/scss/index.scss';

.group-list-item-container {
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

.group-list-item-container:hover {
  background-color: #ebebec;
}

.group-list-item-container:active {
  background-color: #ebebec;
}
</style>

