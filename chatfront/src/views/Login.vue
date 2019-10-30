<template>
  <div class="login-container">
    <div class="fork-me-on-github">
      <a href="https://github.com/syt-honey" target="_blank"></a>
    </div>
    <div class="login-content">
      <div class="logo">
        <h3 class="title">欢迎来到Let's Chat！</h3>
        <span class="begin" @click="goToLogin()" v-if="!showLoginArea">立即体验</span>
      </div>
      <div class="login" v-if="showLoginArea">
        <div class="title">
          <span :class="{active: isLogin}" @click="choosen(true)">登录</span>
          <el-divider direction="vertical"></el-divider>
          <span :class="{active: !isLogin}" @click="choosen(false)">注册</span>
        </div>
        <div class="form">
          <el-form ref="loginForm" label-height="30px" :rules="loginRules" v-model="loginForm">
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
              <el-input v-model="loginForm.repassword" placeholder="重新输入密码" type="password">
                <i class="el-icon-lock icon-password" slot="prepend"></i>
              </el-input>
            </el-form-item>

            <el-form-item prop="regCode" class="regcode-box">
              <el-input v-model="loginForm.regCode" placeholder="验证码" @keyup.enter.native="login(isLogin)">
                <i class="el-icon-lock icon-regcode" slot="prepend"></i>
              </el-input>
              <canvas ref="regcode" width="90" height="40"></canvas>
            </el-form-item>
          </el-form>

          <button class="login-button" @click="login(isLogin)">{{ isLogin ? '登录' : '注册'}}</button>
        </div>
        <!-- 第三方登录 -->
      </div>
    </div>
  </div>
</template>

<script>
import Canvas from 'vchat-regcode'

export default {
  name: "home",
  data () {
    let validateName = (rule, value, callback) => {
      let value1 = this.loginForm.account
      if (value1 === "") {
        callback(new Error("请输入账号！"))
      } else {
        let reg = /^[a-zA-Z0-9_ \u4e00-\u9fa5]{1,10}$/
        if (!reg.test(value1)) {
          callback(new Error("请输入2-10位数字、字母或下划线！"))
          return
        }
        callback()
      }
    }
    let validatePass = (rule, value, callback) => {
      let value1 = this.loginForm.password
      if (value1 === "") {
        callback(new Error("请输入密码！"))
      } else {
        let reg = /^[a-zA-Z0-9]{6,12}$/
        if (!reg.test(value1)) {
          callback(new Error("请输入6~12位数字字母组合！"))
          return
        }
        callback()
      }
    }
    let validateRePass = (rule, value, callback) => {
      let value1 = this.loginForm.repassword
      if (value1 === "") {
        callback(new Error("请输入确认密码！"))
      } else {
        if (value1 !== this.loginForm.password) {
          callback(new Error("两次输入的密码不相同！"))
          return
        }
        callback()
      }
    }
    let validateRegcode = (rule, value, callback) => {
      let value1 = this.loginForm.regCode
      if (value1 === '') {
        callback(new Error('请输入验证码'));
      } else {
        if (value1.toLowerCase() !== this.regCode.toLowerCase()) {
          this.regCodeClass.drawAgain();
          callback(new Error('验证码错误'));
          return;
        }
        callback();
      }
    }
    return {
      loginForm: {
        account: "",
        password: "",
        repassword: "",
        regCode: '' // 用户输入
      },
      loginRules: {
        account: [{ validator: validateName, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        repassword: [{ validator: validateRePass, trigger: "blur" }],
        regCode: [{ validator: validateRegcode, trigger: "blur" }],
      },
      regCode: '', // 生成的
      regCodeClass: '',
      isLogin: true,
      showLoginArea: false
    };
  },
  methods: {
    goToLogin () {
      this.showLoginArea = true
    },
    login (flag) {
      if (this.loginForm.regCode.toLowerCase() !== this.regCode.toLowerCase()) {
        this.$message.error('请输入正确的验证码！')
      } else {
        const data = {
          account: this.loginForm.account,
          password: this.loginForm.password
        }
        if (flag) {
          this.$store.dispatch('Login', data)
        } else {
          this.$store.dispatch('SignUp', data).then(res => {
            this.choosen(true) // 注册成功返回登录
          })
        }
      }
    },
    choosen (flag) {
      this.isLogin = flag
    },
    initRegcode () {
      this.$nextTick(() => {
        this.regCodeClass = new Canvas(this.$refs['regcode'], {
          fontSize: 20,
          lineNum: 2,
          dotNum: 10
        })
        this.regCodeClass.draw((r) => {
          this.regCode = r
        })
      })
    }
  },
  watch: {
    isLogin () {
      this.regCodeClass.drawAgain()
    },
    showLoginArea () {
      if (this.showLoginArea) {
        this.initRegcode()
      }
    }
  },
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

  .fork-me-on-github:active {
    outline: none;
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
    :nth-child(1) {
      content: '';
      margin-right: 50px;
    }
    :nth-child(3) {
      content: '';
      margin-left: 50px;
    }
  }
  .begin:hover {
    opacity: 1;
    animation-play-state: paused;
  }
  @keyframes fide {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.3;
    }
    100% {
      opacity: 1;
    }
  }
  .form {
    padding: 2rem;
    margin-bottom: 3rem;
    .regcode-box {
      .el-input {
        width: 200px;
      }
      canvas {
        display: inline-block;
        vertical-align: middle;
      }
    }
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
  .begin {
    color: white;
    font-size: 20px;
    animation: fide 2s infinite;
    cursor: pointer;
  }
}
</style>
