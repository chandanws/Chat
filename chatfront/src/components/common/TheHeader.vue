<template>
  <div class="header-container">
    <div class="header-left">
      <img
        :src="avatarUrl ? (BASE_URL + avatarUrl) : 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'"
        style="margin-right: 30px; width: 32px; height: 32px; border-radius: 50px;"
      >
      <el-input class="header-input" prefix-icon="el-icon-search" v-model="search"></el-input>
    </div>
    <div class="header-center">
      <svg-icon
        icon="notice-hover"
        v-if="choosenState.isNoticed"
        style="width: 2rem; height: 2rem;"
        @click.native="noticed(true)"
      ></svg-icon>
      <svg-icon
        icon="people"
        v-if="choosenState.isNoticed"
        style="width: 2rem; height: 2rem;"
        @click.native="people(false)"
      ></svg-icon>
      <svg-icon
        icon="notice"
        v-if="!choosenState.isNoticed"
        style="width: 2rem; height: 2rem;"
        @click.native="noticed(true)"
      ></svg-icon>
      <svg-icon
        icon="people-hover"
        v-if="!choosenState.isNoticed"
        style="width: 2rem; height: 2rem;"
        @click.native="people(false)"
      >></svg-icon>
    </div>
    <div class="header-right">
      <el-dropdown>
        <i class="el-icon-more" style="color: white; cursor: pointer;"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="modifyPersonalInfo()">修改信息</el-dropdown-item>
          <el-dropdown-item @click.native="logOut()">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { IMG_URL } from '@/config/index.js'

export default {
  data () {
    return {
      BASE_URL: IMG_URL,
      avatarUrl: '',
      search: '',
      userData: ''
    }
  },
  computed: {
    ...mapGetters(['choosenState', 'user'])
  },
  mounted () {
    const data = {
      id: this.user.id
    }
    this.$store.dispatch('GetUserInfo', data).then(res => {
      this.userData = res
      this.avatarUrl = res.avatar
    }).catch(err => {
      this.$message.error(err + '获取失败')
    })
  },
  methods: {
    logOut () {
      this.$router.push({
        name: 'login'
      })
      this.$message.success('退出成功')
    },
    modifyPersonalInfo () {
      this.$router.push({
        name: 'setting',
        params: {
          userData: this.userData
        }
      })
    },
    noticed (flag) {
      this.choosenState.isNoticed = true
    },
    people (flag) {
      this.choosenState.isNoticed = false
    }
  },
}
</script>

<style lang="scss">
@import 'src/assets/scss/index.scss';

.header-container {
  @include wh(100%, 50px);
  background-color: $--color-primary;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  display: flex;
  justify-content: space-between;
  width: 250px;
  margin-left: 1rem;
  align-items: center;
}

.header-center {
  width: 20vw;
  display: flex;
  justify-content: space-between;
}

.header-input {
  @include wh(60%, 30px);
  .el-input__inner {
    @include wh(150px, 25px);
    background: $--color-primary;
    border: 1px solid #a3d3f6;
    border-radius: 16px;
    color: white;
  }

  .el-input__icon {
    color: #a3d3f6;
    left: 10px;
    height: 25px;
    line-height: 28px;
  }

  .el-input--prefix {
    height: 25px;
  }
}

.header-right {
  margin-right: 1.5rem;
}
</style>
