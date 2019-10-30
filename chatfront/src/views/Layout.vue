<template>
  <div class="wrap">
    <the-header></the-header>
    <div class="main-wrap">
      <div class="aside-bar">
        <conversation-list v-if="choosenState.isNoticed"></conversation-list>
        <aside-friend-group v-if="!choosenState.isNoticed"></aside-friend-group>
        <el-dropdown class="add-friend-group" v-if="!choosenState.isNoticed">
          <svg-icon icon="add" style="width: 2rem; height: 2rem;"></svg-icon>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="findFriend()">加好友</el-dropdown-item>
            <el-dropdown-item @click.native="findGroup()">加群</el-dropdown-item>
            <el-dropdown-item @click.native="createGroup()">新建群</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="show-router">
        <router-view :key="key"></router-view>
      </div>
      <div class="add-fg-dialog-visible">
        <el-dialog
          :title="dialogTitle"
          :visible.sync="addFGDialogVisible"
          class="add-fg-dialog-visible"
        >
          <div class="input-area">
            <el-input class="find-friend-input" prefix-icon="el-icon-search" v-model="search"></el-input>
            <el-button type="primary" class="find-button" @click="findFG()">查找</el-button>
          </div>
          <div class="show-area" v-if="isShowed">
            <div class="there-is" v-if="findedFriend || findedGroup">
              <el-avatar
                :size="45"
                :src="findedFriend.avatar ? (BASE_URL + avatar) : 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'"
                style="cursor: pointer; margin-right: 30px;"
                v-if="findedFriend"
              ></el-avatar>
              <el-avatar
                :size="45"
                :src="findedGroup.avatar ? (BASE_URL + avatar) : 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'"
                style="cursor: pointer; margin-right: 30px;"
                v-if="findedGroup"
              ></el-avatar>
              <div class="friend-content">
                <span v-if="findedFriend">{{ findedFriend.account }}</span>
                <span v-if="findedGroup">{{ findedGroup.account }}</span>
                <button @click="addFG()">{{ findedFriend ? '加好友' : '加群'}}</button>
              </div>
            </div>
            <div class="there-isnt" v-else>
              <span>
                <i class="el-icon-warning"></i>没有找到符合搜索条件的用户!
              </span>
            </div>
          </div>
        </el-dialog>
      </div>
      <div class="create-dialog-visible">
        <el-dialog title="创建群" :visible.sync="createDialogVisible" class="create-dialog-visible">
          <div class="create-dialog-visible-innner">
            <el-form v-model="createGroupData" :label-position="labelPosition" label-width="100px">
              <el-form-item label="头像：">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadAPI"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                  with-credentials="true"
                  show-file-list="false"
                >
                  <img v-if="avatarUrl" :src="(BASE_URL + avatarUrl)" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="账号名：">
                <el-input v-model="createGroupData.account"></el-input>
              </el-form-item>
              <el-form-item label="群介绍：">
                <el-input v-model="createGroupData.signature"></el-input>
              </el-form-item>
            </el-form>
            <button class="create-group-button" @click="create()">建群</button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getFriendInfo, addFriend } from '@/api/friend'
import { getGroupInfo, createGroup, addGroupMember } from '@/api/group'
import { IMG_URL } from '@/config'

