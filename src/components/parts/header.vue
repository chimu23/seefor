<template>
   <el-header>
      <div class="header">
         <router-link to="/"> <img  src="http://pic2.zhimg.com/v2-42eab18c98bc41d2f2597c349b6f20a5_b.gif" /></router-link>
     <div v-show="isLogin" class="login_box">
          <el-avatar size="large">{{loginName}}</el-avatar>
          <el-button size="mini" type="danger" @click="logout">退出</el-button>
        </div>
      </div>
   </el-header>
</template>

<script>
export default {
  created () {
    this.show()
  },
  data () {
    return {
      isLogin: false,
      loginName: ''
    }
  },
  methods: {
    show () {
      if (window.sessionStorage.getItem('token')) {
        this.isLogin = true
        this.loginName = window.sessionStorage.getItem('name')
      } else {
        this.isLogin = false
        this.loginName = window.sessionStorage.getItem('name')
      }
    },
    logout () {
      window.sessionStorage.removeItem('token')
      window.sessionStorage.removeItem('name')
      window.sessionStorage.removeItem('collection')
      this.isLogin = false
    }
  }
}
</script>

<style lang='less' scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.header {
  position: relative;
  img {
    position: absolute;
    left: 0;
    margin-top: 5px;
    width: 50px;
    height: 50px;
  }
  .el-button {
    position: absolute;
    right: 0;
    margin-top: 5px;
  }
  .login_box {
    position: absolute;
    right: 0;
    margin-top: 5px;
    .el-avatar {
      position: absolute;
      right: 70px;
      margin-top: 3px;
      color: #657feb;
    }
  }
}
</style>
