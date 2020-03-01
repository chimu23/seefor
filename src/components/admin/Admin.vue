<template>
  <el-container class="home_container">
    <el-header>
      <div>
       <router-link to="/"> <img src="http://pic2.zhimg.com/v2-42eab18c98bc41d2f2597c349b6f20a5_b.gif" /></router-link>
        <span>Seefor后台管理系统</span>

      </div>
         <div class="btn_out"><el-button size="mini" type="danger" @click="logout">退出</el-button></div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          :router="true"
          default-active="admin/users"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span>用户管理</span>
            </template>

            <el-menu-item index="/admin/users">用户列表</el-menu-item>
          </el-submenu>

          <el-menu-item index="/admin/comments">
            <i class="el-icon-chat-line-round"></i>
            <span slot="title">评论管理</span>
          </el-menu-item>

          <el-menu-item index="/admin/movies">
            <i class="el-icon-video-play"></i>
            <span slot="title">影片管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  created () {},
  data () {
    return {}
  },
  methods: {
    logout () {
      window.sessionStorage.removeItem('token')
      window.sessionStorage.removeItem('name')
      this.$router.push('/')
    }
  }
}
</script>

<style lang="less" scoped>
.home_container {
  height: 100%;
  div {
    img {
      width: 80px;
      height: 80px;
    }
    span {
      color: #ffffff;
      font-weight: 600;
      font-size: 15px;
    }
  }
}
.el-header {
  background-color: #30373a;
  display: flex;
  justify-content: space-between;
  padding-left: 0%;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      margin-left: 15px;
    }
    .btn_out{
      align-self: right;
      height: 35px;

    }
  }
}
.el-aside {
  background-color: #27343a;
}
.el-main {
  background-color: #e4e9ec;
}
.el-menu {
  border-right: none;
}
.toggle_btn {
  text-align: center;
  background-color: #1e1e1e;
  line-height: 24px;
  color: #e4e9ec;
  letter-spacing: 2px;
  cursor: pointer;
}
</style>