export default {
  data () {
    return {
      url: '',
      dialogTitle: '',
      addFGDialogVisible: false,
      search: '',
      isShowed: false,
      findedFriend: '',
      findedGroup: '',
      createDialogVisible: false,
      createGroupData: {},
      labelPosition: 'Right',
      avatarUrl: '',
      uploadAPI: '/api/upload/uploadAvatar',
      BASE_API: IMG_URL
    }
  },
  computed: {
    ...mapGetters(['choosenState', 'user']),
    key () {
      return (this.$route.name !== undefined) ? (this.$route.name + new Date()) : (this.$route + new Date())
    }
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
    createGroup () {
      this.createDialogVisible = true
    },
    create () {
      const data = {
        groupAccount: this.createGroupData.account,
        signature: this.createGroupData.signature,
        avatar: this.avatarUrl,
        holderAccount: this.user.account
      }
      createGroup(data).then(res => {
        if (res.code === 0) {
          this.$message.success('创建成功！')
          this.createDialogVisible = false
          this.choosenState.isNoticed = true
        } else if (res.code === 1) {
          this.createDialogVisible = false
          this.$message.warning('该用户已存在')
        } else {
          this.$message.error('创建群出错')
        }
      }).catch(err => {
        console.log('创建群异常')
        console.log(err)
      })
    },
    findFG () {
      if (this.dialogTitle === '找好友') {
        const data = {
          friendAccount: this.search
        }
        getFriendInfo(data).then(res => {
          this.isShowed = true
          if (res.code === 0) {
            this.findedFriend = res.data.data
          } else {
            this.findedFriend = ''
          }
        }).catch(err => {
          this.$message.error('查找好友异常')
          console.log(err)
        })
      } else {
        const data = {
          groupAccount: this.search
        }
        getGroupInfo(data).then(res => {
          this.isShowed = true
          if (res.code === 0) {
            this.findedGroup = res.data.data
          } else {
            this.findedGroup = ''
          }
        }).catch(err => {
          this.$message.error('查找群异常')
          console.log(err)
        })
      }
    },
    findFriend () {
      this.dialogTitle = '找好友'
      this.addFGDialogVisible = true
    },
    findGroup () {
      this.dialogTitle = '找群'
      this.addFGDialogVisible = true
    },
    addFG () {
      if (this.dialogTitle === '找好友') {
        const data = {
          userX: this.user.id,
          userY: this.findedFriend._id
        }
        addFriend(data).then(res => {
          console.log(res)
          if (res.code === 0) {
            this.$message.success('添加成功！')  // 测试
            this.addFGDialogVisiable = false
            this.choosenState.isNoticed = true  // 回到主页面
          } else if (res.code === 1) {
            this.addFGDialogVisiable = false
            this.$message.warning('用户已经是您的好友')
          } else {
            this.$message.error('添加出错')
          }
        })
      } else {
        // 加群
        const data = {
          groupId: this.findedGroup._id,
          userId: this.user.id,
          userAccount: this.user.account
        }
        addGroupMember(data).then(res => {
          if (res.code === 0) {
            this.$message.success('添加成功！')  // 测试
            this.addFGDialogVisiable = false
            this.choosenState.isNoticed = true  // 回到主页面
          } else if (res.code === 1) {
            this.addFGDialogVisiable = false
            this.$message.warning('账户已存在！')
          } else {
            this.$message.error('添加出错')
          }
        }).catch(err => {
          console.log('添加异常')
          console.log(err)
        })
      }
    }
  }
}
</script>

<style lang="scss">
@import 'src/assets/scss/index.scss';

.main-wrap {
  height: calc(100vh - 50px);
  display: flex;
  .aside-bar {
    @include wh(220px, 100%);
    background: $clr-aside;
    overflow: scroll;
    overflow-x: hidden;
    .add-friend-group {
      position: fixed;
      border-radius: 50%;
      box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.15), 0 4px 4px 0 rgba(0, 0, 0, 0.08);
      bottom: 20px;
      left: 155px;
    }
  }
  .show-router {
    @include wh(calc(100% - 200px), 100%);
  }
}

.aside-bar::-webkit-scrollbar {
  width: 0 !important;
}

.add-fg-dialog-visible {
  .input-area {
    display: flex;
    .find-button {
      margin-left: 1rem;
    }
  }
  .show-area {
    margin-top: 2rem;
    height: 5rem;
    .there-is {
      display: flex;
      align-items: center;
      height: 100%;
      .friend-content {
        height: 80%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
    }
  }
}

.create-dialog-visible {
  height: 100%;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
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
