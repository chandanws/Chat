<template>
  <div class="friend-group-container">
    <div class="friend-group-top">
      <span :class="{ active: isFriend }" @click="choosen(true)">好友</span>
      <span style="width: 10px; color: #FAFAFA;">间隔</span>
      <span :class="{ active: !isFriend }" @click="choosen(false)">群聊</span>
    </div>
    <div class="friend-group-body" v-if="isFriend">
      <friend-list-item
        :friendListItem="friendListItem"
        v-for="(friendListItem, key) in friendList"
        :key="key"
      ></friend-list-item>
    </div>
    <div class="friend-group-body" v-if="!isFriend">
      <group-list-item
        :GroupListItem="GroupListItem"
        v-for="(GroupListItem, key) in GroupList"
        :key="key"
      ></group-list-item>
    </div>
  </div>
</template>

<script>
import { getFriendList, getFriendInfo } from '@/api/friend'
import { getGroupList, getGroupInfo } from '@/api/group'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      isFriend: true,
      friendList: {},
      GroupList: {}
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  mounted () {
    const dataOfFriend = {
      userId: this.user.id
    }
    getFriendList(dataOfFriend).then(res => {
      if(res.code === 0) {
        this.friendList = res.data.data
      } else {
        this.$message.error('好友列表获取失败')
      }
    }).catch(err => {
      console.log(err)
    })

    const dataOfGroup = {
      userAccount: this.user.account
    }
    getGroupList(dataOfGroup).then(res => {
      if(res.code === 0) {
        this.GroupList = res.data.data
      } else {
        this.$message.error('群列表获取失败')
      }
    }).catch(err => {
      console.log(err)
    })

    // 载入默认页路由
    this.$router.push({
      name: 'default'
    })
  },
  methods: {
    choosen (flag) {
      this.isFriend = flag
    },
  }
}
</script>

<style lang="scss">
@import 'src/assets/scss/index.scss';

.friend-group-container {
  height: 100%;
  .friend-group-top {
    height: 35px;
    text-align: center;
    line-height: 35px;
    border-bottom: 1px solid $clr-gray;
    :nth-child(odd) {
      cursor: pointer;
      :hover {
        border-bottom: 2px solid #169bd5;
      }
    }
    .active {
      color: black;
      padding-bottom: 9px;
      border-bottom: 2px solid #169bd5;
    }
  }

  .friend-group-body {
    height: calc(100% - 35px);
  }
}
</style>

