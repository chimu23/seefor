<template>
 <el-container>
    <el-header>
      <div class="header">
        <router-link to="/"> <img  src="http://pic2.zhimg.com/v2-42eab18c98bc41d2f2597c349b6f20a5_b.gif" /></router-link>
        <div v-show="isLogin" class="login_box">
          <el-avatar size="large">{{loginName}}</el-avatar>
          <el-button size="mini" type="danger" @click="logout">退出</el-button>
        </div>
      </div>
    </el-header>
    <el-main>
      <el-card>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
          <el-breadcrumb-item >个人中心</el-breadcrumb-item>
        </el-breadcrumb>
    <div class="collectList">
        <ul class="coll_ul">
            <li class="coll_li" v-for="i in collectionList" :key="i.mname">
                <router-link :to="'/detail/'+i.activeName+'/'+i.mname">
                    <div>
                    <img :src="i.img" alt="">
                    <span>{{i.mname}}</span>
                </div>
                </router-link>
            </li>

        </ul>
    </div>
      </el-card>
    </el-main>
    <el-footer>
        <p>本站所有资源来源于互联网网友交流,只供网络测试和学习交流所用、所有视频版权归原权利人，如有关视频侵犯了你的权益，请联系告之，我们将于第一时间删除！</p>
        <p>我们建议所有影视爱好者购买正版音像制品或去电影院观看最新大片。</p>
        <p>Seefor 祝您观影愉快</p>
    </el-footer>
  </el-container>
</template>

<script>

export default {

  created () {
    this.show()
    this.getCollections()
  },
  mounted () {

  },
  data () {
    return {
      mname: '',
      activeName: '',
      isLogin: false,
      loginName: '',
      collectionList: []
    }
  },
  methods: {
    go () {
      this.$router.go(-1)
    },
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
      this.isLogin = false
    },
    async getCollections () {
      console.log('user')

      const name = window.sessionStorage.getItem('name')
      const { data, status } = await this.$http.get(`/collections?name=${name}`)
      if (status !== 200) return
      window.sessionStorage.setItem('collection', JSON.stringify(data.data))
      this.collectionList = data.data
      console.log('userover')
    }
  }
}
</script>

<style lang='less' scoped>

.el-container{
    width: 100%;
    height: 100%;
    .el-card{
    width: 100%;
    .collectList{
        width: 100%;
        .coll_ul{
            width: 100%;
            margin: 0;
            padding: 20px 0 0 0;
            list-style-type: none;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            .coll_li{
                width: 12.5%;
                padding: 10px 20px;
                text-align: center;
                    img{
                    width: 100%;

                }
            }
        }
    }
.el-breadcrumb{
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
}
}
}
.el-header
{
    position: relative;
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-footer{
    padding: 5px;
    margin-bottom: 15px;
    background-color: #b3c0d1;
    bottom: 0;
    text-align: center;
    position: fixed;
    width: 100%;
    p{
        background-color: #b3c0d1;
        padding: 3px;
        margin: 0;
        font-size: 13px;
    }
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  padding-bottom:80px;

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
