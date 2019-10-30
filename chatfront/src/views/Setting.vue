<template>
  <div class="setting-container">
    <div class="setting-container-inner">
      <el-form v-model="userData" :label-position="labelPosition" label-width="100px">
        <el-form-item label="头像：">
          <el-upload
            class="avatar-uploader"
            :action="uploadAPI"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            with-credentials="true"
            show-file-list="false"
          >
            <img v-if="avatarUrl" :src="BASE_URL + avatarUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="账号：">
          <el-input v-model="userData.account"></el-input>
        </el-form-item>
        <el-form-item label="花名：">
          <el-input v-model="userData.nickName"></el-input>
        </el-form-item>
        <el-form-item label="性别：">
          <el-radio-group v-model="userData.sex">
            <el-radio :label="0">男</el-radio>
            <el-radio :label="1">女</el-radio>
            <el-radio :label="3">保密</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="个性签名：">
          <el-input v-model="userData.signature"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：">
          <el-input v-model="userData.email"></el-input>
        </el-form-item>
      </el-form>
      <button class="modify-user-info-button" @click="modifyUserInfo()">提交</button>
    </div>
  </div>
</template>

<script>
import { modifyUserInfo } from '@/api/user'
import { mapGetters } from 'vuex'
import { IMG_URL } from '@/config'

export default {
  data () {
    return {
      userData: '',
      labelPosition: 'Right',
      BASE_URL: IMG_URL,
      avatarUrl: '',
      uploadAPI: '/api/upload/uploadAvatar'
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  mounted () {
    this.userData = this.$route.params.userData
    this.avatarUrl = this.userData.avatar
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.avatarUrl = res.data
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('头像只能上传JPG格式！')
      }
      if (!isLt2M) {
        this.$message.error('头像的大小不超过2MB!')
      }
      return isJPG && isLt2M
    },
    modifyUserInfo () {
      const userData = {
        account: this.userData.account,
        avatar: this.avatarUrl,
        signature: this.userData.signature,
        nickName: this.userData.nickName,
        email: this.userData.email,
        sex: this.userData.sex,
        id: this.userData._id
      }
      modifyUserInfo(userData).then(res => {
        this.$message.success('信息修改成功！')
        this.$router.push({
          name: 'homepage'
        })
      }).catch(err => {
        this.$message.error('信息修改失败！')
        console.log(err)
      })
    }
  }
}
</script>

</<style lang="scss">
@import 'src/assets/scss/index.scss';

.setting-container {
  @include wh(100%, 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  .setting-container-inner {
    padding: 2rem;
    padding-right: 4rem;
    border-radius: 4px;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.15), 0 4px 4px 0 rgba(0, 0, 0, 0.08);
    width: 300px;
    .el-input {
      width: 200px;
    }
    .modify-user-info-button {
      dispaly: block;
      margin: 0 auto;
    }
  }
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
</style>

