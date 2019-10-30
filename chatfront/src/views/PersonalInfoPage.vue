<template>
  <div class="personal-info-page">
    <div class="personal-info-page-inner">
      <div class="avatar">
        <img
          :src="userData.avatar ? (BASE_URL + userData.avatar) : 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'"
        >
      </div>
      <div class="content">
        <div class="communication">
          <svg-icon
            icon="communication"
            style="width: 32px; height: 32px"
            @click.native="sendMessage()"
          ></svg-icon>
        </div>
        <div class="title">
          <span>{{ userData.account }}</span>
          <span>{{ userData.signature }}</span>
        </div>
        <div class="info-form">
          <div>
            <span>账号：</span>
            <span>{{ userData.code }}</span>
          </div>
          <div>
            <span>花名：</span>
            <span>{{ userData.nickName }}</span>
          </div>
          <div>
            <span>性别：</span>
            <span>{{ sex }}</span>
          </div>
          <div>
            <span>邮箱：</span>
            <span>{{ userData.email }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { IMG_URL } from '@/config'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      msg: 'personal-info-page',
      userData: '',
      sex: '保密',
      isSelf: false,
      BASE_URL: IMG_URL
    }
  },
  methods: {
    sendMessage () {
      console.log('聊天')
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  watch: {
    $route () {
      console.log('路由变化')
      this.userData = this.$route.params.userData
    },
    userData () {
      console.log('userData变化')
      if (this.$route.params.userData) {
        if (this.userData._id === this.user.id) {
          this.isSelf = true
        }
        if (this.userData.sex === 0) {
          this.sex === '男'
        } else if (this.userData.sex === 1) {
          this.sex === '女'
        } else {
          this.sex === '保密'
        }
      }
    }
  },
  // beforeRouteUpate (to, from, next) {
  //   console.log(to)
  // },
  created () {
    this.userData = this.$route.params.userData
    if (this.userData._id === this.user.id) {
      this.isSelf = true
    }
    if (this.userData.sex === 0) {
      this.sex === '男'
    } else if (this.userData.sex === 1) {
      this.sex === '女'
    } else {
      this.sex === '保密'
    }
  }
}
</script>

<style lang="scss">
@import 'src/assets/scss/index.scss';

.personal-info-page {
  @include wh(100%, 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  .personal-info-page-inner {
    width: 350px;
    height: 500px;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.15), 0 4px 4px 0 rgba(0, 0, 0, 0.08);
    border-radius: 4px;
    .avatar {
      @include wh(100%, 250px);
    }
    .avatar img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
    .content {
      margin: 0 auto;
      width: 80%;
      .communication {
        transform: translate(240px, -25px);
        @include wh(50px, 50px);
        border-radius: 50%;
        background: $--color-primary;
        line-height: 70px;
        text-align: center;
      }
      .title {
        width: 80%;
        margin-bottom: 2rem;
        :first-child {
          font-size: 20px;
          font-weight: bold;
          color: black;
        }
        > span {
          display: block;
          text-overflow: ellipsis;
          overflow: hidden;
          color: #959595;
          text-align: center;
        }
      }
      .info-form {
        width: 70%;
        div > span:nth-child(odd) {
          color: #959595;
        }
        div {
          margin-bottom: 1rem;
          margin-left: 50px;
        }
      }
    }
  }
}
</style>

