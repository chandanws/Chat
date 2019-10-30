<template>
  <div class="group-info-page">
    <div class="group-info-page-inner">
      <div class="avatar">
        <img
          :src="groupData.avatar ? (BASE_URL + groupData.avatar) : 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'"
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
          <span>{{ groupData.account }}</span>
        </div>
        <div class="info-form">
          <div>
            <span>账号：</span>
            <span>{{ groupData.code }}</span>
          </div>
          <div>
            <span>群介绍：</span>
            <span>{{ groupData.signature }}</span>
          </div>
          <div>
            <span>创建时间：</span>
            <span>{{ createDate }}</span>
          </div>
          <div class="holderAvatar">
            <span>群主：</span>
            <img
              :src="holderAvatar ? (BASE_URL + holderAvatar) : 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'"
              style="width: 32px; height: 32px; border-radius: 50px; cursor: pointer;"
              @click="holderInfo()"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { IMG_URL } from '@/config'
import { formatTime } from '@/utils/format'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      groupDataFull: {},
      groupData: {},
      createDate: '',
      holderAvatar: '',
      BASE_URL: IMG_URL
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  mounted () {
    this.groupDataFull = this.$route.params.groupData
    this.groupData = this.groupDataFull.groupId
    const date = new Date(this.groupData.createDate)
    console.log(date)
    this.createDate = formatTime(date)
    console.log(this.createDate)

    const data = {
      id: this.groupDataFull.userId
    }
    this.$store.dispatch('GetUserInfo', data).then(res => {
      this.holderAvatar = res.avatar
    }).catch(err => {
      this.$message.error(err + '获取失败')
    })

  },
  methods: {
    sendMessage () {
    },
    holderInfo () {
      const data = {
        id: this.groupDataFull.userId
      }
      this.$store.dispatch('GetUserInfo', data).then(res => {
        console.log(res)
        this.$router.push({
          name: 'personalInfoPage',
          params: {
            userData: res
          }
        })
      }).catch(err => {
        this.$message.error(err + '获取失败')
      })
    }
  }
}
</script>

<style lang="scss">
@import 'src/assets/scss/index.scss';

.group-info-page {
  @include wh(100%, 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  .group-info-page-inner {
    width: 350px;
    height: 550px;
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
      width: 100%;
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
        font-size: 20px;
        font-weight: bold;
        display: block;
        text-overflow: ellipsis;
        overflow: hidden;
        text-align: center;
      }
      .info-form {
        width: 80%;
        div > span:nth-child(odd) {
          color: #959595;
        }
        div {
          margin-bottom: 1rem;
          margin-left: 50px;
        }
        .holderAvatar {
          display: flex;
          flex-direction: column;
          height: 60px;
          justify-content: space-between;
        }
      }
    }
  }
}
</style>

