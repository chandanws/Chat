<template>
  <div class="login-container">
    <div class="fork-me-on-github" target="_blank">
      <a href="https://github.com/syt-honey"></a>
    </div>
    <div class="login-content">
      <div class="logo">
        <h3 class="title">欢迎使用!</h3>
      </div>
      <div class="login">
        <div class="title">
          <span :class="{active: isLogin}" @click="choosen(true)">登录</span>
          <span :class="{active: !isLogin}" @click="choosen(false)">注册</span>
        </div>

        <div class="form">
          <el-form ref="loginForm" label-height="30px" :rules="loginRules">
            <el-form-item prop="account">
              <el-input v-model="loginForm.account" placeholder="账号">
                <i class="el-icon-user icon-account" slot="prepend"></i>
              </el-input>
            </el-form-item>

            <el-form-item prop="password">
              <el-input v-model="loginForm.password" placeholder="密码" type="password">
                <i class="el-icon-lock icon-password" slot="prepend"></i>
              </el-input>
            </el-form-item>

            <el-form-item prop="repassword" v-if="!isLogin">
              <el-input v-model="loginForm.repassword" placeholder="重新输入密码">
                <i class="iconfont icon-repassword" slot="prepend"></i>
              </el-input>
            </el-form-item>
          </el-form>

          <button class="login-button" @click="login(isLogin)">
            <v-icon class="el-icon-loading" color="#fff" :size="14" v-if="loading"></v-icon>
            {{ isLogin ? '登录' : '注册'}}
          </button>
        </div>
        <!-- 第三方登录 -->
      </div>
    </div>
  </div>
</template>

<script>
import { login } from '../api/user.js'

export default {
  name: "home",
  data () {
    let validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号！"));
      } else {
        let reg = /^[a-zA-Z0-9_]{2,10}$/;
        if (!reg.test(value)) {
          callback(new Error("请输入2-10位数字、字母或下划线！"));
          return;
        }
        callback();
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码！"));
      } else {
        let reg = /^[a-zA-Z0-9]{6,12}$/;
        if (!reg.test(value)) {
          callback(new Error("请输入6~12位数字字母组合！"));
          return;
        }
        callback();
      }
    };
    let validateRePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入确认密码！"));
      } else {
        if (value !== this.loginForm.password) {
          callback(new Error("两次输入的密码不相同！"));
          return;
        }
        callback();
      }
    };
    return {
      loginForm: {
        account: "",
        password: "",
        repassword: ""
      },
      loginRules: {
        account: [{ validator: validateName, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        repassword: [{ validator: validateRePass, trigger: "blur" }],
      },
      isLogin: true,
      loading: false
    };
  },
  methods: {
    login () {
      const data = {
        account: this.loginForm.account,
        password: this.loginForm.password
      }
      this.loading = true
      login(data).then(res => {
        if (res.code === 0) {
          this.$message.success('登录成功！')
          // 获取信息
        } else if (res.code === -1) {
          this.$message.error('账号或密码错误！')
          this.loading = false
        } else {
          this.$message.error('登录失败')
          this.loading = false
        }
      }).catch(err => {
        this.$message.error('登录失败')
        this.loading = false
        console.log(err)
      })
    },
    choose (flag) {
      this.$refs['loginForm'].resetFields()
      this.isLogin = flag
    }
  }
};
</script>

<style lang="scss">
@import 'src/assets/scss/index.scss';

.login-container {
  @include wh(100%, 100%);
  background-color: $--color-primary;
  .fork-me-on-github {
    @include wh(150px, 150px);
    background-image: url('../assets/image/login/github.png');
    position: absolute;
    right: 0;
    top: 0;
    background-size: contain;
    a {
      @include wh(150px, 150px);
      display: block;
      :hover {
        color: currentColor;
      }
    }
  }
}

.login-content {
  // 实现垂直居中
  //1，使用transform属性 right & left 的百分比基于窗口，transform则是自身
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.login {
  background: white;
  border-radius: 4px;
  width: 350px;
  margin: 2rem auto;
  padding-top: 1.5rem;
  .title {
    text-align: center;
    > span {
      cursor: pointer;
    }
    :nth-child(1)::after {
      content: '|';
      @include margin-lr(50px, 50px);
    }
  }
  .form {
    padding: 2rem;
    margin-bottom: 3rem;
    .login-button {
      width: 100%;
      margin-top: 2rem;
    }
  }
}

.logo {
  text-align: center;
  .title {
    color: white;
    padding-bottom: 1rem;
  }
}
</style>
