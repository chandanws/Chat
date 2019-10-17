<template>
  <div class="wrap">
    <the-header></the-header>
    <div class="main-wrap">
      <el-row class="outer-row" style="margin-top: calc(100% - 10vh);">
        <el-col :span="6">
          <el-row class="inner-row">
            <span :class="{ active: isFriend }" @click="choosen(true)">好友</span>
            <el-divider direction="vertical"></el-divider>
            <span :class="{ active: !isFriend }" @click="choosen(false)">群聊</span>
          </el-row>
          <el-row>
            <keep-alive>
              <router-view name="asideFriendsGroupRouter"></router-view>
            </keep-alive>
          </el-row>
        </el-col>
        <el-col :span="18">
          <keep-alive>
            <router-view name="asideShowRouter"></router-view>
          </keep-alive>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isFriend: true
    }
  },
  method: {
    choosen(flag) {
      this.isFriend = flag
    }
  }
}
</script>

<style lang="scss">

span .active {
  color: black;
  border-bottom: 1px solid #169BD5;
}
</style>


