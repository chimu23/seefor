<template>
  <el-container>
    <headerc></headerc>

    <el-main>
      <el-card>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
          <el-breadcrumb-item>搜索结果(共{{total}}条数据)</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="search_box">
          <ul class="box_ul">
            <li class="box_li" v-for="i in searchList" :key="i.mname">
              <router-link :to="'/detail/'+i.activeName+'/'+i.mname">
                <div class="box_img">
                  <img :src="i.img" alt />
                </div>
              </router-link>
              <div class="box_troduce">
                <p>名称：<span>{{i.mname}}</span></p>
                <p>导演：{{i.director}}</p>
                <p>演员：{{i.actor}}</p>
                <p>类型：{{i.steps}}</p>
              </div>
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
import headerc from './parts/header.vue'
export default {
  components: {
    headerc
  },
  created () {
    this.show()
    this.getSearchList()
  },
  mounted () {},
  data () {
    return {
      mname: '',
      activeName: '',
      isLogin: false,
      loginName: '',
      searchList: [],
      total: 0
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
    async getSearchList () {
      const { data: res } = await this.$http.get(
        `search?val=${this.$route.params.val}`
      )
      if (res.status !== 200) return this.$message.error('发生错误')
      this.searchList = res.data
      this.total = res.total
    }
  }
}
</script>

<style lang='less' scoped>
.el-container {
  width: 100%;
  height: 100%;
  .el-card {
    width: 100%;

    .el-breadcrumb {
      padding-bottom: 10px;
      border-bottom: 1px solid #ccc;
    }
  }
}
.el-footer {
  padding: 5px;
  margin-bottom: 15px;
  background-color: #b3c0d1;
  bottom: 0;
  text-align: center;
  position: fixed;
  width: 100%;
  p {
    background-color: #b3c0d1;
    padding: 3px;
    margin: 0;
    font-size: 13px;
  }
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  padding-bottom: 80px;
}
.search_box {
  .box_ul {
    list-style-type: none;
    .box_li {
      padding: 2rem 0;
      border-bottom: solid 1px #cccccc;
      display: flex;
      .box_troduce {
        margin-left: 3rem;
        margin-top: .5rem;
        p{
          margin: .5rem;
        }
        p:nth-child(1){
          span{
color: #337ab7;
          }

        }
      }
      .box_img {
        height: 8rem;
        img {
          height: 100%;
        }
      }
    }
  }
}
</style>
